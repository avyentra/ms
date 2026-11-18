/* =========================================================
   Blog pages — list (blog.html) and detail (blog-detail.html)
   Data comes from assets/js/blog-data.js (window.BLOG_POSTS)
   ========================================================= */
(function () {
    const POSTS = (window.BLOG_POSTS || [])
        .slice()
        .sort((a, b) => new Date(b.date) - new Date(a.date));

    const PAGE_SIZE = 6;
    const page = document.body.dataset.page;

    /* ---------- helpers ---------- */
    const esc = str => String(str ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    const formatDate = d => {
        const dt = new Date(d + 'T00:00:00');
        return isNaN(dt) ? d : dt.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    };
    const readTime = html => {
        const words = String(html || '').replace(/<[^>]+>/g, ' ').trim().split(/\s+/).filter(Boolean).length;
        return Math.max(1, Math.round(words / 200)) + ' min read';
    };
    const postUrl = p => p.url || `blog-detail.html?post=${encodeURIComponent(p.slug)}`;
    const ICONS = {
        clock: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
        cal: '<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>',
        arrow: '<svg viewBox="0 0 24 24"><path d="M7 17 17 7M8 7h9v9"/></svg>'
    };

    /* cover: real image if given, otherwise an automatic gradient cover */
    const PALETTES = [
        ['#5b21b6', '#8b5cf6'], ['#4338ca', '#a855f7'], ['#6d28d9', '#c026d3'],
        ['#7c3aed', '#ec4899'], ['#312e81', '#7c3aed'], ['#581c87', '#a78bfa']
    ];
    const hash = s => [...String(s)].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7);
    const coverHTML = (p, big) => {
        if (p.cover) {
            return `<div class="b-cover"><img src="${esc(p.cover)}" alt="${esc(p.coverAlt || p.title)}" loading="lazy"></div>`;
        }
        const [c1, c2] = PALETTES[hash(p.slug) % PALETTES.length];
        return `<div class="b-cover b-cover-auto" style="--c1:${c1};--c2:${c2}">
                    <span class="b-cover-cat">${esc(p.category)}</span>
                    <span class="b-cover-title">${esc(p.title)}</span>
                    <span class="b-cover-mark" aria-hidden="true">MS</span>
                </div>`;
    };

    const metaHTML = p => `
        <span>${ICONS.cal}${formatDate(p.date)}</span>
        <span>${ICONS.clock}${readTime(p.content)}</span>`;

    const cardHTML = p => `
        <article class="b-card">
            <a href="${postUrl(p)}" class="b-card-link" aria-label="${esc(p.title)}"></a>
            ${coverHTML(p)}
            <div class="b-card-body">
                <span class="b-cat">${esc(p.category)}</span>
                <h3>${esc(p.title)}</h3>
                <p>${esc(p.excerpt)}</p>
                <div class="b-meta">${metaHTML(p)}</div>
            </div>
            <span class="b-card-arrow">${ICONS.arrow}</span>
        </article>`;

    /* =====================================================
       BLOG LIST PAGE
       ===================================================== */
    if (page === 'blog-list') {
        const params = new URLSearchParams(location.search);
        let activeCat = params.get('category') || 'All';
        let query = '';
        let shown = PAGE_SIZE;

        const featuredEl = document.getElementById('blogFeatured');
        const gridEl = document.getElementById('blogGrid');
        const catsEl = document.getElementById('blogCats');
        const searchEl = document.getElementById('blogSearch');
        const moreBtn = document.getElementById('blogMore');
        const emptyEl = document.getElementById('blogEmpty');
        const countEl = document.getElementById('blogCount');

        // categories with counts
        const cats = ['All', ...new Set(POSTS.map(p => p.category))];
        catsEl.innerHTML = cats.map(c => {
            const n = c === 'All' ? POSTS.length : POSTS.filter(p => p.category === c).length;
            return `<button class="b-chip${c === activeCat ? ' active' : ''}" data-cat="${esc(c)}">${esc(c)} <i>${n}</i></button>`;
        }).join('');

        const render = () => {
            const q = query.trim().toLowerCase();
            const filtered = POSTS.filter(p =>
                (activeCat === 'All' || p.category === activeCat) &&
                (!q || [p.title, p.excerpt, p.category, ...(p.tags || [])].join(' ').toLowerCase().includes(q))
            );
            const isDefaultView = activeCat === 'All' && !q;

            // featured = newest post (only on the default view)
            if (isDefaultView && filtered.length) {
                const f = filtered[0];
                featuredEl.hidden = false;
                featuredEl.innerHTML = `
                    <a href="${postUrl(f)}" class="b-featured-link" aria-label="${esc(f.title)}"></a>
                    ${coverHTML(f, true)}
                    <div class="b-featured-body">
                        <span class="b-new">Latest</span>
                        <span class="b-cat">${esc(f.category)}</span>
                        <h2>${esc(f.title)}</h2>
                        <p>${esc(f.excerpt)}</p>
                        <div class="b-meta">${metaHTML(f)}</div>
                        <span class="b-read">Read article ${ICONS.arrow}</span>
                    </div>`;
            } else {
                featuredEl.hidden = true;
            }

            const list = isDefaultView ? filtered.slice(1) : filtered;
            document.querySelector('.b-toolbar').hidden = POSTS.length < 2;
            gridEl.innerHTML = list.slice(0, shown).map(cardHTML).join('');
            moreBtn.hidden = list.length <= shown;
            emptyEl.hidden = filtered.length > 0;
            countEl.textContent = filtered.length === 1 ? '1 article' : `${filtered.length} articles`;
        };

        catsEl.addEventListener('click', e => {
            const btn = e.target.closest('.b-chip');
            if (!btn) return;
            activeCat = btn.dataset.cat;
            shown = PAGE_SIZE;
            catsEl.querySelectorAll('.b-chip').forEach(b => b.classList.toggle('active', b === btn));
            const url = new URL(location.href);
            activeCat === 'All' ? url.searchParams.delete('category') : url.searchParams.set('category', activeCat);
            history.replaceState(null, '', url);
            render();
        });
        searchEl.addEventListener('input', () => { query = searchEl.value; shown = PAGE_SIZE; render(); });
        moreBtn.addEventListener('click', () => { shown += PAGE_SIZE; render(); });
        document.getElementById('blogReset')?.addEventListener('click', () => {
            searchEl.value = ''; query = ''; activeCat = 'All';
            catsEl.querySelectorAll('.b-chip').forEach(b => b.classList.toggle('active', b.dataset.cat === 'All'));
            render();
        });

        render();
    }

    /* =====================================================
       BLOG DETAIL PAGE
       ===================================================== */
    if (page === 'blog-detail') {
        const isStatic = !!document.body.dataset.slug;   // a ready-made page for one article
        const slug = document.body.dataset.slug || new URLSearchParams(location.search).get('post');
        const idx = POSTS.findIndex(p => p.slug === slug);
        const post = idx > -1 ? POSTS[idx] : null;
        const root = document.getElementById('postRoot');
        const notFound = document.getElementById('postNotFound');

        if (!post) {
            root.hidden = true;
            notFound.hidden = false;
            document.title = 'Article not found | Mangat Singh';
            return;
        }

        if (!isStatic) {
        // SEO basics
        document.title = `${post.title} | Mangat Singh Blog`;
        document.querySelector('meta[name="description"]')?.setAttribute('content', post.metaDescription || post.excerpt);
        if (post.keywords && post.keywords.length) {
            let kw = document.querySelector('meta[name="keywords"]');
            if (!kw) { kw = document.createElement('meta'); kw.name = 'keywords'; document.head.appendChild(kw); }
            kw.content = post.keywords.join(', ');
        }

        // header
        document.getElementById('postCrumb').textContent = post.title;
        const catLink = document.getElementById('postCat');
        catLink.textContent = post.category;
        catLink.href = `blog.html?category=${encodeURIComponent(post.category)}`;
        document.getElementById('postTitle').textContent = post.title;
        document.getElementById('postExcerpt').textContent = post.excerpt;
        document.getElementById('postAuthor').textContent = post.author || 'Mangat Singh';
        document.getElementById('postMeta').innerHTML = metaHTML(post);
        document.getElementById('postCover').innerHTML = coverHTML(post, true);

        }

        // content + table of contents from <h2>
        const body = document.getElementById('postBody');
        if (!isStatic) body.innerHTML = post.content;
        // links to other websites open in a new tab
        body.querySelectorAll('a[href^="http"]').forEach(a => { a.target = '_blank'; a.rel = 'noopener'; });
        const tocEl = document.getElementById('postToc');
        const heads = [...body.querySelectorAll('h2')];
        heads.forEach((h, i) => { h.id = h.id || 'section-' + (i + 1); });
        if (heads.length) {
            tocEl.innerHTML = heads.map(h => `<li><a href="#${h.id}">${esc(h.textContent)}</a></li>`).join('');
        } else {
            document.getElementById('postTocWrap').hidden = true;
        }

        // highlight current section in TOC
        const tocLinks = [...tocEl.querySelectorAll('a')];
        const tocObs = new IntersectionObserver(entries => {
            entries.forEach(en => {
                if (en.isIntersecting) {
                    tocLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + en.target.id));
                }
            });
        }, { rootMargin: '-20% 0px -70% 0px' });
        heads.forEach(h => tocObs.observe(h));

        // tags
        if (!isStatic) document.getElementById('postTags').innerHTML = (post.tags || [])
            .map(t => `<span>#${esc(t)}</span>`).join('');

        // share
        const pageUrl = document.querySelector('link[rel="canonical"]')?.href || location.href;
        const enc = encodeURIComponent;
        document.getElementById('shareLinkedIn').href = `https://www.linkedin.com/sharing/share-offsite/?url=${enc(pageUrl)}`;
        document.getElementById('shareX').href = `https://twitter.com/intent/tweet?url=${enc(pageUrl)}&text=${enc(post.title)}`;
        document.getElementById('shareWhatsApp').href = `https://wa.me/?text=${enc(post.title + ' ' + pageUrl)}`;
        const copyBtn = document.getElementById('shareCopy');
        copyBtn.addEventListener('click', async () => {
            try { await navigator.clipboard.writeText(pageUrl); } catch (e) { /* ignore */ }
            copyBtn.classList.add('copied');
            setTimeout(() => copyBtn.classList.remove('copied'), 1800);
        });

        // previous / next (by date)
        const newer = POSTS[idx - 1];
        const older = POSTS[idx + 1];
        const pnHTML = (p, label, cls) => p ? `
            <a href="${postUrl(p)}" class="b-pn ${cls}">
                <small>${label}</small>
                <strong>${esc(p.title)}</strong>
            </a>` : '<span></span>';
        document.getElementById('postPrevNext').innerHTML =
            pnHTML(older, '← Previous article', 'prev') + pnHTML(newer, 'Next article →', 'next');

        // related: same category first, then latest
        const others = POSTS.filter(p => p.slug !== post.slug);
        const related = [
            ...others.filter(p => p.category === post.category),
            ...others.filter(p => p.category !== post.category)
        ].slice(0, 3);
        const relWrap = document.getElementById('postRelated');
        if (related.length) {
            document.getElementById('relatedGrid').innerHTML = related.map(cardHTML).join('');
        } else {
            relWrap.hidden = true;
        }

        // reading progress bar
        const bar = document.getElementById('readProgress');
        const onScroll = () => {
            const r = body.getBoundingClientRect();
            const total = body.offsetHeight - window.innerHeight * 0.6;
            const done = Math.min(Math.max((-r.top + window.innerHeight * 0.2) / total, 0), 1);
            bar.style.width = (done * 100) + '%';
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }
})();
