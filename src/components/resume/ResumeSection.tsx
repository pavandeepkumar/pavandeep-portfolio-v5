import React from 'react';
import { profileData } from '../../data/profile';
import { projectsData } from '../../data/projects';
import { Container } from '../layout/Section';
import { PlaneIcon, ServicesIcon } from '../contact/ContactIcons';
import { BackendIcon } from '../ai/AiIcons';
import { BrowserIcon } from '../about/AboutIcons';

interface ResumeSectionProps {
  onOpenResume: () => void;
}

/** A drawn one-page resume: two sheets, the front one lifts and straightens on hover. */
const PaperPreview: React.FC<{ onOpen: () => void }> = ({ onOpen }) => (
  <button
    type="button"
    onClick={onOpen}
    className="group relative mx-auto block h-[210px] w-[190px] sm:h-[230px] sm:w-[205px]"
    aria-label="Open resume"
  >
    {/* Back sheet */}
    <span className="absolute inset-0 translate-x-3 translate-y-2 rotate-6 rounded-lg border border-line-strong bg-[#2a2724] transition-transform duration-500 group-hover:translate-x-5 group-hover:rotate-[9deg]" />
    {/* Front sheet */}
    <span className="absolute inset-0 -rotate-3 overflow-hidden rounded-lg bg-[#efeae0] p-4 text-left shadow-[0_24px_50px_-20px_rgba(0,0,0,.9)] transition-transform duration-500 ease-[cubic-bezier(.2,.7,.2,1)] group-hover:-translate-y-2 group-hover:rotate-0">
      <span className="flex items-center gap-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-md bg-accent font-serif text-[12px] text-bg">PK</span>
        <span>
          <span className="block font-serif text-[13px] leading-none text-[#1b1a18]">Pavandeep Kumar</span>
          <span className="mt-1 block font-mono text-[7px] uppercase tracking-wider text-[#8d8c85]">Software Engineer</span>
        </span>
      </span>
      {[
        { h: 'Experience', lines: [90, 75, 82] },
        { h: 'Projects', lines: [85, 60] },
        { h: 'Skills', lines: [] }
      ].map((sec) => (
        <span key={sec.h} className="mt-3 block">
          <span className="block font-mono text-[7px] uppercase tracking-wider text-[#b86a2c]">{sec.h}</span>
          <span className="mt-1 block h-px bg-[#d6cfc2]" />
          {sec.lines.map((w, i) => (
            <span key={i} className="mt-1 block h-[4px] rounded-full bg-[#cfc8bb]" style={{ width: `${w}%` }} />
          ))}
          {sec.h === 'Skills' && (
            <span className="mt-1.5 flex flex-wrap gap-1">
              {['#e9a15b', '#8fbf88', '#8db6dc', '#b4a4e2', '#e9a15b'].map((c, i) => (
                <span key={i} className="h-[7px] w-7 rounded-full" style={{ background: c, opacity: 0.8 }} />
              ))}
            </span>
          )}
        </span>
      ))}
      {/* PDF badge */}
      <span className="absolute right-3 bottom-3 rounded-md bg-[#d55f3c] px-1.5 py-0.5 font-mono text-[8px] font-bold text-white">PDF</span>
    </span>
    {/* Page count tag */}
    <span className="absolute -top-2 -left-3 rounded-full border border-accent/40 bg-bg px-2 py-0.5 font-mono text-[10px] text-accent shadow-lg transition-transform duration-500 group-hover:-translate-y-1">
      1 page
    </span>
  </button>
);

export const ResumeSection: React.FC<ResumeSectionProps> = ({ onOpenResume }) => {
  const inside = [
    { Icon: BrowserIcon, text: `${profileData.experienceYears} yrs, intern to engineer` },
    { Icon: ServicesIcon, text: `${projectsData.length} production systems` },
    { Icon: BackendIcon, text: 'NestJS · PostgreSQL · Redis · AI' },
    { Icon: PlaneIcon, text: profileData.relocation }
  ];

  return (
    <section className="relative overflow-hidden border-t border-line bg-raised py-14 sm:py-16">
      {/* Soft glow behind the paper */}
      <span
        className="pointer-events-none absolute top-1/2 left-[18%] h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-3xl"
        aria-hidden="true"
      />
      <Container className="relative grid grid-cols-1 items-center gap-y-10 md:grid-cols-12 md:gap-x-8">
        <div className="md:col-span-4">
          <PaperPreview onOpen={onOpenResume} />
        </div>

        <div className="md:col-span-5">
          <p className="eyebrow">Resume</p>
          <h2 className="mt-3 font-serif text-3xl leading-tight text-ink sm:text-4xl">Prefer the one-page version?</h2>
          <ul className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {inside.map(({ Icon, text }) => (
              <li key={text} className="group flex items-center gap-2.5 rounded-lg border border-line bg-bg/50 p-2 pr-3">
                <Icon className="h-8 w-8 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5" />
                <span className="text-[13px] leading-snug text-body">{text}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm md:col-span-3 md:flex-col md:items-start">
          <button
            type="button"
            onClick={onOpenResume}
            className="group relative overflow-hidden rounded-full bg-ink px-5 py-2.5 font-medium text-bg transition-all duration-200 hover:-translate-y-0.5 hover:bg-accent hover:shadow-[0_8px_24px_-8px_var(--color-accent)]"
          >
            View resume ↗<span className="sr-only"> opens in a new tab</span>
          </button>
          <a href={profileData.resumeDownloadUrl} target="_blank" rel="noopener noreferrer" className="link">
            Download PDF
          </a>
        </div>
      </Container>
    </section>
  );
};
