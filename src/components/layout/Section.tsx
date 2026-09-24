import React, { useEffect, useRef, useState } from 'react';

/** Adds `is-visible` once the element scrolls into view (once only). */
const useReveal = <T extends HTMLElement>() => {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.05 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, className: `reveal ${visible ? 'is-visible' : ''}` };
};

export const Container: React.FC<{ className?: string; children: React.ReactNode }> = ({
  className = '',
  children
}) => <div className={`mx-auto w-full max-w-[1120px] px-5 sm:px-8 ${className}`}>{children}</div>;

/** Hatched band between sections with a small spacing ruler, like a redline spec. */
export const SectionRule: React.FC<{ label?: string }> = ({ label }) => (
  <div className="section-rule relative h-10" aria-hidden="true">
    <div className="absolute inset-y-0 left-1/2 flex -translate-x-1/2 flex-col items-center">
      <span className="h-px w-2.5 bg-ok/60" />
      <span className="w-px flex-1 bg-ok/40" />
      {label && (
        <span className="rounded border border-ok/40 bg-bg px-1.5 font-mono text-[10px] leading-4 text-ok">{label}</span>
      )}
      <span className="w-px flex-1 bg-ok/40" />
      <span className="h-px w-2.5 bg-ok/60" />
    </div>
  </div>
);

interface SectionProps {
  id?: string;
  index: string;
  label: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}

/**
 * Shared section frame: a narrow left rail holds the section number and label,
 * the heading and body sit in the wider right column.
 */
export const Section: React.FC<SectionProps> = ({ id, index, label, title, intro, className = '', children }) => {
  const head = useReveal<HTMLElement>();
  const body = useReveal<HTMLDivElement>();
  return (
    <section id={id} className={className}>
      <SectionRule label={index} />
      <Container className="py-14 sm:py-16">
        <header ref={head.ref} className={`grid grid-cols-1 gap-y-4 md:grid-cols-12 md:gap-x-8 ${head.className}`}>
          <div className="md:col-span-3 md:pt-3">
            <p className="eyebrow">
              <span className="text-accent">{index}</span>
              <span className="mx-2 text-faint">/</span>
              {label}
            </p>
          </div>
          <div className="md:col-span-9">
            <h2 className="font-serif text-[2.25rem] leading-[1.05] tracking-[-0.01em] text-ink sm:text-5xl">
              {title}
            </h2>
            {intro && <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-body sm:text-base">{intro}</p>}
          </div>
        </header>
        <div ref={body.ref} className={`mt-10 sm:mt-12 ${body.className}`}>
          {children}
        </div>
      </Container>
    </section>
  );
};
