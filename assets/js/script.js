document.addEventListener('DOMContentLoaded', () => {

    /* ===== Footer year ===== */
    document.getElementById('year').textContent = new Date().getFullYear();

    /* ===== Sticky header shadow ===== */
    const header = document.getElementById('header');
    const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    /* ===== Mobile menu ===== */
    const toggle = document.getElementById('menuToggle');
    const nav = document.getElementById('nav');
    toggle.addEventListener('click', () => {
        toggle.classList.toggle('open');
        nav.classList.toggle('open');
    });
    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', e => {
            const parent = link.parentElement;
            // Mobile: first tap on "Services" opens the dropdown
            if (parent.classList.contains('has-dropdown') && window.innerWidth <= 960) {
                e.preventDefault();
                parent.classList.toggle('open');
                return;
            }
            toggle.classList.remove('open');
            nav.classList.remove('open');
        });
    });

    /* ===== Active nav link on scroll ===== */
    const navLinks = document.querySelectorAll('.nav-links > li > a');
    const sections = [...navLinks]
        .map(a => document.querySelector(a.getAttribute('href')))
        .filter(Boolean);
    const spy = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id));
        });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(s => spy.observe(s));

    /* ===== Scroll reveal (with stagger) ===== */
    // Extra elements to animate on scroll
    document.querySelectorAll('.section-head, .trusted-title, .why-title, .industries .sub-title, .testi-head')
        .forEach(el => el.classList.add('reveal-left'));
    document.querySelectorAll('.why-item, .industry, .testi-card').forEach(el => el.classList.add('reveal'));
    document.querySelectorAll('.cta, .footer-top').forEach(el => el.classList.add('reveal-zoom'));

    const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-zoom');
    const revealer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            // stagger siblings that share the same parent
            const siblings = [...el.parentElement.children].filter(c => c.classList.contains('reveal'));
            const index = siblings.indexOf(el);
            el.style.transitionDelay = index > 0 ? `${index * 0.1}s` : '0s';
            el.classList.add('in');
            // remove delay after it animates so hover feels instant
            setTimeout(() => { el.style.transitionDelay = ''; }, 900 + index * 100);
            obs.unobserve(el);
        });
    }, { threshold: 0.15 });
    revealEls.forEach(el => revealer.observe(el));

    /* ===== Counter animation ===== */
    const counters = document.querySelectorAll('.counter');
    const animateCount = el => {
        const target = +el.dataset.target;
        const duration = 1600;
        const start = performance.now();
        const step = now => {
            const p = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            el.textContent = Math.round(target * eased);
            if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    };
    const countObs = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => animateCount(entry.target), 700);
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.6 });
    counters.forEach(c => countObs.observe(c));

    /* ===== Logo marquee (duplicate logos for seamless loop) ===== */
    const logos = document.querySelector('.logos');
    if (logos) {
        const track = document.createElement('div');
        track.className = 'logos-track';
        track.innerHTML = logos.innerHTML + logos.innerHTML;
        track.children[track.children.length / 2] && [...track.children]
            .slice(track.children.length / 2)
            .forEach(c => c.setAttribute('aria-hidden', 'true'));
        logos.innerHTML = '';
        logos.appendChild(track);
    }

    /* ===== Service card spotlight follows mouse ===== */
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('mousemove', e => {
            const r = card.getBoundingClientRect();
            card.style.setProperty('--mx', `${e.clientX - r.left}px`);
            card.style.setProperty('--my', `${e.clientY - r.top}px`);
        });
    });

    /* ===== Project card 3D tilt ===== */
    if (window.matchMedia('(hover: hover)').matches) {
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('mousemove', e => {
                const r = card.getBoundingClientRect();
                const x = (e.clientX - r.left) / r.width - 0.5;
                const y = (e.clientY - r.top) / r.height - 0.5;
                card.style.transform = `perspective(900px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateY(-8px)`;
            });
            card.addEventListener('mouseleave', () => { card.style.transform = ''; });
        });
    }

    /* ===== Hero parallax ===== */
    const heroImg = document.querySelector('.hero-img');
    const hero = document.querySelector('.hero');
    if (hero && window.matchMedia('(hover: hover)').matches) {
        hero.addEventListener('mousemove', e => {
            const x = (e.clientX / window.innerWidth - 0.5);
            const y = (e.clientY / window.innerHeight - 0.5);
            heroImg.style.translate = `${x * -12}px ${y * -8}px`;
        });
    }

    /* ===== Testimonial slider ===== */
    const slides = document.querySelectorAll('.testi-slide');
    let current = 0;
    let timer;
    const show = next => {
        if (next === current) return;
        const old = slides[current];
        old.classList.add('leave');
        old.classList.remove('active');
        setTimeout(() => old.classList.remove('leave'), 600);
        current = (next + slides.length) % slides.length;
        slides[current].classList.add('active');
    };
    const auto = () => { clearInterval(timer); timer = setInterval(() => show(current + 1), 5000); };
    document.getElementById('testiNext').addEventListener('click', () => { show(current + 1); auto(); });
    document.getElementById('testiPrev').addEventListener('click', () => { show(current - 1); auto(); });
    auto();
});
