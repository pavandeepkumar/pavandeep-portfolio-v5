import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { Container } from './Section';

interface NavbarProps {
  onOpenResume: () => void;
}

const navLinks = [
  { label: 'Work', id: 'projects' },
  { label: 'About', id: 'about' },
  { label: 'AI', id: 'ai' },
  { label: 'Stack', id: 'stack' },
  { label: 'Experience', id: 'experience' },
  { label: 'Contact', id: 'contact' }
];

export const Navbar: React.FC<NavbarProps> = ({ onOpenResume }) => {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [hovered, setHovered] = useState<string | null>(null);
  const [pill, setPill] = useState<{ left: number; width: number } | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, y / max) : 0);

      let current = '';
      for (const { id } of navLinks) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) current = id;
      }
      setActiveSection(current);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sliding pill: sits behind the hovered link, otherwise behind the active section's link.
  const target = hovered ?? activeSection;
  useLayoutEffect(() => {
    const measure = () => {
      const el = target ? linkRefs.current[target] : null;
      setPill(el ? { left: el.offsetLeft, width: el.offsetWidth } : null);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [target, scrolled]);

  // Lock page scroll and allow Escape while the mobile menu is open.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false);
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]);

  const floating = scrolled && !menuOpen;

  return (
    <header className="anim-in fixed inset-x-0 top-0 z-50" style={{ '--d': '0ms' } as React.CSSProperties}>
      <div
        className={`mx-auto transition-all duration-500 ease-[cubic-bezier(.2,.7,.2,1)] ${
          floating
            ? 'mt-3 max-w-[1040px] px-3 sm:px-4'
            : menuOpen
              ? 'max-w-none border-b border-line bg-bg'
              : 'max-w-[1120px]'
        }`}
      >
        <div
          className={`relative overflow-hidden transition-all duration-500 ease-[cubic-bezier(.2,.7,.2,1)] ${
            floating
              ? 'rounded-full border border-line-strong/70 bg-raised/75 shadow-[0_12px_40px_-12px_rgba(0,0,0,.8)] backdrop-blur-md'
              : 'rounded-none border border-transparent'
          }`}
        >
          <Container
            className={`flex items-center justify-between transition-all duration-500 ${
              floating ? 'h-14 max-w-none! sm:px-5!' : 'h-16'
            }`}
          >
            <a href="#hero" className="group flex items-center gap-2.5 text-ink" onClick={() => setMenuOpen(false)}>
              <span className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-lg border border-accent/40 bg-accent/10 font-serif text-[15px] text-accent transition-all duration-300 group-hover:rotate-[-8deg] group-hover:border-accent group-hover:bg-accent group-hover:text-bg">
                PK
              </span>
              <span className="whitespace-nowrap font-serif text-[21px] leading-none">Pavandeep Kumar</span>
              <span
                className={`hidden whitespace-nowrap font-mono text-[11px] text-faint transition-all duration-300 xl:inline ${
                  floating ? 'w-0 overflow-hidden opacity-0' : 'opacity-100'
                }`}
              >
                engineer, Ahmedabad
              </span>
            </a>

            <nav
              ref={navRef}
              className="relative hidden items-center text-sm lg:flex"
              aria-label="Primary"
              onMouseLeave={() => setHovered(null)}
            >
              {pill && (
                <span
                  className="absolute top-1/2 h-8 -translate-y-1/2 rounded-full border border-line-strong bg-white/[0.06] transition-all duration-300 ease-[cubic-bezier(.2,.7,.2,1)]"
                  style={{ left: pill.left, width: pill.width }}
                  aria-hidden="true"
                />
              )}
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.id}
                    ref={(el) => {
                      linkRefs.current[link.id] = el;
                    }}
                    href={`#${link.id}`}
                    onMouseEnter={() => setHovered(link.id)}
                    onFocus={() => setHovered(link.id)}
                    onBlur={() => setHovered(null)}
                    aria-current={isActive ? 'true' : undefined}
                    className={`relative z-10 flex items-center gap-1.5 px-3.5 py-1.5 transition-colors ${
                      isActive || hovered === link.id ? 'text-ink' : 'text-muted'
                    }`}
                  >
                    {isActive && <span className="h-1 w-1 rounded-full bg-accent" aria-hidden="true" />}
                    {link.label}
                  </a>
                );
              })}
            </nav>

            <div className="hidden items-center gap-2 lg:flex">
              <button
                type="button"
                onClick={onOpenResume}
                className="group relative overflow-hidden whitespace-nowrap rounded-full bg-ink px-4 py-1.5 text-sm font-medium text-bg transition-transform duration-200 hover:-translate-y-px"
              >
                {/* Sheen sweeps across on hover */}
                <span
                  className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/60 to-transparent transition-transform duration-700 group-hover:translate-x-[300%]"
                  aria-hidden="true"
                />
                <span className="relative">Resume ↗</span>
              </button>
            </div>

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              className="-mr-2 flex items-center gap-2 p-2 font-mono text-xs uppercase tracking-wider text-ink lg:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              <span className="relative block h-3 w-4" aria-hidden="true">
                <span
                  className={`absolute left-0 h-px w-4 bg-current transition-all duration-300 ${menuOpen ? 'top-1.5 rotate-45' : 'top-0.5'}`}
                />
                <span
                  className={`absolute left-0 h-px w-4 bg-current transition-all duration-300 ${menuOpen ? 'top-1.5 -rotate-45' : 'top-2.5'}`}
                />
              </span>
              {menuOpen ? 'Close' : 'Menu'}
            </button>
          </Container>

          {/* Reading progress along the bottom edge */}
          <span
            className={`absolute inset-x-0 bottom-0 h-px origin-left bg-gradient-to-r from-accent via-accent to-ok transition-opacity duration-300 ${
              scrolled && !menuOpen ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ transform: `scaleX(${progress})` }}
            aria-hidden="true"
          />
        </div>
      </div>

      {menuOpen && (
        <div id="mobile-menu" className="h-[calc(100dvh-4rem)] overflow-y-auto bg-bg lg:hidden">
          <Container className="flex min-h-full flex-col justify-between py-8">
            <nav aria-label="Mobile">
              <ol>
                {navLinks.map((link, i) => (
                  <li
                    key={link.id}
                    className="anim-in border-b border-line"
                    style={{ '--d': `${i * 60}ms` } as React.CSSProperties}
                  >
                    <a
                      href={`#${link.id}`}
                      onClick={() => setMenuOpen(false)}
                      className="group flex items-baseline justify-between py-4 text-ink"
                    >
                      <span className="font-serif text-4xl transition-transform duration-300 group-hover:translate-x-2">
                        {link.label}
                      </span>
                      <span className="font-mono text-xs text-faint">{String(i + 1).padStart(2, '0')}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
            <div className="mt-10 flex items-center justify-between text-sm">
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  onOpenResume();
                }}
                className="link"
              >
                Resume ↗
              </button>
              <span className="font-mono text-xs text-faint">Ahmedabad · IST</span>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
};
