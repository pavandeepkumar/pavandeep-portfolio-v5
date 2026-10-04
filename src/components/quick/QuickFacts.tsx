import React from 'react';
import { BadgeCheck, CalendarClock, Clock, Layers, MapPin, UserRound } from 'lucide-react';
import { quickFacts, quickHighlights, QuickFact } from '../../data/quickReview';

const factIcons: Record<QuickFact['icon'], React.ElementType> = {
  role: UserRound,
  experience: CalendarClock,
  stack: Layers,
  location: MapPin,
  availability: BadgeCheck,
  notice: Clock
};

/**
 * The six screening facts. Shared by the page section and the navbar popup so
 * the two can never fall out of sync; `columns` is the only difference between them.
 */
export const QuickFactGrid: React.FC<{ columns?: 2 | 3 }> = ({ columns = 3 }) => (
  <dl
    className={`grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2 ${columns === 3 ? 'lg:grid-cols-3' : ''}`}
  >
    {quickFacts.map((fact) => {
      const Icon = factIcons[fact.icon];
      return (
        <div key={fact.question} className="flex items-start gap-3">
          <span
            className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-line-strong bg-bg text-accent"
            aria-hidden="true"
          >
            <Icon className="h-4 w-4" />
          </span>
          <div className="min-w-0">
            <dt className="eyebrow">{fact.question}</dt>
            <dd className="mt-1 text-[15px] font-medium leading-snug text-ink">{fact.answer}</dd>
            {fact.note && <p className="mt-0.5 text-[12.5px] leading-snug text-faint">{fact.note}</p>}
          </div>
        </div>
      );
    })}
  </dl>
);

export const QuickHighlights: React.FC<{ columns?: 1 | 3 }> = ({ columns = 3 }) => (
  <ul className={`grid grid-cols-1 gap-2 ${columns === 3 ? 'sm:grid-cols-3 sm:gap-4' : ''}`}>
    {quickHighlights.map((line) => (
      <li key={line} className="flex items-start gap-2 text-[13px] leading-snug text-body">
        <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
        {line}
      </li>
    ))}
  </ul>
);
