import React, { useEffect, useRef, useState } from 'react';
import { AppIcon, LlmIcon, ShieldIcon } from '../ai/AiIcons';
import { ServicesIcon } from '../contact/ContactIcons';
import { CloudIcon, DatabaseIcon } from './AboutIcons';

interface Layer {
  id: string;
  label: string;
  title: string;
  subtitle: string;
  details: string;
  stack: string[];
  Icon: React.FC<{ className?: string }>;
  tone: string;
}

const layers: Layer[] = [
  {
    id: 'client',
    label: 'Client',
    title: 'Client layer',
    subtitle: 'React · Next.js · TypeScript',
    details: 'Typed UI, optimistic updates, live WebSocket data and mobile-first layouts.',
    stack: ['React 19', 'Next.js', 'Tailwind', 'TypeScript'],
    Icon: AppIcon,
    tone: 'var(--color-sky)'
  },
  {
    id: 'gateway',
    label: 'Gateway',
    title: 'API gateway & ingress',
    subtitle: 'Nginx · NestJS gateway',
    details: 'One way in: TLS, per-token rate limits and JWT checks before any service runs.',
    stack: ['Nginx', 'NestJS proxy', 'RateLimiterGuard'],
    Icon: ShieldIcon,
    tone: 'var(--color-violet)'
  },
  {
    id: 'services',
    label: 'Services',
    title: 'Distributed NestJS services',
    subtitle: 'Microservices & domain logic',
    details: 'Clear service boundaries, gRPC handlers, validation pipes and state machines.',
    stack: ['NestJS', 'gRPC', 'Protobuf', 'class-validator'],
    Icon: ServicesIcon,
    tone: 'var(--color-accent)'
  },
  {
    id: 'persistence',
    label: 'Storage',
    title: 'State & persistence',
    subtitle: 'PostgreSQL · Redis',
    details: 'ACID transactions, row locks for concurrency, indexes and Redis caches.',
    stack: ['PostgreSQL 16', 'Redis 7', 'TypeORM'],
    Icon: DatabaseIcon,
    tone: 'var(--color-ok)'
  },
  {
    id: 'infra',
    label: 'Infra',
    title: 'Infrastructure & DevOps',
    subtitle: 'AWS · Docker Compose',
    details: 'Multi-stage Docker images, isolated compose networks, EC2 hosts and S3 assets.',
    stack: ['Docker', 'Compose', 'AWS EC2', 'RDS', 'S3'],
    Icon: CloudIcon,
    tone: 'var(--color-muted)'
  }
];

const aiLayer: Layer = {
  id: 'aiLayer',
  label: 'AI',
  title: 'AI tool-calling pipeline',
  subtitle: 'RAG · LLM tools · backend bridge',
  details: 'Runs beside the main path, not inside it. The model proposes typed calls; services validate and run them.',
  stack: ['LLM APIs', 'Vector store', 'Typed tools'],
  Icon: LlmIcon,
  tone: 'var(--color-violet)'
};

const all = [...layers, aiLayer];
const CYCLE_MS = 3600;

/** The layers a typical request crosses, drawn as a stack; select one to read what lives there. */
export const ArchitectureFlow: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(1);
  const [auto, setAuto] = useState(true);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const playing = auto && inView && !paused && !reduced;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!playing) return;
    const t = window.setTimeout(() => setActiveIdx((i) => (i + 1) % all.length), CYCLE_MS);
    return () => window.clearTimeout(t);
  }, [playing, activeIdx]);

  const pick = (i: number) => {
    setAuto(false);
    setActiveIdx(i);
  };

  const active = all[activeIdx];
  const isAiActive = active.id === 'aiLayer';

  const slab = (layer: Layer, i: number) => {
    const on = i === activeIdx;
    const Icon = layer.Icon;
    return (
      <button
        type="button"
        role="tab"
        aria-selected={on}
        onClick={() => pick(i)}
        className={`group relative z-10 flex w-full items-center gap-3 rounded-xl border p-2 pr-3 text-left transition-all duration-300 ${
          on ? 'lg:translate-x-1 border-accent/60 bg-tint shadow-[0_10px_28px_-16px_var(--color-accent)]' : 'border-line bg-raised hover:border-line-strong'
        }`}
      >
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-line bg-bg">
          <Icon className="h-9 w-9 transition-transform duration-300 group-hover:-translate-y-0.5" />
        </span>
        <span className="min-w-0 flex-1">
          <span className={`block text-[14px] leading-tight ${on ? 'text-ink' : 'text-body'}`}>{layer.label}</span>
          <span className="mt-0.5 block truncate font-mono text-[10.5px] text-faint">{layer.subtitle}</span>
        </span>
        <span className="h-2 w-2 shrink-0 rounded-full transition-opacity" style={{ background: layer.tone, opacity: on ? 1 : 0.35 }} />
      </button>
    );
  };

  return (
    <div
      ref={ref}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="grid grid-cols-1 gap-y-8 md:grid-cols-12 md:gap-x-8"
    >
      <div className="md:col-span-3">
        <h3 className="eyebrow">A request, top to bottom</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted">The layers I usually own on a project. Watch one pass, or pick a layer.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:col-span-9 lg:grid-cols-[minmax(0,19rem)_1fr]">
        {/* The stack */}
        <div role="tablist" aria-orientation="vertical" aria-label="Architecture layers">
          <div className="relative space-y-2.5 pl-7">
            {/* Rail the request travels down */}
            <span className="absolute top-6 bottom-6 left-2.5 w-0.5 bg-line" aria-hidden="true">
              <span
                className="absolute inset-x-0 top-0 bg-gradient-to-b from-sky via-accent to-ok transition-[height] duration-500"
                style={{ height: isAiActive ? '50%' : `${(activeIdx / (layers.length - 1)) * 100}%` }}
              />
              {!reduced && (
                <span className="rail-dot absolute left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-ink shadow-[0_0_10px_2px_var(--color-accent)]" />
              )}
            </span>
            {layers.map((layer, i) => (
              <div key={layer.id} className="relative">
                <span
                  className="absolute top-1/2 -left-[22px] h-2 w-2 -translate-y-1/2 rounded-full border-2 border-bg transition-colors"
                  style={{ background: i <= activeIdx && !isAiActive ? layer.tone : 'var(--color-line-strong)' }}
                  aria-hidden="true"
                />
                {slab(layer, i)}
              </div>
            ))}
          </div>

          {/* AI runs alongside, hooked into services */}
          <div className="relative mt-4 border-t border-dashed border-line-strong pt-4 pl-7">
            <span className="absolute top-4 left-1 font-mono text-[10px] text-faint" aria-hidden="true">
              ++
            </span>
            {slab(aiLayer, all.length - 1)}
            <p className="mt-1.5 pl-1 font-mono text-[10px] text-faint">runs beside services, not inside them</p>
          </div>
        </div>

        {/* Detail */}
        <div role="tabpanel" className="relative self-start overflow-hidden rounded-xl border border-line bg-raised p-6 sm:p-7">
          <span
            className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full opacity-20 blur-3xl transition-colors duration-500"
            style={{ background: active.tone }}
            aria-hidden="true"
          />
          <div key={active.id} className="anim-in relative">
            <div className="flex items-center gap-4">
              <active.Icon className="h-16 w-16 shrink-0" />
              <div className="min-w-0">
                <p className="font-mono text-[11px] text-muted">
                  {active.id === 'aiLayer' ? '++' : String(activeIdx + 1).padStart(2, '0')} · {active.subtitle}
                </p>
                <h4 className="mt-1 font-serif text-3xl leading-tight text-ink">{active.title}</h4>
              </div>
            </div>
            <p className="mt-5 text-[15px] leading-relaxed text-body">{active.details}</p>
            <div className="mt-6 flex flex-wrap gap-1.5 border-t border-line pt-4">
              {active.stack.map((s, i) => (
                <span
                  key={s}
                  className="anim-in rounded-full border border-line-strong bg-bg px-2.5 py-1 font-mono text-[11px] text-body"
                  style={{ '--d': `${150 + i * 70}ms` } as React.CSSProperties}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
          {auto && inView && !reduced && (
            <span className="relative mt-5 block h-0.5 overflow-hidden rounded-full bg-line">
              <span
                key={activeIdx}
                className="progress-bar block h-full bg-accent"
                style={{ animationDuration: `${CYCLE_MS}ms`, animationPlayState: paused ? 'paused' : 'running' }}
              />
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
