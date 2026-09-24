import { Project } from '../types/portfolio';

export const projectsData: Project[] = [
  {
    id: 'mitgo',
    title: 'MitGo',
    subtitle: 'Distributed Ride-Sharing Platform',
    category: 'Microservices',
    tags: ['Microservices', 'Backend', 'Distributed Systems'],
    year: '2024–2025',
    summary: 'Scalable microservices-based ride-sharing platform built around independently deployable backend services with low-latency inter-service gRPC communication.',
    technologies: ['NestJS', 'PostgreSQL', 'TypeORM', 'gRPC', 'Docker', 'Docker Compose', 'Nginx', 'Redis', 'FCM'],
    problem: 'Traditional monolithic ride-sharing backends encounter severe synchronization bottlenecks during peak commute hours, where ride dispatching, high-frequency GPS coordinate ingestion, driver telemetry, and payment reconciliation compete for the same database locks and CPU threads.',
    architecture: {
      description: 'Decoupled poly-service architecture coordinated through a high-throughput API Gateway with internal gRPC channels for sub-millisecond inter-service RPC calls, and Redis for distributed location pub/sub.',
      flow: [
        'Client Ride Request',
        'API Gateway (Nginx Reverse Proxy)',
        'Ride Service (Dispatches State Machine)',
        'Driver Service via internal gRPC',
        'Driver Location & Availability Match',
        'Aggregated Response to Client & FCM Push'
      ],
      components: [
        { name: 'API Gateway', role: 'Routing, auth validation, TLS termination, rate-limiting', tech: 'Nginx / NestJS Gateway' },
        { name: 'Identity Service', role: 'Authentication, token lifecycle, RBAC enforcement', tech: 'NestJS / JWT' },
        { name: 'Ride Service', role: 'Ride state machine, fare calculation, dispatch logic', tech: 'NestJS' },
        { name: 'Location Service', role: 'Geospatial queries, driver distance matrices', tech: 'Redis Geo / NestJS' },
        { name: 'Booking Service', role: 'Trip reservations, scheduling, booking lifecycle', tech: 'NestJS' },
        { name: 'Payment Service', role: 'Payment processing, ledger records, refunds', tech: 'NestJS' },
        { name: 'Chat & Notification', role: 'Driver-passenger communication & push alerts', tech: 'Socket.IO / FCM' },
        { name: 'State Storage', role: 'Persistent relational stores & transient caches', tech: 'PostgreSQL / Redis' }
      ]
    },
    whatIBuilt: [
      'Engineered the modular backend service boundary decomposition and Protobuf contract definitions for service-to-service gRPC communication.',
      'Constructed the core ride matching and state machine that coordinates between ride requests, driver availability queries, and trip lifecycle events.',
      'Containerized all backend microservices using Docker and multi-stage Dockerfiles with optimized compose setups for local and staging environments.',
      'Implemented real-time driver dispatch alerts and push notification flows leveraging Firebase Cloud Messaging (FCM) and Redis pub/sub.'
    ],
    engineeringChallenge: 'Managing atomic state transitions across multiple services without creating distributed deadlock or stale driver availability states during concurrent booking spikes.',
    solution: 'Implemented idempotent state validation combined with Redis distributed locks and lightweight gRPC timeouts with circuit-breaker fallbacks, guaranteeing consistent ride reservations and clean rollbacks if driver confirmation times out.',
    keyTakeaway: 'Strict service boundaries with strongly-typed Protobuf contracts eliminate silent payload regressions and make backend microservices independently scalable.',
    metrics: [
      { label: 'Architecture Pattern', value: '7 Dedicated Microservices' },
      { label: 'Inter-service Protocol', value: 'Binary gRPC over HTTP/2' },
      { label: 'Deployment', value: 'Docker Compose Containerized' }
    ],
    featured: true
  },
  {
    id: 'liftclub',
    title: 'LiftClub',
    subtitle: 'Ride Sharing & Scheduled Transportation',
    category: 'Full Stack',
    tags: ['Full Stack', 'Backend', 'Mobility'],
    year: '2024',
    summary: 'Comprehensive multi-stakeholder transportation platform supporting recurring commute schedules, guardian-managed child accounts, and driver compliance verification.',
    technologies: ['React', 'NestJS', 'PostgreSQL', 'TypeORM', 'TypeScript', 'Tailwind CSS', 'Docker'],
    problem: 'Standard on-demand ride apps fail to address structured daily school and office commutes where parents need safety assurance, scheduled weekly recurring itineraries, driver background verification, and transparent multi-passenger pick-up routes.',
    architecture: {
      description: 'Role-Based Access Control (RBAC) hierarchy linking four distinct user archetypes (Passenger, Parent, Learner, Driver) into an orchestrated recurring booking pipeline.',
      flow: [
        'Parent Profile Setup',
        'Learner Linkage & Safety Parameters',
        'Recurring Schedule Generation',
        'Driver Assignment & Route Match',
        'Trip Lifecycle (Pick-up → Tracking → Safe Drop-off)',
        'Completion Receipt & Guardian Notification'
      ],
      components: [
        { name: 'Role Engine', role: 'Fine-grained RBAC for 4 distinct actor profiles', tech: 'NestJS Guards' },
        { name: 'Scheduler Engine', role: 'Weekly recurring trip instantiation & route optimization', tech: 'Node.js Cron / TypeORM' },
        { name: 'Compliance Registry', role: 'Driver license, vehicle roadworthiness, insurance tracking', tech: 'PostgreSQL' },
        { name: 'Guardian Dashboard', role: 'Real-time learner trip monitor and booking controls', tech: 'React / TypeScript' }
      ]
    },
    whatIBuilt: [
      'Developed the end-to-end multi-role permission architecture separating guardian account controls from learner student access privileges.',
      'Built recurring booking algorithms that generate scheduled batch itineraries while validating driver capacity and insurance status.',
      'Designed database schemas with TypeORM covering vehicle inspection statuses, guardian authorizations, and trip milestone auditing.',
      'Constructed responsive React interfaces for both guardians managing multiple children and drivers managing scheduled route stops.'
    ],
    engineeringChallenge: 'Handling recurring calendar schedules with dynamic exception handling (e.g., student holidays, driver illness, vehicle substitution) without breaking pre-paid commitments.',
    solution: 'Modeled recurring rides as master route templates that spawn isolated trip instances with override vectors, allowing per-day adjustments without modifying the parent recurring contract.',
    keyTakeaway: 'Designing domain models around multi-party trust requirements (parents, minors, certified drivers) requires strict relational integrity at the schema layer.',
    metrics: [
      { label: 'User Roles', value: '4 Distinct Personas (RBAC)' },
      { label: 'Booking Model', value: 'Recurring & On-Demand' },
      { label: 'Safety Layer', value: 'Insurance & Vehicle Audit Logs' }
    ],
    featured: true
  },
  {
    id: 'aunest',
    title: 'Aunest',
    subtitle: 'Wealth & FinTech Platform',
    category: 'FinTech',
    tags: ['FinTech', 'Backend', 'Integrations'],
    year: '2024–2025',
    summary: 'Institutional wealth management and micro-investment platform powering automated purchases of Digital Gold, Mutual Funds, and ETFs with idempotent payment reconciliation.',
    technologies: ['NestJS', 'PostgreSQL', 'TypeORM', 'Razorpay', 'REST APIs', 'Webhooks', 'Redis'],
    problem: 'Financial transaction platforms face severe reconciliation risks when third-party asset providers, payment gateways, and network timeouts cause asynchronous state mismatch, potentially leading to double-crediting or unfulfilled gold purchases.',
    architecture: {
      description: 'Event-driven, resilient payment and asset processing pipeline with cryptographic webhook verification, idempotent ledger updates, and transactional outbox patterns.',
      flow: [
        'User Investment Order',
        'NestJS Core Ledger Initiation',
        'Payment Gateway Checkout (Razorpay)',
        'Asynchronous Webhook Reception',
        'Signature Verification & Idempotency Key Lock',
        'Transaction Processing & Asset Provider Call',
        'PostgreSQL ACID Ledger Commit'
      ],
      components: [
        { name: 'Investment Core', role: 'Digital Gold, Mutual Fund & ETF purchase logic', tech: 'NestJS' },
        { name: 'Webhook Gateway', role: 'Cryptographic signature checking, deduplication', tech: 'Express / Crypto' },
        { name: 'Asset Provider Bridge', role: 'External brokerage & gold custodian APIs', tech: 'HTTP Client / Axios' },
        { name: 'Audited Ledger', role: 'Double-entry transaction records with immutable logs', tech: 'PostgreSQL / TypeORM' }
      ]
    },
    whatIBuilt: [
      'Engineered the core NestJS backend integrating with Razorpay payment workflows and third-party investment partner APIs.',
      'Implemented robust webhook ingestion with HMAC-SHA256 signature verification and distributed idempotency locking via Redis.',
      'Designed database schemas with strict foreign key constraints and transactional integrity for Digital Gold, Mutual Funds, and ETF holdings.',
      'Architected comprehensive error-logging and automated reconciliation jobs to catch delayed payment status transitions.'
    ],
    engineeringChallenge: 'Preventing race conditions and duplicate purchase orders when webhook retries arrive out-of-order or simultaneously with client-side polling.',
    solution: 'Designed an idempotent state machine where incoming webhook events must acquire a distributed Redis lock keyed by gateway transaction ID, verify current state in a PostgreSQL database transaction, and update atomically.',
    keyTakeaway: 'In FinTech, never trust client-side completion; treat external webhooks as the single source of truth and enforce strict database-level idempotency.',
    metrics: [
      { label: 'Assets Supported', value: 'Digital Gold, MF & ETFs' },
      { label: 'Reliability Pattern', value: 'HMAC Webhook Idempotency' },
      { label: 'Payment Integration', value: 'Razorpay Gateway & Webhooks' }
    ],
    featured: true
  },
  {
    id: 'netparts',
    title: 'Netparts',
    subtitle: 'Automotive E-Commerce Platform',
    category: 'Full Stack',
    tags: ['Full Stack', 'E-Commerce', 'WebSockets'],
    year: '2023–2024',
    summary: 'High-density enterprise automotive parts marketplace featuring multi-attribute catalog filtering, inventory synchronization, and real-time merchant-buyer consultation.',
    technologies: ['NestJS', 'PostgreSQL', 'TypeORM', 'React', 'Next.js', 'WebSockets', 'REST APIs', 'Tailwind CSS'],
    problem: 'Automotive catalogs contain hundreds of thousands of deeply nested SKUs with complex compatibility matrices (make, model, year, trim, engine displacement), resulting in slow database queries and high abandoned cart rates when parts fitment is uncertain.',
    architecture: {
      description: 'Optimized catalog indexing architecture with WebSocket bidirectional channels for instant customer-mechanic technical chat and real-time inventory reservations.',
      flow: [
        'Vehicle Make / Model Filter',
        'Indexed Catalog Query',
        'Compatibility Verification Engine',
        'Live Fitment Consultation (WebSockets)',
        'Inventory Reservation & Cart Lock',
        'Checkout & Fulfillment Dispatch'
      ],
      components: [
        { name: 'Catalog Engine', role: 'Parametric vehicle fitment queries & hierarchical categories', tech: 'PostgreSQL Indexes' },
        { name: 'Inventory Controller', role: 'Real-time stock deduction and reserved cart expirations', tech: 'NestJS / TypeORM' },
        { name: 'Real-Time Chat', role: 'Buyer-to-merchant technical fitment verification', tech: 'WebSockets / Socket.IO' },
        { name: 'Storefront UI', role: 'Fast faceted search interface with zero layout shift', tech: 'React / Next.js' }
      ]
    },
    whatIBuilt: [
      'Structured the relational catalog schema supporting complex vehicle compatibility mappings with composite B-tree indexes.',
      'Implemented real-time bidirectional WebSocket chat allowing automotive specialists to assist buyers with parts verification directly in the cart.',
      'Constructed order management and stock decrementing logic with optimistic locking to prevent overselling on scarce legacy parts.',
      'Developed administrative catalog management tools with batch CSV/Excel catalog ingestion routines.'
    ],
    engineeringChallenge: 'Executing sub-100ms faceted searches across extensive automotive catalogs with multi-layered vehicle compatibility parameters.',
    solution: 'Normalized parts attributes while creating indexed denormalized compatibility lookup tables, cutting query execution times dramatically even under complex filter combinations.',
    keyTakeaway: 'Domain-specific search performance relies on understanding the user query path before structuring relational indexes.',
    metrics: [
      { label: 'Catalog Dimension', value: 'Multi-attribute Compatibility' },
      { label: 'Communication', value: 'Real-time WebSocket Chat' },
      { label: 'Stack Depth', value: 'Next.js + NestJS + PostgreSQL' }
    ],
    featured: true
  },
  {
    id: 'travel-buddy',
    title: 'Travel Buddy',
    subtitle: 'AI-Powered Travel Discovery Platform',
    category: 'AI',
    tags: ['AI', 'Full Stack', 'LLM Workflows'],
    year: '2024–2025',
    summary: 'Intelligent itinerary and discovery engine integrating generative AI agents with relational property onboarding, reservation backends, and partner portals.',
    technologies: ['NestJS', 'PostgreSQL', 'TypeORM', 'React', 'Next.js', 'AI APIs', 'Tailwind CSS', 'TypeScript'],
    problem: 'Travelers spend hours cross-referencing blog recommendations, activity booking sites, and hotel availability, while hospitality providers struggle to expose contextual, itinerary-driven experiences to qualified travelers.',
    architecture: {
      description: 'Generative AI assistant orchestration layer connected to real-time property inventory and booking APIs through structured function calling and prompt pipelines.',
      flow: [
        'User Natural Language Inquiry',
        'AI Assistant Prompt / Context Synthesis',
        'Function Calling (Fetch Available Properties)',
        'Relational Inventory Filter (PostgreSQL)',
        'Synthesized Personalized Itinerary',
        'Direct Booking Confirmation'
      ],
      components: [
        { name: 'AI Reasoning Layer', role: 'Conversational trip intent parsing & preference extraction', tech: 'AI APIs / Prompt Pipelines' },
        { name: 'Function Dispatcher', role: 'Translating LLM tool calls into typed database queries', tech: 'NestJS Services' },
        { name: 'Property Core', role: 'Host onboarding, room availability, and calendar rules', tech: 'PostgreSQL / TypeORM' },
        { name: 'Client Portal', role: 'Interactive timeline itinerary and instant booking flow', tech: 'React / Next.js' }
      ]
    },
    whatIBuilt: [
      'Designed the backend architecture connecting AI model inference with relational property schemas and booking workflows.',
      'Created structured tool-calling handlers enabling the AI agent to search real-time room availability, attractions, and activity slots.',
      'Built the partner portal enabling property managers to onboard listings, configure seasonal pricing, and view reservations.',
      'Engineered an interactive trip-planning frontend with streaming chat responses and visual itinerary card previews.'
    ],
    engineeringChallenge: 'Eliminating AI hallucinations regarding hotel availability, room rates, and booking confirmations.',
    solution: 'Constrained the AI agent strictly to reasoning and intent extraction, mandating that all pricing, availability, and bookings are executed through deterministic, schema-validated NestJS backend APIs.',
    keyTakeaway: 'The most effective AI systems treat LLMs as reasoning controllers that interact with deterministic, reliable database backends.',
    metrics: [
      { label: 'AI Architecture', value: 'Tool Calling + Deterministic APIs' },
      { label: 'Platform Scope', value: 'Discovery, Booking & Host Portal' },
      { label: 'Integration', value: 'AI APIs + NestJS Backend' }
    ],
    featured: true
  },
  {
    id: 'reelflix',
    title: 'Reelflix',
    subtitle: 'Short Video & Content Management SaaS',
    category: 'SaaS',
    tags: ['SaaS', 'Full Stack', 'Backend'],
    year: '2024',
    summary: 'High-engagement episodic micro-content platform featuring a virtual coin economy, tiered creator subscriptions, and high-performance Redis caching.',
    technologies: ['React', 'Next.js', 'NestJS', 'PostgreSQL', 'Redis', 'TypeScript', 'Tailwind CSS'],
    problem: 'Micro-video platforms require instant content playback and seamless micro-transactions for unlocking single episodes without introducing transactional latency or high payment processing fees per episode.',
    architecture: {
      description: 'Virtual coin wallet ledger architecture paired with multi-layer Redis caching for high-read episode metadata and subscription state caching.',
      flow: [
        'User Wallet Top-up (Razorpay / Gateway)',
        'Virtual Coin Allocation in Ledger',
        'Episode Unlock Request',
        'Redis Cached Balance Check',
        'Atomic Coin Deduction & Access Grant',
        'Video Stream Delivery'
      ],
      components: [
        { name: 'Coin Economy', role: 'In-app virtual currency ledger and micro-purchases', tech: 'PostgreSQL / Redis' },
        { name: 'Subscription Module', role: 'Tiered creator memberships and recurring access', tech: 'NestJS' },
        { name: 'Content Hierarchy', role: 'Series, seasons, episodes, and access rule matrices', tech: 'TypeORM' },
        { name: 'Cache Layer', role: 'High-frequency read acceleration for episode metadata', tech: 'Redis' }
      ]
    },
    whatIBuilt: [
      'Architected the in-app coin wallet system supporting atomic episode unlocks with full audit history.',
      'Implemented hierarchical content models structuring series, episodes, teaser previews, and paywalls.',
      'Integrated Redis caching for trending series feeds and active user subscription status, reducing database query pressure.',
      'Constructed the admin content ingestion studio for video uploads, thumbnail management, and pricing control.'
    ],
    engineeringChallenge: 'Preventing double-spending of virtual coins during rapid episode tap-to-unlock requests on unstable mobile networks.',
    solution: 'Enforced atomic PostgreSQL balance decrements using row-level locking (`SELECT ... FOR UPDATE`) backed by Redis short-lived request deduplication keys.',
    keyTakeaway: 'Virtual coin models provide superior monetization ergonomics while shielding the payment gateway from micro-transaction overhead.',
    metrics: [
      { label: 'Monetization Model', value: 'Virtual Coin Wallet + Subscriptions' },
      { label: 'Caching Tier', value: 'Redis In-Memory State & Feeds' },
      { label: 'Architecture', value: 'Next.js + NestJS + PostgreSQL' }
    ],
    featured: false
  },
  {
    id: 'dtep',
    title: 'DTEP',
    subtitle: 'Port Logistics Operations Platform',
    category: 'Enterprise',
    tags: ['Enterprise', 'Backend', 'Logistics'],
    year: '2023–2024',
    summary: 'Mission-critical terminal operating platform managing container movements, yard crane allocations, and heavy equipment logistics with fine-grained RBAC.',
    technologies: ['React', 'NestJS', 'PostgreSQL', 'TypeORM', 'TypeScript', 'Tailwind CSS'],
    problem: 'Maritime container terminals experience severe operational bottlenecks and safety hazards when yard crane dispatching, truck entry appointments, and container stacking lack synchronized, real-time coordination across port shifts.',
    architecture: {
      description: 'Enterprise operations platform with strict role segmentation (stevedores, yard planners, crane operators, gate inspectors) managing container state transitions.',
      flow: [
        'Vessel Inbound Manifest Ingestion',
        'Container Allocation to Yard Block / Row / Tier',
        'Crane Task Queue Dispatch',
        'Gate Entry Verification & Inspection',
        'Container Stacking & Relocation Auditing',
        'Outbound Truck Release'
      ],
      components: [
        { name: 'Yard Management', role: '3D spatial coordinate tracking for container stacks', tech: 'PostgreSQL / Spatial logic' },
        { name: 'Crane Dispatch', role: 'Equipment task assignment and operator handoffs', tech: 'NestJS Services' },
        { name: 'RBAC Engine', role: 'Shift-based role enforcement and audit trails', tech: 'NestJS Guards' },
        { name: 'Terminal Dashboard', role: 'Real-time container movement visibility for port planners', tech: 'React / TypeScript' }
      ]
    },
    whatIBuilt: [
      'Built backend modules managing container movements, yard slot assignments, and equipment maintenance schedules.',
      'Constructed enterprise RBAC security restricting sensitive container release authorizations to verified terminal managers.',
      'Designed PostgreSQL schema architecture tracking container inspection flags, hazardous cargo classifications, and customs clearances.',
      'Delivered an operational desktop dashboard providing yard dispatchers with instant visibility into terminal throughput.'
    ],
    engineeringChallenge: 'Ensuring absolute consistency and auditability for physical container state transitions where a misplaced container causes severe maritime delays.',
    solution: 'Implemented an append-only event logging table alongside the current state table, guaranteeing that every container relocation records the operating personnel, timestamp, and previous coordinates.',
    keyTakeaway: 'Enterprise physical logistics software demands immutable audit records because physical errors have massive real-world costs.',
    metrics: [
      { label: 'Domain', value: 'Port Terminal Logistics' },
      { label: 'Security Model', value: 'Enterprise RBAC & Shift Auditing' },
      { label: 'Core Tech', value: 'React + NestJS + PostgreSQL' }
    ],
    featured: false
  },
  {
    id: 'naibeau',
    title: 'Naibeau',
    subtitle: 'Salon & Beauty Services Platform',
    category: 'Mobile',
    tags: ['Full Stack', 'Mobile', 'Booking Engine'],
    year: '2023–2024',
    summary: 'Dual-sided service booking ecosystem linking customer mobile apps, beauty professional partner portals, and centralized salon administration.',
    technologies: ['NestJS', 'React', 'Vite', 'React Native', 'PostgreSQL', 'TypeORM', 'Tailwind CSS'],
    problem: 'Beauty service marketplaces encounter frequent double-bookings and revenue disputes due to variable appointment durations, stylist break schedules, and differing commission structures between independent freelancers and branded salons.',
    architecture: {
      description: 'Unified backend API serving both customer-facing mobile clients and high-density administrative web panels with synchronized calendar slot locks.',
      flow: [
        'Customer Service Selection',
        'Stylist Availability Slot Lookup',
        'Temporary Slot Lock (5 min grace)',
        'Booking & Advance Payment',
        'Stylist Schedule Update & Notification',
        'Service Completion & Commission Calculation'
      ],
      components: [
        { name: 'Customer Mobile App', role: 'Discovery, stylist portfolio viewing, and appointment booking', tech: 'React Native' },
        { name: 'Partner Portal', role: 'Stylist working hours, service pricing, and payout tracking', tech: 'React / Vite' },
        { name: 'Central Backend', role: 'Dynamic slot availability engine and payment split rules', tech: 'NestJS / PostgreSQL' },
        { name: 'Admin Dashboard', role: 'Platform-wide commission reporting and partner verification', tech: 'React / Tailwind' }
      ]
    },
    whatIBuilt: [
      'Developed the central NestJS REST API supporting customer booking, partner calendar management, and financial payouts.',
      'Constructed the dynamic time-slot calculation engine accounting for individual stylist availability, service duration buffers, and holidays.',
      'Built responsive web interfaces for salon owners to manage staff rotas, inventory products, and service menus.',
      'Engineered partner earnings calculation logic with automated commission deductions and payout ledger records.'
    ],
    engineeringChallenge: 'Preventing appointment collisions when multiple customers attempt to book the exact same stylist slot simultaneously.',
    solution: 'Designed an atomic booking reservation lock in PostgreSQL that holds the requested slot with an expiration timer during checkout, releasing it automatically if payment is abandoned.',
    keyTakeaway: 'Service marketplaces thrive on friction-free scheduling; availability calculations must account for human factors like service prep and buffer times.',
    metrics: [
      { label: 'Ecosystem', value: 'Mobile App + Partner + Admin' },
      { label: 'Booking Model', value: 'Real-time Dynamic Slots' },
      { label: 'Stack', value: 'NestJS + React / Vite + PostgreSQL' }
    ],
    featured: false
  }
];
