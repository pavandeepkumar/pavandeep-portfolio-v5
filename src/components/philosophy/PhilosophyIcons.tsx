import React from 'react';
import { Frame, Grad } from '../contact/ContactIcons';

/**
 * Illustrated icons for the six lifecycle steps, in the same style as the
 * contact icons: gradient shapes, a ground shadow and a small round badge.
 */

type IconProps = { className?: string };

/** 01 Understand: magnifier over a document. */
export const ProblemIcon: React.FC<IconProps> = ({ className }) => (
  <Frame id="prb" className={className}>
    <defs>
      <Grad id="prb-a" from="#f3eee4" to="#d6cfc2" />
      <Grad id="prb-b" from="#9ecbef" to="#5f93c2" />
    </defs>
    <rect x="7" y="6" width="24" height="31" rx="3" fill="url(#prb-a)" />
    {[12, 17, 22].map((y, i) => (
      <rect key={y} x="11" y={y} width={i === 1 ? 10 : 15} height="2" rx="1" fill="#8d8c85" opacity="0.7" />
    ))}
    <path d="M34 34 L41 41" stroke="#3b6f8f" strokeWidth="4.5" strokeLinecap="round" />
    <circle cx="28" cy="28" r="9" fill="url(#prb-b)" />
    <circle cx="28" cy="28" r="6" fill="#dcecf8" />
    <path d="M25 26 a4 4 0 0 1 4 -2.5" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
    <text x="28" y="31" textAnchor="middle" fontSize="8" fontWeight="700" fontFamily="Roboto, sans-serif" fill="#3b6f8f">
      ?
    </text>
  </Frame>
);

/** 02 Design: blueprint sheet with a pen and a boxes-and-arrow sketch. */
export const DesignIcon: React.FC<IconProps> = ({ className }) => (
  <Frame id="dsn" className={className}>
    <defs>
      <Grad id="dsn-a" from="#9ecbef" to="#4f7fae" />
      <Grad id="dsn-b" from="#f6c48d" to="#d9853f" />
    </defs>
    <rect x="5" y="8" width="32" height="28" rx="3" fill="url(#dsn-a)" />
    <rect x="10" y="13" width="8" height="6" rx="1" fill="none" stroke="#fff" strokeWidth="1.3" />
    <rect x="24" y="25" width="8" height="6" rx="1" fill="none" stroke="#fff" strokeWidth="1.3" />
    <path d="M18 16 H28 V25" fill="none" stroke="#fff" strokeWidth="1.3" strokeDasharray="2 1.5" />
    <g transform="rotate(40 36 22)">
      <rect x="33" y="4" width="6" height="26" rx="1.5" fill="url(#dsn-b)" />
      <path d="M33 30 L36 36 L39 30 Z" fill="#f3eee4" />
      <path d="M35.2 34.5 L36 36 L36.8 34.5 Z" fill="#1d1b19" />
    </g>
  </Frame>
);

/** 03 Build: gear with a wrench across it. */
export const BuildIcon: React.FC<IconProps> = ({ className }) => {
  const teeth = Array.from({ length: 8 }).map((_, i) => {
    const a = (Math.PI / 4) * i;
    return { x: 20 + 13 * Math.cos(a), y: 22 + 13 * Math.sin(a), deg: (a * 180) / Math.PI };
  });
  return (
    <Frame id="bld" className={className}>
      <defs>
        <Grad id="bld-a" from="#b5dcae" to="#5f9a57" />
        <Grad id="bld-b" from="#e3ded4" to="#a9a398" />
      </defs>
      {teeth.map((t) => (
        <rect key={t.deg} x={t.x - 3} y={t.y - 3} width="6" height="6" rx="1.2" fill="#5f9a57" transform={`rotate(${t.deg} ${t.x} ${t.y})`} />
      ))}
      <circle cx="20" cy="22" r="12" fill="url(#bld-a)" />
      <circle cx="20" cy="22" r="4.5" fill="#1b1a18" />
      <g transform="rotate(-45 32 30)">
        <rect x="29.5" y="20" width="5" height="22" rx="2.5" fill="url(#bld-b)" />
        <path d="M26 20 a6 6 0 0 1 12 0 v-4 h-3 v4 h-6 v-4 h-3 z" fill="url(#bld-b)" />
      </g>
    </Frame>
  );
};

/** 04 Measure: speedometer with the needle in the red. */
export const MeasureIcon: React.FC<IconProps> = ({ className }) => (
  <Frame id="msr" className={className}>
    <defs>
      <Grad id="msr-a" from="#c9bcf0" to="#7e68c8" />
    </defs>
    <path d="M6 32 a18 18 0 0 1 36 0 v3 a3 3 0 0 1 -3 3 h-30 a3 3 0 0 1 -3 -3 z" fill="url(#msr-a)" />
    <path d="M11 32 a13 13 0 0 1 26 0" fill="none" stroke="#1b1a18" strokeWidth="4.5" />
    <path d="M11 32 a13 13 0 0 1 6 -11" fill="none" stroke="#8fbf88" strokeWidth="4.5" />
    <path d="M17 21 a13 13 0 0 1 14 0" fill="none" stroke="#f6c48d" strokeWidth="4.5" />
    <path d="M31 21 a13 13 0 0 1 6 11" fill="none" stroke="#e36d4f" strokeWidth="4.5" />
    <path d="M24 32 L33 22" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" />
    <circle cx="24" cy="32" r="3" fill="#fff" />
  </Frame>
);

/** 05 Automate: two gears turning a conveyor of boxes. */
export const AutomateIcon: React.FC<IconProps> = ({ className }) => (
  <Frame id="aut" className={className}>
    <defs>
      <Grad id="aut-a" from="#f6c48d" to="#d9853f" />
      <Grad id="aut-b" from="#9ecbef" to="#5f93c2" />
    </defs>
    <rect x="5" y="30" width="38" height="7" rx="3.5" fill="#3a3936" />
    {[10, 19, 28, 37].map((x) => (
      <circle key={x} cx={x} cy="33.5" r="1.8" fill="#8d8c85" />
    ))}
    <rect x="9" y="20" width="9" height="9" rx="1.5" fill="url(#aut-a)" />
    <rect x="22" y="20" width="9" height="9" rx="1.5" fill="url(#aut-a)" opacity="0.8" />
    <path d="M9 24.5 h9 M22 24.5 h9" stroke="#b86a2c" strokeOpacity="0.5" />
    <circle cx="37" cy="12" r="7" fill="url(#aut-b)" />
    <path d="M33.5 12 a3.5 3.5 0 1 1 1 2.5 M33.5 14.5 v-2.5 h2.5" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </Frame>
);

/** 06 Ship: rocket lifting off with a flame. */
export const ShipIcon: React.FC<IconProps> = ({ className }) => (
  <Frame id="shp" className={className}>
    <defs>
      <Grad id="shp-a" from="#f3eee4" to="#c9c2b5" />
      <Grad id="shp-b" from="#f6c48d" to="#e36d4f" />
    </defs>
    <path d="M20 34 C18 39 21 42 24 44 C27 42 30 39 28 34 Z" fill="url(#shp-b)" />
    <path d="M17 26 L10 32 L17 32 Z M31 26 L38 32 L31 32 Z" fill="#e36d4f" />
    <path d="M24 4 C32 10 33 22 31 34 H17 C15 22 16 10 24 4 Z" fill="url(#shp-a)" />
    <circle cx="24" cy="18" r="4.5" fill="#5f93c2" stroke="#fff" strokeWidth="1.5" />
    <path d="M24 26 V34" stroke="#e36d4f" strokeWidth="2" />
  </Frame>
);

export const lifecycleIcons = [ProblemIcon, DesignIcon, BuildIcon, MeasureIcon, AutomateIcon, ShipIcon];
