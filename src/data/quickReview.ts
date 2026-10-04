import { profileData } from './profile';

/**
 * The six things a recruiter checks before deciding to read further.
 * Plain language, no architecture jargon: this section is a screening aid,
 * not a technical deep dive. Keep every answer under ~12 words.
 */
export interface QuickFact {
  /** Screening question, phrased the way a recruiter would ask it. */
  question: string;
  /** Short answer, meant to be read at a glance. */
  answer: string;
  /** Optional one-line qualifier under the answer. */
  note?: string;
  icon: 'role' | 'experience' | 'stack' | 'location' | 'availability' | 'notice';
}

export const quickFacts: QuickFact[] = [
  {
    question: 'Role',
    answer: 'Full Stack Engineer',
    note: 'Backend-leaning, with AI engineering experience',
    icon: 'role'
  },
  {
    question: 'Experience',
    answer: `${profileData.experienceYears} years`,
    note: 'Professional, since April 2023',
    icon: 'experience'
  },
  {
    question: 'Core stack',
    answer: 'Node.js · NestJS · React · PostgreSQL',
    note: 'Plus TypeScript, Redis, Docker, AWS',
    icon: 'stack'
  },
  {
    question: 'Location',
    answer: 'Ahmedabad, India',
    note: 'Open to relocation · Remote, Hybrid, or On-site',
    icon: 'location'
  },
  {
    question: 'Availability',
    answer: 'Open to new roles',
    note: 'Currently employed, interviewing actively',
    icon: 'availability'
  },
  {
    question: 'Notice period',
    answer: 'Negotiable',
    note: 'Happy to discuss timelines on a first call',
    icon: 'notice'
  }
];

/** Three claims with evidence, for the recruiter who reads past the grid. */
export const quickHighlights: string[] = [
  'Built and shipped 15+ production platforms for commercial and enterprise clients.',
  'Designed a 7-service microservice backend for a live ride-sharing product.',
  'Integrated AI features into real products, connected to production databases.'
];

/** Shown at the bottom as the single next action. */
export const quickVerdict =
  'If the above fits the role, the resume has the detail. If something is missing, ask me directly.';
