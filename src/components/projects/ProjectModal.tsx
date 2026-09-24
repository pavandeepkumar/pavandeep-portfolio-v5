import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Project } from '../../types/portfolio';
import { ProjectVisual } from './ProjectVisual';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const Block: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <section className="border-t border-line pt-6">
    <h3 className="eyebrow">{label}</h3>
    <div className="mt-4">{children}</div>
  </section>
);

/** Full case study as a right-hand sheet (full screen on phones). */
export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [project, onClose]);

  if (!project) return null;

  // Portal to <body> so animated (transformed) ancestors can't become the fixed containing block.
  return createPortal(
    <div className="fixed inset-0 z-[60] flex justify-end" role="dialog" aria-modal="true" aria-labelledby="case-study-title">
      <button type="button" className="absolute inset-0 bg-black/70" onClick={onClose} aria-label="Close case study" tabIndex={-1} />

      <div className="relative flex h-full w-full max-w-2xl flex-col border-l border-line bg-bg">
        <div className="flex items-center justify-between border-b border-line px-5 py-4 sm:px-8">
          <p className="font-mono text-xs text-muted">
            {project.category} · {project.year}
          </p>
          <button ref={closeRef} type="button" onClick={onClose} className="font-mono text-xs uppercase tracking-wider text-ink hover:text-accent">
            Close <span className="text-faint">esc</span>
          </button>
        </div>

        <div className="flex-1 space-y-10 overflow-y-auto px-5 py-8 sm:px-8 sm:py-10">
          <header>
            <h2 id="case-study-title" className="font-serif text-5xl leading-none text-ink">
              {project.title}
            </h2>
            <p className="mt-3 text-muted">{project.subtitle}</p>
            <ProjectVisual id={project.id} className="mt-6" />
            <p className="mt-6 text-[16px] leading-relaxed text-body">{project.summary}</p>
            <p className="mt-5 font-mono text-[12px] leading-relaxed text-muted">{project.technologies.join('  ·  ')}</p>
            {project.metrics && (
              <dl className="mt-8 grid grid-cols-1 gap-4 border-t border-line pt-6 text-sm sm:grid-cols-3">
                {project.metrics.map((m) => (
                  <div key={m.label}>
                    <dt className="eyebrow">{m.label}</dt>
                    <dd className="mt-1 text-ink">{m.value}</dd>
                  </div>
                ))}
              </dl>
            )}
          </header>

          <Block label="The problem">
            <p className="text-[15px] leading-relaxed text-body">{project.problem}</p>
          </Block>

          <Block label="Architecture">
            <p className="text-[15px] leading-relaxed text-body">{project.architecture.description}</p>
            <ol className="mt-6 space-y-0 font-mono text-[13px]">
              {project.architecture.flow.map((step, idx) => (
                <li key={step} className="relative flex gap-4 pb-4 last:pb-0">
                  <span className="relative z-10 w-6 shrink-0 bg-bg text-faint">{String(idx + 1).padStart(2, '0')}</span>
                  {idx < project.architecture.flow.length - 1 && (
                    <span className="absolute left-[9px] top-5 bottom-0 w-px bg-line" aria-hidden="true" />
                  )}
                  <span className="text-ink">{step}</span>
                </li>
              ))}
            </ol>
          </Block>

          <Block label="Components">
            <dl className="divide-y divide-line border-y border-line">
              {project.architecture.components.map((c) => (
                <div key={c.name} className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-[11rem_1fr] sm:gap-4">
                  <dt className="text-sm text-ink">{c.name}</dt>
                  <dd className="text-sm text-body">
                    {c.role}
                    {c.tech && <span className="mt-0.5 block font-mono text-[11px] text-muted">{c.tech}</span>}
                  </dd>
                </div>
              ))}
            </dl>
          </Block>

          <Block label="What I built">
            <ul className="space-y-3 text-[15px] leading-relaxed text-body">
              {project.whatIBuilt.map((point) => (
                <li key={point} className="flex gap-3">
                  <span className="text-accent" aria-hidden="true">–</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </Block>

          <Block label="The hard part">
            <p className="text-[15px] font-medium leading-relaxed text-ink">{project.engineeringChallenge}</p>
            <p className="mt-3 text-[15px] leading-relaxed text-body">{project.solution}</p>
          </Block>

          <figure className="border-l border-accent pl-5">
            <blockquote className="font-serif text-2xl italic leading-snug text-ink">{project.keyTakeaway}</blockquote>
          </figure>
        </div>
      </div>
    </div>,
    document.body
  );
};
