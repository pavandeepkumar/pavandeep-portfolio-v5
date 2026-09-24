import React, { useState } from 'react';
import { careerTimeline, progressionSteps } from '../../data/experience';
import { profileData } from '../../data/profile';
import { Briefcase, Calendar, MapPin, ArrowRight, CheckCircle2, ChevronRight, TrendingUp } from 'lucide-react';

export const ExperienceTimeline: React.FC = () => {
  const [selectedMilestone, setSelectedMilestone] = useState<number>(0);

  return (
    <section id="experience" className="py-24 border-b border-white/[0.08] bg-[#05070b]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2">
            <Briefcase className="w-3.5 h-3.5" />
            <span>CAREER PATH & EVOLUTION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Engineering Timeline & Progression
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-2">
            Over {profileData.experienceYears} years of sustained engineering growth at Devstree IT Services Pvt. Ltd., systematically expanding from client-side interfaces to distributed microservices and AI agent orchestration.
          </p>
        </div>

        {/* What changed at each stage? Visual Progression Ribbon */}
        <div className="mb-14 p-6 rounded-xl bg-white/[0.02] border border-white/[0.08]">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider mb-4">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>WHAT CHANGED AT EACH STAGE?</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {progressionSteps.map((step, idx) => (
              <div
                key={step.stage}
                className="p-3.5 rounded-lg bg-black/40 border border-white/[0.06] flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-mono text-cyan-400 font-bold block mb-1">
                    PHASE {step.stage}
                  </span>
                  <div className="text-xs font-bold text-white font-sans">
                    {step.name}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono mt-1 leading-snug">
                    {step.focus}
                  </div>
                </div>
                <div className="text-[11px] text-slate-300 font-sans mt-3 pt-2 border-t border-white/[0.06] leading-snug">
                  {step.outcome}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Timeline List */}
        <div className="space-y-6">
          {careerTimeline.map((milestone, idx) => (
            <div
              key={milestone.period}
              className="p-6 sm:p-7 rounded-xl bg-white/[0.02] border border-white/[0.08] hover:border-cyan-500/30 transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-white/[0.06]">
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-xl font-bold text-white tracking-tight">
                      {milestone.role}
                    </h3>
                    <span className="text-slate-500 font-mono text-xs">·</span>
                    <span className="text-sm font-semibold text-cyan-400 font-mono">
                      {milestone.company}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-xs font-mono text-slate-400 mt-1">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-cyan-400" />
                      {milestone.period}
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-500" />
                      {milestone.location}
                    </span>
                  </div>
                </div>

                <div className="px-3 py-1 rounded bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-xs font-mono self-start sm:self-auto">
                  {milestone.shift}
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 mt-4 leading-relaxed font-sans">
                {milestone.description}
              </p>

              <div className="mt-4 pt-3 border-t border-white/[0.04]">
                <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2">
                  KEY RESPONSIBILITIES & SYSTEM OWNERSHIP
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                  {milestone.responsibilities.map((resp, i) => (
                    <li key={i} className="flex items-start gap-2 leading-relaxed">
                      <span className="text-cyan-400 font-mono text-xs mt-0.5">▪</span>
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-5 pt-3 border-t border-white/[0.04] flex flex-wrap items-center gap-1.5">
                <span className="text-[10px] font-mono text-slate-400 uppercase mr-2">
                  TECHNOLOGY FOCUS:
                </span>
                {milestone.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-0.5 text-xs font-mono rounded bg-white/[0.03] border border-white/[0.06] text-slate-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
