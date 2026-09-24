import React, { useEffect, useRef, useState } from 'react';
import { MapPin, Plane } from 'lucide-react';
import { profileData } from '../../data/profile';
import { careerTimeline } from '../../data/experience';
import { Container } from '../layout/Section';
import { TracePanel } from './TracePanel';
import { DevIllustration } from '../tech/DevIllustration';
import { AiChatIcon, PaymentIcon, ServersIcon, ServicesIcon } from '../contact/ContactIcons';
import { AppIcon, BackendIcon, LlmIcon, RagIcon, ShieldIcon, ToolIcon, UserIcon } from '../ai/AiIcons';
import { BrowserIcon, CloudIcon, DatabaseIcon } from '../about/AboutIcons';

type IconC = React.FC<{ className?: string }>;

const noteIcons: IconC[] = [ServicesIcon, PaymentIcon, AiChatIcon];

const roleIcons: Record<string, IconC> = {
  'React Intern': UserIcon,
  'React Developer': BrowserIcon,
  'Full Stack Developer': BackendIcon,
  'Software Engineer': ServicesIcon
};

const stackStrip: { label: string; Icon: IconC }[] = [
  { label: 'React', Icon: BrowserIcon },
  { label: 'Next.js', Icon: AppIcon },
  { label: 'NestJS', Icon: ServicesIcon },
  { label: 'gRPC', Icon: ServersIcon },
  { label: 'PostgreSQL', Icon: DatabaseIcon },
  { label: 'Redis', Icon: BackendIcon },
  { label: 'Docker · AWS', Icon: CloudIcon },
  { label: 'Razorpay', Icon: PaymentIcon },
  { label: 'JWT · RBAC', Icon: ShieldIcon },
  { label: 'Vector search', Icon: RagIcon },
  { label: 'LLM APIs', Icon: LlmIcon },
  { label: 'Typed tools', Icon: ToolIcon }
];

interface HeroProps {
  onOpenResume: () => void;
}

const notes = [
  {
    n: 1,
    text: 'gRPC · Docker · Redis',
    color: 'var(--color-accent)',
    words: ['distributed backends', 'gRPC microservices', 'Redis-backed APIs']
  },
  {
    n: 2,
    text: 'idempotent webhooks · ACID ledger',
    color: 'var(--color-ok)',
    words: ['payment flows', 'webhook pipelines', 'audited ledgers']
  },
  {
    n: 3,
    text: 'RAG · typed tool calls',
    color: 'var(--color-sky)',
    words: ['AI features', 'RAG pipelines', 'tool-calling agents']
  }
];

const ROTATE_MS = 3600;

/**
 * Highlighted phrase that rotates through alternatives: the old phrase slides up and out,
 * the new one slides in and its highlighter stroke redraws. The box animates to each
 * phrase's width so the sentence around it glides instead of jumping.
 * Marks are offset in time so the change ripples left to right.
 */
const Mark: React.FC<{ n: number; delay: number }> = ({ n, delay }) => {
  const { color, words } = notes[n - 1];
  const [idx, setIdx] = useState(0);
  const [drawn, setDrawn] = useState(false);
  const [widths, setWidths] = useState<number[]>([]);
  const measureRefs = useRef<(HTMLSpanElement | null)[]>([]);

  // Measure every phrase once fonts are ready, and again on resize.
  useEffect(() => {
    const measure = () => setWidths(measureRefs.current.map((el) => el?.offsetWidth ?? 0));
    measure();
    document.fonts?.ready.then(measure);
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  useEffect(() => {
    const first = window.setTimeout(() => setDrawn(true), delay);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return () => window.clearTimeout(first);
    let interval = 0;
    const start = window.setTimeout(() => {
      setIdx((i) => (i + 1) % words.length);
      interval = window.setInterval(() => setIdx((i) => (i + 1) % words.length), ROTATE_MS);
    }, delay + ROTATE_MS);
    return () => {
      window.clearTimeout(first);
      window.clearTimeout(start);
      window.clearInterval(interval);
    };
  }, [delay, words.length]);

  const highlight = `linear-gradient(transparent 58%, color-mix(in oklab, ${color} 34%, transparent) 58%)`;

  return (
    <span className="group whitespace-nowrap">
      <span className="sr-only">{words[0]}</span>
      <span
        className="relative inline-block overflow-hidden transition-[width] duration-500 ease-[cubic-bezier(.2,.7,.2,1)]"
        style={{ width: widths[idx] || undefined, height: '1.25em', verticalAlign: '-0.3em', clipPath: 'inset(-2px -4px)' }}
        aria-hidden="true"
      >
        {/* Invisible copies used only for measuring */}
        {words.map((w, i) => (
          <span
            key={`m-${w}`}
            ref={(el) => {
              measureRefs.current[i] = el;
            }}
            className="invisible absolute left-0 top-0 whitespace-nowrap px-0.5"
          >
            {w}
          </span>
        ))}
        {words.map((w, i) => {
          const active = i === idx;
          const leaving = i === (idx - 1 + words.length) % words.length;
          return (
            <span
              key={w}
              className="absolute left-0 top-0 whitespace-nowrap px-0.5 leading-[1.25em] text-ink transition-all duration-500 ease-[cubic-bezier(.2,.7,.2,1)] group-hover:brightness-125"
              style={{
                opacity: active ? 1 : 0,
                transform: active ? 'translateY(0)' : leaving ? 'translateY(-70%)' : 'translateY(70%)',
                filter: active ? 'blur(0)' : 'blur(3px)',
                backgroundImage: highlight,
                backgroundRepeat: 'no-repeat',
                backgroundSize: active && drawn ? '100% 100%' : '0% 100%',
                transitionProperty: 'opacity, transform, filter, background-size',
                transitionDelay: active ? '120ms' : '0ms'
              }}
            >
              {w}
            </span>
          );
        })}
      </span>
      <sup
        key={idx}
        className="anim-in ml-0.5 font-mono text-[11px] font-medium"
        style={{ color, '--d': '200ms' } as React.CSSProperties}
      >
        {n}
      </sup>
    </span>
  );
};

/** Counts up to a number like "3.4+" once on mount. */
const CountUp: React.FC<{ value: string }> = ({ value }) => {
  const target = parseFloat(value);
  const suffix = value.replace(/^[\d.]+/, '');
  const [shown, setShown] = useState(0);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(target);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / 1400);
      setShown(target * (1 - Math.pow(1 - t, 3)));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target]);
  return (
    <>
      {shown.toFixed(1)}
      {suffix}
    </>
  );
};

/** Width of the page gutter outside the content column, shown as a redline on wide screens. */
const useGutter = () => {
  const [gutter, setGutter] = useState(0);
  useEffect(() => {
    const measure = () => setGutter(Math.max(0, Math.round((window.innerWidth - 1120) / 2)));
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);
  return gutter;
};

const GutterMark: React.FC<{ side: 'left' | 'right'; width: number }> = ({ side, width }) => (
  <div
    className={`pointer-events-none absolute top-40 hidden items-center xl:flex ${side === 'left' ? 'left-0' : 'right-0'}`}
    style={{ width }}
    aria-hidden="true"
  >
    <span className="h-px flex-1 bg-violet/40" />
    <span className="absolute left-1/2 top-2 -translate-x-1/2 rounded border border-violet/40 bg-bg px-1 font-mono text-[9px] text-violet">
      {width}
    </span>
  </div>
);

const stagger = (ms: number) => ({ '--d': `${ms}ms` }) as React.CSSProperties;

export const Hero: React.FC<HeroProps> = ({ onOpenResume }) => {
  const gutter = useGutter();
  const sectionRef = useRef<HTMLElement>(null);
  // Oldest first, so the track reads as growth up to the current role.
  const track = [...careerTimeline].reverse();

  // Soft spotlight that follows the pointer across the dot grid (desktop only).
  const onPointerMove = (e: React.PointerEvent) => {
    const el = sectionRef.current;
    if (!el || e.pointerType !== 'mouse') return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      onPointerMove={onPointerMove}
      className="relative overflow-hidden pt-24 pb-10 sm:pt-28 sm:pb-12"
      style={{ '--mx': '70%', '--my': '20%' } as React.CSSProperties}
    >
      {/* Dot grid, faded toward the edges, lit around the pointer. */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, var(--color-line-strong) 1px, transparent 0)',
          backgroundSize: '22px 22px',
          maskImage: 'radial-gradient(ellipse 80% 70% at 50% 30%, black 20%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 30%, black 20%, transparent 75%)',
          opacity: 0.5
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 transition-[background] duration-300"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(420px circle at var(--mx) var(--my), color-mix(in oklab, var(--color-accent) 9%, transparent), transparent 70%)'
        }}
      />

      {/* Layout guides: dashed column edges and gutter measurements, like a design spec. */}
      <div
        className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-full max-w-[1120px] -translate-x-1/2 border-x border-dashed border-line xl:block"
        aria-hidden="true"
      />
      {gutter > 60 && (
        <>
          <GutterMark side="left" width={gutter} />
          <GutterMark side="right" width={gutter} />
        </>
      )}

      <Container className="relative">
        <div className="grid grid-cols-1 gap-y-12 lg:grid-cols-12 lg:gap-x-10">
          {/* Statement */}
          <div className="lg:col-span-8">
            <p className="anim-in flex flex-col gap-1.5 font-mono text-xs text-muted sm:flex-row sm:items-center sm:gap-3" style={stagger(0)}>
              <span className="inline-flex items-center gap-2 text-ok">
                <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
                  <span className="absolute inset-0 animate-ping rounded-full bg-ok opacity-60" />
                  <span className="relative h-1.5 w-1.5 rounded-full bg-ok" />
                </span>
                Open to new roles
              </span>
              <span className="hidden text-faint sm:inline" aria-hidden="true">·</span>
              <span>
                {profileData.relocation} · {profileData.workModes.join(' / ')}
              </span>
            </p>

            <h1
              className="anim-in mt-6 font-serif text-[48px] leading-[0.98] tracking-[-0.02em] text-ink sm:text-7xl lg:text-[84px]"
              style={stagger(100)}
            >
              Hi, I'm Pavandeep<span className="text-accent">.</span>
            </h1>

            <p
              className="anim-in mt-8 max-w-2xl text-xl leading-[2.2rem] text-body sm:text-[26px] sm:leading-[2.6rem]"
              style={stagger(220)}
            >
              I build{' '}
              <Mark n={1} delay={700} />
              ,{' '}
              <Mark n={2} delay={950} />{' '}
              that don't double-charge, and{' '}
              <Mark n={3} delay={1200} />{' '}
              that don't make things up.
            </p>

            {/* Footnotes for the marks, as icon chips */}
            <ol className="anim-in mt-6 flex flex-wrap gap-2" style={stagger(340)}>
              {notes.map((note, i) => {
                const Icon = noteIcons[i];
                return (
                  <li
                    key={note.n}
                    className="group inline-flex items-center gap-2 rounded-full border border-line bg-raised/70 py-1 pr-3 pl-1 font-mono text-[11px] text-muted backdrop-blur-sm transition-colors hover:border-line-strong hover:text-ink"
                  >
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-bg">
                      <Icon className="h-6 w-6 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:rotate-[-6deg]" />
                    </span>
                    <span style={{ color: note.color }}>{note.n}</span>
                    {note.text}
                  </li>
                );
              })}
            </ol>

            <div className="anim-in mt-8 flex flex-wrap items-center gap-x-7 gap-y-4 text-sm" style={stagger(440)}>
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 font-medium text-bg transition-all duration-200 hover:-translate-y-0.5 hover:bg-accent hover:shadow-[0_8px_24px_-8px_var(--color-accent)]"
              >
                See the work
                <span className="transition-transform group-hover:translate-y-0.5" aria-hidden="true">
                  ↓
                </span>
              </a>
              <button type="button" onClick={onOpenResume} className="link">
                Resume (PDF) ↗<span className="sr-only"> opens in a new tab</span>
              </button>
              <a href={`mailto:${profileData.contacts.email}`} className="link hidden sm:inline">
                Email me
              </a>
            </div>
          </div>

          {/* Career track */}
          <aside className="anim-in lg:col-span-4 lg:self-end" style={stagger(520)}>
            <div className="rounded-xl border border-line bg-raised/90 p-5 backdrop-blur-sm transition-colors hover:border-line-strong">
              <div className="flex items-end justify-between gap-3 border-b border-line pb-4">
                <span className="relative h-12 w-12 shrink-0 self-center overflow-hidden rounded-xl border border-line-strong bg-bg">
                  <span className="absolute inset-0 translate-y-1 scale-[1.35]">
                    <DevIllustration accent="var(--color-accent)" />
                  </span>
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-mono text-[10px] uppercase tracking-wider text-muted">At Devstree since Apr 2023</p>
                  <p className="mt-1 text-[15px] text-ink">{profileData.role}</p>
                </div>
                <p className="shrink-0 whitespace-nowrap font-serif text-[42px] leading-none text-accent tabular-nums">
                  <CountUp value={profileData.experienceYears} />
                  <span className="ml-1 font-mono text-[11px] text-muted">yrs</span>
                </p>
              </div>

              <ol className="relative mt-4 space-y-2 pl-5">
                <span className="absolute top-1.5 bottom-1.5 left-[3px] w-px bg-line-strong" aria-hidden="true" />
                {track.map((m, i) => {
                  const current = i === track.length - 1;
                  return (
                    <li
                      key={m.period}
                      className="anim-in relative flex items-center justify-between gap-3"
                      style={stagger(700 + i * 120)}
                    >
                      <span
                        className={`absolute top-1/2 -left-5 h-[7px] w-[7px] -translate-y-1/2 rounded-full border ${
                          current ? 'border-ok bg-ok shadow-[0_0_0_4px_color-mix(in_oklab,var(--color-ok)_18%,transparent)]' : 'border-line-strong bg-bg'
                        }`}
                        aria-hidden="true"
                      />
                      <span className={`inline-flex items-center gap-2 text-[13.5px] ${current ? 'text-ink' : 'text-body'}`}>
                        {(() => {
                          const RoleIcon = roleIcons[m.role];
                          return RoleIcon ? <RoleIcon className="h-6 w-6 shrink-0" /> : null;
                        })()}
                        {m.role}
                      </span>
                      <span className={`shrink-0 font-mono text-[10.5px] ${current ? 'text-ok' : 'text-faint'}`}>
                        {m.period}
                      </span>
                    </li>
                  );
                })}
              </ol>

              <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 border-t border-line pt-3 text-[12.5px] text-muted">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                  {profileData.location}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Plane className="h-3.5 w-3.5" aria-hidden="true" />
                  {profileData.workModes.join(' · ')}
                </span>
              </div>
            </div>
          </aside>
        </div>

        {/* Stack strip: what the work is built with, scrolling */}
        <div
          className="marquee anim-in relative mt-12 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]"
          style={stagger(600)}
          aria-label="Tools I ship with"
        >
          <ul className="marquee-track flex w-max gap-2.5">
            {[...stackStrip, ...stackStrip].map(({ label, Icon }, i) => (
              <li
                key={`${label}-${i}`}
                aria-hidden={i >= stackStrip.length}
                className="group flex shrink-0 items-center gap-2.5 rounded-xl border border-line bg-raised/80 py-1.5 pr-4 pl-1.5 transition-colors hover:border-accent/50"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-bg">
                  <Icon className="h-7 w-7 transition-transform duration-300 group-hover:-translate-y-0.5" />
                </span>
                <span className="whitespace-nowrap text-[13px] text-body group-hover:text-ink">{label}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Full-width trace: how a request moves through the systems I build */}
        <div className="anim-in mt-6" style={stagger(650)}>
          <TracePanel />
        </div>
      </Container>
    </section>
  );
};
