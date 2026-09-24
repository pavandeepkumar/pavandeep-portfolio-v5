import React from 'react';
import { profileData } from '../../data/profile';
import { Container } from './Section';

interface FooterProps {
  onOpenResume: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenResume }) => {
  return (
    <footer className="border-t border-line py-10 text-sm text-muted">
      <Container className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <p>
          <span className="font-serif text-lg text-ink">Pavandeep Kumar</span>
          <span className="ml-3 font-mono text-xs text-faint">© {new Date().getFullYear()} · designed and built with React & Tailwind</span>
        </p>

        <nav className="flex flex-wrap items-center gap-x-5 gap-y-2" aria-label="Footer">
          <a href={profileData.contacts.github} target="_blank" rel="noopener noreferrer" className="hover:text-ink">
            GitHub
          </a>
          <a href={profileData.contacts.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-ink">
            LinkedIn
          </a>
          <button type="button" onClick={onOpenResume} className="hover:text-ink">
            Resume
          </button>
          <a href="#hero" className="hover:text-ink">
            Back to top ↑
          </a>
        </nav>
      </Container>
    </footer>
  );
};
