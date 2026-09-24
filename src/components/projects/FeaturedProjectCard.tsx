import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Project } from '../../types/portfolio';
import { Tag, TechTags, Tone } from '../ui/Tag';
import { ProjectVisual } from './ProjectVisual';
import { domainIcon, metricIcon } from './projectIcons';
import { MeasureIcon } from '../philosophy/PhilosophyIcons';

interface FeaturedProjectCardProps {
  project: Project;
  onOpenModal: (project: Project) => void;
  index: number;
  wide?: boolean;
}

const domainTone: Record<Project['category'], Tone> = {
  Microservices: 'accent',
  Backend: 'accent',
  'Full Stack': 'sky',
  FinTech: 'ok',
  AI: 'violet',
  SaaS: 'sky',
  Enterprise: 'neutral',
  Mobile: 'sky'
};

/**
 * Scannable case-study card: domain, title, three facts, the hardest problem and the stack.
 * The full write-up (problem, architecture, components, what I built) opens in the side sheet.
 */
export const FeaturedProjectCard: React.FC<FeaturedProjectCardProps> = ({ project, onOpenModal, index, wide }) => {
  const DomainIcon = domainIcon[project.category];
  return (
    <article
      id={`work-${project.id}`}
      className={`group relative flex flex-col rounded-lg border border-line bg-raised p-5 transition-colors hover:border-line-strong sm:p-7 ${
        wide ? 'md:col-span-2' : ''
      }`}
    >
      <div className="flex items-center justify-between gap-4">
        <p className="flex items-center gap-3 font-mono text-xs text-muted">
          <span className="text-faint">{String(index + 1).padStart(2, '0')}</span>
          <Tag tone={domainTone[project.category]}>{project.category}</Tag>
          <span>{project.year}</span>
        </p>
        <ArrowUpRight
          className="h-5 w-5 text-faint transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
          aria-hidden="true"
        />
      </div>

      {!wide && <ProjectVisual id={project.id} className="mt-5" />}

      <div className={`mt-6 grid grid-cols-1 gap-6 ${wide ? 'lg:grid-cols-[1fr_minmax(0,26rem)] lg:gap-10' : ''}`}>
        <div>
          <div className="flex items-center gap-3.5">
            {DomainIcon && (
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-line bg-bg transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:rotate-[-4deg]">
                <DomainIcon className="h-9 w-9" />
              </span>
            )}
          <h3 className="font-serif text-4xl leading-none text-ink">
            {/* The title button stretches over the whole card, so the card is one click target. */}
            <button
              type="button"
              onClick={() => onOpenModal(project)}
              className="text-left after:absolute after:inset-0 after:rounded-lg focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-accent"
            >
              {project.title}
            </button>
          </h3>
          </div>
          <p className="mt-3 text-[15px] text-muted">{project.subtitle}</p>
          <p className="mt-4 line-clamp-3 text-[15px] leading-relaxed text-body">{project.summary}</p>

          {project.metrics && (
            <dl className={`mt-5 grid grid-cols-1 gap-2 ${wide ? 'sm:grid-cols-3' : ''}`}>
              {project.metrics.map((m) => {
                const Icon = metricIcon(m.label);
                return (
                  <div key={m.label} className="flex items-center gap-3 rounded-md border border-line bg-bg px-3 py-2.5">
                    <Icon className="h-8 w-8 shrink-0" />
                    <div className={`min-w-0 flex-1 ${wide ? '' : 'flex items-baseline justify-between gap-4'}`}>
                      <dt className="font-mono text-[10px] uppercase tracking-wider text-faint">{m.label}</dt>
                      <dd className={`text-[13.5px] leading-snug text-ink ${wide ? 'mt-1' : 'text-right'}`}>{m.value}</dd>
                    </div>
                  </div>
                );
              })}
            </dl>
          )}
        </div>

        {wide && <ProjectVisual id={project.id} className="order-first lg:order-none" />}
      </div>

      <div className="mt-6 flex items-start gap-3 rounded-lg border border-accent/20 bg-tint/60 p-3.5">
        <MeasureIcon className="h-9 w-9 shrink-0" />
        <p className="text-[14px] leading-relaxed text-body">
          <span className="text-ink">Hard part: </span>
          {project.engineeringChallenge}
        </p>
      </div>

      <div className="mt-auto flex flex-wrap items-end justify-between gap-4 pt-6">
        <TechTags items={project.technologies} />
        <span className="font-mono text-xs text-muted transition-colors group-hover:text-ink">read case study →</span>
      </div>
    </article>
  );
};
