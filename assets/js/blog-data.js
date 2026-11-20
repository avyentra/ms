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
        excerpt: "Most SaaS dashboards fail for the same few reasons. Here are seven mistakes I see often, and simple fixes you can apply before your next release.",
        metaDescription: "7 SaaS dashboard design mistakes that hurt adoption, from too many metrics to blank empty states, and practical fixes from a working UI/UX designer.",
        keywords: ["SaaS dashboard design mistakes", "SaaS dashboard design", "dashboard UX best practices", "dashboard empty states", "role-based dashboard", "B2B SaaS UI/UX design"],
        category: "UI/UX Design",
        tags: ["Dashboard Design", "SaaS", "UX", "Data Visualization"],
        date: "2026-11-20",
        cover: "",
        coverAlt: "SaaS dashboard design mistakes and fixes by Mangat Singh, UI/UX designer.",
        author: "Mangat Singh",
        content: `
            <p>The dashboard is usually the first screen your customer sees after logging in. If it confuses them, they stop logging in. They don't file a complaint. They just go quiet, and you notice it months later in your churn numbers.</p>
            <p>I've designed a lot of web apps and admin panels over the past 8+ years, and the dashboard is almost always the hardest screen to get right. The good news: the problems repeat. Here are the seven mistakes I see most often in SaaS dashboards, and what to do instead.</p>
            <h2>1. Starting with the data, not the decision</h2>
            <p>This is the root of most bad dashboards. The team opens the analytics tool, sees what is already tracked, and puts all of it on screen. The result reports numbers but doesn't help anyone decide anything.</p>
            <p>A Smashing Magazine article from August 2026 makes the same point: dashboards built from whatever data is available tend to answer no particular question, and a goal like "show how the product is performing" is too vague because it names no metric, no group of users and no action (<a href="https://smashingmagazine.com/2026/08/rethinking-data-visualisation-ux-approach-dashboards/">Smashing Magazine</a>).</p>
            <p><strong>Fix:</strong> before any wireframe, write down the three or four decisions your user makes every week. "Which customers need a follow-up today?" is a decision. "Revenue" is not. Every widget must earn its place by helping one of those decisions.</p>
            <h2>2. Putting everything on the first screen</h2>
            <p>When nobody wants to say no, every team gets a widget. Soon the home screen has fourteen cards, three charts and a table, all shouting at the same volume.</p>
            <p>The research-based guidelines collected on the Dashboard Design Patterns project say it plainly: don't overwhelm viewers, avoid visual clutter and don't add too much data (<a href="https://dashboarddesignpatterns.github.io/processguidelines.html">Dashboard Design Patterns</a>).</p>
            <p><strong>Fix:</strong> pick a small set of headline numbers for the top row and make the most important one clearly the biggest. Move the rest one click away: a detail page, a tab or an expandable section. Fewer things on screen means each one actually gets read.</p>
            <h2>3. One dashboard for every role</h2>
            <p>An admin, a manager and a regular user log into the same product with very different jobs. Showing them the same screen means it's slightly wrong for everyone.</p>
            <p>The Smashing article also warns against "fake personalisation": rescaling the same charts for different roles doesn't count. A manager needs to see who on the team needs support, while an individual needs to see their own progress (<a href="https://smashingmagazine.com/2026/08/rethinking-data-visualisation-ux-approach-dashboards/">Smashing Magazine</a>).</p>
            <p><strong>Fix:</strong> list your roles and their top task each. Then design a different home view per role, even if they share components underneath. It's more design work up front, but it's usually the same amount of development work.</p>
            <h2>4. Numbers without context</h2>
            <p>"1,240 active users." Is that good? Up or down? Compared to what? A number on its own makes the user do the thinking your design should have done.</p>
            <p>TechTarget lists missing business context, and missing guidance on how to use the data, as a common dashboard design error (<a href="https://www.techtarget.com/data-technologies/tip/10-dashboard-design-principles-and-best-practices">TechTarget</a>).</p>
            <p><strong>Fix:</strong> give every key number a comparison (last week, last month, target) and a direction. Use colour only to mark what needs attention, and keep those colours consistent across the whole product.</p>
            <h2>5. Picking charts because they look impressive</h2>
            <p>Gauges, 3D pies and donut-inside-donut charts look great in a Dribbble shot. In a real product, people squint at them.</p>
            <p>Uxcel's dashboard lesson, citing Nielsen Norman Group, notes that bar charts, line charts and scatter plots are the easiest to understand, and that the wrong chart type adds mental load (<a href="https://uxcel.com/lessons/dashboard-best-practices-876">Uxcel</a>).</p>
            <p><strong>Fix:</strong> trends over time get a line chart. Comparing items gets a bar chart. A single important number gets a big number with a small trend line next to it. Save unusual charts for the rare case where they truly show something better.</p>
            <h2>6. Forgetting the empty states</h2>
            <p>Designers usually draw dashboards full of perfect sample data. But a new customer logs in to a dashboard with no data at all, and a blank chart looks broken.</p>
            <p>One development team that cleaned up a production dashboard suggests checking every screen in four situations: the user never had data, used to have data but the current view is empty, a filter narrows results to nothing, and an integration is broken (<a href="https://dev.to/137foundry/how-we-refactored-three-empty-states-out-of-a-production-dashboard-4gef">DEV Community</a>).</p>
            <p><strong>Fix:</strong> design each of those states on purpose. Say why the area is empty and give one clear next step, like "Connect your store" or "Clear filters". For new accounts, the empty dashboard is really your onboarding screen.</p>
            <h2>7. Designing only for a big desktop monitor</h2>
            <p>Your team reviews the dashboard on a large monitor. Your customer often checks it on a laptop between meetings, or on a phone on the way to work.</p>
            <p>Bottle Rocket lists building with a desktop-first mindset, and then hastily adapting for mobile, among common SaaS UX mistakes (<a href="https://www.bottlerocketstudios.com/news-views/saas-companies-18-common-ux-mistakes-that-derail-growth">Bottle Rocket</a>).</p>
            <p><strong>Fix:</strong> decide what the mobile version is for. It rarely needs every chart. It usually needs the headline numbers, alerts and the one or two actions people take on the go. Design that view on purpose instead of letting cards stack into a long scroll.</p>
            <h2>A quick checklist before you ship</h2>
            <ul>
            <li>Can you name the decision each widget supports?</li>
            <li>Is the single most important number obvious within a few seconds?</li>
            <li>Does each role land on a view built for its main task?</li>
            <li>Does every key number have a comparison or target?</li>
            <li>Are you using simple charts unless there is a clear reason not to?</li>
            <li>Have you designed the empty, no-results and error states?</li>
            <li>Have you checked the layout on a laptop and a phone?</li>
            </ul>
            <p>And test it. Sit with three or four real users, give them a task like "find which customer needs attention today", and watch where they hesitate.</p>
            <h2>How this played out on a real project</h2>
            <p><strong>RBU Portal (education web app for Rayat Bahra University).</strong> A university portal has several types of users and many tasks inside one product. That is exactly the "one dashboard for every role" trap. Most of the work went into planning screens and flows so each type of user could find what they need, instead of putting every feature on one shared home screen. Rohit Sharma, the founder, shared a testimonial about the project on my website.</p>
            <p>You can see it on <a href="https://ms.primeznews.com">ms.primeznews.com</a>.</p>
            <h2>FAQ</h2>
            <h3>How many metrics should a SaaS dashboard show?</h3>
            <p>There's no magic number, but the first screen should show only the few numbers tied to your user's main decisions. Everything else can live one click away.</p>
            <h3>Should I redesign my dashboard or just fix parts of it?</h3>
            <p>Often a focused fix is enough: cut clutter, add context to key numbers, and design the empty states. A full redesign makes sense when different roles are fighting over one screen.</p>
            <h3>Can a designer work with my existing developers?</h3>
            <p>Yes. I often deliver the dashboard design in Figma with components and states, and the client's own team builds it.</p>
            <h2>Want a second pair of eyes on your dashboard?</h2>
            <p>Send me a few screenshots of your current dashboard and tell me who uses it. I'll point out the biggest problems and how I'd fix them. No pressure either way.</p>
            <ul>
            <li>Portfolio: <a href="https://ms.primeznews.com">ms.primeznews.com</a></li>
            <li>Email: <a href="mailto:rwd.mangat@gmail.com">rwd.mangat@gmail.com</a></li>
            </ul>
            <p><em>Mangat Singh, Senior UI/UX &amp; Product Designer, Chandigarh</em></p>
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
