import React from 'react';
import { engineeringImpactData } from '../../data/impact';
import { ShieldCheck, Zap, Database, Layers, Sparkles, Network, CheckCircle2 } from 'lucide-react';

export const EngineeringImpact: React.FC = () => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Architecture':
        return Layers;
      case 'Performance':
        return Zap;
      case 'Integrations':
        return Network;
      case 'Product Development':
        return Database;
      case 'AI Engineering':
        return Sparkles;
      case 'Scalability':
        return ShieldCheck;
      default:
        return CheckCircle2;
    }
  };

  return (
    <section className="py-24 border-b border-white/[0.08] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>VERIFIED ARCHITECTURAL OUTCOMES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Engineering Impact
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-2">
            Qualitative, verified engineering milestones across system architecture, transaction safety, database tuning, and AI integration. Zero hallucinated performance claims.
          </p>
        </div>

        {/* 6 Impact Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {engineeringImpactData.map((item) => {
            const Icon = getCategoryIcon(item.category);
            return (
              <div
                key={item.category}
                className="p-6 rounded-xl bg-[#090d16] border border-white/[0.08] hover:border-cyan-500/30 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4 text-cyan-400" />
                      <span className="text-xs font-mono text-cyan-300 uppercase tracking-wider">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-white mt-3 font-sans leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="mt-4 space-y-1.5 pt-3 border-t border-white/[0.04]">
                    {item.technicalDetails.map((detail, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-[11px] text-slate-400 font-sans">
                        <span className="text-cyan-400 font-mono text-xs mt-0.5">▪</span>
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-white/[0.06] text-[10px] font-mono text-slate-400">
                  <span className="text-slate-500">PROD SYSTEM: </span>
                  <span className="text-slate-300">{item.systemEvidence}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
