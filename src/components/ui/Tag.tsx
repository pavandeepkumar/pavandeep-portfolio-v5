import React from 'react';
import { techUniverse } from '../../data/techStack';

export type Tone = 'accent' | 'ok' | 'sky' | 'violet' | 'neutral';

const toneClass: Record<Tone, string> = {
  accent: 'border-accent/30 bg-accent/[0.07] text-accent',
  ok: 'border-ok/30 bg-ok/[0.07] text-ok',
  sky: 'border-sky/30 bg-sky/[0.07] text-sky',
  violet: 'border-violet/30 bg-violet/[0.07] text-violet',
  neutral: 'border-line-strong bg-transparent text-body'
};

/** One colour per layer, so a stack reads at a glance: backend, data, frontend, infra, AI. */
export const categoryTone: Record<string, Tone> = {
  Backend: 'accent',
  Database: 'ok',
  Frontend: 'sky',
  Cloud: 'violet',
  DevOps: 'violet',
  Architecture: 'neutral',
  AI: 'accent'
};

const extraTones: Record<string, Tone> = {
  gRPC: 'accent',
  'REST APIs': 'accent',
  WebSockets: 'accent',
  'Socket.IO': 'accent',
  TypeORM: 'ok',
  Redis: 'ok',
  PostgreSQL: 'ok',
  Docker: 'violet',
  'Docker Compose': 'violet',
  Nginx: 'violet',
  AWS: 'violet',
  'React Native': 'sky',
  'Tailwind CSS': 'sky'
};

const lookup: Record<string, Tone> = {};
for (const [cat, items] of Object.entries(techUniverse)) {
  for (const item of items) lookup[item.name] = categoryTone[cat] ?? 'neutral';
}

export const toneFor = (tech: string): Tone => extraTones[tech] ?? lookup[tech] ?? 'neutral';

interface TagProps {
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
}

export const Tag: React.FC<TagProps> = ({ children, tone = 'neutral', className = '' }) => (
  <span
    className={`inline-flex items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 font-mono text-[11.5px] leading-5 ${toneClass[tone]} ${className}`}
  >
    {children}
  </span>
);

export const TechTags: React.FC<{ items: string[]; className?: string }> = ({ items, className = '' }) => (
  <ul className={`flex flex-wrap gap-1.5 ${className}`}>
    {items.map((t) => (
      <li key={t}>
        <Tag tone={toneFor(t)}>{t}</Tag>
      </li>
    ))}
  </ul>
);
