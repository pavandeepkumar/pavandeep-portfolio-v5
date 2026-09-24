import React from 'react';
import { ArchitectureFlow } from './ArchitectureFlow';
import { profileData } from '../../data/profile';
import { CheckCircle2, ShieldAlert, Cpu, Network, Sparkles, Terminal } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-24 border-b border-white/[0.08] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2">
            <span>FULL-LIFECYCLE PRODUCT ENGINEERING</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Engineering with a product mindset.
          </h2>
          <p className="text-base sm:text-lg text-slate-300 mt-4 leading-relaxed font-normal">
            Software does not exist in isolation. I don't simply assemble UI screens or write isolated database queries—I work across the complete architecture: from user interaction loops and API Gateway ingress, to inter-service gRPC RPCs, PostgreSQL ACID guarantees, and automated container orchestration.
          </p>
        </div>

        {/* 5 Core Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-12">
          <div className="p-4 rounded-lg bg-white/[0.02] border border-white/[0.08]">
            <div className="text-xs font-mono text-cyan-400">01. FRONTEND</div>
            <div className="font-semibold text-white mt-1">React & Next.js</div>
            <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
              Responsive layouts, state synchronization, client performance, and accessible design.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-white/[0.02] border border-white/[0.08]">
            <div className="text-xs font-mono text-sky-400">02. BACKEND</div>
            <div className="font-semibold text-white mt-1">Node.js & NestJS</div>
            <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
              Modular enterprise structure, dependency injection, validation guards, and REST/gRPC.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-white/[0.02] border border-white/[0.08]">
            <div className="text-xs font-mono text-emerald-400">03. DATABASE</div>
            <div className="font-semibold text-white mt-1">PostgreSQL & Redis</div>
            <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
              Relational schemas, ACID transactions, composite indexing, and sub-millisecond caching.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-white/[0.02] border border-white/[0.08]">
            <div className="text-xs font-mono text-purple-400">04. INFRASTRUCTURE</div>
            <div className="font-semibold text-white mt-1">AWS & Docker</div>
            <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
              Multi-stage container builds, Docker Compose meshes, EC2 hosts, and automated CI/CD.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-white/[0.02] border border-white/[0.08]">
            <div className="text-xs font-mono text-pink-400">05. AI ENGINEERING</div>
            <div className="font-semibold text-white mt-1">RAG & Tool Calling</div>
            <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
              Connecting generative reasoning with deterministic backend APIs and transactional workflows.
            </p>
          </div>
        </div>

        {/* Interactive Architecture Flow Canvas */}
        <ArchitectureFlow />
      </div>
    </section>
  );
};
