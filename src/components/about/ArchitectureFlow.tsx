import React, { useState } from 'react';
import { Layers, ArrowDown, ArrowRight, Database, Server, Cpu, Sparkles, Cloud, Globe, Play, CheckCircle } from 'lucide-react';

export const ArchitectureFlow: React.FC = () => {
  const [activeLayer, setActiveLayer] = useState<string>('gateway');
  const [animating, setAnimating] = useState<boolean>(false);
  const [activeStep, setActiveStep] = useState<number>(0);

  const simulatePacket = () => {
    if (animating) return;
    setAnimating(true);
    setActiveStep(0);

    const steps = [0, 1, 2, 3, 4, 5];
    steps.forEach((step, idx) => {
      setTimeout(() => {
        setActiveStep(step);
        if (idx === steps.length - 1) {
          setTimeout(() => {
            setAnimating(false);
          }, 800);
        }
      }, idx * 600);
    });
  };

  const layersInfo: Record<string, { title: string; subtitle: string; details: string; stack: string }> = {
    client: {
      title: 'Client Layer',
      subtitle: 'React · Next.js · TypeScript',
      details: 'Type-safe UI components, client-side optimistic mutations, real-time WebSocket listeners, and mobile-first layouts.',
      stack: 'React 19, Next.js App Router, Tailwind CSS, TypeScript'
    },
    gateway: {
      title: 'API Gateway & Ingress',
      subtitle: 'Nginx · NestJS Gateway',
      details: 'Unified ingress proxy, TLS 1.3 termination, rate-limiting per IP/token, and centralized JWT bearer validation.',
      stack: 'Nginx, NestJS Reverse Proxy, RateLimiterGuard'
    },
    services: {
      title: 'Distributed NestJS Services',
      subtitle: 'Microservices & Domain Logic',
      details: 'Modular service boundaries, dependency injection, gRPC RPC handlers, validation pipes, and business state machines.',
      stack: 'NestJS, gRPC / Protobuf, Class-Validator, RxJS'
    },
    persistence: {
      title: 'State & Persistence',
      subtitle: 'PostgreSQL · Redis Key-Value',
      details: 'ACID transaction boundary, row-level locking for concurrency, B-tree indexes, and distributed Redis caches.',
      stack: 'PostgreSQL 16, Redis 7, TypeORM'
    },
    infra: {
      title: 'Infrastructure & DevOps',
      subtitle: 'AWS · Docker Compose',
      details: 'Multi-stage Docker containers, isolated bridged compose networks, AWS EC2 hosts, and S3 asset pipelines.',
      stack: 'Docker, Docker Compose, AWS EC2 / RDS / S3'
    },
    aiLayer: {
      title: 'AI Tool-Calling Pipeline',
      subtitle: 'RAG · LLM Tools · Backend Bridge',
      details: 'Orchestrating natural language reasoning with strictly typed schema function calls that execute validated backend queries.',
      stack: 'Gemini 2.5 / LLM APIs, Vector Stores, Deterministic NestJS Services'
    }
  };

  const selectedInfo = layersInfo[activeLayer] || layersInfo.gateway;

  return (
    <div className="rounded-xl border border-white/[0.1] bg-[#090d16] p-5 sm:p-7 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-white/[0.08]">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <Layers className="w-3.5 h-3.5" />
            <span>INTERACTIVE SYSTEM ARCHITECTURE</span>
          </div>
          <h3 className="text-lg font-bold text-white mt-1">
            End-to-End Distributed Request Topology
          </h3>
        </div>

        <button
          onClick={simulatePacket}
          disabled={animating}
          className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded text-xs font-mono transition-all ${
            animating
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
              : 'bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 hover:text-white border border-white/[0.1]'
          }`}
          data-cursor="RUN"
        >
          <Play className={`w-3 h-3 ${animating ? 'animate-spin text-cyan-400' : 'text-cyan-400'}`} />
          <span>{animating ? 'Tracing Request Flow...' : 'Simulate Request Flow'}</span>
        </button>
      </div>

      {/* Primary Stack Architecture Flow */}
      <div className="mt-6">
        <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-3">
          PRIMARY FULL-STACK LIFECYCLE
        </div>

        {/* Nodes - Horizontal on desktop, stacked on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {/* Node 1: User / Client */}
          <button
            onClick={() => setActiveLayer('client')}
            className={`p-3 rounded-lg border text-left transition-all ${
              activeLayer === 'client' || (animating && activeStep === 0)
                ? 'bg-cyan-950/40 border-cyan-400 text-white shadow-[0_0_12px_rgba(34,211,238,0.2)]'
                : 'bg-white/[0.02] border-white/[0.08] text-slate-300 hover:bg-white/[0.05]'
            }`}
            data-cursor="INSPECT"
          >
            <div className="flex items-center justify-between text-xs font-mono text-slate-400">
              <span>01. CLIENT</span>
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
            </div>
            <div className="font-semibold text-sm mt-1 text-white">React / Next.js</div>
            <div className="text-[11px] text-slate-400 font-mono mt-0.5">SPA & SSR Frontend</div>
          </button>

          {/* Node 2: Gateway */}
          <button
            onClick={() => setActiveLayer('gateway')}
            className={`p-3 rounded-lg border text-left transition-all ${
              activeLayer === 'gateway' || (animating && activeStep === 1)
                ? 'bg-cyan-950/40 border-cyan-400 text-white shadow-[0_0_12px_rgba(34,211,238,0.2)]'
                : 'bg-white/[0.02] border-white/[0.08] text-slate-300 hover:bg-white/[0.05]'
            }`}
            data-cursor="INSPECT"
          >
            <div className="flex items-center justify-between text-xs font-mono text-slate-400">
              <span>02. GATEWAY</span>
              <Server className="w-3.5 h-3.5 text-sky-400" />
            </div>
            <div className="font-semibold text-sm mt-1 text-white">API Gateway</div>
            <div className="text-[11px] text-slate-400 font-mono mt-0.5">TLS & Ingress Auth</div>
          </button>

          {/* Node 3: NestJS Services */}
          <button
            onClick={() => setActiveLayer('services')}
            className={`p-3 rounded-lg border text-left transition-all ${
              activeLayer === 'services' || (animating && activeStep === 2)
                ? 'bg-cyan-950/40 border-cyan-400 text-white shadow-[0_0_12px_rgba(34,211,238,0.2)]'
                : 'bg-white/[0.02] border-white/[0.08] text-slate-300 hover:bg-white/[0.05]'
            }`}
            data-cursor="INSPECT"
          >
            <div className="flex items-center justify-between text-xs font-mono text-slate-400">
              <span>03. BACKEND</span>
              <Cpu className="w-3.5 h-3.5 text-indigo-400" />
            </div>
            <div className="font-semibold text-sm mt-1 text-white">NestJS Services</div>
            <div className="text-[11px] text-slate-400 font-mono mt-0.5">gRPC & Microservices</div>
          </button>

          {/* Node 4: Persistence */}
          <button
            onClick={() => setActiveLayer('persistence')}
            className={`p-3 rounded-lg border text-left transition-all ${
              activeLayer === 'persistence' || (animating && activeStep === 3)
                ? 'bg-cyan-950/40 border-cyan-400 text-white shadow-[0_0_12px_rgba(34,211,238,0.2)]'
                : 'bg-white/[0.02] border-white/[0.08] text-slate-300 hover:bg-white/[0.05]'
            }`}
            data-cursor="INSPECT"
          >
            <div className="flex items-center justify-between text-xs font-mono text-slate-400">
              <span>04. STORAGE</span>
              <Database className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <div className="font-semibold text-sm mt-1 text-white">PostgreSQL & Redis</div>
            <div className="text-[11px] text-slate-400 font-mono mt-0.5">ACID & Fast Cache</div>
          </button>

          {/* Node 5: Infrastructure */}
          <button
            onClick={() => setActiveLayer('infra')}
            className={`p-3 rounded-lg border text-left transition-all ${
              activeLayer === 'infra' || (animating && activeStep === 4)
                ? 'bg-cyan-950/40 border-cyan-400 text-white shadow-[0_0_12px_rgba(34,211,238,0.2)]'
                : 'bg-white/[0.02] border-white/[0.08] text-slate-300 hover:bg-white/[0.05]'
            }`}
            data-cursor="INSPECT"
          >
            <div className="flex items-center justify-between text-xs font-mono text-slate-400">
              <span>05. CLOUD</span>
              <Cloud className="w-3.5 h-3.5 text-purple-400" />
            </div>
            <div className="font-semibold text-sm mt-1 text-white">AWS & Docker</div>
            <div className="text-[11px] text-slate-400 font-mono mt-0.5">Compose & EC2 Hosts</div>
          </button>
        </div>
      </div>

      {/* Parallel AI Augmentation Layer */}
      <div className="mt-5 pt-5 border-t border-white/[0.08]">
        <div className="flex items-center justify-between mb-3">
          <div className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-cyan-400" />
            PARALLEL AI REASONING & TOOL-CALLING LAYER
          </div>
          <span className="text-[11px] font-mono text-slate-400 hidden sm:inline">
            Non-deterministic LLM → Deterministic Backend Actions
          </span>
        </div>

        <button
          onClick={() => setActiveLayer('aiLayer')}
          className={`w-full p-3.5 rounded-lg border text-left transition-all ${
            activeLayer === 'aiLayer' || (animating && activeStep === 5)
              ? 'bg-cyan-950/40 border-cyan-400 text-white shadow-[0_0_12px_rgba(34,211,238,0.2)]'
              : 'bg-black/40 border-cyan-500/20 text-slate-300 hover:border-cyan-500/40'
          }`}
          data-cursor="INSPECT"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono text-xs font-semibold">
                AI PIPELINE
              </span>
              <span className="text-sm font-semibold text-white">
                Application → AI Workflow → LLM Agent → RAG / Function Tools → Backend Systems
              </span>
            </div>
            <span className="text-xs font-mono text-cyan-400 shrink-0">Click to Inspect Schema Bridge →</span>
          </div>
        </button>
      </div>

      {/* Active Layer Inspector Panel */}
      <div className="mt-5 p-4 rounded-lg bg-black/50 border border-white/[0.08] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-wide">
              LAYER INSPECTION:
            </span>
            <span className="font-semibold text-white text-sm">{selectedInfo.title}</span>
            <span className="text-slate-500 font-mono text-xs">/</span>
            <span className="text-xs font-mono text-slate-300">{selectedInfo.subtitle}</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed font-sans max-w-2xl">
            {selectedInfo.details}
          </p>
        </div>
        <div className="md:text-right shrink-0">
          <div className="text-[10px] font-mono text-slate-400 uppercase">TECHNOLOGIES</div>
          <div className="text-xs font-mono text-cyan-300 mt-0.5">{selectedInfo.stack}</div>
        </div>
      </div>
    </div>
  );
};
