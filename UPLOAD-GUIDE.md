# Website upload guide (GitHub)

## 1. Upload
- Zip kholo. `project` folder ke **andar** ki saari files repo ke root mein daalo
  (yaani `index.html` repo ke sabse upar ho).
- Chhupi files bhi zaroor upload karo: `.nojekyll` aur `CNAME`.
- Commit + push karo. GitHub Pages par live hone mein 2–5 minute lagte hain.

## 2. Files ka kaam
| File | Kaam |
|---|---|
| `index.html` | Home page |
| `blog.html` | Blog list |
| `ai-website-builder-vs-designer.html` | Pehla blog (apna page) |
| `blog-detail.html` | Aage ke blogs ka common page |
| `robots.txt` | Google, LinkedIn, WhatsApp ko site padhne ki ijaazat |
| `sitemap.xml` | Google ke liye pages ki list |
| `CNAME` | GitHub Pages ka custom domain (`ms.primeznews.com`) |
| `.nojekyll` | GitHub ko files bina badle dikhane ke liye |
| `BLOG-GUIDE.md` | Naya blog kaise daalein |

## 3. Upload ke baad check karo
1. `https://ms.primeznews.com/robots.txt` kholo. Bilkul yahi dikhna chahiye:
   ```
   User-agent: *
   Allow: /
   ```
   Kuch aur dikhe (jaise `Disallow: /` ya Cloudflare ka text) to hosting/Cloudflare
   apni file laga raha hai. Cloudflare mein **AI Crawl Control / Manage robots.txt** band karo.
2. Image khul rahi hai ya nahi:
   - `https://ms.primeznews.com/assets/images/og-home.jpg`
   - `https://ms.primeznews.com/assets/images/blog/ai-website-builder-vs-designer-og.jpg`
3. LinkedIn: `https://www.linkedin.com/post-inspector/` mein link daal kar **Inspect** dabao
   (LinkedIn ki purani yaad mit jaati hai). Phir share karo.
4. WhatsApp turant test ke liye link ke end mein `?v=2` lagao.

## 4. Domain alag ho to
Agar website `ms.primeznews.com` par nahi hai, to in files mein address badlo:
`CNAME`, `robots.txt`, `sitemap.xml`, aur saari `.html` files ke `<head>` (og:url, og:image, canonical).
