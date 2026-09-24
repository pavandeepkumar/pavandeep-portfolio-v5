import React, { useEffect, useRef, useState } from 'react';
import { careerTimeline } from '../../data/experience';
import { profileData } from '../../data/profile';
import { projectsData } from '../../data/projects';
import { Section } from '../layout/Section';
import { TechTags } from '../ui/Tag';
import { BackendIcon, UserIcon } from '../ai/AiIcons';
import { ServicesIcon } from '../contact/ContactIcons';
import { BrowserIcon } from '../about/AboutIcons';

/** Layers of a request each role owned. Each role adds blocks on top of the last. */
const layerStyle: Record<string, { color: string; label: string }> = {
  ui: { color: 'var(--color-sky)', label: 'UI' },
  state: { color: 'color-mix(in oklab, var(--color-sky) 55%, var(--color-violet))', label: 'State' },
  api: { color: 'var(--color-accent)', label: 'API' },
  db: { color: 'var(--color-ok)', label: 'DB' },
  infra: { color: 'var(--color-muted)', label: 'Infra' },
  ai: { color: 'var(--color-violet)', label: 'AI' }
};

// Oldest first, matching careerTimeline read from the end.
const owned: Record<string, string[]> = {
  'React Intern': ['ui'],
  'React Developer': ['ui', 'state'],
  'Full Stack Developer': ['ui', 'state', 'api', 'db'],
  'Software Engineer': ['ui', 'state', 'api', 'db', 'infra', 'ai']
};

const roleIcon: Record<string, React.FC<{ className?: string }>> = {
  'React Intern': UserIcon,
  'React Developer': BrowserIcon,
  'Full Stack Developer': BackendIcon,
  'Software Engineer': ServicesIcon
};

const roles = [...careerTimeline].reverse();

export const ExperienceTimeline: React.FC = () => {
  const [selected, setSelected] = useState(roles.length - 1);
  const [seen, setSeen] = useState(false);
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = chartRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const facts = [
    { value: profileData.experienceYears, label: 'years at Devstree' },
    { value: String(careerTimeline.length), label: 'roles, intern to engineer' },
    { value: '15+', label: 'production projects' },
    { value: String(projectsData.length), label: 'case studies on this page' }
  ];

  const m = roles[selected];
  const SelectedIcon = roleIcon[m.role] ?? UserIcon;
  const isCurrent = selected === roles.length - 1;

  return (
    <Section
      id="experience"
      index="06"
      label="Experience"
      title={
        <>
          One company, <em>four different jobs.</em>
        </>
      }
      intro="Devstree IT Services Pvt. Ltd., April 2023 to now. Each role added a layer of the request I was trusted to own."
    >
      {/* Numbers first */}
      <dl className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {facts.map((f) => (
          <div key={f.label} className="rounded-lg border border-line bg-raised p-5">
            <dt className="sr-only">{f.label}</dt>
            <dd className="font-serif text-4xl leading-none text-accent">{f.value}</dd>
            <dd className="mt-2 text-[13px] text-muted">{f.label}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Staircase: one column per role, blocks = layers owned */}
        <div ref={chartRef} className="rounded-xl border border-line bg-raised p-4 sm:p-6 lg:col-span-7">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="eyebrow">What each role owned</p>
            <div className="flex flex-wrap gap-x-3 gap-y-1">
              {Object.values(layerStyle).map((l) => (
                <span key={l.label} className="flex items-center gap-1.5 font-mono text-[10px] text-muted">
                  <span className="h-2 w-2 rounded-sm" style={{ background: l.color }} />
                  {l.label}
                </span>
              ))}
            </div>
          </div>

          <div
            className="relative mt-6 grid grid-cols-4 items-end gap-2 sm:gap-4"
            role="tablist"
            aria-label="Roles"
            style={{
              backgroundImage: 'linear-gradient(to top, var(--color-line) 1px, transparent 1px)',
              backgroundSize: '100% 34px',
              backgroundPosition: 'bottom'
            }}
          >
            {roles.map((r, col) => {
              const blocks = owned[r.role] ?? ['ui'];
              const Icon = roleIcon[r.role] ?? UserIcon;
              const on = col === selected;
              const current = col === roles.length - 1;
              return (
                <button
                  key={r.period}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  onClick={() => setSelected(col)}
                  className="group flex flex-col items-center"
                >
                  {current && (
                    <span className="mb-1 rounded-full border border-ok/40 bg-ok/10 px-1.5 font-mono text-[9px] text-ok">now</span>
                  )}
                  <span
                    className={`flex h-11 w-11 items-center justify-center rounded-xl border bg-bg transition-all duration-300 sm:h-12 sm:w-12 ${
                      on ? 'scale-110 border-accent shadow-[0_8px_24px_-10px_var(--color-accent)]' : 'border-line group-hover:border-line-strong'
                    }`}
                  >
                    <Icon className="h-9 w-9 transition-transform duration-300 group-hover:-translate-y-0.5" />
                  </span>
                  <span className="mt-2 flex w-full flex-col-reverse gap-0.5">
                    {blocks.map((b, i) => (
                      <span
                        key={b}
                        className="flex h-8 items-center justify-center rounded-[5px] font-mono text-[10px] text-bg transition-all duration-500 ease-[cubic-bezier(.2,.7,.2,1)] sm:text-[11px]"
                        style={{
                          background: layerStyle[b].color,
                          opacity: seen ? (on ? 1 : 0.55) : 0,
                          transform: seen ? 'none' : 'translateY(12px) scaleY(0.4)',
                          transitionDelay: seen ? `${col * 220 + i * 90}ms` : '0ms'
                        }}
                      >
                        {layerStyle[b].label}
                      </span>
                    ))}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Year axis */}
          <div className="mt-2 grid grid-cols-4 gap-2 border-t border-line-strong pt-2 sm:gap-4">
            {roles.map((r, col) => (
              <button
                key={r.period}
                type="button"
                onClick={() => setSelected(col)}
                className={`text-center leading-tight transition-colors ${col === selected ? 'text-ink' : 'text-muted hover:text-ink'}`}
                tabIndex={-1}
              >
                <span className="block text-[12px] sm:text-[13px]">{r.role.replace('Developer', 'Dev')}</span>
                <span className={`mt-0.5 block font-mono text-[10px] ${col === selected ? 'text-accent' : 'text-faint'}`}>{r.period}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Selected role */}
        <div role="tabpanel" className="relative overflow-hidden rounded-xl border border-line bg-raised p-6 lg:col-span-5">
          <div key={m.period} className="anim-in">
            <div className="flex items-center gap-4">
              <SelectedIcon className="h-14 w-14 shrink-0" />
              <div className="min-w-0">
                <p className="font-mono text-xs text-accent">
                  {m.period}
                  {isCurrent && <span className="ml-2 text-ok">current</span>}
                </p>
                <h3 className="mt-1 font-serif text-3xl leading-tight text-ink">{m.role}</h3>
              </div>
            </div>
            <p className="mt-3 text-sm text-muted">{m.shift}</p>
            <p className="mt-4 text-[14.5px] leading-relaxed text-body">{m.description}</p>
            <TechTags items={m.skills} className="mt-4" />
            <details className="group mt-5 border-t border-line pt-4">
              <summary className="cursor-pointer list-none font-mono text-xs text-muted transition-colors hover:text-ink">
                <span className="group-open:hidden">+ responsibilities ({m.responsibilities.length})</span>
                <span className="hidden group-open:inline">− responsibilities</span>
              </summary>
              <ul className="mt-3 space-y-2 text-[14px] leading-relaxed text-body">
                {m.responsibilities.map((resp) => (
                  <li key={resp} className="flex gap-3">
                    <span className="text-faint" aria-hidden="true">–</span>
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </details>
          </div>
          {/* Step dots to move between roles */}
          <div className="mt-6 flex items-center gap-1.5">
            {roles.map((r, col) => (
              <button
                key={r.period}
                type="button"
                onClick={() => setSelected(col)}
                aria-label={r.role}
                className={`h-1.5 rounded-full transition-all duration-300 ${col === selected ? 'w-6 bg-accent' : 'w-1.5 bg-line-strong hover:bg-muted'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};
