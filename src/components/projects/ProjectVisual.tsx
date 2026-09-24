import React from 'react';

/**
 * Small illustrations that explain each system at a glance.
 * Each one draws the core idea of the project (the thing the "hard part" is about),
 * using labels taken from the project's own architecture data.
 */

const Frame: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div
    className={`relative min-h-44 overflow-hidden rounded-md border border-line bg-bg ${className}`}
    style={{
      backgroundImage: 'radial-gradient(circle at 1px 1px, var(--color-line) 1px, transparent 0)',
      backgroundSize: '14px 14px'
    }}
    aria-hidden="true"
  >
    {children}
  </div>
);

const mono = 'font-mono text-[10px]';

/* MitGo: gateway fanning out to services over gRPC, Redis for locks and geo. */
const MitGo = () => {
  const services = ['Ride', 'Driver', 'Location', 'Payment'];
  return (
    <Frame className="h-44">
      <svg viewBox="0 0 360 176" className="h-full w-full">
        <g className="font-mono" fontSize="9" fill="var(--color-body)">
          <rect x="20" y="70" width="58" height="30" rx="6" fill="var(--color-raised)" stroke="var(--color-line-strong)" />
          <text x="49" y="89" textAnchor="middle">Client</text>

          <path d="M78 85 H112" stroke="var(--color-line-strong)" strokeDasharray="3 3" />
          <rect x="112" y="64" width="70" height="42" rx="6" fill="var(--color-raised)" stroke="var(--color-accent)" />
          <text x="147" y="83" textAnchor="middle" fill="var(--color-ink)">Gateway</text>
          <text x="147" y="96" textAnchor="middle" fill="var(--color-muted)" fontSize="8">Nginx</text>

          {services.map((s, i) => {
            const y = 14 + i * 40;
            return (
              <g key={s}>
                <path d={`M182 85 C210 85 210 ${y + 13} 236 ${y + 13}`} fill="none" stroke="var(--color-accent)" strokeOpacity="0.55" />
                <rect x="236" y={y} width="78" height="26" rx="6" fill="var(--color-raised)" stroke="var(--color-line-strong)" />
                <circle cx="248" cy={y + 13} r="3" fill="var(--color-ok)" />
                <text x="256" y={y + 16.5} fill="var(--color-ink)">{s}</text>
              </g>
            );
          })}
          <text x="200" y="60" fill="var(--color-accent)" fontSize="8">gRPC</text>

          <path d="M314 27 H334 V147 H314" fill="none" stroke="var(--color-ok)" strokeOpacity="0.5" strokeDasharray="2 3" />
          <text x="346" y="92" fill="var(--color-ok)" fontSize="8" transform="rotate(90 346 92)" textAnchor="middle">Redis lock</text>
        </g>
      </svg>
      <span className={`absolute left-3 bottom-2 ${mono} text-faint`}>7 services · Docker Compose</span>
    </Frame>
  );
};

/* LiftClub: recurring weekly template with one overridden day. */
const LiftClub = () => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  const slots = ['07:30', '08:15', '15:30'];
  return (
    <Frame className="p-3">
      <div className="grid h-40 grid-cols-[2.5rem_repeat(5,1fr)] grid-rows-[auto_repeat(3,1fr)] gap-1.5 pb-4">
        <span />
        {days.map((d) => (
          <span key={d} className={`${mono} text-center text-muted`}>{d}</span>
        ))}
        {slots.map((slot, r) => (
          <React.Fragment key={slot}>
            <span className={`${mono} self-center text-faint`}>{slot}</span>
            {days.map((d, c) => {
              const holiday = c === 2 && r < 2;
              const empty = r === 1 && c === 4;
              return (
                <span
                  key={d}
                  className={`rounded border ${
                    holiday
                      ? 'border-dashed border-accent/60 bg-[repeating-linear-gradient(-45deg,transparent_0_4px,rgba(233,161,91,.18)_4px_5px)]'
                      : empty
                        ? 'border-line'
                        : 'border-sky/30 bg-sky/10'
                  }`}
                />
              );
            })}
          </React.Fragment>
        ))}
      </div>
      <span className={`absolute right-3 bottom-2 rounded bg-bg px-1 ${mono} text-accent`}>Wed: holiday override</span>
    </Frame>
  );
};

/* Aunest: a statement stub stamped idempotent — three webhook deliveries, one credit. */
const Aunest = () => (
  <Frame className="flex items-center justify-center bg-raised">
    <div className="relative w-[82%] rotate-[-1.5deg] rounded-sm bg-ink px-4 pt-3 pb-9 text-bg shadow-lg">
      <div className="flex justify-between font-mono text-[9px] tracking-wider">
        <span className="font-semibold">AUNEST</span>
        <span>ORDER #AG-8821</span>
      </div>
      <div className="mt-2 border-t border-dashed border-bg/30 pt-2 font-mono text-[10px] leading-5">
        <div className="flex justify-between"><span>Razorpay webhook</span><span>×3 received</span></div>
        <div className="flex justify-between"><span>HMAC verified</span><span>✓</span></div>
        <div className="flex justify-between font-semibold"><span>Gold credited</span><span>2.50 g ×1</span></div>
      </div>
      <span className="absolute bottom-2 right-3 rotate-[-6deg] rounded border-2 border-[#3f8f4a] px-2 py-0.5 font-mono text-[12px] font-bold tracking-widest text-[#3f8f4a] opacity-80">
        IDEMPOTENT
      </span>
    </div>
  </Frame>
);

/* Netparts: vehicle filter narrowing to parts that fit. */
const Netparts = () => (
  <Frame className="p-3">
    <div className="flex flex-wrap gap-1.5">
      {['Make: Maruti', 'Model: Swift', 'Year: 2019', 'Engine: 1.2L'].map((f) => (
        <span key={f} className={`rounded-full border border-sky/30 bg-sky/10 px-2 py-0.5 ${mono} text-sky`}>{f}</span>
      ))}
    </div>
    <div className="mt-3 space-y-1.5">
      {[
        { part: 'Brake pad set', fit: true },
        { part: 'Oil filter', fit: true },
        { part: 'Clutch plate', fit: false },
        { part: 'Air filter', fit: true }
      ].map((r) => (
        <div key={r.part} className={`flex items-center justify-between rounded border border-line bg-raised px-2.5 py-1 ${mono}`}>
          <span className={r.fit ? 'text-ink' : 'text-faint line-through'}>{r.part}</span>
          <span className={r.fit ? 'text-ok' : 'text-faint'}>{r.fit ? 'fits ✓' : 'no fit'}</span>
        </div>
      ))}
    </div>
  </Frame>
);

/* Travel Buddy: chat intent becomes a typed tool call, which returns verified rooms. */
const TravelBuddy = () => (
  <Frame className="flex flex-col justify-between gap-3 p-3">
    <div className="ml-auto max-w-[75%] rounded-lg rounded-br-sm bg-sky/15 px-3 py-1.5 text-[11.5px] text-ink">
      3 days in Ahmedabad with family?
    </div>
    <div className={`self-center rounded border border-dashed border-accent/50 px-2 py-1 ${mono} text-accent`}>
      query_partner_inventory(city="Ahmedabad")
    </div>
    <div className="max-w-[85%] rounded-lg rounded-bl-sm border border-line bg-raised px-3 py-2">
      <p className="text-[11.5px] text-ink">Day 1 Sabarmati Ashram · Day 2 Adalaj · Day 3 Calico</p>
      <p className={`mt-1 ${mono} text-ok`}>4 partner hotels · rates verified in DB</p>
    </div>
  </Frame>
);

/* Reelflix: coin wallet, atomic unlock under row lock. */
const Reelflix = () => (
  <Frame className="flex items-center justify-around px-3">
    {[
      { k: 'Wallet', v: '120', sub: 'coins' },
      { k: 'Unlock Ep. 4', v: '−20', sub: 'SELECT … FOR UPDATE', accent: true },
      { k: 'Wallet', v: '100', sub: 'coins' }
    ].map((s, i) => (
      <React.Fragment key={i}>
        {i > 0 && <span className="text-faint">→</span>}
        <div className={`rounded-md border px-3 py-2 text-center ${s.accent ? 'border-accent/50 bg-accent/10' : 'border-line bg-raised'}`}>
          <p className={`${mono} text-muted`}>{s.k}</p>
          <p className={`font-serif text-2xl ${s.accent ? 'text-accent' : 'text-ink'}`}>{s.v}</p>
          <p className={`${mono} text-faint`}>{s.sub}</p>
        </div>
      </React.Fragment>
    ))}
  </Frame>
);

/* DTEP: container yard grid with one audited move. */
const Dtep = () => (
  <Frame className="p-3">
    <div className="grid grid-cols-8 gap-1">
      {Array.from({ length: 24 }).map((_, i) => {
        const from = i === 5;
        const to = i === 18;
        const filled = [0, 1, 3, 4, 8, 9, 10, 12, 14, 15, 17, 20, 21, 23].includes(i);
        return (
          <span
            key={i}
            className={`h-6 rounded-sm border ${
              to ? 'border-accent bg-accent/30' : from ? 'border-dashed border-accent/60' : filled ? 'border-violet/30 bg-violet/15' : 'border-line'
            }`}
          />
        );
      })}
    </div>
    <p className={`mt-3 rounded border border-line bg-raised px-2.5 py-1.5 ${mono} text-body`}>
      <span className="text-accent">MOVE</span> MSKU4821 · B2-R1 → C3-R3 · by planner_07 · 14:32
    </p>
    <p className={`mt-1 ${mono} text-faint`}>append-only event log</p>
  </Frame>
);

/* Naibeau: stylist slots with a temporary hold during checkout. */
const Naibeau = () => (
  <Frame className="p-3">
    <div className="space-y-1.5">
      {[
        { t: '10:00', s: 'Booked · Haircut', c: 'border-sky/30 bg-sky/10 text-sky' },
        { t: '10:45', s: 'Held · 5 min checkout lock', c: 'border-accent/50 bg-accent/10 text-accent' },
        { t: '11:30', s: 'Buffer · prep', c: 'border-line text-faint' },
        { t: '11:45', s: 'Open', c: 'border-ok/30 text-ok' }
      ].map((r) => (
        <div key={r.t} className="flex items-center gap-2">
          <span className={`w-10 ${mono} text-faint`}>{r.t}</span>
          <span className={`flex-1 rounded border px-2 py-1 ${mono} ${r.c}`}>{r.s}</span>
        </div>
      ))}
    </div>
  </Frame>
);

const visuals: Record<string, React.FC> = {
  mitgo: MitGo,
  liftclub: LiftClub,
  aunest: Aunest,
  netparts: Netparts,
  'travel-buddy': TravelBuddy,
  reelflix: Reelflix,
  dtep: Dtep,
  naibeau: Naibeau
};

export const ProjectVisual: React.FC<{ id: string; className?: string }> = ({ id, className = '' }) => {
  const Visual = visuals[id];
  if (!Visual) return null;
  return (
    <div className={className}>
      <Visual />
    </div>
  );
};
