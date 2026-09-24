export interface ImpactArea {
  category: string;
  title: string;
  description: string;
  technicalDetails: string[];
  systemEvidence: string;
}

export const engineeringImpactData: ImpactArea[] = [
  {
    category: 'Architecture',
    title: 'Microservices Decomposition & gRPC Contracts',
    description: 'Decomposed tightly-coupled domain logic into independently deployable NestJS microservices communicating over binary gRPC protocols.',
    technicalDetails: [
      'Defined strict Protobuf schemas for inter-service communication, eliminating cross-service runtime type mismatches.',
      'Containerized all backend services into multi-stage Docker builds orchestrated via Docker Compose.',
      'Integrated an API Gateway reverse-proxy layer enforcing centralized authentication and rate-limiting.'
    ],
    systemEvidence: 'Implemented in MitGo ride-sharing platform across 7 dedicated backend services.'
  },
  {
    category: 'Performance',
    title: 'Query Optimization & In-Memory Redis Caching',
    description: 'Enhanced database throughput and read latency across high-traffic platforms by implementing multi-tiered caching and composite B-tree indexing.',
    technicalDetails: [
      'Identified and resolved slow database queries through execution plan analysis and index restructuring.',
      'Deployed Redis for high-read catalog metadata, active session states, and distributed lock coordination.',
      'Implemented optimistic concurrency locking to prevent inventory overselling during simultaneous checkout attempts.'
    ],
    systemEvidence: 'Applied in Netparts automotive catalog and Reelflix content streaming platform.'
  },
  {
    category: 'Integrations',
    title: 'Resilient FinTech Webhooks & Payment Lifecycles',
    description: 'Architected fail-safe financial ingestion workflows that protect against network drops, provider retries, and duplicate payment events.',
    technicalDetails: [
      'Engineered cryptographic HMAC-SHA256 signature verification pipelines for Razorpay and payment webhooks.',
      'Implemented distributed idempotency keys in Redis to guarantee single-execution semantics across repeated webhook deliveries.',
      'Created automated reconciliation scripts to resolve delayed payment transitions against database records.'
    ],
    systemEvidence: 'Production foundation for Aunest Wealth platform processing Digital Gold, Mutual Funds, and ETFs.'
  },
  {
    category: 'Product Development',
    title: 'Multi-Stakeholder Platforms & Domain Modeling',
    description: 'Transformed complex business rules and compliance requirements into maintainable relational schemas and intuitive web interfaces.',
    technicalDetails: [
      'Designed hierarchical RBAC security models protecting parent, learner, driver, and terminal administrator privileges.',
      'Built recurring calendar itinerary generators with isolated per-day exception handling overrides.',
      'Constructed dual-sided booking engines with dynamic time-slot locking during payment checkout.'
    ],
    systemEvidence: 'Core product architecture for LiftClub, Naibeau, and DTEP Port Logistics.'
  },
  {
    category: 'AI Engineering',
    title: 'Deterministic Tool Calling & RAG Orchestration',
    description: 'Bridged non-deterministic generative AI models with reliable, schema-validated relational databases and production booking APIs.',
    technicalDetails: [
      'Engineered typed tool-calling schemas enabling AI assistants to query live property inventory and attraction availability.',
      'Eliminated hallucinations by decoupling conversational intent extraction from deterministic database transactions.',
      'Implemented streaming chat interfaces with real-time UI card synthesis for structured itinerary presentation.'
    ],
    systemEvidence: 'Integrated in Travel Buddy AI discovery platform.'
  },
  {
    category: 'Scalability',
    title: 'Event-Driven Decoupling & Geospatial Telemetry',
    description: 'Built scalable location telemetry and asynchronous notification pipelines capable of handling high-frequency updates.',
    technicalDetails: [
      'Leveraged Redis geospatial indexing for sub-millisecond driver radius searches and route distance calculations.',
      'Decoupled push notification delivery from the primary HTTP request-response cycle using background queues and FCM.',
      'Standardized logging formats across services to enable rapid tracing during inter-service anomalies.'
    ],
    systemEvidence: 'Engineered into MitGo and LiftClub mobility platforms.'
  }
];
