import React from 'react';

/**
 * Small illustrated icons for the contact section: soft gradient shapes with a
 * ground shadow and a round badge, drawn in the site palette. Each icon owns its
 * gradient ids (prefixed) so several can share a page.
 */

type IconProps = { className?: string };

export const Frame: React.FC<{ id: string; children: React.ReactNode; className?: string; label?: string }> = ({
  children,
  className = 'h-12 w-12',
  label
}) => (
  <svg viewBox="0 0 48 48" className={className} role={label ? 'img' : undefined} aria-hidden={label ? undefined : true} aria-label={label}>
    <ellipse cx="24" cy="44" rx="13" ry="2.2" fill="#000" opacity="0.35" />
    {children}
  </svg>
);

export const Grad: React.FC<{ id: string; from: string; to: string; vertical?: boolean }> = ({ id, from, to, vertical = true }) => (
  <linearGradient id={id} x1="0" y1="0" x2={vertical ? '0' : '1'} y2={vertical ? '1' : '0'}>
    <stop offset="0%" stopColor={from} />
    <stop offset="100%" stopColor={to} />
  </linearGradient>
);

/* ---------- Topic icons ---------- */

/** Stacked servers joined by a network line. */
export const ServersIcon: React.FC<IconProps> = ({ className }) => (
  <Frame id="srv" className={className}>
    <defs>
      <Grad id="srv-a" from="#f6c48d" to="#d9853f" />
      <Grad id="srv-b" from="#9ecbef" to="#5f93c2" />
    </defs>
    <rect x="9" y="8" width="26" height="9" rx="2.5" fill="url(#srv-a)" />
    <rect x="9" y="19" width="26" height="9" rx="2.5" fill="url(#srv-a)" opacity="0.85" />
    <rect x="9" y="30" width="26" height="9" rx="2.5" fill="url(#srv-a)" opacity="0.7" />
    {[12.5, 23.5, 34.5].map((y) => (
      <g key={y}>
        <circle cx="14" cy={y} r="1.3" fill="#fff" opacity="0.9" />
        <rect x="19" y={y - 0.8} width="11" height="1.6" rx="0.8" fill="#fff" opacity="0.5" />
      </g>
    ))}
    <circle cx="38" cy="12" r="6" fill="url(#srv-b)" />
    <path d="M35.5 12 h5 M38 9.5 v5" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" />
  </Frame>
);

/** Briefcase with a star badge. */
export const RoleIcon: React.FC<IconProps> = ({ className }) => (
  <Frame id="role" className={className}>
    <defs>
      <Grad id="role-a" from="#c9bcf0" to="#8e79d4" />
      <Grad id="role-b" from="#f6c48d" to="#d9853f" />
    </defs>
    <path d="M18 14 v-3 a2 2 0 0 1 2 -2 h8 a2 2 0 0 1 2 2 v3" fill="none" stroke="#8e79d4" strokeWidth="2.4" />
    <rect x="7" y="14" width="34" height="24" rx="4" fill="url(#role-a)" />
    <path d="M7 23 h34" stroke="#fff" strokeOpacity="0.35" strokeWidth="1.4" />
    <rect x="21" y="20.5" width="6" height="5" rx="1.2" fill="#fff" opacity="0.85" />
    <circle cx="37" cy="36" r="7" fill="url(#role-b)" />
    <path
      d="M37 32.2 l1.2 2.5 2.7 .3 -2 1.8 .6 2.6 -2.5 -1.4 -2.5 1.4 .6 -2.6 -2 -1.8 2.7 -.3 z"
      fill="#fff"
    />
  </Frame>
);

/** Three connected hexagons, one per service. */
export const ServicesIcon: React.FC<IconProps> = ({ className }) => {
  const hex = (cx: number, cy: number, r: number) =>
    Array.from({ length: 6 })
      .map((_, i) => {
        const a = (Math.PI / 3) * i - Math.PI / 6;
        return `${(cx + r * Math.cos(a)).toFixed(2)},${(cy + r * Math.sin(a)).toFixed(2)}`;
      })
      .join(' ');
  return (
    <Frame id="svc" className={className}>
      <defs>
        <Grad id="svc-a" from="#b5dcae" to="#6ea566" />
        <Grad id="svc-b" from="#9ecbef" to="#5f93c2" />
        <Grad id="svc-c" from="#f6c48d" to="#d9853f" />
      </defs>
      <path d="M16 17 L32 17 M16 17 L24 31 M32 17 L24 31" stroke="#64635e" strokeWidth="1.6" strokeDasharray="2 2" />
      <polygon points={hex(15, 16, 8)} fill="url(#svc-a)" />
      <polygon points={hex(33, 16, 8)} fill="url(#svc-b)" />
      <polygon points={hex(24, 31, 8)} fill="url(#svc-c)" />
      <text x="24" y="33.5" textAnchor="middle" fontSize="6.5" fontFamily="JetBrains Mono, monospace" fill="#fff">
        {'{}'}
      </text>
    </Frame>
  );
};

/** Receipt with a rupee badge and a verified tick. */
export const PaymentIcon: React.FC<IconProps> = ({ className }) => (
  <Frame id="pay" className={className}>
    <defs>
      <Grad id="pay-a" from="#f3eee4" to="#d6cfc2" />
      <Grad id="pay-b" from="#b5dcae" to="#6ea566" />
    </defs>
    <path d="M10 6 h22 v33 l-3.7 -2.5 -3.7 2.5 -3.6 -2.5 -3.7 2.5 -3.6 -2.5 -3.7 2.5 z" fill="url(#pay-a)" />
    {[12, 17, 22, 27].map((y, i) => (
      <rect key={y} x="14" y={y} width={i % 2 ? 9 : 14} height="2" rx="1" fill="#8d8c85" opacity="0.7" />
    ))}
    <circle cx="35" cy="31" r="8" fill="url(#pay-b)" />
    <path d="M31.5 31 l2.5 2.5 5 -5" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Frame>
);

/** Two chat bubbles, one asking and one answering with a sparkle. */
export const AiChatIcon: React.FC<IconProps> = ({ className }) => (
  <Frame id="ai" className={className}>
    <defs>
      <Grad id="ai-a" from="#9ecbef" to="#5f93c2" />
      <Grad id="ai-b" from="#c9bcf0" to="#8e79d4" />
    </defs>
    <path d="M6 10 a4 4 0 0 1 4 -4 h14 a4 4 0 0 1 4 4 v8 a4 4 0 0 1 -4 4 h-9 l-5 4 v-4 a4 4 0 0 1 -4 -4 z" fill="url(#ai-a)" />
    <text x="17" y="18" textAnchor="middle" fontSize="10" fontWeight="700" fontFamily="Geist, sans-serif" fill="#fff">
      ?
    </text>
    <path d="M18 24 a4 4 0 0 1 4 -4 h16 a4 4 0 0 1 4 4 v8 a4 4 0 0 1 -4 4 v4 l-5 -4 h-11 a4 4 0 0 1 -4 -4 z" fill="url(#ai-b)" />
    {[25, 30, 35].map((x) => (
      <circle key={x} cx={x} cy="28" r="1.7" fill="#fff" />
    ))}
    <path d="M40 5 l1 2.6 2.6 1 -2.6 1 -1 2.6 -1 -2.6 -2.6 -1 2.6 -1 z" fill="#f6c48d" />
  </Frame>
);

/* ---------- Availability icons ---------- */

export const PinIcon: React.FC<IconProps> = ({ className }) => (
  <Frame id="pin" className={className}>
    <defs>
      <Grad id="pin-a" from="#f6a37c" to="#d55f3c" />
    </defs>
    <ellipse cx="24" cy="39" rx="8" ry="2.5" fill="none" stroke="#d55f3c" strokeOpacity="0.5" strokeWidth="1.4" />
    <path d="M24 39 C15 29 12 24 12 18 a12 12 0 0 1 24 0 c0 6 -3 11 -12 21 z" fill="url(#pin-a)" />
    <circle cx="24" cy="18" r="4.5" fill="#fff" />
  </Frame>
);

export const ClockIcon: React.FC<IconProps> = ({ className }) => (
  <Frame id="clk" className={className}>
    <defs>
      <Grad id="clk-a" from="#9ecbef" to="#5f93c2" />
    </defs>
    <circle cx="24" cy="22" r="15" fill="url(#clk-a)" />
    <circle cx="24" cy="22" r="11.5" fill="#f3eee4" />
    <path d="M24 15 v7 l5 3" fill="none" stroke="#3b6f8f" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="24" cy="22" r="1.4" fill="#d9853f" />
  </Frame>
);

export const PlaneIcon: React.FC<IconProps> = ({ className }) => (
  <Frame id="pln" className={className}>
    <defs>
      <Grad id="pln-a" from="#b5dcae" to="#6ea566" />
    </defs>
    <path d="M6 30 C14 34 22 34 30 28" fill="none" stroke="#6ea566" strokeOpacity="0.6" strokeWidth="1.4" strokeDasharray="2 2.5" />
    <path d="M8 22 L40 9 L30 36 L24 26 Z" fill="url(#pln-a)" />
    <path d="M24 26 L40 9" stroke="#fff" strokeOpacity="0.7" strokeWidth="1.4" />
  </Frame>
);

export const LaptopIcon: React.FC<IconProps> = ({ className }) => (
  <Frame id="lap" className={className}>
    <defs>
      <Grad id="lap-a" from="#c9bcf0" to="#8e79d4" />
      <Grad id="lap-b" from="#f6c48d" to="#d9853f" />
    </defs>
    <rect x="9" y="10" width="30" height="21" rx="2.5" fill="url(#lap-a)" />
    <rect x="12" y="13" width="24" height="15" rx="1" fill="#1b1a18" />
    <path d="M16 18 l3 2.5 -3 2.5 M21 24 h6" fill="none" stroke="#8fbf88" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M5 33 h38 l-3 4 h-32 z" fill="url(#lap-b)" />
  </Frame>
);

/* ---------- Header illustration ---------- */

/** Envelope with a letter rising out of it. `open` lifts the letter. */
export const EnvelopeIcon: React.FC<IconProps & { open?: boolean }> = ({ className, open }) => (
  <svg viewBox="0 0 64 56" className={className} aria-hidden="true">
    <defs>
      <Grad id="env-a" from="#f6c48d" to="#d9853f" />
      <Grad id="env-b" from="#e9a15b" to="#b86a2c" />
    </defs>
    <ellipse cx="32" cy="52" rx="20" ry="2.5" fill="#000" opacity="0.35" />
    <rect x="8" y="22" width="48" height="26" rx="4" fill="url(#env-b)" />
    <g style={{ transform: `translateY(${open ? -10 : 0}px)`, transition: 'transform 500ms cubic-bezier(.2,.7,.2,1)' }}>
      <rect x="14" y="10" width="36" height="28" rx="2" fill="#f3eee4" />
      <rect x="19" y="16" width="20" height="2" rx="1" fill="#8d8c85" />
      <rect x="19" y="21" width="26" height="2" rx="1" fill="#bdbcb5" />
      <rect x="19" y="26" width="16" height="2" rx="1" fill="#bdbcb5" />
    </g>
    <path d="M8 26 L32 40 L56 26 V44 a4 4 0 0 1 -4 4 H12 a4 4 0 0 1 -4 -4 z" fill="url(#env-a)" />
    <path d="M8 46 L26 35 M56 46 L38 35" stroke="#b86a2c" strokeOpacity="0.5" strokeWidth="1.2" />
  </svg>
);
