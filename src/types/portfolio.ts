export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'Microservices' | 'Full Stack' | 'Backend' | 'FinTech' | 'AI' | 'SaaS' | 'Enterprise' | 'Mobile';
  tags: string[];
  year: string;
  summary: string;
  technologies: string[];
  problem: string;
  architecture: {
    description: string;
    flow: string[];
    components: { name: string; role: string; tech?: string }[];
  };
  whatIBuilt: string[];
  engineeringChallenge: string;
  solution: string;
  keyTakeaway: string;
  metrics?: { label: string; value: string }[];
  featured?: boolean;
}

export interface CareerMilestone {
  period: string;
  role: string;
  company: string;
  location: string;
  shift: string;
  description: string;
  responsibilities: string[];
  skills: string[];
}

export interface TechItem {
  name: string;
  category: 'Frontend' | 'Backend' | 'Database' | 'Cloud' | 'DevOps' | 'Architecture' | 'AI';
  experienceLevel: string;
  usageDescription: string;
  iconName?: string;
}

export interface PhilosophyPrinciple {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  practicalApplication: string;
}
