import React from 'react';
import { FileText, Eye, Download, Printer, CheckCircle2, ArrowRight, ExternalLink } from 'lucide-react';
import { profileData } from '../../data/profile';

interface ResumeSectionProps {
  onOpenResume: () => void;
}

export const ResumeSection: React.FC<ResumeSectionProps> = ({ onOpenResume }) => {
  const handleDownload = () => {
    window.open(profileData.resumeDownloadUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="py-20 border-b border-white/[0.08] bg-[#07090e]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-r from-white/[0.03] via-cyan-950/20 to-white/[0.02] border border-white/[0.1] relative overflow-hidden">
          {/* Subtle accent glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider">
                <FileText className="w-3.5 h-3.5" />
                <span>CURRICULUM VITAE</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                More details, one document.
              </h2>

              <p className="text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed">
                A verified breakdown of {profileData.experienceYears} years of full-stack engineering, microservices architecture, database tuning, and real-world AI integrations. Ready for technical review.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-3">
                <button
                  onClick={onOpenResume}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold text-black bg-cyan-400 hover:bg-cyan-300 transition-all duration-150 shadow-[0_0_15px_rgba(34,211,238,0.25)] cursor-pointer"
                  data-cursor="VIEW"
                >
                  <Eye className="w-4 h-4" />
                  <span>View Resume</span>
                </button>

                <button
                  onClick={handleDownload}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs sm:text-sm font-medium text-slate-200 bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.12] transition-colors cursor-pointer"
                  data-cursor="DOWNLOAD"
                >
                  <Download className="w-4 h-4 text-cyan-400" />
                  <span>Download Resume</span>
                </button>
              </div>
            </div>

            {/* Right: Clean Resume Preview Card */}
            <div className="lg:col-span-5">
              <button
                type="button"
                onClick={onOpenResume}
                aria-label="Open resume in a new tab"
                className="w-full text-left p-5 rounded-xl bg-black/60 border border-white/[0.12] hover:border-cyan-500/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 transition-all cursor-pointer group shadow-2xl"
                data-cursor="EXPAND"
              >
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.08] text-xs font-mono">
                  <span className="text-white font-semibold">Pavandeep Kumar</span>
                  <span className="text-cyan-400 text-[11px] group-hover:underline">
                    Open resume ↗
                  </span>
                </div>

                <div className="py-3 space-y-2 text-xs font-mono">
                  <div className="text-slate-400">
                    <span className="text-slate-500">ROLE: </span>
                    <span className="text-slate-200">{profileData.role}</span>
                  </div>
                  <div className="text-slate-400">
                    <span className="text-slate-500">EXPERIENCE: </span>
                    <span className="text-slate-200">{profileData.experienceYears} Years (Devstree IT Services)</span>
                  </div>
                  <div className="text-slate-400">
                    <span className="text-slate-500">LOCATION: </span>
                    <span className="text-slate-200">{profileData.location}</span>
                    <span className="text-emerald-400"> · {profileData.relocation}</span>
                  </div>
                  <div className="text-slate-400 truncate">
                    <span className="text-slate-500">CORE: </span>
                    <span className="text-cyan-300">NestJS · React · PostgreSQL · Docker · AI</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span className="flex items-center gap-1 text-emerald-400">
                    <CheckCircle2 className="w-3 h-3" /> Updated 2026
                  </span>
                  <span className="flex items-center gap-1">
                    PDF · Google Drive <ExternalLink className="w-3 h-3" aria-hidden="true" />
                  </span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
