import React from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/hero/Hero';
import { AboutSection } from './components/about/AboutSection';
import { EngineeringPhilosophy } from './components/philosophy/EngineeringPhilosophy';
import { ProjectExplorer } from './components/projects/ProjectExplorer';
import { AiEngineeringSection } from './components/ai/AiEngineeringSection';
import { TechUniverse } from './components/tech/TechUniverse';
import { ExperienceTimeline } from './components/experience/ExperienceTimeline';
import { EngineeringImpact } from './components/impact/EngineeringImpact';
import { ResumeSection } from './components/resume/ResumeSection';
import { ContactSection } from './components/contact/ContactSection';
import { profileData } from './data/profile';

const openResume = () => {
  window.open(profileData.resumeUrl, '_blank', 'noopener,noreferrer');
};

export default function App() {
  return (
    <div className="min-h-screen bg-bg text-body">
      <a
        href="#projects"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded focus:bg-ink focus:px-3 focus:py-2 focus:text-bg"
      >
        Skip to work
      </a>

      <Navbar onOpenResume={openResume} />

      <main>
        <Hero onOpenResume={openResume} />
        <ProjectExplorer />
        <AboutSection />
        <EngineeringPhilosophy />
        <AiEngineeringSection />
        <TechUniverse />
        <ExperienceTimeline />
        <EngineeringImpact />
        <ResumeSection onOpenResume={openResume} />
        <ContactSection />
      </main>

      <Footer onOpenResume={openResume} />
    </div>
  );
}
