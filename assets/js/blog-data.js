/* =========================================================
   BLOG DATA — all blog posts live here.

   ➜ To add a new blog: copy one { ... } block, paste it at the
     TOP of the list, and change the values. Save. Done.
     The blog list and the detail page update automatically
     (newest date is shown first).

   Fields
   - slug       : unique, lowercase, words joined by "-" (used in the URL)
   - title      : blog title
   - excerpt    : 1–2 lines shown on the blog card
   - category   : one category (e.g. "UI/UX Design")
   - tags       : list of small tags
   - date       : "YYYY-MM-DD"
   - cover      : image path (optional) e.g. "assets/images/blog/my-post.jpg"
                  leave "" to show an automatic purple cover (best size 1600 x 900)
   - coverAlt   : short description of the cover image (for Google / screen readers)
   - url        : (optional) own HTML page for this blog, e.g. "my-post.html".
                  Leave it out and the blog opens in blog-detail.html automatically.
   - author     : author name
   - content    : the article in HTML (<h2>, <h3>, <p>, <ul>, <blockquote>, <img> ...)
                  Every <h2> automatically appears in the "On this page" menu.

   Optional SEO fields
   - metaDescription : text for Google (falls back to excerpt)
   - keywords        : list of SEO keywords
   ========================================================= */

window.BLOG_POSTS = [
    {
        slug: "saas-dashboard-design-mistakes",
        title: "7 SaaS Dashboard Design Mistakes (and How to Fix Them)",
        excerpt: "Users ignoring your SaaS dashboard? Seven common dashboard design mistakes I keep seeing, and the simple fixes I'd make instead.",
        metaDescription: "Users ignoring your SaaS dashboard? A designer's guide to 7 common dashboard design mistakes, with simple fixes for founders and product managers.",
        keywords: ["dashboard design mistakes", "SaaS dashboard design", "dashboard UX best practices", "admin dashboard design", "how to design a dashboard", "KPI dashboard layout"],
        category: "UI/UX Design",
        tags: ["Dashboard Design", "SaaS", "UX", "Data Visualization"],
        date: "2026-11-20",
        cover: "assets/images/blog/saas-dashboard-design-mistakes.jpg",
        coverAlt: "7 SaaS dashboard design mistakes and how to fix them: a cluttered dashboard next to a clean project management dashboard, with KPI overload, weak hierarchy and visual noise called out.",
        url: "saas-dashboard-design-mistakes.html",
        author: "Mangat Singh",
        content: `
            <p>Your team spent weeks building the dashboard. It has charts, filters, a dark mode. And yet customers log in, glance at it, and go straight to the one table they actually need. Or they export everything to Excel.</p>
            <p>That's not a user problem. It's a design problem, and it's very common.</p>
            <p>I've designed dashboards, admin panels and web apps for startups and institutions over 8+ years. Most of the dashboards I'm asked to fix have the same handful of issues. Here they are, with what I'd do instead.</p>
            <h2>First, what is a dashboard actually for?</h2>
            <p>Nielsen Norman Group describes a dashboard as a single-page view that gives "at-a-glance information", much like the dashboard in a car (<a href="https://www.nngroup.com/articles/dashboards-preattentive/">NN/g</a>). The same article splits them into two kinds:</p>
            <ul>
            <li><strong>Operational dashboards</strong> help people act on something time-sensitive (orders stuck, a server down, tickets overdue).</li>
            <li><strong>Analytical dashboards</strong> help people study trends and make decisions that aren't urgent.</li>
            </ul>
            <p>Many dashboards fail because nobody decided which one they were building. Keep that in mind as you read the list.</p>
            <h2>Mistake 1: Showing every metric you have</h2>
            <p>This is the big one. The database has 40 numbers, so the dashboard shows 40 numbers.</p>
            <p>Eleken, a design agency, points to Miller's law here: people can hold roughly "five to nine chunks of information" in working memory at once. A screen with 20 or 30 widgets makes users tune out. Their advice is to focus on 3–5 core KPIs rather than 20 line charts (<a href="https://www.eleken.co/blog-posts/why-users-ignore-dashboards">Eleken, updated Dec 2025</a>).</p>
            <p><strong>Fix:</strong> Ask each user role one question: "What do you need to know in the first ten seconds after logging in?" Those answers become the top row. Everything else moves to a detail page.</p>
            <h2>Mistake 2: No clear visual order</h2>
            <p>When every card is the same size and colour, nothing stands out. The eye has nowhere to start.</p>
            <p>Eleken notes that the top-left and centre get the most attention, and the bottom-right gets the least (<a href="https://www.eleken.co/blog-posts/why-users-ignore-dashboards">Eleken</a>). UXPin gives similar advice: put the most critical KPIs at the top or left, and separate primary metrics from secondary ones (<a href="https://www.uxpin.com/studio/blog/dashboard-design-principles/">UXPin, Jun 2026</a>).</p>
            <p><strong>Fix:</strong> Pick one hero number per role. Make it bigger. Group related cards together, with clear spacing between groups.</p>
            <h2>Mistake 3: Pie charts, gauges and 3D everything</h2>
            <p>They look nice in a pitch deck. They're hard to read in daily use.</p>
            <p>NN/g explains that our eyes compare <strong>length</strong> and <strong>position</strong> quickly and accurately, which is why bar charts and line charts work so well. The article says pie charts "should be avoided most of the time", discourages gauges and treemaps for simple actionable dashboards, and shows how 3D charts distort values (<a href="https://www.nngroup.com/articles/dashboards-preattentive/">NN/g</a>).</p>
            <p><strong>Fix:</strong> Bar charts to compare things. Line charts to show change over time. A plain number with a small up/down indicator for single KPIs. That covers most SaaS dashboards.</p>
            <h2>Mistake 4: Letting colour do all the work</h2>
            <p>Red for bad, green for good, and nothing else. Two problems.</p>
            <p>First, NN/g notes that up to 4.5% of the general population has some form of colour blindness (<a href="https://www.nngroup.com/articles/dashboards-preattentive/">NN/g</a>). Second, a rainbow of category colours turns into noise fast.</p>
            <p><strong>Fix:</strong> Use colour for meaning, not decoration. Keep most of the screen neutral and save strong colour for things that need attention. Add labels, icons or arrows so the meaning doesn't depend on colour alone, as UXPin also recommends (<a href="https://www.uxpin.com/studio/blog/dashboard-design-principles/">UXPin</a>).</p>
            <h2>Mistake 5: One dashboard for every user</h2>
            <p>An admin, a team manager and a regular user don't need the same screen. When they all get one, it's either too crowded for some or too thin for others.</p>
            <p><strong>Fix:</strong> Map your roles before designing anything. Often you need two or three tailored views, not one "flexible" dashboard with 15 filters. Filters are a sign the design didn't decide.</p>
            <h2>Mistake 6: Forgetting the empty state and the "last updated" time</h2>
            <p>Two small things that quietly kill trust.</p>
            <p>A brand-new user signs up and sees a grid of zeros and empty charts. That's the worst possible first impression. Design that first screen on purpose: explain what will appear here and give one clear first action ("Connect your store", "Add your first project").</p>
            <p>And show when the data was refreshed. Eleken notes that a visible "Last updated" timestamp can quietly reinforce reliability (<a href="https://www.eleken.co/blog-posts/why-users-ignore-dashboards">Eleken</a>). If people doubt the numbers, they stop using the dashboard and go back to spreadsheets.</p>
            <h2>Mistake 7: Putting everything on one screen instead of drilling down</h2>
            <p>Some teams try to fit detail tables, every chart and every filter on the home view. Then it scrolls forever.</p>
            <p>UXPin recommends progressive disclosure: start with a high-level summary and let users expand into detail when they need it (<a href="https://www.uxpin.com/studio/blog/dashboard-design-principles/">UXPin</a>).</p>
            <p><strong>Fix:</strong> Summary on top, click a card to see the breakdown, click a row to see the record. Three levels is usually enough.</p>
            <p>It's also worth asking whether some of this belongs in a dashboard at all. Eleken suggests that a scheduled email summary or an alert can sometimes do the job better (<a href="https://www.eleken.co/blog-posts/why-users-ignore-dashboards">Eleken</a>). If a manager only needs one number every Monday, send it to them.</p>
            <h2>A quick dashboard checklist</h2>
            <p>Before you hand designs to developers, check:</p>
            <ol>
            <li>Each user role has a defined "first ten seconds" question.</li>
            <li>The top row has 3–5 KPIs, not 15.</li>
            <li>The most important number is visually the biggest.</li>
            <li>No pie, gauge or 3D chart without a strong reason.</li>
            <li>Colour is never the only signal.</li>
            <li>The empty state is designed, with one clear first action.</li>
            <li>Data freshness ("Last updated") is visible.</li>
            <li>Detail lives one click away, not on the home screen.</li>
            </ol>
            <h2>How I approach this in my own projects</h2>
            <p>In my <strong>Dashboard Design for a Project Management Web App</strong> project, the work starts with the same questions above: who opens this screen, and what they need to see first. You can see that project on my <a href="https://www.behance.net/mangat">Behance</a>.</p>
            <p>The <strong>RBU Portal</strong>, an education web app for Rayat Bahra University, is a good example of why roles matter. A university portal serves different kinds of users, and each one comes with a different task. Planning those views separately is what keeps a portal like this usable. Rohit Sharma, the founder, shared a testimonial about the project on <a href="https://ms.primeznews.com">my website</a>.</p>
            <h2>FAQ</h2>
            <h3>How many KPIs should a dashboard show?</h3>
            <p>There's no fixed rule, but for the main view, 3–5 core KPIs per role is a good starting point. Put everything else on detail pages.</p>
            <h3>Should I design the dashboard or the landing page first?</h3>
            <p>If you already have users, start with the dashboard. That's where they spend their time and decide whether to keep paying. The landing page brings people in; the dashboard keeps them.</p>
            <h3>Can I use a ready-made admin template?</h3>
            <p>Yes, for internal tools it can save time. For a customer-facing SaaS product, treat the template as a component library, not as the design. The layout and the KPIs still need to come from your users' actual tasks.</p>
            <h2>Is your dashboard being ignored?</h2>
            <p>Send me a screenshot of your current dashboard (or a rough idea of what your product needs). I'll point out the two or three changes that would make the biggest difference, and if it makes sense, share a free first concept so you can see the direction.</p>
            <ul>
            <li>Portfolio: <a href="https://ms.primeznews.com">ms.primeznews.com</a></li>
            <li>Email: <a href="mailto:rwd.mangat@gmail.com">rwd.mangat@gmail.com</a></li>
            </ul>
            <p><em>Mangat Singh, Senior UI/UX &amp; Product Designer, Chandigarh</em></p>
            <h2>Sources</h2>
            <ol>
            <li><a href="https://www.nngroup.com/articles/dashboards-preattentive/">Nielsen Norman Group: Dashboards: Making Charts and Graphs Easier to Understand (Page Laubheimer, Jun 2017)</a></li>
            <li><a href="https://www.eleken.co/blog-posts/why-users-ignore-dashboards">Eleken: Why Users Ignore Dashboards (and What to Do Instead) (updated 22 Dec 2025; design agency)</a></li>
            <li><a href="https://www.uxpin.com/studio/blog/dashboard-design-principles/">UXPin: Dashboard Design Principles: The Definitive Guide (updated 24 Jun 2026; design tool vendor)</a></li>
            </ol>
        `
    },
    {
        slug: "ai-website-builder-vs-designer",
        title: "AI Website Builder vs Hiring a Designer: How to Choose",
        excerpt: "AI website builder or a real designer? When each makes sense, what it really costs, and a simple 5-question way to decide.",
        metaDescription: "AI website builder or a real designer? A working UI/UX designer explains when each makes sense, what it really costs, and how to decide in 2026.",
        keywords: ["AI website builder vs designer", "AI website builder for small business", "hire a web designer cost", "freelance web designer vs AI", "custom website design", "website redesign"],
        category: "Web Design",
        tags: ["AI Website Builder", "Web Design", "Website Cost", "Freelancing"],
        date: "2026-11-18",
        cover: "assets/images/blog/ai-website-builder-vs-designer.jpg",
        coverAlt: "AI website builder vs hiring a designer: a generic AI-generated template compared with custom UI/UX designs for web and mobile by Mangat Singh.",
        url: "ai-website-builder-vs-designer.html",
        author: "Mangat Singh",
        content: `
            <p>You need a website, and every week you see another ad saying AI can build one in a few minutes. So it's fair to ask: why pay a designer at all?</p>
            <p>I've designed 100+ websites and 60+ mobile apps over the past 8+ years, and I get this question from founders a lot now. My honest answer is that sometimes the AI builder <em>is</em> the right call. Other times it quietly costs you leads for a year before you notice. This post is about telling those two situations apart.</p>
            <h2>What AI website builders actually do well</h2>
            <p>Let's be fair to the tools first. An AI builder asks you a few questions, picks a template, writes some starter text and puts a site online. That's useful.</p>
            <p>According to a guide on Website Builder Expert, AI builders can produce a site in under 10 minutes, for free or for a monthly plan (Wix, for example, ranges from $0 to $159 a month) (<a href="https://www.websitebuilderexpert.com/building-websites/ai-vs-freelancer/">source</a>). Note that the guide is sponsored by Wix, so read it with that in mind.</p>
            <p>The tools are also getting stronger on the design side. In October 2026, Figma announced Figma Specs, a place to define a design language that teams and AI agents can follow, and said Figma Make is being connected to the Payload CMS for generating dynamic websites (<a href="https://techcrunch.com/2026/10/14/figma-announces-new-features-to-define-how-agents-work-on-its-platform/">TechCrunch</a>). I use these tools myself. They speed up the boring parts.</p>
            <p>So an AI builder makes sense when:</p>
            <ul>
            <li>You're testing an idea and need a page live this week.</li>
            <li>You have a single service, a simple offer and no complex flows.</li>
            <li>Your budget is close to zero and you're fine writing the copy yourself.</li>
            <li>The site is temporary, like an event page or a waitlist.</li>
            </ul>
            <h2>Where AI builders fall short</h2>
            <p>The same sources are clear about the limits. The Website Builder Expert guide lists generic designs, limited customization, ongoing payments and hidden fees from add-ons as the main downsides (<a href="https://www.websitebuilderexpert.com/building-websites/ai-vs-freelancer/">source</a>). A June 2026 piece in PC Tech Magazine adds that with DIY builders, the owner still has to write the copy and choose the photos, and that sites often stall half-finished or break on phones (<a href="https://pctechmag.com/2026/06/website-builder-vs-web-designer-in-the-ai-search-era/">PC Tech Magazine</a>).</p>
            <p>From my side, these are the problems I see most when a client comes to me after trying a builder:</p>
            <h3>1. The site looks like everyone else's</h3>
            <p>Templates are trained on what already exists. If your competitor used the same tool, your hero section may look almost identical. For a local dental clinic that may be fine. For a startup trying to look credible to investors, it isn't.</p>
            <h3>2. Nobody thought about the user's path</h3>
            <p>A builder can place sections. It doesn't ask: what does a first-time visitor need to see before they trust you? Where do they hesitate? Which button should be the main one? That thinking is what UX design actually is.</p>
            <h3>3. Mobile is "responsive" but not designed</h3>
            <p>Most builders squeeze the desktop layout onto a phone. Text wraps badly, buttons sit too close together, and the call to action ends up three screens down.</p>
            <h3>4. Anything custom gets painful</h3>
            <p>Booking flows, dashboards, member areas, product filters, multi-step forms. B12, which sells its own AI builder, still says builders "can't fully replace" projects with complex logic or unusual integrations (<a href="https://www.b12.io/resource-center/small-business-basics/ai-website-builders-vs-hiring-a-developer-which-costs-more/">B12</a>).</p>
            <h2>A simple way to decide</h2>
            <p>Ask yourself these five questions:</p>
            <ol>
            <li><strong>Is the website how you get customers?</strong> If most leads come from Google, ads or referrals that check your site first, the design affects revenue. Get a designer.</li>
            <li><strong>Do you have more than one type of user?</strong> Students and admins, buyers and sellers, patients and doctors. Multiple roles mean real UX work.</li>
            <li><strong>Will you need anything beyond pages and a contact form?</strong> Logins, dashboards, e-commerce with filters, bookings. Builders get expensive or stuck here.</li>
            <li><strong>Do you already know your message?</strong> If you can't explain your offer in one line yet, start with a cheap builder page and learn first.</li>
            <li><strong>How long will this site live?</strong> A two-month campaign page and a five-year company site need different investments.</li>
            </ol>
            <p>If you answered "yes" to the first three, a builder will probably hold you back. If you answered "no" to most of them, start with a builder and save your money.</p>
            <h3>There's also a middle path</h3>
            <p>You don't have to choose all or nothing. Many of my clients start with:</p>
            <ul>
            <li>A designed <strong>landing page</strong> first, built around one goal, then the full site later.</li>
            <li>A <strong>design-only project</strong> in Figma, which their own developer or builder then implements.</li>
            <li>A <strong>redesign of key pages</strong> (home, pricing, contact) instead of the whole site.</li>
            </ul>
            <h2>What hiring a designer really costs</h2>
            <p>Cost depends heavily on where the designer is based. The US-focused articles above give ranges such as $1,000 to $3,000 for a freelancer-built site and $1,500 to $8,000 for an agency, plus monthly fees (<a href="https://pctechmag.com/2026/06/website-builder-vs-web-designer-in-the-ai-search-era/">PC Tech Magazine</a>). B12 says US freelance developers commonly charge $50 to $150 an hour (<a href="https://www.b12.io/resource-center/small-business-basics/ai-website-builders-vs-hiring-a-developer-which-costs-more/">B12</a>).</p>
            <p>Working with a designer in India changes that maths. I work at $15 USD per hour, and I quote landing pages, websites and apps per project after a short call, because scope matters more than page count.</p>
            <p>Also compare over time, not just day one. A "free" builder plus premium plan, add-ons and apps is a monthly cost forever. A designed site is mostly an upfront cost.</p>
            <h2>How this played out on real projects</h2>
            <p>Two projects from my own work show where a designer adds something a template can't.</p>
            <p><strong>p448 Store (automotive e-commerce).</strong> An online store for car products needs a premium look and fast loading, because buyers compare a lot before purchasing. Getting both right together is design and build work, not template picking.</p>
            <p><strong>RBU Portal (education web app for Rayat Bahra University).</strong> A university portal has several types of users and many tasks inside one product. That's the kind of project where an AI builder simply has no template to start from. The work was in planning screens and flows so different users could find what they need. Rohit Sharma, the founder, shared a testimonial about the project on my website.</p>
            <p>You can see both on <a href="https://ms.primeznews.com">ms.primeznews.com</a>.</p>
            <h2>FAQ</h2>
            <h3>Can I start with an AI builder and hire a designer later?</h3>
            <p>Yes, and for early-stage ideas I often recommend it. Just keep your content (text, photos, logo) in your own files so moving later is easy.</p>
            <h3>Will a designer use AI tools too?</h3>
            <p>Most do now, including me. The difference is that AI speeds up production, while the designer decides what should exist, in what order, and why.</p>
            <h3>How long does a custom designed website take?</h3>
            <p>It depends on scope. The Website Builder Expert guide puts freelancer sites at four to 12 weeks (<a href="https://www.websitebuilderexpert.com/building-websites/ai-vs-freelancer/">source</a>). A focused landing page is usually much faster. I give a timeline after understanding your project.</p>
            <h2>Not sure which way to go?</h2>
            <p>Send me your current site (or your idea) and I'll tell you honestly whether a builder is enough or whether design work will pay off. No pressure either way.</p>
            <ul>
            <li>Portfolio: <a href="https://ms.primeznews.com">ms.primeznews.com</a></li>
            <li>Email: <a href="mailto:rwd.mangat@gmail.com">rwd.mangat@gmail.com</a></li>
            </ul>
            <p><em>Mangat Singh, Senior UI/UX &amp; Product Designer, Chandigarh</em></p>
        `
    }

    /* ➜ next blog: put a comma after the } above, then paste a new { ... } block here
       (or at the top — order does not matter, newest date is shown first) */
];
