import React, { useState, useEffect } from 'react';
import { Menu, X, FileText, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onOpenResume: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenResume }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = ['hero', 'projects', 'about', 'philosophy', 'ai', 'stack', 'experience', 'contact'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 160 && rect.bottom >= 160) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Work', href: '#projects', id: 'projects' },
    { label: 'About', href: '#about', id: 'about' },
    { label: 'AI', href: '#ai', id: 'ai' },
    { label: 'Stack', href: '#stack', id: 'stack' },
    { label: 'Experience', href: '#experience', id: 'experience' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'py-3 bg-[#07090e]/85 backdrop-blur-md border-b border-white/[0.08]'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#hero"
            className="group flex items-center gap-2 text-slate-100 font-mono text-base font-semibold tracking-tight hover:text-cyan-400 transition-colors"
            data-cursor="LET'S GO"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
            <span className="font-sans font-bold text-lg text-white">Pavandeep</span>
            <span className="text-slate-500 font-mono text-sm">/</span>
            <span className="text-slate-400 font-mono text-sm">Systems</span>
          </a>

          {/* Zone 2: Clean text navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-400">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  className={`relative py-1 transition-colors hover:text-slate-100 ${
                    isActive ? 'text-cyan-400 font-semibold' : 'text-slate-400'
                  }`}
                  data-cursor="OPEN"
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-cyan-400 rounded-full" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: Primary action button */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={onOpenResume}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-mono font-medium text-slate-200 bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.12] rounded-md transition-all duration-150 hover:border-cyan-500/50 hover:text-white"
              data-cursor="VIEW"
            >
              <FileText className="w-3.5 h-3.5 text-cyan-400" />
              <span>Resume</span>
            </button>
            <a
              href="#contact"
              className="inline-flex items-center gap-1 px-3.5 py-1.5 text-xs font-medium text-black bg-cyan-400 hover:bg-cyan-300 rounded-md transition-all duration-150 shadow-[0_0_15px_rgba(34,211,238,0.25)] hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]"
              data-cursor="LET'S GO"
            >
              <span>Let's Build</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile menu toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onOpenResume}
              className="px-2.5 py-1 text-xs font-mono text-slate-200 bg-white/[0.05] border border-white/[0.1] rounded"
            >
              Resume
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-slate-400 hover:text-white rounded-md bg-white/[0.05] border border-white/[0.1]"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#07090e]/95 backdrop-blur-xl md:hidden pt-20 px-6 flex flex-col justify-between pb-8">
          <div className="space-y-4">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-500 pb-2 border-b border-white/[0.08]">
              Navigation
            </div>
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-lg font-medium text-slate-200 hover:text-cyan-400 py-2 border-b border-white/[0.04]"
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="space-y-3 pt-6 border-t border-white/[0.08]">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResume();
              }}
              className="w-full py-2.5 flex items-center justify-center gap-2 text-sm font-mono text-slate-200 bg-white/[0.06] border border-white/[0.1] rounded-lg"
            >
              <FileText className="w-4 h-4 text-cyan-400" />
              <span>View Resume</span>
            </button>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 flex items-center justify-center gap-2 text-sm font-medium text-black bg-cyan-400 rounded-lg"
            >
              <span>Start a Conversation</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </>
  );
};
