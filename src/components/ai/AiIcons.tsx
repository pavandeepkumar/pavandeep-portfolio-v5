import React from 'react';
import { Frame, Grad } from '../contact/ContactIcons';

/**
 * Illustrated icons for the AI request path, in the same style as the contact
 * and lifecycle icons: gradient shapes, a ground shadow and a small badge.
 */

type IconProps = { className?: string };

/** Person with a speech bubble. */
export const UserIcon: React.FC<IconProps> = ({ className }) => (
  <Frame id="usr" className={className}>
    <defs>
      <Grad id="usr-a" from="#9ecbef" to="#5f93c2" />
      <Grad id="usr-b" from="#f3eee4" to="#d6cfc2" />
    </defs>
    <circle cx="19" cy="17" r="7" fill="#c98c61" />
    <path d="M17 11 c4 -4 10 -1 9 4 c-3 -2 -6 -2 -9 -4 z" fill="#2b211c" />
    <path d="M6 40 c0 -9 6 -14 13 -14 s13 5 13 14 z" fill="url(#usr-a)" />
    <path d="M28 5 h13 a3 3 0 0 1 3 3 v7 a3 3 0 0 1 -3 3 h-7 l-4 3 v-3 h-2 a3 3 0 0 1 -3 -3 v-7 a3 3 0 0 1 3 -3 z" fill="url(#usr-b)" />
    {[31.5, 34.5, 37.5].map((x) => (
      <circle key={x} cx={x} cy="11.5" r="1.2" fill="#8d8c85" />
    ))}
  </Frame>
);

/** Phone showing a chat screen. */
export const AppIcon: React.FC<IconProps> = ({ className }) => (
  <Frame id="app" className={className}>
    <defs>
      <Grad id="app-a" from="#c9bcf0" to="#7e68c8" />
    </defs>
    <rect x="13" y="4" width="22" height="36" rx="4" fill="url(#app-a)" />
    <rect x="15.5" y="8" width="17" height="27" rx="1.5" fill="#1b1a18" />
    <rect x="18" y="12" width="10" height="4" rx="2" fill="#9ecbef" />
    <rect x="20" y="19" width="10" height="4" rx="2" fill="#f6c48d" />
    <rect x="18" y="26" width="8" height="4" rx="2" fill="#9ecbef" />
    <rect x="21" y="36.5" width="6" height="1.4" rx="0.7" fill="#fff" opacity="0.7" />
  </Frame>
);

/** Document with a lock: system prompt and guardrails. */
export const PromptIcon: React.FC<IconProps> = ({ className }) => (
  <Frame id="prm" className={className}>
    <defs>
      <Grad id="prm-a" from="#f3eee4" to="#d6cfc2" />
      <Grad id="prm-b" from="#f6c48d" to="#d9853f" />
    </defs>
    <rect x="8" y="5" width="26" height="33" rx="3" fill="url(#prm-a)" />
    <text x="12" y="14" fontSize="6" fontFamily="JetBrains Mono, monospace" fill="#b86a2c">
      sys:
    </text>
    {[18, 23, 28].map((y, i) => (
      <rect key={y} x="12" y={y} width={i === 2 ? 10 : 17} height="2" rx="1" fill="#8d8c85" opacity="0.7" />
    ))}
    <path d="M31 27 v-3 a5 5 0 0 1 10 0 v3" fill="none" stroke="#b86a2c" strokeWidth="2.2" />
    <rect x="28" y="27" width="16" height="12" rx="2.5" fill="url(#prm-b)" />
    <circle cx="36" cy="32.5" r="1.8" fill="#fff" />
  </Frame>
);

/** Vector store: a database cylinder with embedding dots around it. */
export const RagIcon: React.FC<IconProps> = ({ className }) => (
  <Frame id="rag" className={className}>
    <defs>
      <Grad id="rag-a" from="#b5dcae" to="#5f9a57" />
    </defs>
    <path d="M9 12 v20 a12 4.5 0 0 0 24 0 v-20" fill="url(#rag-a)" />
    <ellipse cx="21" cy="12" rx="12" ry="4.5" fill="#d3ebcd" />
    <path d="M9 22 a12 4.5 0 0 0 24 0" fill="none" stroke="#fff" strokeOpacity="0.45" strokeWidth="1.2" />
    <g fill="#9ecbef">
      <circle cx="39" cy="10" r="2.4" />
      <circle cx="43" cy="19" r="1.8" />
      <circle cx="38" cy="27" r="2.2" />
    </g>
    <path d="M39 10 L43 19 L38 27" fill="none" stroke="#9ecbef" strokeOpacity="0.6" strokeWidth="1" />
  </Frame>
);

/** Model chip with a sparkle. */
export const LlmIcon: React.FC<IconProps> = ({ className }) => (
  <Frame id="llm" className={className}>
    <defs>
      <Grad id="llm-a" from="#c9bcf0" to="#7e68c8" />
      <Grad id="llm-b" from="#f6c48d" to="#d9853f" />
    </defs>
    {[14, 20, 26, 32].map((v) => (
      <g key={v} stroke="#8d8c85" strokeWidth="1.6" strokeLinecap="round">
        <path d={`M${v} 6 v4 M${v} 34 v4 M6 ${v} h4 M34 ${v} h4`} />
      </g>
    ))}
    <rect x="10" y="10" width="24" height="24" rx="4" fill="url(#llm-a)" />
    <rect x="15" y="15" width="14" height="14" rx="2" fill="#1b1a18" />
    <path d="M22 17 l1.4 3.6 3.6 1.4 -3.6 1.4 -1.4 3.6 -1.4 -3.6 -3.6 -1.4 3.6 -1.4 z" fill="url(#llm-b)" />
  </Frame>
);

/** JSON braces with a checked schema badge. */
export const ToolIcon: React.FC<IconProps> = ({ className }) => (
  <Frame id="tol" className={className}>
    <defs>
      <Grad id="tol-a" from="#f6c48d" to="#d9853f" />
      <Grad id="tol-b" from="#b5dcae" to="#5f9a57" />
    </defs>
    <rect x="5" y="7" width="32" height="28" rx="5" fill="url(#tol-a)" />
    <text x="21" y="27" textAnchor="middle" fontSize="15" fontWeight="700" fontFamily="JetBrains Mono, monospace" fill="#fff">
      {'{}'}
    </text>
    <circle cx="37" cy="33" r="7" fill="url(#tol-b)" />
    <path d="M34 33 l2 2 4 -4" fill="none" stroke="#fff" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
  </Frame>
);

/** Server rack with a database badge. */
export const BackendIcon: React.FC<IconProps> = ({ className }) => (
  <Frame id="bke" className={className}>
    <defs>
      <Grad id="bke-a" from="#9ecbef" to="#4f7fae" />
      <Grad id="bke-b" from="#b5dcae" to="#5f9a57" />
    </defs>
    {[6, 17, 28].map((y) => (
      <g key={y}>
        <rect x="6" y={y} width="28" height="9" rx="2.5" fill="url(#bke-a)" />
        <circle cx="11" cy={y + 4.5} r="1.3" fill="#8fbf88" />
        <rect x="16" y={y + 3.7} width="13" height="1.6" rx="0.8" fill="#fff" opacity="0.5" />
      </g>
    ))}
    <path d="M32 30 v7 a6 2.2 0 0 0 12 0 v-7" fill="url(#bke-b)" />
    <ellipse cx="38" cy="30" rx="6" ry="2.2" fill="#d3ebcd" />
  </Frame>
);

/** Confirmed booking ticket. */
export const ActionIcon: React.FC<IconProps> = ({ className }) => (
  <Frame id="act" className={className}>
    <defs>
      <Grad id="act-a" from="#f3eee4" to="#d6cfc2" />
      <Grad id="act-b" from="#b5dcae" to="#5f9a57" />
    </defs>
    <path
      d="M5 11 a3 3 0 0 1 3 -3 h32 a3 3 0 0 1 3 3 v5 a4 4 0 0 0 0 8 v5 a3 3 0 0 1 -3 3 h-32 a3 3 0 0 1 -3 -3 v-5 a4 4 0 0 0 0 -8 z"
      fill="url(#act-a)"
    />
    <path d="M30 9 v22" stroke="#8d8c85" strokeDasharray="2 2" />
    <rect x="10" y="14" width="15" height="2" rx="1" fill="#8d8c85" />
    <rect x="10" y="19" width="10" height="2" rx="1" fill="#bdbcb5" />
    <circle cx="37" cy="33" r="7" fill="url(#act-b)" />
    <path d="M34 33 l2 2 4 -4" fill="none" stroke="#fff" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
  </Frame>
);

/** Shield with a tick: guardrails. */
export const ShieldIcon: React.FC<IconProps> = ({ className }) => (
  <Frame id="shd" className={className}>
    <defs>
      <Grad id="shd-a" from="#9ecbef" to="#4f7fae" />
    </defs>
    <path d="M24 4 L39 9 V21 C39 30 32 37 24 40 C16 37 9 30 9 21 V9 Z" fill="url(#shd-a)" />
    <path d="M24 8 L35 11.5 V21 C35 28 30 33 24 35.5 Z" fill="#fff" opacity="0.15" />
    <path d="M17 22 l5 5 9 -9" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
  </Frame>
);
