export interface ImpactArea {
  category: string;
  title: string;
  description: string;
  technicalDetails: string[];
  systemEvidence: string;
  metric: ImpactMetric;
}

/**
 * Headline number for each card. `kind` picks the visual:
 * - `count`: a row of nodes, one per unit (small whole numbers)
 * - `ring`: a percentage gauge
 * - `compare`: before/after bars on the same scale
 */
export type ImpactMetric =
  | { kind: 'count'; value: number; suffix?: string; label: string; unit: string }
  | { kind: 'ring'; value: number; label: string; note: string }
  | {
      kind: 'compare';
      delta: string;
      label: string;
      before: { value: number; text: string };
      after: { value: number; text: string };
    };

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
    systemEvidence: 'Implemented in MitGo ride-sharing platform across 7 dedicated backend services.',
    metric: { kind: 'count', value: 7, label: 'independently deployable services', unit: 'service' }
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
    systemEvidence: 'Applied in Netparts automotive catalog and Reelflix content streaming platform.',
    metric: { kind: 'count', value: 3, label: 'Redis cache roles: catalog, sessions, locks', unit: 'role' }
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
    systemEvidence: 'Production foundation for Aunest Wealth platform processing Digital Gold, Mutual Funds, and ETFs.',
    metric: { kind: 'ring', value: 100, label: 'webhooks signature-checked and idempotent', note: '0 double charges from retries' }
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
    systemEvidence: 'Core product architecture for LiftClub, Naibeau, and DTEP Port Logistics.',
    metric: { kind: 'count', value: 4, label: 'roles in one RBAC model', unit: 'role' }
  },
  {
    category: 'AI Engineering',
    title: 'Deterministic Tool Calling & RAG Orchestration',
    description: 'Bridged non-deterministic generative AI models with reliable, schema-validated relational databases and production booking APIs.',
    technicalDetails: [
      'Engineered typed tool-calling schemas enabling AI assistants to query live property inventory and attraction availability.',
      'Kept the model to intent extraction; availability, prices and bookings always come from validated backend calls.',
      'Implemented streaming chat interfaces with real-time UI card synthesis for structured itinerary presentation.'
    ],
    systemEvidence: 'Integrated in Travel Buddy AI discovery platform.',
    metric: { kind: 'ring', value: 100, label: 'bookings written through typed tools', note: '0 free-text writes to the DB' }
  },
  {
    category: 'Scalability',
    title: 'Event-Driven Decoupling & Geospatial Telemetry',
    description: 'Built scalable location telemetry and asynchronous notification pipelines capable of handling high-frequency updates.',
    technicalDetails: [
      'Used Redis geospatial indexes (GEOSEARCH) for nearby-driver radius lookups and distance calculations.',
      'Decoupled push notification delivery from the primary HTTP request-response cycle using background queues and FCM.',
      'Standardized logging formats across services to enable rapid tracing during inter-service anomalies.'
    ],
    systemEvidence: 'Engineered into MitGo and LiftClub mobility platforms.',
    metric: { kind: 'count', value: 2, label: 'mobility platforms on Redis GEO lookup', unit: 'platform' }
  }
];
