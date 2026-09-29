/**
 * Content for the six capability pages under /services/*.
 *
 * These are the six things the Development page positions Nexlifie around, and
 * each one gets a real page rather than a template fill-in. Kept as data so the
 * pages stay thin and consistent; the visuals come from
 * components/development/visuals.jsx, so a page shows the same interface the
 * Development page promised.
 *
 * Deliberately contains no statistics or client outcomes — nothing here claims
 * a number we cannot stand behind.
 */

const capabilities = [
  /* ── 01 ─────────────────────────────────────────────────────────── */
  {
    slug: 'ai-solutions',
    number: '01',
    name: 'AI Solutions',
    eyebrow: '01 / AI SOLUTIONS',
    seo: {
      title: 'AI Solutions & Business Automation Company in Bangalore — Nexlifie',
      description:
        'AI development in Bengaluru: AI assistants, document processing, intelligent search, workflow automation and AI analytics built into your existing business systems. Nexlifie builds AI that removes real work.',
      serviceType: 'Artificial intelligence development',
    },
    hero: {
      lines: ['Put AI to Work', 'Inside Your Business.'],
      highlight: 1,
      lead: "AI shouldn't just be a chatbot on your website. We build AI into the workflows your team runs every day, so it removes work instead of adding another tool to check.",
      cta: 'Build an AI Solution',
      strip: 'Assistants • Automation • Documents • Search • Analytics',
    },
    problem: {
      title: 'Most AI projects stall for the same three reasons.',
      pains: [
        {
          pain: "You've seen the demos, but not the use case.",
          detail: 'Impressive tools, no clear line between them and the way your business actually earns money.',
        },
        {
          pain: 'Your team retypes the same information all day.',
          detail: 'Data moves between systems by hand because nothing connects the two ends.',
        },
        {
          pain: 'Your knowledge lives in a few people’s heads.',
          detail: 'The answers exist somewhere, but only two people know where to look.',
        },
      ],
      turn: 'AI is only worth building when it touches real work.',
    },
    build: {
      title: 'What we build with AI.',
      lead: 'Each of these is a working part of a business system, not a demo.',
      groups: [
        {
          group: 'Assistants & Support',
          items: ['AI assistants', 'AI customer support', 'Internal help desks', 'Escalation routing'],
        },
        {
          group: 'Documents & Knowledge',
          items: ['Document processing', 'Data extraction', 'Intelligent search', 'Internal knowledge systems'],
        },
        {
          group: 'Automation',
          items: ['Business automation', 'Workflow automation', 'Approval routing', 'Scheduled actions'],
        },
        {
          group: 'Insight & Content',
          items: ['AI analytics', 'Recommendation systems', 'AI content generation', 'Summarisation'],
        },
      ],
    },
    scenario: {
      eyebrow: 'IN PRACTICE',
      title: 'A support question, answered without a person touching it.',
      steps: [
        'A customer asks where their order is.',
        'The assistant identifies the customer and reads the live order record.',
        'It answers, and flags the one line item that is actually delayed.',
        'The conversation is logged to the CRM and operations is notified.',
      ],
      close: 'Your team sees the exception. The routine never reaches them.',
    },
    process: [
      { index: '01', title: 'Audit', desc: 'We look at the workflow first, and find where the time actually goes.' },
      { index: '02', title: 'Scope', desc: 'Pick one use case with a measurable before and after.' },
      { index: '03', title: 'Prepare', desc: 'Get the data reachable, structured and clean enough to rely on.' },
      { index: '04', title: 'Build & evaluate', desc: 'Build it, then test it against real cases until the accuracy holds.' },
      { index: '05', title: 'Deploy & monitor', desc: 'Ship it into the workflow, and watch cost, accuracy and drift.' },
    ],
    deliverables: [
      'A working integration with the systems you already run',
      'An evaluation set, so accuracy is measured rather than assumed',
      'A human review step wherever the decision carries risk',
      'Cost and usage monitoring from day one',
      'Documentation, handover and team training',
      'Full source code ownership',
    ],
    faqs: [
      {
        q: 'Do we need a lot of data before we can use AI?',
        a: 'Not always. Assistants, document processing and search work on the data you already hold, without training a model. Only prediction and forecasting need real history, and we tell you before starting if you do not have enough.',
      },
      {
        q: 'Which AI models do you use?',
        a: 'Whichever fits the task, the accuracy needed and the budget. We choose per use case and keep the integration replaceable, so a better or cheaper model later does not mean rebuilding the system.',
      },
      {
        q: 'Will AI make decisions without oversight?',
        a: 'Only where the cost of being wrong is low. Anything touching money, customers or compliance gets a human review step, and every action is logged so you can see what happened and why.',
      },
      {
        q: 'Can AI work with the software we already use?',
        a: 'That is usually the point. We connect to your existing CRM, ERP, email, storage or database rather than asking you to move, and where there is no API we build the bridge.',
      },
    ],
    cta: {
      lines: ['Have a process', 'worth automating?'],
      lead: 'Tell us which task eats the most time. We will tell you honestly whether AI is the right answer for it.',
      button: 'Build an AI Solution',
    },
  },

  /* ── 02 ─────────────────────────────────────────────────────────── */
  {
    slug: 'custom-software',
    number: '02',
    name: 'Custom Business Software',
    eyebrow: '02 / CUSTOM SOFTWARE',
    seo: {
      title: 'Custom Business Software Development Company in Bangalore — Nexlifie',
      description:
        'Custom software development in Bengaluru: CRM, ERP, HRMS, inventory, operations and customer portals combined into one platform built around your workflow. One login, one source of truth, full code ownership.',
      serviceType: 'Custom software development',
    },
    hero: {
      lines: ['Stop Adapting Your Business', "to Someone Else's Software."],
      highlight: 1,
      lead: 'Your workflow is unique, so your software should be too. We build platforms that bring your operations into one system, shaped around the way you already work.',
      cta: 'Build My Custom Software',
      strip: 'CRM • HRMS • Inventory • Operations • Reporting • Portals',
    },
    problem: {
      title: 'The cost of running a business on five disconnected tools.',
      pains: [
        {
          pain: "You pay for tools that don't talk to each other.",
          detail: 'Each one holds a different version of the same customer, and none of them agree.',
        },
        {
          pain: 'Your reports are assembled by hand.',
          detail: 'Someone exports three spreadsheets every Monday so a manager can see one number.',
        },
        {
          pain: 'Off-the-shelf software changed your process.',
          detail: 'You adapted the way you work to fit a product, and the workarounds became permanent.',
        },
      ],
      turn: 'The software should fit the business, not the reverse.',
    },
    build: {
      title: 'What goes into your platform.',
      lead: 'We build only the modules your business actually runs on, in one system with one login.',
      groups: [
        {
          group: 'Operations',
          items: ['CRM', 'ERP', 'HRMS', 'Inventory', 'Procurement', 'Projects'],
        },
        {
          group: 'Customer-facing',
          items: ['Customer portals', 'Self-service accounts', 'Booking systems', 'Ticketing'],
        },
        {
          group: 'Finance & Reporting',
          items: ['Invoicing', 'Approvals', 'Custom dashboards', 'Scheduled reports'],
        },
        {
          group: 'Platform & Integration',
          items: ['Roles & permissions', 'Audit trails', 'Notifications', 'Existing tool integration', 'Data migration'],
        },
      ],
    },
    scenario: {
      eyebrow: 'IN PRACTICE',
      title: 'One order, entered once.',
      steps: [
        'Sales confirms an order against an existing customer record.',
        'Stock adjusts immediately, and purchasing sees what needs reordering.',
        'Finance raises the invoice from the same record, with no re-entry.',
        'The dashboard already reflects it, because there is one database.',
      ],
      close: 'One login. One platform. One source of truth.',
    },
    process: [
      { index: '01', title: 'Map the workflow', desc: 'We sit with your team and document how the work really moves.' },
      { index: '02', title: 'Architect', desc: 'Define the modules, the data model and how they connect.' },
      { index: '03', title: 'Design', desc: 'Interfaces built for the people who will use them all day.' },
      { index: '04', title: 'Build in stages', desc: 'One module live at a time, so value arrives before the whole thing is done.' },
      { index: '05', title: 'Roll out', desc: 'Migrate the data, train the team, then support and extend.' },
    ],
    deliverables: [
      'One login across every module',
      'Role-based permissions, so each person sees only their work',
      'Your SOP encoded in the system, including the approvals',
      'Data migrated from the tools you are replacing',
      'Training, documentation and a support window',
      'Full source code ownership, with no licence lock-in',
    ],
    faqs: [
      {
        q: 'How long does a custom platform take?',
        a: 'It depends entirely on how many modules you need and how complex the approvals are. We scope it in phases and put the first useful module in your hands early, rather than disappearing for months.',
      },
      {
        q: 'Can it replace our existing tools gradually?',
        a: 'Yes, and that is usually safer. We start with the module causing the most pain, run it alongside what you have, and migrate the rest once your team trusts it.',
      },
      {
        q: 'Do we own the code?',
        a: 'Yes. You own everything we build, with no per-seat licence and no vendor lock-in. If you ever want another team to take it over, the code and documentation are yours to hand them.',
      },
      {
        q: 'What happens when our process changes?',
        a: 'That is the advantage of custom software: the system changes with you. We can work on a retainer for ongoing changes, or hand over documented code for your own team.',
      },
    ],
    cta: {
      lines: ['Your business is unique.', 'Your software should be too.'],
      lead: 'Tell us how your business actually runs. We will show you what it looks like as one system.',
      button: 'Build My Custom Software',
    },
  },

  /* ── 03 ─────────────────────────────────────────────────────────── */
  {
    slug: 'mobile-apps',
    number: '03',
    name: 'Mobile Applications',
    eyebrow: '03 / MOBILE APPLICATIONS',
    seo: {
      title: 'Mobile App Development Company in Bangalore — Android & iOS — Nexlifie',
      description:
        'Android and iOS app development in Bengaluru. Customer apps, business apps, e-commerce, booking, healthcare, education and fintech applications, built native or cross-platform and taken through store submission.',
      serviceType: 'Mobile application development',
    },
    hero: {
      lines: ['Your Business,', "In Your Customers' Hands."],
      highlight: 1,
      lead: 'We design and build Android and iOS applications that turn ideas, services and business processes into mobile experiences people keep on their home screen.',
      cta: 'Build a Mobile App',
      strip: 'Android • iOS • Cross-platform',
    },
    problem: {
      title: 'When a mobile app stops being optional.',
      pains: [
        {
          pain: 'Your customers expect an app, not a mobile site.',
          detail: 'Repeat customers want one tap, saved details and notifications, not a login every visit.',
        },
        {
          pain: 'Your field team still works on paper.',
          detail: 'Jobs, proof and updates get captured twice, once on site and once back at a desk.',
        },
        {
          pain: 'Your product works on desktop only.',
          detail: 'The people who need it most are standing up, on a phone, with one hand free.',
        },
      ],
      turn: 'An app earns its place by being faster than the alternative.',
    },
    build: {
      title: 'What we build for mobile.',
      lead: 'Two audiences, usually: the customer outside your business and the team inside it.',
      groups: [
        {
          group: 'By audience',
          items: ['Customer apps', 'Business apps', 'Field-team apps', 'Partner apps'],
        },
        {
          group: 'By category',
          items: ['E-commerce apps', 'Booking apps', 'Service apps', 'On-demand apps', 'Social apps'],
        },
        {
          group: 'Regulated & specialist',
          items: ['Healthcare apps', 'Education apps', 'Fintech apps'],
        },
        {
          group: 'Behind the app',
          items: ['APIs & backend', 'Push notifications', 'Offline-first sync', 'Payments', 'Analytics'],
        },
      ],
    },
    scenario: {
      eyebrow: 'IN PRACTICE',
      title: 'The same business, from both sides.',
      steps: [
        'A customer books and pays in the app, and gets a confirmation.',
        'Your team sees the job appear on their own app, already assigned.',
        'They update status on site, offline if the signal drops.',
        'It syncs when they reconnect, and the customer is notified.',
      ],
      close: 'One system, two apps, no double entry.',
    },
    process: [
      { index: '01', title: 'Define', desc: 'Agree what the app is for, and what belongs in version one.' },
      { index: '02', title: 'Design the flows', desc: 'Map the screens around the taps a real user will make.' },
      { index: '03', title: 'Build', desc: 'Native or cross-platform, chosen for your performance needs.' },
      { index: '04', title: 'Test on devices', desc: 'Real handsets, real network conditions, not just a simulator.' },
      { index: '05', title: 'Publish & iterate', desc: 'Store submission handled, then improve on what usage shows.' },
    ],
    deliverables: [
      'Android and iOS builds from one agreed scope',
      'App Store and Play Store submission handled for you',
      'Defined offline behaviour, not an error screen',
      'Push notifications and deep links wired up',
      'Crash and usage monitoring from launch',
      'Full source code ownership and store account ownership',
    ],
    faqs: [
      {
        q: 'Native or cross-platform?',
        a: 'Cross-platform suits most business apps and gets you onto both platforms for less. We recommend native when the app leans hard on device performance, hardware or platform-specific features, and we say which up front.',
      },
      {
        q: 'Do you handle publishing to the App Store and Play Store?',
        a: 'Yes, including store listings, screenshots, review guidelines and the submission itself. The accounts stay in your name, so the app is always yours.',
      },
      {
        q: 'Can the app connect to our existing systems?',
        a: 'Yes. If you already run a CRM, ERP or website, we connect the app to it so both sides read the same data. Where no API exists, we build one.',
      },
      {
        q: 'What happens after launch?',
        a: 'Apps need maintenance whether or not you add features, because Android and iOS keep moving. We offer a support retainer for OS updates, fixes and improvements driven by real usage.',
      },
    ],
    cta: {
      lines: ['Have an app', 'worth building?'],
      lead: 'Tell us who it is for and what it has to do. We will help you scope a first version worth shipping.',
      button: 'Build a Mobile App',
    },
  },

  /* ── 04 ─────────────────────────────────────────────────────────── */
  {
    slug: 'web-applications',
    number: '04',
    name: 'Web Applications',
    eyebrow: '04 / WEB APPLICATIONS',
    seo: {
      title: 'Web Application Development Company in Bangalore — Nexlifie',
      description:
        'Web application development in Bengaluru: CRM, ERP, HRMS, admin platforms, customer portals, dashboards, booking systems and SaaS products, built around your users and workflows and ready to scale.',
      serviceType: 'Web application development',
    },
    hero: {
      lines: ['Powerful Software.', 'Available Anywhere.'],
      highlight: 1,
      lead: 'From internal business platforms to customer-facing products, we build web applications designed around your users and your workflow, on infrastructure that scales with you.',
      cta: 'Build a Web Application',
      strip: 'Platforms • Portals • Dashboards • SaaS',
    },
    problem: {
      title: 'The signs you have outgrown spreadsheets.',
      pains: [
        {
          pain: 'Your operation runs on a shared spreadsheet.',
          detail: 'It works until two people edit at once, or the person who built it leaves.',
        },
        {
          pain: 'Customers call you for status updates.',
          detail: 'Every call is work you could have avoided by letting them see it themselves.',
        },
        {
          pain: 'Your current tool cannot take the load.',
          detail: 'It was fine at ten users. At a hundred it is slow, and at a thousand it stops.',
        },
      ],
      turn: 'A web application turns a process into something that scales.',
    },
    build: {
      title: 'What we build on the web.',
      lead: 'Anything your team or your customers should be able to open in a browser and trust.',
      groups: [
        {
          group: 'Internal platforms',
          items: ['CRM', 'ERP', 'HRMS', 'Admin platforms', 'Management systems'],
        },
        {
          group: 'Customer-facing',
          items: ['Customer portals', 'Booking systems', 'E-commerce platforms', 'Self-service accounts'],
        },
        {
          group: 'Products',
          items: ['SaaS products', 'Multi-tenant platforms', 'Subscriptions & billing'],
        },
        {
          group: 'Foundations',
          items: ['Dashboards & reporting', 'Authentication & roles', 'APIs & integrations', 'Cloud deployment'],
        },
      ],
    },
    scenario: {
      eyebrow: 'IN PRACTICE',
      title: 'The work and the reporting, in one place.',
      steps: [
        'Your team works the pipeline in the application all day.',
        'Customers check their own orders and documents in a portal.',
        'Every action writes to one database with an audit trail.',
        'The dashboard is live, so nobody builds the weekly report.',
      ],
      close: 'Designed for your users. Built for your workflow. Ready to scale.',
    },
    process: [
      { index: '01', title: 'Requirements', desc: 'Document what the system must do, and what it must never do.' },
      { index: '02', title: 'Architecture', desc: 'Data model, permissions and scaling decided before code.' },
      { index: '03', title: 'Design', desc: 'Interfaces for people doing the same task fifty times a day.' },
      { index: '04', title: 'Build & integrate', desc: 'Developed in sprints, connected to your other systems, tested.' },
      { index: '05', title: 'Deploy & scale', desc: 'Cloud deployment, monitoring, backups, then grow as load grows.' },
    ],
    deliverables: [
      'Role-based access control across every screen',
      'An audit trail of who changed what, and when',
      'An API, so the next system can talk to this one',
      'Automated deployment and staged releases',
      'Monitoring, backups and a restore you have actually tested',
      'Documentation and full source code ownership',
    ],
    faqs: [
      {
        q: 'How is this different from a website?',
        a: 'A website communicates; a web application does work. Applications have users, permissions, records and state, so they need architecture, testing and a deployment process a brochure site never does.',
      },
      {
        q: 'Can you work with our existing database or systems?',
        a: 'Yes. We integrate with what you already run rather than insisting on a clean slate, and we handle migrations where something genuinely has to move.',
      },
      {
        q: 'Which technologies do you use?',
        a: 'We choose per project rather than forcing one stack, based on your team, your integrations and how you need it to scale. We explain the trade-offs before deciding, and we avoid choices that would lock you in.',
      },
      {
        q: 'Can it handle growth?',
        a: 'That is an architecture decision, made at the start rather than retrofitted. We design for the load you expect, deploy on infrastructure that can scale, and monitor so you see pressure before your users do.',
      },
    ],
    cta: {
      lines: ['Have a platform', 'worth building?'],
      lead: 'Tell us what your team does today and where it breaks. We will map it into an application that holds.',
      button: 'Build a Web Application',
    },
    work: ['Bumblebee', 'Zhaevaah'],
  },

  /* ── 05 ─────────────────────────────────────────────────────────── */
  {
    slug: 'website-development',
    number: '05',
    name: 'Websites & Digital Products',
    eyebrow: '05 / WEBSITES',
    seo: {
      title: 'Website Development Company in Bangalore — Nexlifie',
      description:
        'Website development in Bengaluru: corporate websites, business websites, e-commerce, landing pages, portfolio and CMS websites built to communicate your brand, rank, and turn visitors into customers.',
      serviceType: 'Website development',
    },
    hero: {
      lines: ['More Than', 'a Website.'],
      highlight: 1,
      lead: 'Your website is often the first interaction someone has with your business. We build websites that communicate your brand, earn trust and turn visitors into enquiries.',
      cta: 'Build My Website',
      strip: 'Corporate • E-commerce • Product • CMS',
    },
    problem: {
      title: 'Why most websites underperform.',
      pains: [
        {
          pain: 'Visitors arrive and leave without enquiring.',
          detail: 'The site says what you do, but never makes the next step obvious.',
        },
        {
          pain: 'You cannot update your own website.',
          detail: 'Every price change or new page means emailing whoever built it.',
        },
        {
          pain: 'Nobody finds you by searching.',
          detail: 'It looks fine, but the structure, speed and metadata were never built for search.',
        },
      ],
      turn: 'A website should do a job. We decide what that job is before we design a screen.',
    },
    build: {
      title: 'What we build.',
      lead: 'Different businesses need their website to do very different things.',
      groups: [
        {
          group: 'Types',
          items: ['Corporate websites', 'Business websites', 'Product websites', 'Portfolio websites', 'Landing pages'],
        },
        {
          group: 'Commerce',
          items: ['E-commerce', 'Product catalogues', 'Payments', 'Shipping & tax setup'],
        },
        {
          group: 'Content',
          items: ['CMS websites', 'Blogs & resources', 'Multi-language'],
        },
        {
          group: 'Foundations',
          items: ['SEO structure', 'Performance', 'Analytics & tracking', 'Accessibility', 'Hosting & deployment'],
        },
      ],
    },
    scenario: {
      eyebrow: 'IN PRACTICE',
      title: 'From a search result to an enquiry you can act on.',
      steps: [
        'Someone searches, and finds a page built to be found.',
        'It loads fast, reads clearly, and answers the question they arrived with.',
        'One obvious action: enquire, book or buy.',
        'The enquiry reaches your inbox or CRM with the context attached.',
      ],
      close: 'Then you can see which pages actually bring you work.',
    },
    process: [
      { index: '01', title: 'Define the job', desc: 'Decide what this website has to achieve, and for whom.' },
      { index: '02', title: 'Structure', desc: 'Sitemap, page intent and the words that carry the argument.' },
      { index: '03', title: 'Design', desc: 'A look that belongs to your brand, not to a template.' },
      { index: '04', title: 'Build', desc: 'Fast, responsive, accessible, and editable by you.' },
      { index: '05', title: 'Launch & measure', desc: 'Go live, track conversions, then improve what the data shows.' },
    ],
    deliverables: [
      'A CMS, so you can edit your own content',
      'SEO structure, metadata and structured data in place',
      'Performance and responsiveness tested across real devices',
      'Analytics and conversion tracking configured',
      'Accessible markup, not just a visual pass',
      'Hosting, deployment and full source code ownership',
    ],
    faqs: [
      {
        q: 'Can we edit the website ourselves?',
        a: 'Yes. We build on a CMS for the parts you will want to change, and hand over a short walkthrough so your team can update content without coming back to us.',
      },
      {
        q: 'Will the website rank on Google?',
        a: 'We build the foundations that ranking depends on: clean structure, fast loading, correct metadata, structured data and crawlable content. Ranking for competitive terms also needs ongoing content and SEO work, which we can take on separately.',
      },
      {
        q: 'Do you use WordPress or custom code?',
        a: 'Whichever serves the site. A content-heavy site your team edits daily may be best on a CMS; a fast marketing site or product site is often better custom-built. We recommend based on how you will actually run it.',
      },
      {
        q: 'What do you need from us to start?',
        a: 'Your brand assets if you have them, a sense of who you are selling to, and someone who can approve decisions. We handle structure and copy direction if you do not have them yet.',
      },
    ],
    cta: {
      lines: ['Need a website', 'that actually works?'],
      lead: 'Tell us what the site has to achieve. We will tell you what it takes to get there.',
      button: 'Build My Website',
    },
    work: ['Zhaevaah', 'Aurelian', 'Bibo', 'Orzen', 'Kerala Soul', 'E-Kody'],
  },

  /* ── 06 ─────────────────────────────────────────────────────────── */
  {
    slug: 'gaming-applications',
    number: '06',
    name: 'Game Applications',
    eyebrow: '06 / GAME APPLICATIONS',
    seo: {
      title: 'Game Development Company in Bangalore — Mobile & Multiplayer — Nexlifie',
      description:
        'Game development in Bengaluru: mobile games, card games, 2D and 3D experiences, real-time multiplayer, game backends, leaderboards and rewards. Nexlifie takes game concepts from design to launch.',
      serviceType: 'Game development',
    },
    hero: {
      lines: ['Turn Ideas Into', 'Playable Experiences.'],
      highlight: 1,
      lead: 'We build game applications that combine gameplay, design, multiplayer systems and modern technology, and we take them all the way to the store.',
      cta: 'Build a Game',
      strip: 'Concept • Design • Development • Multiplayer • Launch',
    },
    problem: {
      title: 'Where game projects usually get stuck.',
      pains: [
        {
          pain: 'You have a concept but no build team.',
          detail: 'The idea is clear in your head and nowhere else, and prototyping it needs hands.',
        },
        {
          pain: 'Multiplayer is harder than the game.',
          detail: 'Matchmaking, state sync and cheating are backend problems, not gameplay ones.',
        },
        {
          pain: 'You need a game for a non-game reason.',
          detail: 'Brand engagement, training or education, where play is the mechanism rather than the product.',
        },
      ],
      turn: 'A game is a product. It needs design, a backend and a launch.',
    },
    build: {
      title: 'What we build.',
      lead: 'Gameplay is the visible part. Most of the work is the systems underneath it.',
      groups: [
        {
          group: 'Games',
          items: ['Mobile games', 'Card games', '2D games', '3D experiences', 'Casual games'],
        },
        {
          group: 'Multiplayer',
          items: ['Real-time multiplayer', 'Matchmaking & lobbies', 'Leaderboards', 'Tournaments'],
        },
        {
          group: 'Systems',
          items: ['Game backend', 'Accounts & progression', 'Rewards & economy', 'Game APIs'],
        },
        {
          group: 'Craft',
          items: ['Game UI/UX', 'Art direction', 'Level design', 'Sound integration'],
        },
      ],
    },
    scenario: {
      eyebrow: 'IN PRACTICE',
      title: 'What a multiplayer match actually requires.',
      steps: [
        'A player opens the game and is matched with others at their level.',
        'The lobby holds state while everyone readies up.',
        'The match runs in sync, and the server stays the source of truth.',
        'Results settle to leaderboards, progression and rewards.',
      ],
      close: 'Concept → Design → Development → Multiplayer → Launch.',
    },
    process: [
      { index: '01', title: 'Concept', desc: 'Pin down the core loop, and why it is worth playing twice.' },
      { index: '02', title: 'Design', desc: 'Mechanics, progression, art direction and the economy.' },
      { index: '03', title: 'Development', desc: 'Build the game and the backend it depends on, together.' },
      { index: '04', title: 'Multiplayer', desc: 'Matchmaking, sync and load testing with real concurrency.' },
      { index: '05', title: 'Launch', desc: 'Store submission, analytics, then live operations.' },
    ],
    deliverables: [
      'A playable build early, so the loop can be judged rather than imagined',
      'Multiplayer tested under real concurrency, not just locally',
      'Store submission for the platforms you are targeting',
      'Analytics on progression, retention and drop-off points',
      'The ability to run events and updates after launch',
      'Full source code and asset ownership',
    ],
    faqs: [
      {
        q: 'Do you build for mobile, web or both?',
        a: 'Mobile most often, and web where the game should open without an install. We decide with you early, because it affects the engine and the multiplayer architecture.',
      },
      {
        q: 'Can you add multiplayer to an existing game?',
        a: 'Sometimes, and it depends on how the game handles state. We review the codebase first and tell you honestly whether it is an extension or close to a rebuild.',
      },
      {
        q: 'We need a game for brand engagement or training, not as a product.',
        a: 'That is a common brief and a different one. The mechanics serve the outcome you actually want, whether that is time on brand, a learned behaviour or a measurable score.',
      },
      {
        q: 'What about art and assets?',
        a: 'We handle art direction, UI and integration. Where a project needs specialist illustration, 3D or sound, we bring in the right people and keep the work and the ownership with you.',
      },
    ],
    cta: {
      lines: ['Have a game', 'in your head?'],
      lead: 'Tell us the core idea. We will help you turn it into something playable.',
      button: 'Build a Game',
    },
  },
];

/** Slug → capability, for the six bespoke routes. */
export const capabilityBySlug = Object.fromEntries(capabilities.map((c) => [c.slug, c]));

export const capabilitySlugs = capabilities.map((c) => c.slug);

export default capabilities;
