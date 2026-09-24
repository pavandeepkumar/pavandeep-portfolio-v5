import React from 'react';
import { Project } from '../../types/portfolio';
import { X, Cpu, Layers, AlertCircle, CheckCircle2, ArrowRight, Shield, Zap, Terminal } from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#080c14] border border-white/[0.14] rounded-2xl shadow-2xl overflow-hidden my-8 text-slate-200 animate-in fade-in zoom-in-95 duration-200">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08] bg-black/40">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
              {project.category}
            </span>
            <span className="text-slate-500 font-mono text-xs">·</span>
            <span className="text-xs font-mono text-slate-400">{project.year}</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-slate-400 hover:text-white transition-colors"
            aria-label="Close modal"
            data-cursor="CLOSE"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto space-y-8 scrollbar-thin scrollbar-thumb-white/10">
          {/* Title and Summary */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {project.title}
            </h2>
            <div className="text-sm font-mono text-cyan-400 mt-1">
              {project.subtitle}
            </div>
            <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
              {project.summary}
            </p>
          </div>

          {/* Tech Stack Chips */}
          <div>
            <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
              TECHNOLOGIES & TOOLING
            </div>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 text-xs font-mono bg-white/[0.04] border border-white/[0.08] rounded text-slate-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Architecture Deep Dive */}
          <div className="p-5 rounded-xl bg-black/50 border border-white/[0.08]">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider mb-3">
              <Layers className="w-4 h-4" />
              <span>SYSTEM ARCHITECTURE & DATA FLOW</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans mb-4">
              {project.architecture.description}
            </p>

            {/* Step flow */}
            <div className="space-y-2 mb-6">
              <div className="text-[11px] font-mono text-slate-400 uppercase">
                EXECUTION FLOW
              </div>
              <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-2 text-xs font-mono">
                {project.architecture.flow.map((step, idx) => (
                  <React.Fragment key={step}>
                    <div className="px-2.5 py-1 rounded bg-cyan-950/40 border border-cyan-500/30 text-cyan-200 flex items-center gap-1.5">
                      <span className="text-[10px] text-cyan-400 font-bold">{idx + 1}.</span>
                      <span>{step}</span>
                    </div>
                    {idx < project.architecture.flow.length - 1 && (
                      <ArrowRight className="w-3.5 h-3.5 text-slate-600 hidden sm:inline shrink-0" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Sub-components breakdown */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-4 border-t border-white/[0.08]">
              {project.architecture.components.map((c) => (
                <div key={c.name} className="p-2.5 rounded bg-white/[0.02] border border-white/[0.05]">
                  <div className="text-xs font-semibold text-white flex items-center justify-between">
                    <span>{c.name}</span>
                    {c.tech && <span className="text-[10px] font-mono text-cyan-400">{c.tech}</span>}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1 leading-snug">{c.role}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Problem vs What I Built */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.08]">
              <div className="text-xs font-mono text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>THE ENGINEERING PROBLEM</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                {project.problem}
              </p>
            </div>

            <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.08]">
              <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>WHAT I BUILT & IMPLEMENTED</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                {project.whatIBuilt.map((point, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-cyan-400 text-xs mt-0.5">▪</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Engineering Challenge & Solution */}
          <div className="p-5 rounded-xl bg-gradient-to-br from-cyan-950/20 to-indigo-950/20 border border-cyan-500/20">
            <div className="text-xs font-mono text-cyan-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              <span>KEY ENGINEERING CHALLENGE & RESOLUTION</span>
            </div>
            <div className="text-sm font-semibold text-white mb-2">
              {project.engineeringChallenge}
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
              <strong className="text-cyan-400 font-mono text-xs">Solution: </strong>
              {project.solution}
            </p>
          </div>

          {/* Key Takeaway */}
          <div className="p-4 rounded-lg bg-black/40 border-l-2 border-cyan-400 text-xs font-mono text-slate-300">
            <span className="text-cyan-400 font-semibold uppercase">ARCHITECTURAL LESSON: </span>
            <span>{project.keyTakeaway}</span>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-white/[0.08] bg-black/40 flex items-center justify-between text-xs font-mono">
          <span className="text-slate-400">Pavandeep Kumar · Case Study Platform</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded bg-white/[0.08] hover:bg-white/[0.14] text-white transition-colors"
          >
            Close Overview
          </button>
        </div>
      </div>
    </div>
  );
};
