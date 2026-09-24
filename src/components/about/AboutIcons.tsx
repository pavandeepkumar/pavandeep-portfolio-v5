import React from 'react';
import { Frame, Grad } from '../contact/ContactIcons';

/** Extra illustrated icons for the About section, same style as the rest. */

type IconProps = { className?: string };

/** Browser window with a layout sketch. */
export const BrowserIcon: React.FC<IconProps> = ({ className }) => (
  <Frame id="brw" className={className}>
    <defs>
      <Grad id="brw-a" from="#9ecbef" to="#5f93c2" />
    </defs>
    <rect x="5" y="7" width="38" height="31" rx="4" fill="url(#brw-a)" />
    <rect x="8" y="14" width="32" height="21" rx="1.5" fill="#1b1a18" />
    {[9, 12.5, 16].map((x, i) => (
      <circle key={x} cx={x} cy="10.5" r="1.2" fill={['#e36d4f', '#f6c48d', '#8fbf88'][i]} />
    ))}
    <rect x="11" y="17" width="8" height="15" rx="1" fill="#3a3936" />
    <rect x="21" y="17" width="16" height="6" rx="1" fill="#e9a15b" opacity="0.8" />
    <rect x="21" y="25" width="7" height="7" rx="1" fill="#3a3936" />
    <rect x="30" y="25" width="7" height="7" rx="1" fill="#3a3936" />
  </Frame>
);

/** Database cylinder with a lock badge. */
export const DatabaseIcon: React.FC<IconProps> = ({ className }) => (
  <Frame id="dbi" className={className}>
    <defs>
      <Grad id="dbi-a" from="#b5dcae" to="#5f9a57" />
      <Grad id="dbi-b" from="#f6c48d" to="#d9853f" />
    </defs>
    <path d="M8 11 v22 a14 5 0 0 0 28 0 v-22" fill="url(#dbi-a)" />
    <ellipse cx="22" cy="11" rx="14" ry="5" fill="#d3ebcd" />
    <path d="M8 18.5 a14 5 0 0 0 28 0 M8 26 a14 5 0 0 0 28 0" fill="none" stroke="#fff" strokeOpacity="0.45" strokeWidth="1.2" />
    <path d="M34 30 v-2.5 a4 4 0 0 1 8 0 v2.5" fill="none" stroke="#b86a2c" strokeWidth="2" />
    <rect x="31.5" y="30" width="13" height="10" rx="2" fill="url(#dbi-b)" />
    <circle cx="38" cy="35" r="1.5" fill="#fff" />
  </Frame>
);

/** Cloud with a container box. */
export const CloudIcon: React.FC<IconProps> = ({ className }) => (
  <Frame id="cld" className={className}>
    <defs>
      <Grad id="cld-a" from="#e3ded4" to="#b9b3a8" />
      <Grad id="cld-b" from="#9ecbef" to="#4f7fae" />
    </defs>
    <path
      d="M13 30 C6 30 5 21 11 19.5 C11 12 20 9 24.5 14 C28 8 38 10 37.5 18 C44 18.5 44 30 37 30 Z"
      fill="url(#cld-a)"
    />
    <g transform="translate(15 24)">
      <rect width="18" height="13" rx="1.5" fill="url(#cld-b)" />
      {[3.5, 7.5, 11.5, 15.5].map((x) => (
        <path key={x} d={`M${x - 0.5} 2.5 v8`} stroke="#fff" strokeOpacity="0.5" strokeWidth="1.2" />
      ))}
    </g>
  </Frame>
);
