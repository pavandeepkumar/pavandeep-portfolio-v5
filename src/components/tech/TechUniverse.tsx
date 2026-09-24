import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Layout, Server, Database, Sparkles, Cloud, Boxes, Network } from 'lucide-react';
import { techUniverse } from '../../data/techStack';
import { TechItem } from '../../types/portfolio';
import { Section } from '../layout/Section';
import { categoryTone, Tone } from '../ui/Tag';
import { DevIllustration } from './DevIllustration';

const toneVar: Record<Tone, string> = {
  accent: 'var(--color-accent)',
  ok: 'var(--color-ok)',
  sky: 'var(--color-sky)',
  violet: 'var(--color-violet)',
  neutral: 'var(--color-body)'
};

const pillIdle: Record<Tone, string> = {
  accent: 'border-accent/30 text-accent',
  ok: 'border-ok/30 text-ok',
  sky: 'border-sky/30 text-sky',
  violet: 'border-violet/30 text-violet',
  neutral: 'border-line-strong text-body'
};

const pillActive: Record<Tone, string> = {
  accent: 'bg-accent text-bg border-accent',
  ok: 'bg-ok text-bg border-ok',
  sky: 'bg-sky text-bg border-sky',
  violet: 'bg-violet text-bg border-violet',
  neutral: 'bg-ink text-bg border-ink'
};

const icons: Record<string, React.ElementType> = {
  Frontend: Layout,
  Backend: Server,
  Database: Database,
  AI: Sparkles,
  Cloud: Cloud,
  DevOps: Boxes,
  Architecture: Network
};

// Left side builds the product, right side runs it.
const leftCats = ['Frontend', 'Backend', 'Database', 'AI'];
const rightCats = ['Cloud', 'DevOps', 'Architecture'];
const allTools = [...leftCats, ...rightCats].flatMap((c) => techUniverse[c] ?? []);

interface Wire {
  cat: string;
  d: string;
  hub: { x: number; y: number };
  end: { x: number; y: number };
}

const CYCLE_MS = 4200;

export const TechUniverse: React.FC = () => {
  const [selected, setSelected] = useState<TechItem>(techUniverse['Backend'][0]);
  const [hoverCat, setHoverCat] = useState<string | null>(null);
  const [auto, setAuto] = useState(true);
  const [wires, setWires] = useState<Wire[]>([]);
  const [inView, setInView] = useState(false);

  const wrapRef = useRef<HTMLDivElement>(null);
  const hubRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const activeCat = hoverCat ?? selected.category;

  // Measure card and hub positions and draw a curve from each card to the hub's rim.
  const measure = useCallback(() => {
    const wrap = wrapRef.current;
    const hub = hubRef.current;
    if (!wrap || !hub || window.innerWidth < 1024) {
      setWires([]);
      return;
    }
    const w = wrap.getBoundingClientRect();
    const h = hub.getBoundingClientRect();
    const cx = h.left - w.left + h.width / 2;
    const cy = h.top - w.top + h.height / 2;
    const r = h.width / 2 + 14;

    const next: Wire[] = [];
    for (const cat of [...leftCats, ...rightCats]) {
      const el = cardRefs.current[cat];
      if (!el) continue;
      const c = el.getBoundingClientRect();
      const left = leftCats.includes(cat);
      const ex = left ? c.right - w.left : c.left - w.left;
      const ey = c.top - w.top + Math.min(34, c.height / 2);
      const angle = Math.atan2(ey - cy, ex - cx);
      const hx = cx + r * Math.cos(angle);
      const hy = cy + r * Math.sin(angle);
      const mx = (ex + hx) / 2;
      next.push({ cat, d: `M${ex} ${ey} C${mx} ${ey} ${mx} ${hy} ${hx} ${hy}`, hub: { x: hx, y: hy }, end: { x: ex, y: ey } });
    }
    setWires(next);
  }, []);

  useLayoutEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (wrapRef.current) ro.observe(wrapRef.current);
    document.fonts?.ready.then(measure);
    return () => ro.disconnect();
  }, [measure]);

  // Card heights can change with the selection; keep the wires attached.
  useLayoutEffect(() => {
    measure();
  }, [selected, measure]);

  // Start the line drawing once the diagram scrolls into view.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setInView(true), { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Walk through the tools on its own until the visitor picks one.
  useEffect(() => {
    if (!auto || !inView || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = window.setTimeout(() => {
      const i = allTools.findIndex((x) => x.name === selected.name);
      setSelected(allTools[(i + 1) % allTools.length]);
    }, CYCLE_MS);
    return () => window.clearTimeout(t);
  }, [auto, inView, selected]);

  const pick = (item: TechItem) => {
    setAuto(false);
    setSelected(item);
  };

  const renderCard = (cat: string, i: number, side: 'left' | 'right') => {
    const items = techUniverse[cat] ?? [];
    const tone = categoryTone[cat] ?? 'neutral';
    const Icon = icons[cat] ?? Boxes;
    const isActive = activeCat === cat;
    return (
      <div
        key={cat}
        ref={(el) => {
          cardRefs.current[cat] = el;
        }}
        onMouseEnter={() => setHoverCat(cat)}
        onMouseLeave={() => setHoverCat(null)}
        className={`relative rounded-lg border bg-raised p-4 transition-all duration-300 ${
          isActive ? 'border-line-strong shadow-[0_10px_30px_-15px_rgba(0,0,0,.9)]' : 'border-line'
        } ${inView ? 'anim-in' : 'opacity-0'}`}
        style={{ '--d': `${200 + i * 110}ms` } as React.CSSProperties}
      >
        <div className={`flex items-center gap-3 ${side === 'right' ? 'lg:flex-row' : ''}`}>
          <span
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border transition-colors duration-300"
            style={{
              color: toneVar[tone],
              borderColor: `color-mix(in oklab, ${toneVar[tone]} ${isActive ? 60 : 30}%, transparent)`,
              background: `color-mix(in oklab, ${toneVar[tone]} ${isActive ? 16 : 7}%, transparent)`
            }}
          >
            <Icon className="h-4 w-4" aria-hidden="true" />
          </span>
          <p className="font-mono text-[12px] uppercase tracking-wider text-ink">{cat}</p>
          <span className="ml-auto font-mono text-[11px] text-faint">{items.length}</span>
        </div>
        <div className="mt-3.5 flex flex-wrap gap-1.5">
          {items.map((item) => {
            const isSelected = selected.name === item.name;
            const isCore = item.experienceLevel === 'Primary Core';
            return (
              <button
                key={item.name}
                type="button"
                onClick={() => pick(item)}
                aria-pressed={isSelected}
                className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[11.5px] transition-all duration-200 hover:-translate-y-px ${
                  isSelected ? pillActive[tone] : `${pillIdle[tone]} hover:bg-white/[0.05]`
                }`}
              >
                <span className={`h-1.5 w-1.5 rounded-full border border-current ${isCore ? 'bg-current' : ''}`} aria-hidden="true" />
                {item.name}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  const selTone = toneVar[categoryTone[selected.category] ?? 'neutral'];

  return (
    <Section
      id="stack"
      index="05"
      label="Stack"
      title="Tools I reach for, and what for."
      intro="Left side builds the product, right side runs it. Everything here has shipped in production; a filled dot marks a daily driver. Pick any tool to see how I use it."
    >
      <div
        ref={wrapRef}
        className="relative grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_300px_minmax(0,1fr)] lg:items-center lg:gap-x-20"
      >
        {/* Connectors (desktop) */}
        {inView && wires.length > 0 && (
          <svg className="pointer-events-none absolute inset-0 hidden h-full w-full overflow-visible lg:block" aria-hidden="true">
            {wires.map((w, i) => {
              const tone = toneVar[categoryTone[w.cat] ?? 'neutral'];
              const on = w.cat === activeCat;
              return (
                <g key={w.cat} style={{ transition: 'opacity 300ms' }} opacity={on ? 1 : 0.45}>
                  <path
                    id={`wire-${w.cat}`}
                    d={w.d}
                    pathLength={1}
                    fill="none"
                    stroke={on ? tone : 'var(--color-line-strong)'}
                    strokeWidth={on ? 1.6 : 1}
                    className="draw-path"
                    style={{ '--d': `${300 + i * 110}ms`, transition: 'stroke 300ms' } as React.CSSProperties}
                  />
                  <circle cx={w.end.x} cy={w.end.y} r="4" fill="var(--color-bg)" stroke={tone} strokeWidth="1.5" />
                  <circle cx={w.hub.x} cy={w.hub.y} r="3" fill={tone} />
                  {on && (
                    <circle r="2.5" fill={tone}>
                      <animateMotion dur="1.8s" repeatCount="indefinite" keyPoints={leftCats.includes(w.cat) ? '0;1' : '0;1'} keyTimes="0;1">
                        <mpath href={`#wire-${w.cat}`} />
                      </animateMotion>
                    </circle>
                  )}
                </g>
              );
            })}
          </svg>
        )}

        {/* Left: build */}
        <div className="order-2 space-y-4 lg:order-none">{leftCats.map((c, i) => renderCard(c, i, 'left'))}</div>

        {/* Hub: illustration in a two-tone circle, inspector card underneath */}
        <div className="order-1 flex flex-col items-center py-4 lg:order-none lg:py-0">
          <div ref={hubRef} className="relative h-[250px] w-[250px] sm:h-[270px] sm:w-[270px]">
            {/* Slow orbit ring with travelling dots */}
            <div className="orbit absolute -inset-3.5 rounded-full border border-dashed border-line-strong" aria-hidden="true">
              <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-accent" />
              <span className="absolute -bottom-1 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-violet" />
            </div>
            <div
              className="relative h-full w-full overflow-hidden rounded-full border border-line-strong transition-shadow duration-500"
              style={{
                background:
                  'linear-gradient(90deg, color-mix(in oklab, var(--color-accent) 9%, var(--color-raised)) 50%, color-mix(in oklab, var(--color-violet) 9%, var(--color-raised)) 50%)',
                boxShadow: `0 0 0 1px color-mix(in oklab, ${selTone} 25%, transparent), 0 20px 60px -25px ${selTone}`
              }}
            >
              <span className="absolute top-6 left-[20%] font-mono text-[9.5px] uppercase tracking-widest text-accent/80">build</span>
              <span className="absolute top-6 right-[22%] font-mono text-[9.5px] uppercase tracking-widest text-violet/80">run</span>
              <div className="absolute inset-x-3 bottom-0 top-8">
                <DevIllustration accent={selTone} />
              </div>
            </div>
          </div>

          <div
            className="relative mt-8 flex min-h-[200px] w-full max-w-[300px] flex-col justify-center rounded-lg border border-line bg-raised p-4 text-center"
            aria-live="polite"
          >
            <span
              className="absolute -top-2 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-t border-l border-line bg-raised"
              aria-hidden="true"
            />
            <div key={selected.name} className="anim-in">
              <p className="font-mono text-[10px] uppercase tracking-wider" style={{ color: selTone }}>
                {selected.category} · {selected.experienceLevel}
              </p>
              <h3 className="mt-1 font-serif text-[28px] leading-tight text-ink">{selected.name}</h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-body">{selected.usageDescription}</p>
            </div>
            {auto && inView && (
              <p className="mt-3 font-mono text-[9.5px] text-faint">auto-playing · tap a tool to stop</p>
            )}
          </div>
        </div>

        {/* Right: run */}
        <div className="order-3 space-y-4 lg:order-none">{rightCats.map((c, i) => renderCard(c, i + leftCats.length, 'right'))}</div>
      </div>
    </Section>
  );
};
