import { CareerMilestone } from '../types/portfolio';

export const careerTimeline: CareerMilestone[] = [
  {
    period: '2026 — Present',
    role: 'Software Engineer',
    company: 'Devstree IT Services Pvt. Ltd.',
    location: 'Ahmedabad, Gujarat, India',
    shift: 'Distributed Systems & AI Engineering',
    description:
      'Spearheading distributed backend architectures, microservices decomposition with gRPC, and practical AI workflow integration with relational databases for international clients.',
    responsibilities: [
      'Architecting high-concurrency microservice backends with NestJS, PostgreSQL, Redis, and gRPC inter-service communication.',
      'Integrating generative AI reasoning pipelines with deterministic database tool-calling for travel discovery and business automation.',
      'Guiding database design, composite indexing strategies, and ACID transaction isolation for high-volume FinTech platforms.',
      'Containerizing multi-service stacks with Docker Compose and establishing CI/CD automation pipelines.'
    ],
    skills: ['NestJS', 'Microservices', 'gRPC', 'Docker', 'PostgreSQL', 'AI Tool Calling', 'Redis']
  },
  {
    period: '2025',
    role: 'Full Stack Developer',
    company: 'Devstree IT Services Pvt. Ltd.',
    location: 'Ahmedabad, Gujarat, India',
    shift: 'Full Stack Ownership & Backend Architecture',
    description:
      'Transitioned to complete end-to-end product ownership, taking full responsibility for backend API design, database schemas, and integration architectures alongside modern React/Next.js frontends.',
    responsibilities: [
      'Designed end-to-end architectures for mobility platforms, automotive e-commerce, and SaaS platforms.',
      'Built idempotent webhook ingestion gateways and third-party payment integrations with Razorpay.',
      'Implemented real-time bidirectional communication channels using WebSockets and Socket.IO for live chats and telemetry.',
      'Authored database migrations, optimized complex relational queries, and implemented role-based access control (RBAC).'
    ],
    skills: ['React', 'Next.js', 'NestJS', 'PostgreSQL', 'TypeORM', 'WebSockets', 'Razorpay', 'AWS']
  },
  {
    period: '2023 — 2025',
    role: 'React Developer',
    company: 'Devstree IT Services Pvt. Ltd.',
    location: 'Ahmedabad, Gujarat, India',
    shift: 'Frontend Engineering & State Synchronization',
    description:
      'Engineered complex, responsive web applications and dashboards with React, TypeScript, and modern state management, collaborating closely with backend engineers.',
    responsibilities: [
      'Built high-density operational portals, terminal dashboards, and responsive e-commerce storefronts.',
      'Implemented state management patterns with Redux and React context for predictable data flow.',
      'Integrated RESTful APIs, handled client-side caching, and eliminated UI layout shifts and unnecessary re-renders.',
      'Developed reusable component libraries adhering to strict accessibility and responsive mobile design standards.'
    ],
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'Redux', 'REST APIs', 'Vite', 'HTML5/CSS3']
  },
  {
    period: '2023',
    role: 'React Intern',
    company: 'Devstree IT Services Pvt. Ltd.',
    location: 'Ahmedabad, Gujarat, India',
    shift: 'Frontend Fundamentals & Component Architecture',
    description:
      'Started professional career focusing on modern JavaScript (ES6+), React component lifecycles, CSS utility architectures, and version control best practices.',
    responsibilities: [
      'Constructed pixel-perfect UI screens from Figma design specifications.',
      'Learned and applied core React patterns: custom hooks, prop drilling mitigation, and virtual DOM reconciliation.',
      'Participated in daily standups, code reviews, and Git branching workflows in collaborative team environments.'
    ],
    skills: ['JavaScript (ES6+)', 'React', 'CSS3', 'Git', 'Responsive Design']
  }
];

export const progressionSteps = [
  {
    stage: '01',
    name: 'Frontend Development',
    focus: 'React, TypeScript, state management, UI performance, responsive design',
    outcome: 'Deep understanding of client runtime, user interactions, and rendering lifecycles.'
  },
  {
    stage: '02',
    name: 'Full Stack Ownership',
    focus: 'REST APIs, TypeORM, database schemas, full lifecycle delivery',
    outcome: 'Bridged the gap between UI state and server contracts with complete feature ownership.'
  },
  {
    stage: '03',
    name: 'Backend Architecture',
    focus: 'NestJS, PostgreSQL, Redis caching, RBAC, webhook idempotency',
    outcome: 'Designed resilient backend systems with strict transactional guarantees.'
  },
  {
    stage: '04',
    name: 'Microservices & Systems',
    focus: 'gRPC, Docker, API Gateways, service boundaries, distributed state',
    outcome: 'Architected independently deployable services communicating over high-speed RPC.'
  },
  {
    stage: '05',
    name: 'AI Engineering',
    focus: 'RAG, LLM Tool Calling, prompt orchestration, deterministic backends',
    outcome: 'Connected generative AI intelligence to production relational databases safely.'
  }
];
