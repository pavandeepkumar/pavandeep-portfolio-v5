// Career start: April 2023. Experience is computed at runtime so it never goes stale.
const CAREER_START = new Date(2023, 3, 1);

const getExperienceYears = (): string => {
  const now = new Date();
  const months = (now.getFullYear() - CAREER_START.getFullYear()) * 12 + (now.getMonth() - CAREER_START.getMonth());
  return `${Math.floor((months / 12) * 10) / 10}+`;
};

const experienceYears = getExperienceYears();

export const profileData = {
  name: 'Pavandeep Kumar',
  role: 'Senior Full Stack Engineer',
  alternativeRole: 'Full Stack Engineer · Backend & Distributed Systems · AI Engineering',
  experienceYears,
  resumeUrl: 'https://drive.google.com/file/d/18zS03r8p03jAXzeV591u6u5Ll0EldPsI/view?usp=sharing',
  resumeDownloadUrl: 'https://drive.google.com/uc?export=download&id=18zS03r8p03jAXzeV591u6u5Ll0EldPsI',
  location: 'Ahmedabad, Gujarat, India',
  status: 'AVAILABLE FOR NEW OPPORTUNITIES',
  relocation: 'Open to relocation',
  workModes: ['Remote', 'Hybrid', 'On-site'],
  tagline: 'Building systems that scale beyond the screen.',
  bioSummary:
    'I build production-ready web platforms, backend systems, distributed architectures, and AI-powered products using modern full-stack technologies.',
  aboutIntroduction:
    'I approach software engineering with an end-to-end product mindset. Rather than stopping at UI components or isolated database queries, I design systems that account for the full lifecycle: API contracts, distributed concurrency, data integrity, security boundaries, and operational observability.',
  coreStack: [
    'React',
    'Next.js',
    'TypeScript',
    'Node.js',
    'NestJS',
    'PostgreSQL',
    'Redis',
    'Kafka',
    'AWS',
    'Docker',
    'Microservices'
  ],
  aiFocus: [
    'RAG Architectures',
    'LLM Applications',
    'Function & Tool Calling',
    'AI-powered Workflows',
    'Deterministic Backend Integrations'
  ],
  contacts: {
    email: 'pavandeepkumarmlk@gmail.com',
    linkedin: 'https://linkedin.com/in/pavandeepkumar',
    linkedinHandle: 'linkedin.com/in/pavandeepkumar',
    github: 'https://github.com/pavandeepkumar',
    githubHandle: 'github.com/pavandeepkumar',
    locationText: 'Ahmedabad, Gujarat, India'
  },
  stats: [
    { value: experienceYears, label: 'Years Experience', detail: 'Progressing from frontend to distributed systems' },
    { value: '15+', label: 'Production Projects', detail: 'Delivered commercial and enterprise platforms' },
    { value: 'Microservices', label: 'Architecture', detail: 'gRPC, Docker, independent service deployments' },
    { value: 'AI Integrated', label: 'Modern Workflows', detail: 'RAG, tool-calling pipelines, LLM APIs' },
    { value: 'Full Stack', label: 'End-to-End Scope', detail: 'UI, API Gateways, Relational DBs, Cloud' }
  ]
};
