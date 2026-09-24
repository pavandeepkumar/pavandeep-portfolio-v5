import React from 'react';
import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';
import { profileData } from '../../data/profile';

interface FooterProps {
  onOpenResume: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenResume }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/[0.08] bg-[#05070b] py-14 text-slate-400">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-10 border-b border-white/[0.06]">
          {/* Identity */}
          <div>
            <div className="flex items-center gap-2">
              <span className="font-sans font-bold text-lg text-white tracking-tight">Pavandeep Kumar</span>
              <span className="text-slate-600">·</span>
              <span className="text-xs font-mono text-cyan-400">Full Stack & AI</span>
            </div>
            <p className="text-sm text-slate-400 mt-1 max-w-md">
              Full Stack Engineer · Backend & Distributed Systems · AI Engineering
            </p>
          </div>

          {/* System status + quick actions */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/[0.03] border border-white/[0.08] text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-slate-300">SYSTEM ONLINE</span>
            </div>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-mono text-slate-300 hover:text-white transition-colors"
              title="Return to top"
              data-cursor="TOP"
            >
              <ArrowUp className="w-3.5 h-3.5 text-cyan-400" />
              <span>Back to Top</span>
            </button>
          </div>
        </div>

        {/* Links & Attribution */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-8 text-xs text-slate-400">
          <div className="flex flex-wrap items-center gap-6">
            <a href="#projects" className="hover:text-slate-200 transition-colors">Work</a>
            <a href="#about" className="hover:text-slate-200 transition-colors">About</a>
            <a href="#experience" className="hover:text-slate-200 transition-colors">Experience</a>
            <a href="#stack" className="hover:text-slate-200 transition-colors">Stack</a>
            <a href="#contact" className="hover:text-slate-200 transition-colors">Contact</a>
            <button
              onClick={onOpenResume}
              className="hover:text-slate-200 transition-colors font-mono text-slate-400"
            >
              Resume
            </button>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={profileData.contacts.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 text-slate-400 hover:text-white hover:bg-white/[0.06] rounded-md transition-colors"
              aria-label="GitHub"
              data-cursor="OPEN"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={profileData.contacts.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 text-slate-400 hover:text-cyan-400 hover:bg-white/[0.06] rounded-md transition-colors"
              aria-label="LinkedIn"
              data-cursor="OPEN"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${profileData.contacts.email}`}
              className="p-1.5 text-slate-400 hover:text-cyan-400 hover:bg-white/[0.06] rounded-md transition-colors"
              aria-label="Email"
              data-cursor="OPEN"
            >
              <Mail className="w-4 h-4" />
            </a>
            <span className="text-slate-500 font-mono">© 2026 Pavandeep Kumar</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
