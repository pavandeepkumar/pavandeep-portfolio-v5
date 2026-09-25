import React, { useEffect, useRef, useState } from 'react';
import { ActionIcon, AppIcon, BackendIcon, LlmIcon, PromptIcon, RagIcon, ToolIcon, UserIcon } from './AiIcons';

/**
 * One Travel Buddy request walked through the eight steps. Steps 01–05 can be
 * wrong (model territory); from 06 the schema gate decides what reaches the DB.
 */
const steps = [
  { label: 'User', sub: 'intent', Icon: UserIcon, says: 'Free text in, no structure yet.', payload: '"2 nights in Goa under ₹5k, near the beach"' },
  { label: 'AI app', sub: 'session', Icon: AppIcon, says: 'The client adds who is asking and from where.', payload: 'session · prefs · locale=en-IN' },
  { label: 'Prompt', sub: 'guardrails', Icon: PromptIcon, says: 'Rules are set before the model sees anything.', payload: 'sys: book only via tools, never quote prices' },
  { label: 'RAG', sub: 'retrieval', Icon: RagIcon, says: 'Relevant catalog facts are pulled in as context.', payload: 'top-5 chunks · Goa hotels · beach distance' },
  { label: 'LLM', sub: 'reasoning', Icon: LlmIcon, says: 'The model proposes a tool call. It can still be wrong.', payload: '{ tool: "search_hotels", city: "Goa", max: 5000 }' },
  { label: 'Tool call', sub: 'schema gate', Icon: ToolIcon, says: 'Arguments are validated. A bad call stops here.', payload: 'schema.parse(args) ✓' },
  { label: 'Backend', sub: 'NestJS · DB', Icon: BackendIcon, says: 'Real prices and availability come from Postgres.', payload: 'SELECT rooms WHERE city=$1 AND rate<=$2' },
  { label: 'Action', sub: 'committed', Icon: ActionIcon, says: 'State changes only inside a DB transaction.', payload: 'booking TB-1042 · ₹4,650 · confirmed' }
];

const GATE = 5; // first deterministic step (0-based)
const STEP_MS = 2200;

export const AiPipeline: React.FC = () => {
  const [active, setActive] = useState(0);
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
    const t = window.setTimeout(() => setActive((i) => (i + 1) % steps.length), STEP_MS);
    return () => window.clearTimeout(t);
  }, [playing, active]);

  const pick = (i: number) => {
    setAuto(false);
    setActive(i);
  };

  const current = steps[active];
  const safe = active >= GATE;

  const node = (i: number) => {
    const { label, sub, Icon } = steps[i];
    const on = i === active;
    const done = i < active;
    return (
      <li key={label} className="flex flex-col items-center text-center">
        <button
          type="button"
          onClick={() => pick(i)}
          aria-pressed={on}
          aria-label={`${String(i + 1).padStart(2, '0')} ${label}`}
          className={`group relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl border transition-all duration-300 sm:h-16 sm:w-16 ${
            on
              ? 'scale-110 border-accent bg-tint shadow-[0_0_0_5px_color-mix(in_oklab,var(--color-accent)_16%,transparent),0_10px_28px_-10px_var(--color-accent)]'
              : done
                ? 'border-line-strong bg-raised'
                : 'border-line bg-raised hover:border-line-strong'
          }`}
        >
          <Icon className={`h-10 w-10 transition-all duration-300 group-hover:-translate-y-0.5 sm:h-11 sm:w-11 ${on || done ? '' : 'opacity-70'}`} />
          <span
            className={`absolute -top-1.5 -right-1.5 rounded-full border bg-bg px-1 font-mono text-[9px] leading-4 ${
              on ? 'border-accent text-accent' : 'border-line-strong text-faint'
            }`}
          >
            {String(i + 1).padStart(2, '0')}
          </span>
        </button>
        <span className={`mt-3 text-[13px] leading-tight transition-colors ${on ? 'text-accent' : 'text-ink'}`}>{label}</span>
        <span className="mt-0.5 font-mono text-[10px] text-faint">{sub}</span>
      </li>
    );
  };

  return (
    <div ref={ref} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="relative grid grid-cols-1 gap-3 md:grid-cols-8 md:gap-0">
        {/* Track through the node centres, filled up to the active step (desktop) */}
        <div className="pointer-events-none absolute z-[5] top-[79px] right-[6.25%] left-[6.25%] hidden h-0.5 bg-line md:block" aria-hidden="true">
          <span
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-violet via-accent to-ok transition-[width] duration-700 ease-[cubic-bezier(.2,.7,.2,1)]"
            style={{ width: `${(active / (steps.length - 1)) * 100}%` }}
          />
          <span
            className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink shadow-[0_0_12px_2px_var(--color-accent)] transition-[left] duration-700 ease-[cubic-bezier(.2,.7,.2,1)]"
            style={{ left: `${(active / (steps.length - 1)) * 100}%` }}
          />
        </div>

        {/* Zone 1: the model may be wrong */}
        <div className="rounded-xl border border-dashed border-violet/30 bg-violet/[0.04] px-2 pt-3 pb-5 md:col-span-5 md:rounded-r-none md:border-r-0 md:px-0">
          <p className="mb-5 px-3 font-mono text-[10px] uppercase tracking-wider text-violet">probabilistic · may be wrong</p>
          <ol className="grid grid-cols-3 gap-y-6 md:grid-cols-5">{[0, 1, 2, 3, 4].map(node)}</ol>
        </div>

        {/* Zone 2: validated, deterministic */}
        <div className="relative rounded-xl border border-ok/30 bg-ok/[0.05] px-2 pt-3 pb-5 md:col-span-3 md:rounded-l-none md:px-0">
          {/* Schema gate on the boundary */}
          <span
            className="absolute top-1/2 -left-px hidden h-[70%] w-0.5 -translate-y-1/2 bg-gradient-to-b from-transparent via-accent to-transparent md:block"
            aria-hidden="true"
          />
          <p className="mb-5 px-3 font-mono text-[10px] uppercase tracking-wider text-ok">deterministic · validated</p>
          <ol className="grid grid-cols-3 gap-y-6">{[5, 6, 7].map(node)}</ol>
        </div>
      </div>

      {/* What happens at the active step */}
      <div className="mt-4 flex flex-col gap-3 rounded-xl border border-line bg-raised card-shadow p-4 sm:flex-row sm:items-center sm:gap-5 sm:p-5">
        <current.Icon className="hidden h-12 w-12 shrink-0 sm:block" />
        <div key={active} className="anim-in min-w-0 flex-1">
          <p className="font-mono text-[10.5px] uppercase tracking-wider text-faint">
            step {String(active + 1).padStart(2, '0')} · {current.label}
          </p>
          <p className="mt-1 text-[14.5px] leading-snug text-ink">{current.says}</p>
          <code
            className={`mt-2 inline-block max-w-full rounded-md border px-2 py-1 font-mono text-[11.5px] [overflow-wrap:anywhere] ${
              safe ? 'border-ok/30 bg-ok/10 text-ok' : 'border-violet/30 bg-violet/10 text-violet'
            }`}
          >
            {current.payload}
          </code>
        </div>
        <span
          className={`self-start rounded-full border px-2.5 py-1 font-mono text-[10px] whitespace-nowrap sm:self-center ${
            safe ? 'border-ok/40 text-ok' : 'border-violet/40 text-violet'
          }`}
        >
          {safe ? 'backend decides' : 'model suggests'}
        </span>
      </div>
      {auto && inView && !reduced && <p className="mt-2 font-mono text-[10px] text-faint">playing one Travel Buddy request · pick a step to stop</p>}
    </div>
  );
};
