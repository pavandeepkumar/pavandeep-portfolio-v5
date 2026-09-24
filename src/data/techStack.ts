import { TechItem } from '../types/portfolio';

export const techUniverse: Record<string, TechItem[]> = {
  Frontend: [
    {
      name: 'React',
      category: 'Frontend',
      experienceLevel: 'Primary Core',
      usageDescription: 'Single-page applications, custom hooks, state synchronization, and accessible component design.'
    },
    {
      name: 'Next.js',
      category: 'Frontend',
      experienceLevel: 'Advanced',
      usageDescription: 'Server-side rendering, App Router architecture, optimized SEO, and hybrid static generation.'
    },
    {
      name: 'TypeScript',
      category: 'Frontend',
      experienceLevel: 'Primary Core',
      usageDescription: 'Strict type safety across frontend and backend interfaces, reducing runtime bugs and enabling confident refactoring.'
    },
    {
      name: 'Tailwind CSS',
      category: 'Frontend',
      experienceLevel: 'Advanced',
      usageDescription: 'Utility-first styling, design systems, dark-mode styling, responsive viewports, and custom animation tokens.'
    },
    {
      name: 'Vite',
      category: 'Frontend',
      experienceLevel: 'Advanced',
      usageDescription: 'Lightning-fast build tooling, modern ES modules bundling, and developer server optimization.'
    },
    {
      name: 'Redux / Zustand',
      category: 'Frontend',
      experienceLevel: 'Proficient',
      usageDescription: 'Predictable client-side global state management, middleware logging, and persistent cache stores.'
    }
  ],
  Backend: [
    {
      name: 'NestJS',
      category: 'Backend',
      experienceLevel: 'Primary Core',
      usageDescription: 'Enterprise modular architecture, Dependency Injection, guards, interceptors, custom decorators, and microservices transports.'
    },
    {
      name: 'Node.js',
      category: 'Backend',
      experienceLevel: 'Primary Core',
      usageDescription: 'Event loop mastery, non-blocking I/O, stream processing, worker threads, and scalable server backends.'
    },
    {
      name: 'Express',
      category: 'Backend',
      experienceLevel: 'Advanced',
      usageDescription: 'High-speed lightweight REST APIs, custom middleware pipelines, and webhook ingestion gateways.'
    },
    {
      name: 'REST APIs',
      category: 'Backend',
      experienceLevel: 'Primary Core',
      usageDescription: 'Resource-oriented design, standard HTTP status codes, structured error payloads, pagination, and OpenAPI documentation.'
    },
    {
      name: 'Socket.IO / WebSockets',
      category: 'Backend',
      experienceLevel: 'Advanced',
      usageDescription: 'Full-duplex real-time communication for live chat, telemetry updates, and instant booking status broadcasting.'
    },
    {
      name: 'gRPC / Protobuf',
      category: 'Backend',
      experienceLevel: 'Advanced',
      usageDescription: 'High-throughput binary RPC communication between distributed microservices with typed contract definitions.'
    }
  ],
  Database: [
    {
      name: 'PostgreSQL',
      category: 'Database',
      experienceLevel: 'Primary Core',
      usageDescription: 'Relational data modeling, ACID transactions, complex joins, composite B-tree indexing, and row-level locking for concurrency control.'
    },
    {
      name: 'Redis',
      category: 'Database',
      experienceLevel: 'Primary Core',
      usageDescription: 'In-memory caching, distributed locks (Redlock), pub/sub messaging, session stores, and rate-limiting keys.'
    },
    {
      name: 'TypeORM / Prisma',
      category: 'Database',
      experienceLevel: 'Primary Core',
      usageDescription: 'Schema migrations, declarative entity relationships, query builder optimizations, and transactional entity managers.'
    },
    {
      name: 'MongoDB',
      category: 'Database',
      experienceLevel: 'Proficient',
      usageDescription: 'Document-based persistence, unstructured log storage, and flexible aggregation pipelines.'
    },
    {
      name: 'MySQL',
      category: 'Database',
      experienceLevel: 'Proficient',
      usageDescription: 'Relational schema design, normalization, foreign key constraints, and storage engine management.'
    }
  ],
  Cloud: [
    {
      name: 'AWS EC2',
      category: 'Cloud',
      experienceLevel: 'Advanced',
      usageDescription: 'Virtual instance provisioning, security group configuration, SSH management, and production server host operations.'
    },
    {
      name: 'AWS S3',
      category: 'Cloud',
      experienceLevel: 'Advanced',
      usageDescription: 'Scalable object storage, presigned URLs for secure client uploads, bucket policies, and asset distribution.'
    },
    {
      name: 'AWS RDS',
      category: 'Cloud',
      experienceLevel: 'Advanced',
      usageDescription: 'Managed PostgreSQL instances, automated backup snapshots, read replicas, and VPC connection pooling.'
    },
    {
      name: 'AWS Lambda',
      category: 'Cloud',
      experienceLevel: 'Proficient',
      usageDescription: 'Serverless event handlers for asynchronous background tasks, image resizing, and scheduled cron executions.'
    },
    {
      name: 'AWS ECS / ECR',
      category: 'Cloud',
      experienceLevel: 'Proficient',
      usageDescription: 'Docker container image registry management and containerized task execution in managed clusters.'
    }
  ],
  DevOps: [
    {
      name: 'Docker',
      category: 'DevOps',
      experienceLevel: 'Primary Core',
      usageDescription: 'Writing multi-stage Dockerfiles, optimizing image size, managing non-root containers, and isolating dependencies.'
    },
    {
      name: 'Docker Compose',
      category: 'DevOps',
      experienceLevel: 'Primary Core',
      usageDescription: 'Multi-service local orchestration linking databases, Redis, microservices, and reverse proxies in unified networks.'
    },
    {
      name: 'Nginx',
      category: 'DevOps',
      experienceLevel: 'Advanced',
      usageDescription: 'Reverse proxy configuration, SSL/TLS termination, rate limiting, and upstream load balancing.'
    },
    {
      name: 'GitHub Actions',
      category: 'DevOps',
      experienceLevel: 'Advanced',
      usageDescription: 'Automated CI/CD workflows, automated unit tests, lint validation, and deployment triggers.'
    }
  ],
  Architecture: [
    {
      name: 'Microservices',
      category: 'Architecture',
      experienceLevel: 'Primary Core',
      usageDescription: 'Decomposing monolithic domains into independently deployable, bounded contexts communicating via gRPC and message brokers.'
    },
    {
      name: 'API Gateway Pattern',
      category: 'Architecture',
      experienceLevel: 'Primary Core',
      usageDescription: 'Centralizing client entry points, JWT authentication guards, rate-limiting, and request routing to internal services.'
    },
    {
      name: 'Event-Driven Systems',
      category: 'Architecture',
      experienceLevel: 'Advanced',
      usageDescription: 'Decoupling services through message queues (Kafka / Redis Pub/Sub), asynchronous events, and webhook workers.'
    },
    {
      name: 'RBAC (Role-Based Access)',
      category: 'Architecture',
      experienceLevel: 'Primary Core',
      usageDescription: 'Hierarchical permission systems protecting sensitive endpoints based on roles, claims, and resource ownership.'
    },
    {
      name: 'Modular Monolith',
      category: 'Architecture',
      experienceLevel: 'Primary Core',
      usageDescription: 'Structuring single-deployable applications with clean bounded modules that can be extracted into microservices when needed.'
    }
  ],
  AI: [
    {
      name: 'RAG Architectures',
      category: 'AI',
      experienceLevel: 'Advanced',
      usageDescription: 'Retrieval-Augmented Generation linking vector search / embeddings with prompt contexts for verified domain responses.'
    },
    {
      name: 'Function & Tool Calling',
      category: 'AI',
      experienceLevel: 'Advanced',
      usageDescription: 'Equipping LLM agents with typed JSON schema tools that execute deterministic backend operations and database queries.'
    },
    {
      name: 'LLM Applications',
      category: 'AI',
      experienceLevel: 'Advanced',
      usageDescription: 'Designing end-to-end intelligent applications with streaming responses, conversation state, and safety constraints.'
    },
    {
      name: 'Prompt Engineering',
      category: 'AI',
      experienceLevel: 'Advanced',
      usageDescription: 'Structuring system instructions, few-shot examples, and output formatting rules to enforce predictable agent behavior.'
    },
    {
      name: 'AI + Backend Integration',
      category: 'AI',
      experienceLevel: 'Primary Core',
      usageDescription: 'Bridging generative AI outputs with production relational databases, validation layers, and transactional workflows.'
    }
  ]
};
