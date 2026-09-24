import React from 'react';

/** Tiny line drawings that say what each layer is before you read the text. */

const Box: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="h-24 overflow-hidden rounded-md border border-line bg-bg p-2.5" aria-hidden="true">
    {children}
  </div>
);

const bar = 'rounded-full bg-line-strong';

const Frontend = () => (
  <Box>
    <div className="flex h-full gap-1.5">
      <div className="flex w-1/4 flex-col gap-1 rounded bg-raised p-1.5">
        <span className="h-3 w-3 rounded-full bg-line-strong" />
        <span className={`mt-1 h-1 w-full ${bar}`} />
        <span className={`h-1 w-3/4 ${bar}`} />
        <span className={`h-1 w-full ${bar}`} />
      </div>
      <div className="flex flex-1 flex-col gap-1.5">
        <div className="flex h-4 items-center justify-between rounded bg-raised px-1.5">
          <span className={`h-1 w-1/3 ${bar}`} />
          <span className="h-2 w-2 rounded-full border border-ok/60 bg-ok/30" />
        </div>
        <div className="grid flex-1 grid-cols-2 gap-1.5">
          <span className="flex items-center justify-center rounded border border-dashed border-line-strong">
            <span className="h-4 w-4 rounded-sm bg-sky/40" />
          </span>
          <span className="rounded border border-dashed border-line-strong" />
        </div>
      </div>
    </div>
  </Box>
);

const Backend = () => (
  <Box>
    <svg viewBox="0 0 120 64" className="h-full w-full">
      <g stroke="var(--color-line-strong)" fill="none">
        <path d="M60 10 L30 32 M60 10 L90 32 M30 32 L18 54 M30 32 L42 54 M90 32 L102 54" />
      </g>
      <circle cx="60" cy="10" r="5" fill="var(--color-bg)" stroke="var(--color-accent)" strokeWidth="1.5" />
      {[
        [30, 32],
        [90, 32]
      ].map(([x, y]) => (
        <circle key={x} cx={x} cy={y} r="4" fill="var(--color-raised)" stroke="var(--color-muted)" />
      ))}
      {[18, 42, 102].map((x) => (
        <circle key={x} cx={x} cy="54" r="3" fill="var(--color-raised)" stroke="var(--color-muted)" />
      ))}
      <circle cx="96" cy="44" r="1.8" fill="var(--color-accent)" />
    </svg>
  </Box>
);

const DatabaseViz = () => (
  <Box>
    <div className="font-mono text-[8.5px] leading-[15px]">
      <div className="grid grid-cols-[1.4rem_1fr_1.8rem] gap-x-1.5 border-b border-line text-muted">
        <span>id</span>
        <span>status</span>
        <span>lock</span>
      </div>
      {[
        ['01', 'COMPLETED', ''],
        ['02', 'PENDING', 'y'],
        ['03', 'COMPLETED', '']
      ].map(([id, st, lk]) => (
        <div key={id} className={`grid grid-cols-[1.4rem_1fr_1.8rem] gap-x-1.5 ${lk ? 'text-accent' : 'text-body'}`}>
          <span className="text-ok">{id}</span>
          <span>{st}</span>
          <span>{lk ? 'row' : ''}</span>
        </div>
      ))}
    </div>
  </Box>
);

const Infra = () => (
  <Box>
    <div className="flex h-full items-end justify-center gap-1.5">
      {[3, 2, 3, 1].map((n, i) => (
        <div key={i} className="flex flex-col-reverse gap-1">
          {Array.from({ length: n }).map((_, j) => (
            <span
              key={j}
              className={`h-4 w-8 rounded-sm border ${i === 2 && j === n - 1 ? 'border-violet bg-violet/30' : 'border-violet/30 bg-violet/10'}`}
            />
          ))}
        </div>
      ))}
    </div>
  </Box>
);

const Ai = () => (
  <Box>
    <div className="flex h-full flex-col justify-between">
      <span className="ml-auto h-3.5 w-2/3 rounded-full rounded-br-sm bg-sky/25" />
      <span className="self-center font-mono text-[9px] text-accent">{'{ tool: "book" }'}</span>
      <span className="h-3.5 w-3/4 rounded-full rounded-bl-sm border border-ok/40 bg-ok/10" />
    </div>
  </Box>
);

const visuals: Record<string, React.FC> = {
  Frontend,
  Backend,
  Database: DatabaseViz,
  Infrastructure: Infra,
  'AI engineering': Ai
};

export const PillarVisual: React.FC<{ area: string }> = ({ area }) => {
  const V = visuals[area];
  return V ? <V /> : null;
};
