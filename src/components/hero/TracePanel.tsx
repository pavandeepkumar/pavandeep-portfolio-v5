import React, { useEffect, useState } from 'react';

/**
 * A request trace for three systems from the case studies: a small system map with the
 * request's path lit up, and a waterfall of the spans it passes through.
 * Bar lengths show order and relative share only; they are not measured timings.
 */

type NodeId = 'client' | 'gateway' | 'top' | 'mid' | 'bottom' | 'redis' | 'postgres';

const pos: Record<NodeId, { x: number; y: number }> = {
  client: { x: 36, y: 95 },
  gateway: { x: 132, y: 95 },
  top: { x: 238, y: 38 },
  mid: { x: 238, y: 95 },
  bottom: { x: 238, y: 152 },
  redis: { x: 344, y: 62 },
  postgres: { x: 344, y: 128 }
};

interface Span {
  name: string;
  node: NodeId;
  start: number; // 0–100, share of the request
  width: number;
}

interface Flow {
  id: string;
  label: string;
  project: string;
  labels: Partial<Record<NodeId, string>>;
  path: [NodeId, NodeId][];
  spans: Span[];
  outcome: string;
}

const flows: Flow[] = [
  {
    id: 'mitgo',
    label: 'Ride request',
    project: 'MitGo',
    labels: { client: 'Rider app', top: 'Ride', mid: 'Driver', bottom: 'Notify' },
    path: [
      ['client', 'gateway'],
      ['gateway', 'top'],
      ['top', 'mid'],
      ['mid', 'redis'],
      ['top', 'postgres'],
      ['top', 'bottom']
    ],
    spans: [
      { name: 'auth + rate limit', node: 'gateway', start: 0, width: 10 },
      { name: 'ride.create', node: 'top', start: 10, width: 82 },
      { name: 'driver.match gRPC', node: 'mid', start: 18, width: 38 },
      { name: 'redis GEO + lock', node: 'redis', start: 24, width: 22 },
      { name: 'push notify', node: 'bottom', start: 78, width: 14 }
    ],
    outcome: 'driver confirmed, no double assignment'
  },
  {
    id: 'aunest',
    label: 'Payment webhook',
    project: 'Aunest',
    labels: { client: 'Razorpay', top: 'Webhook', mid: 'Ledger', bottom: 'Gold API' },
    path: [
      ['client', 'gateway'],
      ['gateway', 'top'],
      ['top', 'redis'],
      ['top', 'mid'],
      ['mid', 'postgres'],
      ['mid', 'bottom']
    ],
    spans: [
      { name: 'HMAC verify', node: 'top', start: 0, width: 16 },
      { name: 'idempotency key', node: 'redis', start: 16, width: 12 },
      { name: 'ledger.credit', node: 'mid', start: 28, width: 60 },
      { name: 'gold order', node: 'bottom', start: 64, width: 22 },
      { name: 'retry → dropped', node: 'redis', start: 90, width: 8 }
    ],
    outcome: '3 deliveries, 1 credit'
  },
  {
    id: 'travel',
    label: 'AI itinerary',
    project: 'Travel Buddy',
    labels: { client: 'Traveler', top: 'Agent', mid: 'Tools', bottom: 'LLM' },
    path: [
      ['client', 'gateway'],
      ['gateway', 'top'],
      ['top', 'bottom'],
      ['top', 'mid'],
      ['mid', 'postgres']
    ],
    spans: [
      { name: 'build context', node: 'top', start: 0, width: 12 },
      { name: 'llm intent', node: 'bottom', start: 12, width: 30 },
      { name: 'tool: inventory', node: 'mid', start: 44, width: 26 },
      { name: 'rooms + rates', node: 'postgres', start: 48, width: 18 },
      { name: 'llm itinerary', node: 'bottom', start: 72, width: 26 }
    ],
    outcome: 'prices from DB, never from the model'
  }
];

const nodeColor: Record<NodeId, string> = {
  client: 'var(--color-sky)',
  gateway: 'var(--color-violet)',
  top: 'var(--color-accent)',
  mid: 'var(--color-accent)',
  bottom: 'var(--color-accent)',
  redis: 'var(--color-ok)',
  postgres: 'var(--color-ok)'
};

const defaultLabels: Record<NodeId, string> = {
  client: 'Client',
  gateway: 'Gateway',
  top: '',
  mid: '',
  bottom: '',
  redis: 'Redis',
  postgres: 'Postgres'
};

const allEdges: [NodeId, NodeId][] = [
  ['client', 'gateway'],
  ['gateway', 'top'],
  ['gateway', 'mid'],
  ['gateway', 'bottom'],
  ['top', 'mid'],
  ['mid', 'bottom'],
  ['top', 'redis'],
  ['mid', 'redis'],
  ['top', 'postgres'],
  ['mid', 'postgres'],
  ['top', 'bottom']
];

const edgePath = (a: NodeId, b: NodeId) => {
  const p = pos[a];
  const q = pos[b];
  if (p.x === q.x) {
    const down = q.y > p.y ? 1 : -1;
    // Neighbours in the same column: short straight link. Skipping one: arc out to the left.
    if (Math.abs(q.y - p.y) < 80) return `M${p.x} ${p.y + 13 * down} L${q.x} ${q.y - 13 * down}`;
    return `M${p.x - 26} ${p.y} C${p.x - 56} ${p.y} ${q.x - 56} ${q.y} ${q.x - 26} ${q.y}`;
  }
  const mx = (p.x + q.x) / 2;
  return `M${p.x + 26} ${p.y} C${mx} ${p.y} ${mx} ${q.y} ${q.x - 26} ${q.y}`;
};

const usePrefersReducedMotion = () => {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return reduced;
};

const CYCLE_MS = 7000;

export const TracePanel: React.FC = () => {
  const [flowIdx, setFlowIdx] = useState(0);
  // Cycles through the flows until the visitor picks one; pauses while hovered.
  const [auto, setAuto] = useState(true);
  const [paused, setPaused] = useState(false);
  const reduced = usePrefersReducedMotion();
  const playing = auto && !reduced;

  useEffect(() => {
    if (!playing || paused) return;
    const t = window.setTimeout(() => setFlowIdx((i) => (i + 1) % flows.length), CYCLE_MS);
    return () => window.clearTimeout(t);
  }, [playing, paused, flowIdx]);
  const flow = flows[flowIdx];
  const labels = { ...defaultLabels, ...flow.labels };
  const onPath = new Set(flow.path.map(([a, b]) => `${a}-${b}`));
  const activeNodes = new Set(flow.path.flat());

  return (
    <div
      className="overflow-hidden rounded-xl border border-line bg-raised transition-colors hover:border-line-strong"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Header: flow switcher reads like trace tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-5">
        <p className="font-mono text-[11px] uppercase tracking-wider text-muted">
          <span className="text-ok">●</span> trace · follow one request
        </p>
        <div className="flex gap-1 rounded-full border border-line bg-bg p-0.5" role="tablist" aria-label="Choose a flow">
          {flows.map((f, i) => (
            <button
              key={f.id}
              type="button"
              role="tab"
              aria-selected={i === flowIdx}
              onClick={() => {
                setFlowIdx(i);
                setAuto(false);
              }}
              className={`rounded-full px-3 py-1 font-mono text-[11px] transition-colors ${
                i === flowIdx ? 'bg-ink text-bg' : 'text-muted hover:text-ink'
              }`}
            >
              {f.project}
            </button>
          ))}
        </div>
      </div>

      <div className="h-px bg-line">
        {playing && (
          <span
            key={flowIdx}
            className="progress-bar block h-px bg-accent"
            style={{ animationDuration: `${CYCLE_MS}ms`, animationPlayState: paused ? 'paused' : 'running' }}
          />
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
        {/* System map */}
        <div
          className="flex flex-col justify-center border-b border-line p-3 lg:border-r lg:border-b-0"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, var(--color-line) 1px, transparent 0)',
            backgroundSize: '16px 16px'
          }}
        >
          <svg viewBox="0 0 400 190" className="h-auto w-full" role="img" aria-label={`${flow.project} ${flow.label} path`}>
            {allEdges.map(([a, b]) => {
              const active = onPath.has(`${a}-${b}`);
              if (!active) {
                return (
                  <path key={`${a}-${b}`} d={edgePath(a, b)} fill="none" stroke="var(--color-line)" strokeWidth="1" />
                );
              }
              return null;
            })}
            {flow.path.map(([a, b], i) => (
              <g key={`${flow.id}-${a}-${b}`}>
                <path
                  id={`edge-${flow.id}-${i}`}
                  d={edgePath(a, b)}
                  fill="none"
                  stroke="var(--color-accent)"
                  strokeOpacity="0.8"
                  strokeWidth="1.4"
                  className={reduced ? '' : 'path-flow'}
                />
                {!reduced && (
                  <circle r="2.6" fill="var(--color-ink)" opacity="0">
                    <set attributeName="opacity" to="1" begin={`${i * 0.35}s`} />
                    <animateMotion dur="1.6s" begin={`${i * 0.35}s`} repeatCount="indefinite">
                      <mpath href={`#edge-${flow.id}-${i}`} />
                    </animateMotion>
                  </circle>
                )}
              </g>
            ))}

            {(Object.keys(pos) as NodeId[]).map((id) => {
              const { x, y } = pos[id];
              const on = activeNodes.has(id);
              const isStore = id === 'redis' || id === 'postgres';
              return (
                <g key={id} opacity={on ? 1 : 0.35} className="font-mono" style={{ transition: "opacity 400ms ease" }}>
                  {isStore ? (
                    <g>
                      <ellipse cx={x} cy={y - 9} rx="26" ry="5" fill="var(--color-bg)" stroke={nodeColor[id]} />
                      <path
                        d={`M${x - 26} ${y - 9} V${y + 9} A26 5 0 0 0 ${x + 26} ${y + 9} V${y - 9}`}
                        fill="var(--color-bg)"
                        stroke={nodeColor[id]}
                      />
                    </g>
                  ) : (
                    <rect
                      x={x - 26}
                      y={y - 13}
                      width="52"
                      height="26"
                      rx="6"
                      fill="var(--color-bg)"
                      stroke={on ? nodeColor[id] : 'var(--color-line-strong)'}
                    />
                  )}
                  <text x={x} y={y + (isStore ? 6 : 3.5)} textAnchor="middle" fontSize="9" fill="var(--color-ink)">
                    {labels[id]}
                  </text>
                </g>
              );
            })}
          </svg>
          <p key={flow.id} className="anim-in px-1 pb-1 font-mono text-[10.5px] text-muted">
            {flow.project} · {flow.label}
          </p>
        </div>

        {/* Waterfall */}
        <div className="p-4 sm:p-5">
          <div className="mb-3 flex justify-between font-mono text-[10px] uppercase tracking-wider text-faint">
            <span>span</span>
            <span title="Bar length shows order and share, not measured ms">relative time →</span>
          </div>
          <ol key={`spans-${flow.id}`} className="space-y-2.5">
            {flow.spans.map((s, i) => (
              <li key={s.name} className="grid grid-cols-1 items-center gap-1 sm:grid-cols-[minmax(0,8.5rem)_1fr] sm:gap-3">
                <span className="truncate font-mono text-[11px] text-body" title={s.name}>
                  {s.name}
                </span>
                <span className="relative h-2.5 rounded-full bg-line/60">
                  <span
                    className="span-bar absolute inset-y-0 rounded-full"
                    style={{
                      left: `${s.start}%`,
                      width: `${s.width}%`,
                      background: nodeColor[s.node],
                      opacity: 0.85,
                      animationDelay: `${i * 90}ms`
                    }}
                  />
                </span>
              </li>
            ))}
          </ol>
          <p key={`outcome-${flow.id}`} className="anim-in mt-5 flex items-center gap-2 border-t border-line pt-4 font-mono text-[11px] text-ok" style={{ '--d': '500ms' } as React.CSSProperties}>
            <span aria-hidden="true">✓</span>
            {flow.outcome}
          </p>
        </div>
      </div>
    </div>
  );
};
