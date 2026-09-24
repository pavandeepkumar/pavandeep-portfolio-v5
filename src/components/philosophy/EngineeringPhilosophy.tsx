import React, { useRef } from 'react';
import { philosophyPrinciples } from '../../data/philosophy';
import { ChevronLeft, ChevronRight, Compass } from 'lucide-react';

export const EngineeringPhilosophy: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 360;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="philosophy" className="py-24 border-b border-white/[0.08] bg-[#05070b]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2">
              <Compass className="w-3.5 h-3.5" />
              <span>CORE DISCIPLINE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              How I think about engineering
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mt-2 max-w-xl">
              Pragmatic engineering principles honed across production microservices, high-volume transactional databases, and AI workflows.
            </p>
          </div>

          {/* Scroll Navigation Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll('left')}
              className="p-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-slate-300 hover:text-white transition-colors"
              aria-label="Scroll left"
              data-cursor="PREV"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-slate-300 hover:text-white transition-colors"
              aria-label="Scroll right"
              data-cursor="NEXT"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Horizontal Scrolling Card Container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-5 overflow-x-auto pb-6 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent snap-x snap-mandatory"
          style={{ scrollbarWidth: 'thin' }}
        >
          {philosophyPrinciples.map((item) => (
            <div
              key={item.number}
              className="w-[310px] sm:w-[350px] shrink-0 snap-start p-6 rounded-xl bg-white/[0.02] border border-white/[0.08] hover:border-cyan-500/30 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between text-slate-400 font-mono text-xs pb-3 border-b border-white/[0.06]">
                  <span className="text-cyan-400 font-semibold group-hover:text-cyan-300 transition-colors">
                    {item.number}
                  </span>
                  <span className="uppercase text-[11px] tracking-wider text-slate-400">PRINCIPLE</span>
                </div>

                <h3 className="text-lg font-bold text-white mt-4 font-sans leading-snug">
                  {item.title}
                </h3>

                <p className="text-xs font-mono text-slate-400 mt-1">
                  {item.subtitle}
                </p>

                <p className="text-xs sm:text-sm text-slate-300 mt-4 leading-relaxed font-sans">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/[0.06]">
                <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                  PRODUCTION HABIT
                </div>
                <div className="text-xs text-slate-200 mt-1 font-mono leading-relaxed">
                  {item.practicalApplication}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
