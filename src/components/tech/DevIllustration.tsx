import React, { useId } from 'react';

/**
 * Flat illustration: a developer with headphones behind a laptop, with small tech
 * glyphs floating around. Drawn in the site palette so it sits with the rest of the page.
 * `accent` tints the laptop glow to match the selected tool's layer.
 */
export const DevIllustration: React.FC<{ accent: string }> = ({ accent }) => {
  // Unique gradient ids so several copies can live on one page.
  const uid = useId().replace(/:/g, '');
  return (
  <svg viewBox="0 0 240 240" className="h-full w-full" role="img" aria-label="Illustration of a developer working at a laptop">
    <defs>
      <radialGradient id={`dev-glow-${uid}`} cx="50%" cy="60%" r="50%">
        <stop offset="0%" stopColor={accent} stopOpacity="0.35" />
        <stop offset="100%" stopColor={accent} stopOpacity="0" />
      </radialGradient>
      <linearGradient id={`dev-jacket-${uid}`} x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" stopColor="#3b6f8f" />
        <stop offset="100%" stopColor="#2a526b" />
      </linearGradient>
    </defs>

    {/* Desk */}
    <ellipse cx="120" cy="196" rx="92" ry="16" fill="#2a2724" />
    <ellipse cx="120" cy="192" rx="92" ry="16" fill="#3a352f" />

    {/* Screen glow on the person */}
    <circle cx="120" cy="120" r="80" fill={`url(#dev-glow-${uid})`} style={{ transition: 'all 500ms' }} />

    {/* Person (gentle bob) */}
    <g className="dev-bob">
      {/* Torso */}
      <path d="M72 186 C72 150 92 136 120 136 C148 136 168 150 168 186 Z" fill={`url(#dev-jacket-${uid})`} />
      <path d="M108 138 L120 156 L132 138" fill="#e9e4da" />
      <path d="M120 156 L120 186" stroke="#1f3e52" strokeWidth="1.5" />
      {/* Neck */}
      <rect x="112" y="118" width="16" height="20" rx="6" fill="#b87a52" />
      {/* Head */}
      <ellipse cx="120" cy="96" rx="27" ry="30" fill="#c98c61" />
      {/* Hair */}
      <path
        d="M92 92 C90 66 108 58 122 60 C140 58 152 70 149 90 C146 80 138 74 128 76 C118 70 104 74 98 84 Z"
        fill="#2b211c"
      />
      {/* Ears */}
      <ellipse cx="93" cy="100" rx="4" ry="6" fill="#b87a52" />
      <ellipse cx="147" cy="100" rx="4" ry="6" fill="#b87a52" />
      {/* Headphones */}
      <path d="M90 98 C88 62 152 62 150 98" fill="none" stroke="#1d1b19" strokeWidth="5" strokeLinecap="round" />
      <rect x="84" y="90" width="11" height="20" rx="5" fill="#e9a15b" />
      <rect x="145" y="90" width="11" height="20" rx="5" fill="#e9a15b" />
      {/* Glasses */}
      <g fill="none" stroke="#1d1b19" strokeWidth="2">
        <circle cx="110" cy="99" r="7.5" />
        <circle cx="131" cy="99" r="7.5" />
        <path d="M117.5 99 L123.5 99" />
      </g>
      <circle cx="110" cy="100" r="1.8" fill="#1d1b19" />
      <circle cx="131" cy="100" r="1.8" fill="#1d1b19" />
      {/* Smile */}
      <path d="M113 113 C117 117 124 117 128 113" fill="none" stroke="#7a4a30" strokeWidth="2" strokeLinecap="round" />
    </g>

    {/* Laptop (back side facing us) */}
    <g>
      <path d="M78 186 L86 138 L154 138 L162 186 Z" fill="#cfcac0" />
      <path d="M82 184 L89 142 L151 142 L158 184 Z" fill="#dcd7cd" />
      <circle cx="120" cy="162" r="7" fill={accent} opacity="0.9" style={{ transition: 'fill 500ms' }} />
      <rect x="66" y="184" width="108" height="7" rx="3" fill="#b9b3a8" />
    </g>

    {/* Hands typing */}
    <g className="dev-type">
      <ellipse cx="92" cy="186" rx="9" ry="5" fill="#c98c61" />
      <ellipse cx="148" cy="186" rx="9" ry="5" fill="#c98c61" />
    </g>

    {/* Floating glyphs */}
    <g className="dev-float" style={{ '--d': '0s' } as React.CSSProperties}>
      <rect x="18" y="52" width="34" height="26" rx="7" fill="#1b1a18" stroke="#e9a15b" strokeOpacity="0.6" />
      <text x="35" y="70" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="13" fill="#e9a15b">
        {'{ }'}
      </text>
    </g>
    <g className="dev-float" style={{ '--d': '-1.4s' } as React.CSSProperties}>
      <g transform="translate(190 50)">
        <ellipse cx="14" cy="4" rx="14" ry="5" fill="#1b1a18" stroke="#8fbf88" strokeOpacity="0.7" />
        <path d="M0 4 V22 A14 5 0 0 0 28 22 V4" fill="#1b1a18" stroke="#8fbf88" strokeOpacity="0.7" />
        <path d="M0 13 A14 5 0 0 0 28 13" fill="none" stroke="#8fbf88" strokeOpacity="0.5" />
      </g>
    </g>
    <g className="dev-float" style={{ '--d': '-2.6s' } as React.CSSProperties}>
      <path
        d="M22 150 C14 150 12 140 20 138 C20 128 34 126 38 134 C46 130 54 138 50 146 C56 148 54 156 46 156 L24 156 C18 156 18 150 22 150 Z"
        fill="#1b1a18"
        stroke="#b4a4e2"
        strokeOpacity="0.7"
      />
    </g>
    <g className="dev-float" style={{ '--d': '-0.8s' } as React.CSSProperties}>
      <path d="M204 140 L208 150 L218 154 L208 158 L204 168 L200 158 L190 154 L200 150 Z" fill="#8db6dc" opacity="0.9" />
    </g>
    <g className="dev-float" style={{ '--d': '-2s' } as React.CSSProperties}>
      <circle cx="58" cy="26" r="3" fill="#e9a15b" opacity="0.7" />
      <circle cx="186" cy="18" r="2.5" fill="#8fbf88" opacity="0.7" />
    </g>
  </svg>
);
};
