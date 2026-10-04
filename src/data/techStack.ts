import { TechCategory, TechItem } from '../types/portfolio';

/**
 * Category is the record key, so items never repeat it.
 * Levels are recruiter-readable: Daily = main tool, Strong = shipped often,
 * Working = used in production, not a daily driver.
 * Descriptions say what the tool achieved, not how it works internally.
 */
export const techUniverse: Record<TechCategory, TechItem[]> = {
  Frontend: [
    {
      name: 'React',
      experienceLevel: 'Daily',
      usageDescription: 'Builds the interfaces users work in every day, with reusable components and accessible layouts.'
    },
    {
      name: 'Next.js',
      experienceLevel: 'Strong',
      usageDescription: 'Delivers fast-loading, search-friendly web apps that render on the server.'
    },
    {
      name: 'TypeScript',
      experienceLevel: 'Daily',
      usageDescription: 'Catches bugs before release and makes large codebases safe to change.'
    },
    {
      name: 'Tailwind CSS',
      experienceLevel: 'Strong',
      usageDescription: 'Builds consistent design systems that work on mobile, desktop, and dark mode.'
    },
    {
      name: 'Vite',
      experienceLevel: 'Strong',
      usageDescription: 'Keeps builds and local development fast, so features ship sooner.'
    },
    {
      name: 'Redux / Zustand',
      experienceLevel: 'Working',
      usageDescription: 'Keeps app data predictable and in sync across complex screens.'
    }
  ],
  Backend: [
    {
      name: 'NestJS',
      experienceLevel: 'Daily',
      usageDescription: 'Main framework for enterprise services that stay organised as teams and features grow.'
    },
    {
      name: 'Node.js',
      experienceLevel: 'Daily',
      usageDescription: 'Runs the server side of products, and stays responsive under heavy traffic.'
    },
    {
      name: 'Express',
      experienceLevel: 'Strong',
      usageDescription: 'Builds lightweight services and integration endpoints quickly.'
    },
    {
      name: 'REST APIs',
      experienceLevel: 'Daily',
      usageDescription: 'Designs documented APIs that mobile, web, and partner teams integrate against.'
    },
    {
      name: 'Socket.IO / WebSockets',
      experienceLevel: 'Strong',
      usageDescription: 'Powers live features such as chat and instant status updates.'
    },
    {
      name: 'gRPC / Protobuf',
      experienceLevel: 'Strong',
      usageDescription: 'Connects internal services with fast, strictly typed communication.'
    }
  ],
  Database: [
    {
      name: 'PostgreSQL',
      experienceLevel: 'Daily',
      usageDescription: 'Primary database for business-critical data that must stay accurate.'
    },
    {
      name: 'Redis',
      experienceLevel: 'Daily',
      usageDescription: 'Speeds up slow pages with caching, and prevents double bookings or duplicate charges.'
    },
    {
      name: 'TypeORM / Prisma',
      experienceLevel: 'Daily',
      usageDescription: 'Manages database structure and safe schema upgrades as products change.'
    },
    {
      name: 'MongoDB',
      experienceLevel: 'Working',
      usageDescription: 'Stores flexible records such as activity logs and reporting data.'
    },
    {
      name: 'MySQL',
      experienceLevel: 'Working',
      usageDescription: 'Designs and maintains relational databases on existing company systems.'
    }
  ],
  Cloud: [
    {
      name: 'AWS EC2',
      experienceLevel: 'Strong',
      usageDescription: 'Sets up and maintains the servers that run live products.'
    },
    {
      name: 'AWS S3',
      experienceLevel: 'Strong',
      usageDescription: 'Handles secure file and image storage with controlled access.'
    },
    {
      name: 'AWS RDS',
      experienceLevel: 'Strong',
      usageDescription: 'Runs managed databases with automatic backups and recovery.'
    },
    {
      name: 'AWS Lambda',
      experienceLevel: 'Working',
      usageDescription: 'Runs scheduled and background jobs without paying for idle servers.'
    },
    {
      name: 'AWS ECS / ECR',
      experienceLevel: 'Working',
      usageDescription: 'Deploys containerised services to managed cloud clusters.'
    }
  ],
  DevOps: [
    {
      name: 'Docker',
      experienceLevel: 'Daily',
      usageDescription: 'Packages applications so they behave the same on every machine.'
    },
    {
      name: 'Docker Compose',
      experienceLevel: 'Daily',
      usageDescription: 'Lets a new developer start the whole system locally in one command.'
    },
    {
      name: 'Nginx',
      experienceLevel: 'Strong',
      usageDescription: 'Routes live traffic, enables HTTPS, and balances load across servers.'
    },
    {
      name: 'GitHub Actions',
      experienceLevel: 'Strong',
      usageDescription: 'Automates testing and release, so deployments are repeatable.'
    }
  ],
  Architecture: [
    {
      name: 'Microservices',
      experienceLevel: 'Daily',
      usageDescription: 'Splits large systems into independent services that teams can release separately.'
    },
    {
      name: 'API Gateway Pattern',
      experienceLevel: 'Daily',
      usageDescription: 'Gives clients one secure entry point, with login checks and traffic limits.'
    },
    {
      name: 'Event-Driven Systems',
      experienceLevel: 'Strong',
      usageDescription: 'Moves slow work to the background, so users never wait on it.'
    },
    {
      name: 'RBAC (Role-Based Access)',
      experienceLevel: 'Daily',
      usageDescription: 'Controls who can see or change what, based on their role.'
    },
    {
      name: 'Modular Monolith',
      experienceLevel: 'Daily',
      usageDescription: 'Keeps early products simple to run, and ready to split later.'
    }
  ],
  AI: [
    {
      name: 'RAG Architectures',
      experienceLevel: 'Strong',
      usageDescription: 'Lets AI answer from company documents and data, instead of guessing.'
    },
    {
      name: 'Function & Tool Calling',
      experienceLevel: 'Strong',
      usageDescription: 'Allows AI assistants to perform real actions, such as lookups and updates.'
    },
    {
      name: 'LLM Applications',
      experienceLevel: 'Strong',
      usageDescription: 'Builds complete AI features, from chat experience to safety limits.'
    },
    {
      name: 'Prompt Engineering',
      experienceLevel: 'Strong',
      usageDescription: 'Tunes AI instructions so results stay consistent and on-format.'
    },
    {
      name: 'AI + Backend Integration',
      experienceLevel: 'Daily',
      usageDescription: 'Connects AI features to real databases and business rules in production.'
    }
  ]
};
