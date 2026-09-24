import React, { useState } from 'react';
import { Navbar } from './components/layout/Navbar';
import { CustomCursor } from './components/layout/CustomCursor';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/hero/Hero';
import { MetricsStrip } from './components/stats/MetricsStrip';
import { AboutSection } from './components/about/AboutSection';
import { EngineeringPhilosophy } from './components/philosophy/EngineeringPhilosophy';
import { ProjectExplorer } from './components/projects/ProjectExplorer';
import { AiEngineeringSection } from './components/ai/AiEngineeringSection';
import { TechUniverse } from './components/tech/TechUniverse';
import { ExperienceTimeline } from './components/experience/ExperienceTimeline';
import { EngineeringImpact } from './components/impact/EngineeringImpact';
import { ResumeSection } from './components/resume/ResumeSection';
import { ResumeModal } from './components/resume/ResumeModal';
import { ContactSection } from './components/contact/ContactSection';

export default function App() {
  const [isResumeOpen, setIsResumeOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 selection:bg-cyan-500/20 selection:text-cyan-300 font-sans antialiased relative">
      {/* Desktop Contextual Custom Cursor */}
      <CustomCursor />

      {/* Floating 3-Zone Navigation */}
      <Navbar onOpenResume={() => setIsResumeOpen(true)} />

      {/* Main Content Sections */}
      <main>
        {/* 1. Interactive Engineering Hero + System Console */}
        <Hero onOpenResume={() => setIsResumeOpen(true)} />

        {/* 2. Trust / Metrics Strip */}
        <MetricsStrip />

        {/* 3. Featured Projects Case-Study Centerpiece & Dynamic Filtering */}
        <ProjectExplorer />

        {/* 4. About Section with Interactive Distributed Topology Canvas */}
        <AboutSection />

        {/* 5. Engineering Philosophy ("How I think about engineering") */}
        <EngineeringPhilosophy />

        {/* 6. AI Engineering Pipeline & Live Terminal Simulator */}
        <AiEngineeringSection />

        {/* 7. Interactive Technology Universe */}
        <TechUniverse />

        {/* 8. Career Timeline & Progression ("What changed at each stage?") */}
        <ExperienceTimeline />

        {/* 9. Verified Engineering Impact */}
        <EngineeringImpact />

        {/* 10. Resume Preview Card */}
        <ResumeSection onOpenResume={() => setIsResumeOpen(true)} />

        {/* 11. Technical Contact Section ("Have a difficult engineering problem?") */}
        <ContactSection />
      </main>

      {/* Minimal System Footer */}
      <Footer onOpenResume={() => setIsResumeOpen(true)} />

      {/* Interactive Modal Resume Document */}
      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
    </div>
  );
}
