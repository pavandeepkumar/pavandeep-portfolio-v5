import React from 'react';
import { Clock } from 'lucide-react';
import { Section } from '../layout/Section';
import { profileData } from '../../data/profile';
import { quickVerdict } from '../../data/quickReview';
import { QuickFactGrid, QuickHighlights } from './QuickFacts';

interface QuickReviewProps {
  onOpenResume: () => void;
}

/**
 * Screening summary for recruiters: the six facts that decide whether the rest
 * of the page is worth reading, laid out so the whole block scans in ten seconds.
 * The navbar popup shows this same content from `QuickFacts`.
 */
export const QuickReview: React.FC<QuickReviewProps> = ({ onOpenResume }) => (
  <Section
    id="quick-review"
    index="01"
    label="Quick review"
    title="The 10-second version."
    intro="Hiring and screening for a role? Start here. Six facts, plain language, no scrolling required. Everything below this section is the long-form proof."
  >
    <div className="rounded-xl border border-line bg-raised card-shadow p-5 sm:p-7">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 border-b border-line pb-4">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-ok/40 bg-ok/[0.07] px-2.5 py-1 font-mono text-[11px] text-ok">
          <Clock className="h-3 w-3" aria-hidden="true" />
          10 second read
        </span>
        <p className="font-mono text-[11px] text-faint">
          {profileData.name} · {profileData.contacts.locationText}
        </p>
      </div>

      <div className="pt-5">
        <QuickFactGrid />
      </div>

      <div className="mt-6 border-t border-line pt-5">
        <QuickHighlights />
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-line pt-5">
        <button
          type="button"
          onClick={onOpenResume}
          className="rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-bg transition-all duration-200 hover:-translate-y-0.5 hover:bg-accent hover:shadow-[0_8px_24px_-8px_var(--color-accent)]"
        >
          View resume ↗<span className="sr-only"> opens in a new tab</span>
        </button>
        <a href={`mailto:${profileData.contacts.email}`} className="link text-sm">
          {profileData.contacts.email}
        </a>
        <a href={profileData.contacts.linkedin} target="_blank" rel="noopener noreferrer" className="link text-sm">
          LinkedIn
        </a>
      </div>

      <p className="mt-5 max-w-2xl text-[13px] leading-relaxed text-faint">{quickVerdict}</p>
    </div>
  </Section>
);
