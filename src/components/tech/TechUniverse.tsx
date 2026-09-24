import React, { useState } from 'react';
import { techUniverse } from '../../data/techStack';
import { TechItem } from '../../types/portfolio';
import { Cpu, Terminal, Sparkles, Layers, CheckCircle2, Info } from 'lucide-react';

export const TechUniverse: React.FC = () => {
  const categories = Object.keys(techUniverse);
  const [activeCategory, setActiveCategory] = useState<string>('Backend');
  const [hoveredTech, setHoveredTech] = useState<TechItem>(
    techUniverse['Backend'][0]
  );

  const currentItems = techUniverse[activeCategory] || [];

  return (
    <section id="stack" className="py-24 border-b border-white/[0.08] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2">
            <Layers className="w-3.5 h-3.5" />
            <span>PRODUCTION ARSENAL</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Technology Universe
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-2">
            No vanity percentage bars. Every tool in this matrix has been used to build and scale production systems. Hover or click to inspect real-world usage patterns.
          </p>
        </div>

        {/* Category Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-8 border-b border-white/[0.08] scrollbar-none">
          {categories.map((cat) => {
            const isSelected = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setHoveredTech(techUniverse[cat][0]);
                }}
                className={`px-4 py-2 text-xs sm:text-sm font-mono rounded-lg transition-all whitespace-nowrap border ${
                  isSelected
                    ? 'bg-cyan-500/15 text-cyan-300 border-cyan-500/40 font-semibold'
                    : 'bg-white/[0.02] border-white/[0.06] text-slate-400 hover:text-slate-200 hover:bg-white/[0.05]'
                }`}
                data-cursor="SELECT"
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Grid and Inspector Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Tech Grid */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-3">
            {currentItems.map((item) => {
              const isInspected = hoveredTech?.name === item.name;
              return (
                <button
                  key={item.name}
                  onMouseEnter={() => setHoveredTech(item)}
                  onClick={() => setHoveredTech(item)}
                  className={`p-4 rounded-xl border text-left transition-all duration-150 flex flex-col justify-between min-h-[110px] ${
                    isInspected
                      ? 'bg-cyan-950/40 border-cyan-500/50 shadow-[0_0_15px_rgba(34,211,238,0.15)] ring-1 ring-cyan-400/30'
                      : 'bg-white/[0.02] border-white/[0.08] hover:bg-white/[0.05] hover:border-white/[0.15]'
                  }`}
                  data-cursor="INSPECT"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-white text-sm font-mono">
                      {item.name}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  </div>

                  <div className="mt-3">
                    <span className="text-[10px] font-mono text-cyan-400/90 block">
                      {item.experienceLevel}
                    </span>
                    <span className="text-[11px] text-slate-400 block font-mono truncate">
                      {item.category}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Tech Detailed Inspector */}
          <div className="lg:col-span-5 p-6 rounded-xl bg-[#090d16] border border-cyan-500/30 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs font-mono text-slate-400 uppercase">
                    SYSTEM USAGE INSPECTOR
                  </span>
                </div>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                  {hoveredTech.category}
                </span>
              </div>

              <div className="mt-5">
                <h3 className="text-2xl font-extrabold text-white font-mono">
                  {hoveredTech.name}
                </h3>
                <div className="text-xs font-mono text-cyan-400 mt-1">
                  Proficiency: {hoveredTech.experienceLevel}
                </div>

                <div className="mt-6">
                  <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5 text-cyan-400" />
                    <span>HOW I USE IT IN PRODUCTION</span>
                  </div>
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
                    {hoveredTech.usageDescription}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" /> Verified in production codebases
              </span>
              <span>Devstree Systems</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
