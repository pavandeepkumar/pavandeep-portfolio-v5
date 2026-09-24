import React from 'react';
import { BrowserIcon, CloudIcon, DatabaseIcon } from './AboutIcons';
import { BackendIcon, LlmIcon } from '../ai/AiIcons';
import { ArchitectureFlow } from './ArchitectureFlow';
import { PillarVisual } from './PillarVisual';
import { Section } from '../layout/Section';
import { TechTags } from '../ui/Tag';
import { profileData } from '../../data/profile';

const pillars = [
  {
    icon: BrowserIcon,
    area: 'Frontend',
    stack: ['React', 'Next.js'],
    text: 'Responsive layouts, state synchronization, client performance, and accessible design.'
  },
  {
    icon: BackendIcon,
    area: 'Backend',
    stack: ['Node.js', 'NestJS'],
    text: 'Modular enterprise structure, dependency injection, validation guards, and REST/gRPC.'
  },
  {
    icon: DatabaseIcon,
    area: 'Database',
    stack: ['PostgreSQL', 'Redis'],
    text: 'Relational schemas, ACID transactions, composite indexing, and sub-millisecond caching.'
  },
  {
    icon: CloudIcon,
    area: 'Infrastructure',
    stack: ['AWS', 'Docker'],
    text: 'Multi-stage container builds, Docker Compose meshes, EC2 hosts, and automated CI/CD.'
  },
  {
    icon: LlmIcon,
    area: 'AI engineering',
    stack: ['RAG', 'Tool calling'],
    text: 'Connecting generative reasoning with deterministic backend APIs and transactional workflows.'
  }
];

export const AboutSection: React.FC = () => {
  return (
    <Section
      id="about"
      index="02"
      label="About"
      title={
        <>
          I care about the whole request, <em>not just my layer of it.</em>
        </>
      }
      intro={profileData.aboutIntroduction}
    >
      <ol className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {pillars.map(({ icon: Icon, area, stack, text }, i) => (
          <li key={area} className="group flex flex-col rounded-lg border border-line bg-raised p-4 transition-colors hover:border-line-strong">
            <PillarVisual area={area} />
            <div className="mt-4 flex items-center justify-between">
              <Icon className="h-10 w-10 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:rotate-[-4deg]" />
              <span className="font-mono text-[11px] text-faint">{String(i + 1).padStart(2, '0')}</span>
            </div>
            <p className="mt-2 text-ink">{area}</p>
            <p className="mt-1.5 text-[13px] leading-relaxed text-muted">{text}</p>
            <TechTags items={stack} className="mt-auto pt-4" />
          </li>
        ))}
      </ol>

      <div className="mt-16">
        <ArchitectureFlow />
      </div>
    </Section>
  );
};
