import React, { useState } from 'react';
import { Project } from '../../types/portfolio';
import { ArrowRight, Cpu, Layers, AlertCircle, CheckCircle2, Zap, Terminal, ExternalLink, Network } from 'lucide-react';

interface FeaturedProjectCardProps {
  project: Project;
  onOpenModal: (project: Project) => void;
  index: number;
}

export const FeaturedProjectCard: React.FC<FeaturedProjectCardProps> = ({
  project,
  onOpenModal,
  index
}) => {
  const [activeTab, setActiveTab] = useState<'ARCHITECTURE' | 'CHALLENGE' | 'WHAT_I_BUILT'>('ARCHITECTURE');
  const [interactiveStep, setInteractiveStep] = useState<number>(0);

  return (
    <article className="rounded-2xl border border-white/[0.1] bg-[#080c14] overflow-hidden shadow-xl transition-all duration-300 hover:border-cyan-500/30">
      {/* Top Meta Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 border-b border-white/[0.08] bg-black/40 text-xs font-mono">
        <div className="flex items-center gap-3">
          <span className="text-cyan-400 font-bold tracking-wider">
            CASE STUDY {String(index + 1).padStart(2, '0')}
          </span>
          <span className="text-slate-600">·</span>
          <span className="text-slate-300 font-medium">{project.category}</span>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-slate-400">{project.year}</span>
          <button
            onClick={() => onOpenModal(project)}
            className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 transition-colors"
            data-cursor="EXPAND"
          >
            <span>Full Specs</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Grid: Left Narrative + Right System Visualizer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-white/[0.08]">
        {/* Left Column: Context, Problem, Implementation */}
        <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-baseline gap-3">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {project.title}
              </h3>
              <span className="text-sm font-mono text-cyan-400">
                — {project.subtitle}
              </span>
            </div>

            <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
              {project.summary}
            </p>

            {/* Tech stack line */}
            <div className="mt-4 pt-4 border-t border-white/[0.06]">
              <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2">
                CORE STACK
              </div>
              <div className="flex flex-wrap gap-1.5">
                {project.technologies.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 text-xs font-mono bg-white/[0.03] border border-white/[0.08] rounded text-slate-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* The Engineering Problem */}
            <div className="mt-5 p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <div className="text-xs font-mono text-amber-400/90 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>THE ARCHITECTURAL PROBLEM</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                {project.problem}
              </p>
            </div>

            {/* Engineering Challenge & Solution */}
            <div className="mt-4 p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/20">
              <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5" />
                <span>CHALLENGE & SOLUTION</span>
              </div>
              <p className="text-xs font-semibold text-white mb-1">
                {project.engineeringChallenge}
              </p>
              <p className="text-xs text-slate-300 leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Bottom Callout: Key Takeaway */}
          <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
            <div className="text-xs text-slate-400 font-mono">
              <span className="text-cyan-400 font-semibold">TAKEAWAY: </span>
              <span>{project.keyTakeaway}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive System Architecture Visualizer */}
        <div className="lg:col-span-5 p-6 sm:p-7 bg-black/40 flex flex-col justify-between">
          <div>
            {/* View Selector */}
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08] mb-4">
              <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" />
                <span>SYSTEM SCHEMATIC</span>
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => setActiveTab('ARCHITECTURE')}
                  className={`px-2.5 py-1 text-[11px] font-mono rounded transition-colors ${
                    activeTab === 'ARCHITECTURE'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  FLOW
                </button>
                <button
                  onClick={() => setActiveTab('WHAT_I_BUILT')}
                  className={`px-2.5 py-1 text-[11px] font-mono rounded transition-colors ${
                    activeTab === 'WHAT_I_BUILT'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  DELIVERABLES
                </button>
              </div>
            </div>

            {activeTab === 'ARCHITECTURE' ? (
              <div className="space-y-4">
                <p className="text-xs text-slate-300 leading-relaxed">
                  {project.architecture.description}
                </p>

                {/* Step Flow Pipeline */}
                <div className="space-y-2">
                  <div className="text-[11px] font-mono text-slate-400 uppercase">
                    DATA & CONTROL FLOW
                  </div>
                  <div className="space-y-1.5">
                    {project.architecture.flow.map((step, idx) => {
                      const isCurrent = interactiveStep === idx;
                      return (
                        <button
                          key={step}
                          onClick={() => setInteractiveStep(idx)}
                          className={`w-full text-left px-3 py-2 rounded-md border text-xs font-mono transition-all flex items-center justify-between ${
                            isCurrent
                              ? 'bg-cyan-950/50 border-cyan-500/50 text-white font-semibold'
                              : 'bg-white/[0.02] border-white/[0.06] text-slate-300 hover:bg-white/[0.05]'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] text-cyan-400 font-bold">
                              {String(idx + 1).padStart(2, '0')}
                            </span>
                            <span className="truncate">{step}</span>
                          </div>
                          <span className="text-[10px] text-slate-500">
                            {idx === 0 ? 'INGRESS' : idx === project.architecture.flow.length - 1 ? 'COMMIT' : 'PROCESS'}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Components list */}
                <div className="pt-3 border-t border-white/[0.06]">
                  <div className="text-[11px] font-mono text-slate-400 uppercase mb-2">
                    CORE COMPONENTS
                  </div>
                  <div className="space-y-1.5 max-h-44 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-white/10">
                    {project.architecture.components.map((c) => (
                      <div
                        key={c.name}
                        className="p-2 rounded bg-black/40 border border-white/[0.04] text-[11px]"
                      >
                        <div className="flex justify-between font-mono">
                          <span className="text-slate-200 font-semibold">{c.name}</span>
                          {c.tech && <span className="text-cyan-400 text-[10px]">{c.tech}</span>}
                        </div>
                        <div className="text-slate-400 mt-0.5 font-sans leading-snug">{c.role}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="text-[11px] font-mono text-emerald-400 uppercase">
                  WHAT I PERSONALLY BUILT
                </div>
                <ul className="space-y-2.5">
                  {project.whatIBuilt.map((item, i) => (
                    <li
                      key={i}
                      className="p-2.5 rounded bg-white/[0.02] border border-white/[0.06] text-xs text-slate-300 leading-relaxed flex items-start gap-2"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Metrics / Verified Attributes */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="mt-6 pt-4 border-t border-white/[0.08] grid grid-cols-2 gap-2">
              {project.metrics.map((m) => (
                <div key={m.label} className="p-2 rounded bg-white/[0.02] border border-white/[0.04]">
                  <div className="text-[10px] font-mono text-slate-400 uppercase">{m.label}</div>
                  <div className="text-xs font-mono font-semibold text-cyan-300 mt-0.5 truncate">
                    {m.value}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </article>
  );
};
