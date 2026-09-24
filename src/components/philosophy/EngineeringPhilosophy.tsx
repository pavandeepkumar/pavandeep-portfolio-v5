import React, { useEffect, useRef, useState } from 'react';
import { RefreshCw } from 'lucide-react';
import { philosophyPrinciples } from '../../data/philosophy';
import { Section } from '../layout/Section';
import { lifecycleIcons as icons } from './PhilosophyIcons';

const CYCLE_MS = 5200;
const STEP = 360 / philosophyPrinciples.length;

/** Node angle in degrees, starting at 12 o'clock and going clockwise. */
const angleOf = (i: number) => -90 + i * STEP;
const rad = (deg: number) => (deg * Math.PI) / 180;

export const EngineeringPhilosophy: React.FC = () => {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const playing = auto && inView && !paused && !reduced;

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!playing) return;
    const t = window.setTimeout(() => setActive((i) => (i + 1) % philosophyPrinciples.length), CYCLE_MS);
    return () => window.clearTimeout(t);
  }, [playing, active]);

  const pick = (i: number) => {
    setAuto(false);
    setActive(i);
  };

  const current = philosophyPrinciples[active];
  const CurrentIcon = icons[active];

  return (
    <Section
      id="philosophy"
      index="03"
      label="Principles"
      title="How I think about engineering."
      intro="Six habits that run in a loop: understand, design, build, measure, automate, ship, and back to the problem. Pick a step to see what I actually do."
    >
      <div
        ref={stageRef}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        className="relative mx-auto h-[330px] w-full max-w-[1000px] [--r:118px] sm:h-[400px] sm:[--r:150px] lg:h-[700px] lg:[--r:200px]"
      >
        {/* Wheel drawing, sized 2r × 2r around the centre */}
        <svg
          viewBox="-120 -120 240 240"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ width: 'calc(var(--r) * 2.4)', height: 'calc(var(--r) * 2.4)' }}
          aria-hidden="true"
        >
          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
              <path d="M0 0 L10 5 L0 10 z" fill="currentColor" />
            </marker>
          </defs>

          {/* Outer track the nodes sit on */}
          <circle r="100" fill="none" stroke="var(--color-line-strong)" strokeWidth="0.8" />

          {/* Running arc: from the active node toward the next one */}
          <g transform={`rotate(${angleOf(active)})`}>
            <circle
              key={`${active}-${playing}`}
              r="100"
              fill="none"
              stroke="var(--color-accent)"
              strokeWidth="2"
              strokeLinecap="round"
              pathLength={philosophyPrinciples.length}
              className={playing ? 'wheel-arc' : ''}
              style={
                {
                  strokeDasharray: playing ? undefined : '0 6',
                  animationDuration: `${CYCLE_MS}ms`
                } as React.CSSProperties
              }
            />
          </g>

          {/* Thick inner ring, slowly turning, with direction chevrons */}
          <g className="orbit" style={{ animationDuration: '60s', transformOrigin: 'center', transformBox: 'fill-box' }}>
            <circle r="70" fill="none" stroke="color-mix(in oklab, var(--color-accent) 22%, var(--color-raised))" strokeWidth="11" />
            {Array.from({ length: 6 }).map((_, i) => {
              const a = rad(angleOf(i) + STEP / 2);
              const x = 70 * Math.cos(a);
              const y = 70 * Math.sin(a);
              return (
                <path
                  key={i}
                  d="M-2.5 -3 L1.5 0 L-2.5 3"
                  fill="none"
                  stroke="var(--color-accent)"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  transform={`translate(${x} ${y}) rotate(${angleOf(i) + STEP / 2 + 90})`}
                />
              );
            })}
          </g>

          {/* Spokes: double arrows between the core and each step */}
          {philosophyPrinciples.map((_, i) => {
            const a = rad(angleOf(i));
            const on = i === active;
            return (
              <line
                key={i}
                x1={80 * Math.cos(a)}
                y1={80 * Math.sin(a)}
                x2={90 * Math.cos(a)}
                y2={90 * Math.sin(a)}
                stroke="currentColor"
                strokeWidth={on ? 1.4 : 0.8}
                markerStart="url(#arrow)"
                markerEnd="url(#arrow)"
                style={{ color: on ? 'var(--color-accent)' : 'var(--color-faint)', transition: 'color 400ms' }}
              />
            );
          })}
        </svg>

        {/* Centre: the active habit, in practice (hidden on small wheels) */}
        <div
          className="absolute top-1/2 left-1/2 hidden -translate-x-1/2 -translate-y-1/2 text-center sm:block"
          style={{ width: 'calc(var(--r) * 1.12)' }}
          aria-live="polite"
        >
          <div key={active} className="anim-in">
            <CurrentIcon className="mx-auto h-14 w-14 lg:h-16 lg:w-16" />
            <h3 className="mt-2 font-serif text-2xl leading-tight text-ink lg:text-[28px]">{current.title}</h3>
            <p className="mt-2 hidden text-[12.5px] leading-relaxed text-body lg:block">
              {current.practicalApplication.replace(/`/g, '')}
            </p>
          </div>
        </div>
        <RefreshCw
          className="absolute top-1/2 left-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 text-accent/60 sm:hidden"
          aria-hidden="true"
        />

        {/* Nodes and their labels */}
        {philosophyPrinciples.map((p, i) => {
          const a = rad(angleOf(i));
          const cos = Math.cos(a);
          const sin = Math.sin(a);
          const Icon = icons[i];
          const on = i === active;
          const side = Math.abs(cos) < 0.2 ? (sin < 0 ? 'top' : 'bottom') : cos > 0 ? 'right' : 'left';
          const labelPos: React.CSSProperties =
            side === 'top'
              ? { bottom: 'calc(100% + 14px)', left: '50%', transform: 'translateX(-50%)', textAlign: 'center' }
              : side === 'bottom'
                ? { top: 'calc(100% + 14px)', left: '50%', transform: 'translateX(-50%)', textAlign: 'center' }
                : side === 'right'
                  ? { left: 'calc(100% + 16px)', top: '50%', transform: 'translateY(-50%)', textAlign: 'left' }
                  : { right: 'calc(100% + 16px)', top: '50%', transform: 'translateY(-50%)', textAlign: 'right' };
          return (
            <div
              key={p.number}
              className="absolute"
              style={{
                left: `calc(50% + var(--r) * ${cos.toFixed(4)})`,
                top: `calc(50% + var(--r) * ${sin.toFixed(4)})`,
                transform: 'translate(-50%, -50%)'
              }}
            >
              <button
                type="button"
                onClick={() => pick(i)}
                aria-pressed={on}
                aria-label={`${p.number} ${p.title}`}
                className={`group relative flex h-12 w-12 items-center justify-center rounded-full border transition-all duration-300 lg:h-16 lg:w-16 ${
                  on
                    ? 'scale-110 border-accent bg-tint shadow-[0_0_0_6px_color-mix(in_oklab,var(--color-accent)_18%,transparent),0_10px_30px_-10px_var(--color-accent)]'
                    : 'border-line-strong bg-raised hover:border-accent/60'
                }`}
              >
                <Icon
                  className={`h-9 w-9 transition-all duration-300 group-hover:-translate-y-0.5 lg:h-12 lg:w-12 ${on ? '' : 'opacity-90 group-hover:opacity-100'}`}
                />
                <span
                  className={`absolute -top-1 -right-1 rounded-full border px-1 font-mono text-[9px] leading-4 ${
                    on ? 'border-accent bg-bg text-accent' : 'border-line-strong bg-bg text-faint'
                  }`}
                >
                  {p.number}
                </span>
              </button>

              {/* Label (desktop) */}
              <button
                type="button"
                onClick={() => pick(i)}
                className="absolute hidden w-[210px] lg:block"
                style={labelPos}
                tabIndex={-1}
              >
                <span className={`block font-serif text-[22px] leading-tight transition-colors ${on ? 'text-accent' : 'text-ink'}`}>
                  {p.title}
                </span>
                <span className="mt-1 block text-[12.5px] leading-snug text-muted">{p.subtitle}</span>
              </button>
            </div>
          );
        })}
      </div>

      {/* Why (all sizes) + in practice (small screens) */}
      <div key={active} className="anim-in mx-auto mt-4 max-w-2xl text-center lg:mt-2">
        <p className="font-mono text-[11px] uppercase tracking-wider text-accent lg:hidden">
          {current.number} · {current.title}
        </p>
        <p className="mt-2 text-[14px] leading-relaxed text-body lg:hidden">{current.practicalApplication.replace(/`/g, '')}</p>
        <p className="mt-3 font-serif text-lg italic leading-snug text-muted sm:text-xl lg:mt-0">“{current.description}”</p>
        {auto && inView && !reduced && (
          <p className="mt-4 font-mono text-[10px] text-faint">cycling · pick a step to stop</p>
        )}
      </div>
    </Section>
  );
};
