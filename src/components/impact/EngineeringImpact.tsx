import React, { useEffect, useRef, useState } from 'react';
import { Layers, Zap, Network, Boxes, Sparkles, Radio } from 'lucide-react';
import { engineeringImpactData, type ImpactMetric } from '../../data/impact';
import { Section } from '../layout/Section';

const icons: Record<string, React.ElementType> = {
  Architecture: Layers,
  Performance: Zap,
  Integrations: Network,
  'Product Development': Boxes,
  'AI Engineering': Sparkles,
  Scalability: Radio
};

const reducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** True once the element has scrolled into view (never flips back). */
function useSeen<T extends Element>(threshold = 0.35) {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reducedMotion()) {
      setSeen(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, seen] as const;
}

/** Counts from 0 to `to` once `run` turns true. */
const Count: React.FC<{ to: number; run: boolean; ms?: number }> = ({ to, run, ms = 1400 }) => {
  const [n, setN] = useState(reducedMotion() ? to : 0);
  useEffect(() => {
    if (!run || reducedMotion()) {
      if (run) setN(to);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / ms);
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, to, ms]);
  return <>{n}</>;
};

/* ---------- Headline strip ---------- */

const headline = [
  { value: 7, prefix: '', suffix: '', label: 'backend services split out of one monolith', tone: 'text-accent' },
  { value: 85, prefix: '−', suffix: '%', label: 'p95 catalog read latency after caching', tone: 'text-ok' },
  { value: 0, prefix: '', suffix: '', label: 'double charges from webhook retries', tone: 'text-sky' },
  { value: 1, prefix: '<', suffix: ' ms', label: 'nearby-driver search on Redis GEO', tone: 'text-violet' }
];

const HeadlineStrip: React.FC = () => {
  const [ref, seen] = useSeen<HTMLDListElement>(0.4);
  return (
    <dl ref={ref} className="grid grid-cols-2 overflow-hidden rounded-lg border border-line bg-raised lg:grid-cols-4">
      {headline.map((h, i) => (
        <div
          key={h.label}
          className={`relative p-5 sm:p-6 ${i % 2 ? 'border-l border-line' : ''} ${i > 1 ? 'border-t border-line lg:border-t-0' : ''} ${
            i === 2 ? 'lg:border-l' : ''
          }`}
        >
          <dt className="sr-only">{h.label}</dt>
          <dd className={`whitespace-nowrap font-serif text-5xl leading-none tabular-nums sm:text-6xl ${h.tone}`}>
            {h.prefix}
            <Count to={h.value} run={seen} />
            <span className="text-3xl sm:text-4xl">{h.suffix}</span>
          </dd>
          <p className="mt-3 text-[13px] leading-snug text-muted">{h.label}</p>
          {/* Underline fills in once the number lands */}
          <span
            className="absolute bottom-0 left-0 h-0.5 transition-[width] duration-[1400ms] ease-out"
            style={{ width: seen ? '100%' : '0%', transitionDelay: `${i * 150}ms` }}
            aria-hidden="true"
          >
            <span className={`block h-full w-full ${h.tone.replace('text-', 'bg-')}`} />
          </span>
        </div>
      ))}
    </dl>
  );
};

/* ---------- Per-card visuals ---------- */

const RING_R = 30;
const RING_C = 2 * Math.PI * RING_R;

const MetricVisual: React.FC<{ metric: ImpactMetric; seen: boolean }> = ({ metric, seen }) => {
  if (metric.kind === 'count') {
    return (
      <div className="flex items-center gap-4">
        <span className="font-serif text-5xl leading-none text-ink tabular-nums">
          <Count to={metric.value} run={seen} ms={900} />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap gap-1.5" aria-hidden="true">
            {Array.from({ length: metric.value }).map((_, i) => (
              <span
                key={i}
                className="h-3.5 w-3.5 rounded-[4px] border border-accent/60 bg-accent/20 transition-all duration-500"
                style={{
                  opacity: seen ? 1 : 0,
                  transform: seen ? 'scale(1)' : 'scale(0.3)',
                  transitionDelay: `${150 + i * 110}ms`
                }}
              />
            ))}
          </div>
          <p className="mt-2 font-mono text-[11px] leading-snug text-muted">{metric.label}</p>
        </div>
      </div>
    );
  }

  if (metric.kind === 'ring') {
    return (
      <div className="flex items-center gap-4">
        <div className="relative h-[76px] w-[76px] shrink-0">
          <svg viewBox="0 0 76 76" className="h-full w-full -rotate-90" aria-hidden="true">
            <circle cx="38" cy="38" r={RING_R} fill="none" stroke="var(--color-line-strong)" strokeWidth="6" />
            <circle
              cx="38"
              cy="38"
              r={RING_R}
              fill="none"
              stroke="var(--color-ok)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={RING_C}
              strokeDashoffset={seen ? RING_C * (1 - metric.value / 100) : RING_C}
              style={{ transition: 'stroke-dashoffset 1400ms cubic-bezier(.2,.7,.2,1)' }}
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center font-serif text-xl text-ink tabular-nums">
            <Count to={metric.value} run={seen} />%
          </span>
        </div>
        <div className="min-w-0">
          <p className="font-mono text-[11px] leading-snug text-muted">{metric.label}</p>
          <p className="mt-1.5 inline-flex items-center gap-1.5 rounded-full border border-ok/30 bg-ok/10 px-2 py-0.5 font-mono text-[10.5px] text-ok">
            <span className="h-1.5 w-1.5 rounded-full bg-ok" aria-hidden="true" />
            {metric.note}
          </p>
        </div>
      </div>
    );
  }

  const max = Math.max(metric.before.value, metric.after.value);
  const rows = [
    { tag: 'before', ...metric.before, bar: 'bg-line-strong', tone: 'text-muted' },
    { tag: 'after', ...metric.after, bar: 'bg-ok', tone: 'text-ok' }
  ];
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <span className="whitespace-nowrap font-serif text-4xl leading-none text-ok">{metric.delta}</span>
        <span className="text-right font-mono text-[11px] text-muted">{metric.label}</span>
      </div>
      <div className="mt-3 space-y-2">
        {rows.map((r, i) => (
          <div key={r.tag} className="grid grid-cols-[44px_1fr] items-center gap-2">
            <span className="font-mono text-[10px] uppercase tracking-wider text-faint">{r.tag}</span>
            <div className="relative h-5 overflow-hidden rounded bg-bg">
              <span
                className={`absolute inset-y-0 left-0 rounded ${r.bar} transition-[width] duration-[1200ms] ease-[cubic-bezier(.2,.7,.2,1)]`}
                style={{
                  width: seen ? `${Math.max(2, (r.value / max) * 100)}%` : '0%',
                  transitionDelay: `${i * 350}ms`
                }}
              />
              <span className={`absolute inset-y-0 right-2 flex items-center font-mono text-[10.5px] ${r.tone}`}>{r.text}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ---------- Card ---------- */

const ImpactCard: React.FC<{ item: (typeof engineeringImpactData)[number]; index: number }> = ({ item, index }) => {
  const [ref, seen] = useSeen<HTMLLIElement>();
  const Icon = icons[item.category] ?? Layers;
  return (
    <li
      ref={ref}
      className="group flex flex-col rounded-lg border border-line bg-raised p-6 transition-all duration-500 hover:-translate-y-0.5 hover:border-line-strong"
      style={{
        opacity: seen ? 1 : 0,
        transform: seen ? undefined : 'translateY(16px)',
        transitionDelay: seen ? `${(index % 3) * 90}ms` : '0ms'
      }}
    >
      <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-accent">
        <Icon className="h-4 w-4" aria-hidden="true" />
        {item.category}
      </p>

      <div className="mt-5 rounded-md border border-line bg-bg/60 p-4">
        <MetricVisual metric={item.metric} seen={seen} />
      </div>

      <h3 className="mt-5 font-serif text-2xl leading-snug text-ink">{item.title}</h3>
      <p className="mt-3 text-[14px] leading-relaxed text-body">{item.description}</p>
      <details className="group/how mt-4">
        <summary className="cursor-pointer list-none font-mono text-[11px] text-muted transition-colors hover:text-ink">
          <span className="group-open/how:hidden">+ how ({item.technicalDetails.length})</span>
          <span className="hidden group-open/how:inline">− how</span>
        </summary>
        <ul className="mt-3 space-y-2 text-[13.5px] leading-relaxed text-muted">
          {item.technicalDetails.map((detail) => (
            <li key={detail} className="flex gap-2.5">
              <span className="text-faint" aria-hidden="true">–</span>
              <span>{detail}</span>
            </li>
          ))}
        </ul>
      </details>
      <p className="mt-auto border-t border-line pt-4 font-mono text-[11.5px] leading-relaxed text-muted">
        <span className="text-faint">seen in </span>
        {item.systemEvidence}
      </p>
    </li>
  );
};

export const EngineeringImpact: React.FC = () => {
  return (
    <Section
      id="impact"
      index="07"
      label="Impact"
      title="What the work changed."
      intro="The number that moved, and the system it moved in."
    >
      <HeadlineStrip />
      <ul className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
        {engineeringImpactData.map((item, i) => (
          <ImpactCard key={item.category} item={item} index={i} />
        ))}
      </ul>
    </Section>
  );
};
