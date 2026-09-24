import React from 'react';
import { ArrowRight, FileText, Sparkles, ShieldCheck } from 'lucide-react';
import { profileData } from '../../data/profile';
import { SystemConsole } from './SystemConsole';

interface HeroProps {
  onOpenResume: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResume }) => {
  return (
    <section id="hero" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Subtle background engineering grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(ellipse at 50% 30%, black 40%, transparent 80%)'
        }}
      />

      {/* Subtle atmospheric glow behind console */}
      <div className="absolute top-1/4 right-5 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Core Positioning & Identity */}
          <div className="lg:col-span-6 space-y-6">
            {/* Clean editorial label - Zero-pill discipline */}
            <div className="flex items-center gap-2.5 text-xs font-mono tracking-wider text-slate-400">
              <span className="text-cyan-400 font-semibold">FULL STACK ENGINEER</span>
              <span className="text-slate-600">·</span>
              <span>3.6+ YEARS EXPERIENCE</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold tracking-tight text-white leading-[1.1] text-balance">
              Building systems that{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-300 to-indigo-300">
                scale beyond
              </span>{' '}
              the screen.
            </h1>

            {/* Supporting Bio Text */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl font-normal">
              {profileData.bioSummary}
            </p>

            {/* Real Status Indicator */}
            <div className="flex items-center gap-3 pt-1">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/[0.04] border border-white/[0.08] text-xs font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                <span className="text-slate-200 font-medium tracking-wide">
                  {profileData.status}
                </span>
              </div>
              <span className="text-xs text-slate-400 font-mono hidden sm:inline">
                {profileData.location}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-black bg-cyan-400 hover:bg-cyan-300 transition-all duration-150 shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:shadow-[0_0_25px_rgba(34,211,238,0.5)] cursor-pointer"
                data-cursor="EXPLORE"
              >
                <span>Explore My Work</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={onOpenResume}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-medium text-slate-200 bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.12] transition-all duration-150 hover:border-cyan-500/40 hover:text-white cursor-pointer"
                data-cursor="VIEW"
              >
                <FileText className="w-4 h-4 text-cyan-400" />
                <span>View Resume</span>
              </button>
            </div>

            {/* Core Tech Stack Badges preview */}
            <div className="pt-4 border-t border-white/[0.08]">
              <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-2">
                Primary Architecture Specializations
              </div>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-slate-300 font-mono">
                <span>NestJS</span>
                <span className="text-slate-600">/</span>
                <span>Node.js</span>
                <span className="text-slate-600">/</span>
                <span>React & Next.js</span>
                <span className="text-slate-600">/</span>
                <span>PostgreSQL</span>
                <span className="text-slate-600">/</span>
                <span>Docker & gRPC</span>
                <span className="text-slate-600">/</span>
                <span className="text-cyan-400">RAG & AI Tools</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive System Console */}
          <div className="lg:col-span-6">
            <SystemConsole />
          </div>
        </div>
      </div>
    </section>
  );
};
