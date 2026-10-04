import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Clock } from 'lucide-react';
import { profileData } from '../../data/profile';
import { quickVerdict } from '../../data/quickReview';
import { QuickFactGrid, QuickHighlights } from './QuickFacts';

interface QuickReviewModalProps {
  open: boolean;
  onClose: () => void;
  onOpenResume: () => void;
}

/** Centred card so a recruiter can read the summary without leaving the page. */
export const QuickReviewModal: React.FC<QuickReviewModalProps> = ({ open, onClose, onOpenResume }) => {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  // Portal to <body> so the navbar's transformed ancestors can't trap the fixed overlay.
  return createPortal(
    <div
      className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto p-4 sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="quick-review-modal-title"
    >
      <button type="button" className="fixed inset-0 bg-black/70" onClick={onClose} aria-label="Close quick review" tabIndex={-1} />

      <div className="anim-in relative my-auto w-full max-w-3xl rounded-xl border border-line bg-raised card-shadow">
        <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-4 sm:px-7">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-ok/40 bg-ok/[0.07] px-2.5 py-1 font-mono text-[11px] text-ok">
              <Clock className="h-3 w-3" aria-hidden="true" />
              10 second read
            </span>
            <h2 id="quick-review-modal-title" className="font-serif text-[20px] leading-none text-ink">
              {profileData.name}
            </h2>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="shrink-0 font-mono text-xs uppercase tracking-wider text-ink hover:text-accent"
          >
            Close <span className="text-faint">esc</span>
          </button>
        </div>

        <div className="px-5 py-6 sm:px-7">
          <QuickFactGrid columns={2} />

          <div className="mt-6 border-t border-line pt-5">
            <QuickHighlights columns={1} />
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
            <a href="#quick-review" onClick={onClose} className="link text-sm">
              Full page
            </a>
          </div>

          <p className="mt-5 text-[13px] leading-relaxed text-faint">{quickVerdict}</p>
        </div>
      </div>
    </div>,
    document.body
  );
};
