import type React from 'react';
import { PaymentIcon, ServersIcon, ServicesIcon } from '../contact/ContactIcons';
import { ActionIcon, AppIcon, BackendIcon, LlmIcon, ShieldIcon, ToolIcon, UserIcon } from '../ai/AiIcons';
import { BrowserIcon, CloudIcon, DatabaseIcon } from '../about/AboutIcons';

type IconC = React.FC<{ className?: string }>;

/** Illustrated icon for each project domain (used by the filters and the card titles). */
export const domainIcon: Record<string, IconC> = {
  Backend: BackendIcon,
  'Full Stack': BrowserIcon,
  Microservices: ServicesIcon,
  AI: LlmIcon,
  FinTech: PaymentIcon,
  SaaS: CloudIcon,
  Mobile: AppIcon,
  Enterprise: ShieldIcon
};

/** Picks an icon for a metric tile from words in its label. First match wins. */
const metricRules: [RegExp, IconC][] = [
  [/\bai\b/i, LlmIcon],
  [/payment|monetization|assets/i, PaymentIcon],
  [/reliability|security|safety/i, ShieldIcon],
  [/deploy/i, CloudIcon],
  [/protocol|communication|integration/i, ServersIcon],
  [/caching/i, BackendIcon],
  [/role|ecosystem/i, UserIcon],
  [/booking/i, ActionIcon],
  [/catalog|domain/i, DatabaseIcon],
  [/platform|scope/i, BrowserIcon],
  [/architecture|stack|tech/i, ServicesIcon]
];

export const metricIcon = (label: string): IconC => metricRules.find(([re]) => re.test(label))?.[1] ?? ToolIcon;
