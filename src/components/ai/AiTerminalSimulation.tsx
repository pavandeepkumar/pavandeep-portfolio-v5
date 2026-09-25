import React, { useEffect, useRef, useState } from 'react';
import { ActionIcon, BackendIcon, LlmIcon, RagIcon, ToolIcon, UserIcon } from './AiIcons';

interface Scenario {
  name: string;
  prompt: string;
  thinking: string;
  context: string;
  toolCall: string;
  backendAction: string;
  response: string;
  chips: string[];
}

const scenarios: Scenario[] = [
  {
    name: 'MitGo dispatch',
    prompt: 'Dispatch the nearest driver for route #941.',
    thinking: 'Needs location, driver state and a gRPC dispatch.',
    context: 'Redis GEO: active drivers within 3.5 km.',
    toolCall: 'dispatch_driver(geo="ts5p8v", type="STANDARD")',
    backendAction: 'Driver #4821 (0.8 km) locked, ride event published.',
    response: 'Driver #4821 confirmed. Push alert sent to the rider.',
    chips: ['42 ms', '0.8 km', 'gRPC']
  },
  {
    name: 'Aunest webhook',
    prompt: 'Razorpay says order #AG-8821 is paid.',
    thinking: 'Verify the HMAC signature before trusting it.',
    context: 'Redis idempotency key "pay_8821" is free.',
    toolCall: 'verify_and_lock(order="AG8821", sig="hmac…")',
    backendAction: 'One ACID transaction: +2.50 g gold, order COMPLETED.',
    response: 'Credited once. Later retries are dropped.',
    chips: ['2.50 g', '1 credit', 'audit logged']
  },
  {
    name: 'Travel Buddy itinerary',
    prompt: '3-day family trip in Ahmedabad, with real hotel slots.',
    thinking: 'Family, 3 days, Ahmedabad, rooms must be live.',
    context: 'Vector store: heritage sites and family attractions.',
    toolCall: 'query_inventory(city="Ahmedabad", rooms=1)',
    backendAction: '4 partner hotels with validated live rates.',
    response: 'Day 1 Sabarmati Ashram, Day 2 Science City, Day 3 Calico Museum. Rooms held.',
    chips: ['3 days', '4 hotels', 'rates from DB']
  }
];

const steps = [
  { key: 'thinking', label: 'Reason', Icon: LlmIcon },
  { key: 'context', label: 'Retrieve', Icon: RagIcon },
  { key: 'toolCall', label: 'Typed tool', Icon: ToolIcon },
  { key: 'backendAction', label: 'Backend', Icon: BackendIcon }
] as const;

const STEP_MS = 700;
const HOLD_MS = 4200;

/** A scripted replay of how three real systems route an AI request. Not a live model. */
export const AiTerminalSimulation: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  // Number of steps revealed; steps.length means the run is complete.
  const [revealed, setRevealed] = useState(0);
  const [auto, setAuto] = useState(true);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Reveal steps one by one, then (while auto) move on to the next scenario.
  useEffect(() => {
    if (reduced) {
      setRevealed(steps.length);
      return;
    }
    if (!inView || paused) return;
    const done = revealed >= steps.length;
    if (done && !auto) return;
    const t = window.setTimeout(
      () => {
        if (!done) setRevealed((r) => r + 1);
        else {
          setActiveIdx((i) => (i + 1) % scenarios.length);
          setRevealed(0);
        }
      },
      done ? HOLD_MS : STEP_MS
    );
    return () => window.clearTimeout(t);
  }, [revealed, inView, paused, auto, reduced]);

  const pick = (idx: number) => {
    setAuto(false);
    setActiveIdx(idx);
    setRevealed(reduced ? steps.length : 0);
  };

  const scenario = scenarios[activeIdx];
  const done = revealed >= steps.length;

  return (
    <div
      ref={ref}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="overflow-hidden rounded-xl border border-line bg-raised card-shadow"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-3">
        <p className="font-mono text-[11px] text-muted">replay · how the request is routed</p>
        <div className="flex flex-wrap gap-1 rounded-full border border-line bg-bg p-0.5" role="group" aria-label="Choose a scenario">
          {scenarios.map((sc, idx) => (
            <button
              key={sc.name}
              type="button"
              onClick={() => pick(idx)}
              aria-pressed={activeIdx === idx}
              className={`rounded-full px-3 py-1 font-mono text-[11px] transition-colors ${
                activeIdx === idx ? 'bg-ink text-bg' : 'text-muted hover:text-ink'
              }`}
            >
              {sc.name.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      <div key={activeIdx} className="p-5 sm:p-6" aria-live="polite">
        {/* User request as a chat bubble */}
        <div className="anim-in flex items-start gap-3">
          <UserIcon className="h-10 w-10 shrink-0" />
          <p className="rounded-2xl rounded-tl-sm border border-sky/30 bg-sky/10 px-3.5 py-2 text-[14px] leading-snug text-ink">
            {scenario.prompt}
          </p>
        </div>

        {/* Steps on a rail that fills as they complete */}
        <ol className="relative mt-5 space-y-3 pl-1">
          <span className="absolute top-5 bottom-5 left-[25px] w-0.5 bg-line" aria-hidden="true">
            <span
              className="absolute inset-x-0 top-0 bg-gradient-to-b from-violet via-accent to-ok transition-[height] duration-500 ease-out"
              style={{ height: `${(Math.min(revealed, steps.length - 1) / (steps.length - 1)) * 100}%` }}
            />
          </span>
          {steps.map(({ key, label, Icon }, i) => {
            const shown = i < revealed;
            const running = i === revealed && !done;
            return (
              <li key={key} className="relative flex items-center gap-4">
                <span
                  className={`relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border bg-bg transition-all duration-300 ${
                    running
                      ? 'scale-105 border-accent shadow-[0_0_0_4px_color-mix(in_oklab,var(--color-accent)_15%,transparent)]'
                      : shown
                        ? 'border-line-strong'
                        : 'border-line opacity-40'
                  }`}
                >
                  <Icon className="h-9 w-9" />
                </span>
                <div
                  className={`min-w-0 flex-1 rounded-lg border px-3 py-2 transition-all duration-300 ${
                    shown ? 'border-line bg-bg/60 opacity-100' : 'border-transparent opacity-40'
                  }`}
                >
                  <p className="flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-wider text-faint">
                    {label}
                    {shown && <span className="text-ok">✓</span>}
                    {running && <span className="animate-pulse text-accent">running…</span>}
                  </p>
                  {shown ? (
                    key === 'toolCall' ? (
                      <code className="anim-in mt-0.5 block font-mono text-[12px] text-accent [overflow-wrap:anywhere]">
                        {scenario.toolCall}
                      </code>
                    ) : (
                      <p className="anim-in mt-0.5 text-[13px] leading-snug text-body">{scenario[key]}</p>
                    )
                  ) : (
                    <span className="mt-1.5 block h-2 w-2/3 rounded-full bg-line" aria-hidden="true" />
                  )}
                </div>
              </li>
            );
          })}
        </ol>

        {/* Result */}
        <div
          className={`mt-5 flex items-start gap-3 rounded-xl border border-ok/30 bg-ok/[0.07] p-3.5 transition-all duration-500 ${
            done ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
          }`}
        >
          <ActionIcon className="h-10 w-10 shrink-0" />
          <div className="min-w-0">
            <p className="text-[14px] leading-snug text-ink">{scenario.response}</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {scenario.chips.map((c) => (
                <span key={c} className="rounded-full border border-ok/30 px-2 py-0.5 font-mono text-[10.5px] text-ok">
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
