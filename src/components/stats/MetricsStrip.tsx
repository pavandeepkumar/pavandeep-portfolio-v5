import React from 'react';
import { profileData } from '../../data/profile';

export const MetricsStrip: React.FC = () => {
  return (
    <section className="relative border-y border-white/[0.08] bg-[#07090e]/60 backdrop-blur-md py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-white/[0.08]">
          {profileData.stats.map((stat, idx) => (
            <div
              key={stat.label}
              className={`flex flex-col justify-center ${
                idx > 0 ? 'pt-4 md:pt-0 md:pl-6' : ''
              }`}
            >
              <div className="text-2xl sm:text-3xl font-extrabold font-mono tracking-tight text-white flex items-baseline gap-1">
                <span>{stat.value}</span>
              </div>
              <div className="text-xs sm:text-sm font-semibold text-slate-200 mt-1">
                {stat.label}
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                {stat.detail}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
