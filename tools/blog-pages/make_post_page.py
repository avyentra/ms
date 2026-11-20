#!/usr/bin/env python3
"""Build a ready-made SEO page (<slug>.html) for one blog post.

Usage (run from the repo root):
  python3 tools/blog-pages/make_post_page.py <slug>

What it does:
  1. Reads the post from assets/js/blog-data.js (needs node).
  2. Makes a 1200-wide share image (1200x630 to 1200x675) assets/images/blog/<slug>-og.jpg from the cover
     (or uses assets/images/og-home.jpg when the post has no cover).
  3. Writes <slug>.html from blog-detail.html with the title, description, share
     preview tags, canonical link, BlogPosting data and the full article already in
     the HTML, so Google, WhatsApp and LinkedIn see the real post.
  4. Adds url: "<slug>.html" to the post in blog-data.js.
  5. Puts https://ms.primeznews.com/<slug>.html in sitemap.xml (replacing the
     blog-detail.html?post=<slug> line if there is one).
Run it again after editing a post to refresh the page.
"""
import html, json, math, os, re, subprocess, sys
from datetime import date
from PIL import Image

SITE = "https://ms.primeznews.com"
ROOT = os.getcwd()


def esc(s):
    return html.escape(str(s or ""), quote=True)


def load_post(slug):
    js = ("global.window={};require('./assets/js/blog-data.js');"
          "process.stdout.write(JSON.stringify(window.BLOG_POSTS))")
    posts = json.loads(subprocess.check_output(["node", "-e", js], cwd=ROOT))
    for p in posts:
        if p.get("slug") == slug:
            return p
    sys.exit(f"post '{slug}' not found in assets/js/blog-data.js")


def make_og(post):
    cover = post.get("cover") or ""
    if not cover or not os.path.exists(os.path.join(ROOT, cover)):
        return "assets/images/og-home.jpg", 1200, 627
    out = f"assets/images/blog/{post['slug']}-og.jpg"
    im = Image.open(os.path.join(ROOT, cover)).convert("RGB")
    # 1200 wide; keeps a 16:9 cover whole (1200x675), crops only taller images
    tw = 1200
    th = min(max(round(tw * im.height / im.width), 630), 675)
    scale = max(tw / im.width, th / im.height)
    im = im.resize((math.ceil(im.width * scale), math.ceil(im.height * scale)), Image.LANCZOS)
    left, top = (im.width - tw) // 2, (im.height - th) // 2
    im.crop((left, top, left + tw, top + th)).save(os.path.join(ROOT, out), "JPEG", quality=85, optimize=True, progressive=True)
    return out, tw, th


def read_time(content):
    words = len([w for w in re.sub(r"<[^>]+>", " ", content).split() if w])
    return f"{max(1, round(words / 200))} min read"


def nice_date(d):
    y, m, dd = map(int, d.split("-"))
    return date(y, m, dd).strftime("%-d %b %Y")


def sub_once(pattern, repl, s):
    new, n = re.subn(pattern, lambda _m: repl, s, count=1)
    if n != 1:
        sys.exit(f"template changed, could not find: {pattern}")
    return new


def build_page(post, og, ogw, ogh):
    slug = post["slug"]
    url = f"{SITE}/{slug}.html"
    title = post["title"]
    desc = post.get("metaDescription") or post.get("excerpt", "")
    og_url = f"{SITE}/{og}"
    kw = ", ".join(post.get("keywords") or [])
    alt = post.get("coverAlt") or title
    d = post["date"]
    t = open(os.path.join(ROOT, "blog-detail.html"), encoding="utf-8").read()

    t = sub_once(r'<meta property="og:type" content="[^"]*">', '<meta property="og:type" content="article">', t)
    t = sub_once(r'<meta property="og:url" content="[^"]*">', f'<meta property="og:url" content="{url}">', t)
    t = sub_once(r'<meta property="og:title" content="[^"]*">', f'<meta property="og:title" content="{esc(title)}">', t)
    t = sub_once(r'<meta property="og:description" content="[^"]*">', f'<meta property="og:description" content="{esc(desc)}">', t)
    t = sub_once(r'<meta property="og:image" content="[^"]*">', f'<meta property="og:image" content="{og_url}">', t)
    t = sub_once(r'<meta property="og:image:secure_url" content="[^"]*">', f'<meta property="og:image:secure_url" content="{og_url}">', t)
    t = sub_once(r'<meta property="og:image:width" content="[^"]*">', f'<meta property="og:image:width" content="{ogw}">', t)
    t = sub_once(r'<meta property="og:image:height" content="[^"]*">', f'<meta property="og:image:height" content="{ogh}">', t)
    t = sub_once(r'<meta property="og:image:alt" content="[^"]*">',
                 f'<meta property="og:image:alt" content="{esc(alt)}">\n'
                 f'    <meta property="article:published_time" content="{d}">\n'
                 f'    <meta property="article:author" content="{esc(post.get("author", "Mangat Singh"))}">', t)
    t = sub_once(r'<meta name="image" content="[^"]*">', f'<meta name="image" content="{og_url}">', t)
    t = sub_once(r'<meta name="twitter:title" content="[^"]*">', f'<meta name="twitter:title" content="{esc(title)}">', t)
    t = sub_once(r'<meta name="twitter:description" content="[^"]*">', f'<meta name="twitter:description" content="{esc(desc)}">', t)
    t = sub_once(r'<meta name="twitter:image" content="[^"]*">', f'<meta name="twitter:image" content="{og_url}">', t)
    t = sub_once(r'<title>[^<]*</title>', f'<title>{esc(title)} | Mangat Singh Blog</title>', t)
    ld = {
        "@context": "https://schema.org", "@type": "BlogPosting", "headline": title, "description": desc,
        "image": og_url, "datePublished": d, "dateModified": d,
        "author": {"@type": "Person", "name": post.get("author", "Mangat Singh"), "url": SITE},
        "publisher": {"@type": "Person", "name": "Mangat Singh"},
        "mainEntityOfPage": url, "keywords": kw,
    }
    t = sub_once(r'<meta name="description" content="[^"]*">',
                 f'<meta name="description" content="{esc(desc)}">\n'
                 + (f'    <meta name="keywords" content="{esc(kw)}">\n' if kw else "")
                 + '    <meta name="author" content="Mangat Singh">\n'
                 f'    <link rel="canonical" href="{url}">\n'
                 '    <script type="application/ld+json">\n    '
                 + json.dumps(ld, ensure_ascii=False).replace("</", "<\\/") + '\n    </script>', t)
    t = sub_once(r'<body data-page="blog-detail"', f'<body data-page="blog-detail" data-slug="{esc(slug)}"', t)

    cat = post.get("category", "")
    t = sub_once(r'<span id="postCrumb"></span>', f'<span id="postCrumb">{esc(title)}</span>', t)
    t = sub_once(r'<a href="blog.html" class="b-cat b-cat-link" id="postCat"></a>',
                 f'<a href="blog.html?category={esc(cat.replace(" ", "%20"))}" class="b-cat b-cat-link" id="postCat">{esc(cat)}</a>', t)
    t = sub_once(r'<h1 id="postTitle"></h1>', f'<h1 id="postTitle">{esc(title)}</h1>', t)
    t = sub_once(r'<p class="b-post-excerpt" id="postExcerpt"></p>', f'<p class="b-post-excerpt" id="postExcerpt">{esc(post.get("excerpt"))}</p>', t)
    t = sub_once(r'<strong id="postAuthor"></strong>', f'<strong id="postAuthor">{esc(post.get("author", "Mangat Singh"))}</strong>', t)
    meta = ('<span><svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>'
            f'<time datetime="{d}">{nice_date(d)}</time></span>'
            '<span><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>'
            f'{read_time(post.get("content", ""))}</span>')
    t = sub_once(r'<div class="b-meta" id="postMeta"></div>', f'<div class="b-meta" id="postMeta">{meta}</div>', t)
    cover = post.get("cover") or ""
    if cover and os.path.exists(os.path.join(ROOT, cover)):
        cw, ch = Image.open(os.path.join(ROOT, cover)).size
        cov = (f'<div class="b-cover"><img src="{esc(cover)}" alt="{esc(alt)}" width="{cw}" height="{ch}" '
               'fetchpriority="high"></div>')
        t = sub_once(r'<div class="b-post-cover" id="postCover"></div>', f'<div class="b-post-cover" id="postCover">{cov}</div>', t)
    body = "\n" + post.get("content", "").strip("\n") + "\n                        "
    t = sub_once(r'<div class="b-prose" id="postBody"></div>', f'<div class="b-prose" id="postBody">{body}</div>', t)
    open(os.path.join(ROOT, f"{slug}.html"), "w", encoding="utf-8").write(t)


def set_url_in_data(slug):
    p = os.path.join(ROOT, "assets/js/blog-data.js")
    s = open(p, encoding="utf-8").read()
    start = s.find(f'slug: "{slug}"')
    if start < 0:
        sys.exit("slug line not found in blog-data.js")
    end = s.find("content:", start)
    block = s[start:end]
    if re.search(r'\burl:\s*"', block):
        block2 = re.sub(r'url:\s*"[^"]*"', f'url: "{slug}.html"', block, count=1)
    else:
        m = re.search(r'\n(\s*)author:', block)
        if not m:
            sys.exit("author line not found for this post")
        block2 = block[:m.start()] + f'\n{m.group(1)}url: "{slug}.html",' + block[m.start():]
    open(p, "w", encoding="utf-8").write(s[:start] + block2 + s[end:])


def update_sitemap(post):
    p = os.path.join(ROOT, "sitemap.xml")
    s = open(p, encoding="utf-8").read()
    slug, d = post["slug"], post["date"]
    line = f"    <url><loc>{SITE}/{slug}.html</loc><lastmod>{d}</lastmod><priority>0.7</priority></url>\n"
    s = re.sub(r"[ \t]*<url><loc>" + re.escape(f"{SITE}/blog-detail.html?post={slug}") + r"</loc>.*?</url>\n", "", s)
    s = re.sub(r"[ \t]*<url><loc>" + re.escape(f"{SITE}/{slug}.html") + r"</loc>.*?</url>\n", "", s)
    s = s.replace("</urlset>", line + "</urlset>")
    open(p, "w", encoding="utf-8").write(s)


def main():
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    slug = sys.argv[1]
    post = load_post(slug)
    og, w, h = make_og(post)
    build_page(post, og, w, h)
    set_url_in_data(slug)
    update_sitemap(post)
    print(f"made {slug}.html (share image: {og})")


if __name__ == "__main__":
    main()
