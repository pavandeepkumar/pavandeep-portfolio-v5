import { PhilosophyPrinciple } from '../types/portfolio';

export const philosophyPrinciples: PhilosophyPrinciple[] = [
  {
    number: '01',
    title: 'Start with the problem',
    subtitle: 'Deconstruct domain constraints before writing code',
    description: 'Great engineering starts with understanding domain invariants, failure scenarios, and user workflows. Premature coding often solves the wrong constraints.',
    practicalApplication: 'Before designing schemas or API routes, map state transitions, edge conditions, and authorization boundaries.'
  },
  {
    number: '02',
    title: 'Design the system',
    subtitle: 'Define contracts, data models, and failure modes',
    description: 'Systems fail at their boundaries. Designing strict API contracts (Protobuf/OpenAPI), idempotent schemas, and explicit failure paths prevents architectural debt.',
    practicalApplication: 'Use typed contracts, clear service boundaries, and structured error responses across client and server.'
  },
  {
    number: '03',
    title: 'Build for maintainability',
    subtitle: 'Write code optimized for reading and evolving',
    description: 'Code is read ten times more often than it is written. Clean modular structures, predictable directory layouts, and descriptive types empower teams to ship safely.',
    practicalApplication: 'Leverage NestJS modular architecture, dependency injection, and centralized validation pipes to eliminate boilerplate.'
  },
  {
    number: '04',
    title: 'Measure bottlenecks',
    subtitle: 'Profile actual queries and network latencies',
    description: 'Optimization without profiling is guesswork. Identify high-cost database queries, N+1 loading, payload bloat, and serialization delays before tuning.',
    practicalApplication: 'Analyze PostgreSQL query execution plans (`EXPLAIN ANALYZE`), index composite columns, and place Redis caches strategically.'
  },
  {
    number: '05',
    title: 'Automate repetitive work',
    subtitle: 'Containerize and standardize development pipelines',
    description: 'Manual deployments, inconsistent local environments, and manual migrations introduce preventable production regressions.',
    practicalApplication: 'Use multi-stage Docker builds, Docker Compose service meshes, database migration scripts, and continuous integration checks.'
  },
  {
    number: '06',
    title: 'Ship and iterate',
    subtitle: 'Deliver working software and incorporate real feedback',
    description: 'Software locked in staging creates zero user value. Fast delivery cycles with atomic feature releases uncover real-world edge cases quickly.',
    practicalApplication: 'Structure feature branches with semantic pull requests, incremental schema migrations, and backward-compatible API versions.'
  }
];
