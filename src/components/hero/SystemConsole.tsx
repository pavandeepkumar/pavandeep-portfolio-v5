import React, { useState, useEffect } from 'react';
import { Terminal, CheckCircle2, Activity, Cpu, Database, Server, Sparkles, Cloud } from 'lucide-react';

interface ServiceDetail {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  status: 'ONLINE' | 'ACTIVE' | 'STANDBY';
  runtime: string;
  load: string;
  latency: string;
  description: string;
  protocol: string;
}

export const SystemConsole: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'SERVICES' | 'SYSTEMS'>('SERVICES');
  const [selectedService, setSelectedService] = useState<string>('API');
  const [simulatedClock, setSimulatedClock] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setSimulatedClock(now.toTimeString().split(' ')[0]);
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const services: Record<string, ServiceDetail> = {
    API: {
      id: 'API',
      name: 'API Gateway & REST/gRPC',
      icon: Server,
      status: 'ONLINE',
      runtime: 'NestJS / Express',
      load: '0.18 ms',
      latency: '2.4ms',
      description: 'Reverse proxy, JWT token lifecycle, request rate-limiting, and binary gRPC multiplexing.',
      protocol: 'HTTP/2 & gRPC'
    },
    DATABASE: {
      id: 'DATABASE',
      name: 'Relational & Key-Value Stores',
      icon: Database,
      status: 'ONLINE',
      runtime: 'PostgreSQL 16 + Redis',
      load: 'ACID Tier-1',
      latency: '1.2ms',
      description: 'Composite B-tree indexes, row-level locks, transactional outbox pattern, and in-memory caches.',
      protocol: 'TCP / Connection Pooling'
    },
    MICROSERVICES: {
      id: 'MICROSERVICES',
      name: 'Distributed Poly-Services',
      icon: Cpu,
      status: 'ONLINE',
      runtime: 'Docker Containers',
      load: '7 Isolated Pods',
      latency: '< 4ms IPC',
      description: 'Independent deployable boundaries with strongly-typed Protobuf contracts and state machines.',
      protocol: 'Protobuf / gRPC'
    },
    AI: {
      id: 'AI',
      name: 'AI Agent & RAG Pipelines',
      icon: Sparkles,
      status: 'ONLINE',
      runtime: 'Gemini / LLM APIs',
      load: 'Tool Calling Ready',
      latency: 'Streaming',
      description: 'Retrieval-Augmented Generation, vector embeddings, and schema-validated backend actions.',
      protocol: 'JSON Schema Tools'
    },
    CLOUD: {
      id: 'CLOUD',
      name: 'AWS Cloud & Orchestration',
      icon: Cloud,
      status: 'ONLINE',
      runtime: 'AWS EC2 / S3 / RDS',
      load: 'Multi-AZ Staged',
      latency: 'Target 99.9%',
      description: 'Docker Compose orchestration, Nginx reverse proxying, and automated CI/CD deployment runs.',
      protocol: 'VPC / TLS 1.3'
    }
  };

  const systemsList = [
    { name: 'PostgreSQL', role: 'Primary ACID database, row-level locks, indexing', state: 'READY' },
    { name: 'Redis', role: 'Sub-millisecond cache, distributed locks, geospatial index', state: 'ACTIVE' },
    { name: 'Docker', role: 'Multi-stage container images, compose network mesh', state: 'HEALTHY' },
    { name: 'AWS', role: 'EC2 host instances, S3 storage, RDS PostgreSQL engine', state: 'STABLE' },
    { name: 'Kafka / Queues', role: 'Decoupled event streams and asynchronous workers', state: 'IDLE' }
  ];

  const currentService = services[selectedService] || services.API;

  return (
    <div className="w-full rounded-xl border border-white/[0.12] bg-[#090d16]/90 shadow-2xl backdrop-blur-xl overflow-hidden font-mono text-xs">
      {/* Console Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.08] bg-black/40">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/70 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70 inline-block" />
          </div>
          <span className="ml-2 font-semibold text-slate-300 tracking-wider">PAVANDEEP.SYSTEM</span>
        </div>
        <div className="flex items-center gap-3 text-[11px] text-slate-400">
          <span className="hidden sm:inline text-slate-400">{simulatedClock || '09:14:21'} UTC</span>
          <span className="flex items-center gap-1 text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
            LIVE
          </span>
        </div>
      </div>

      {/* System Telemetry Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/[0.06] border-b border-white/[0.08] text-[11px]">
        <div className="bg-[#090d16] p-2.5">
          <div className="text-slate-400 uppercase text-[10px]">STATUS</div>
          <div className="text-emerald-400 font-semibold mt-0.5 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 inline" /> ONLINE
          </div>
        </div>
        <div className="bg-[#090d16] p-2.5">
          <div className="text-slate-400 uppercase text-[10px]">ROLE</div>
          <div className="text-slate-200 font-semibold mt-0.5 truncate">FULL STACK ENG</div>
        </div>
        <div className="bg-[#090d16] p-2.5">
          <div className="text-slate-400 uppercase text-[10px]">FOCUS</div>
          <div className="text-cyan-400 font-semibold mt-0.5 truncate">BACKEND + AI</div>
        </div>
        <div className="bg-[#090d16] p-2.5">
          <div className="text-slate-400 uppercase text-[10px]">EXPERIENCE</div>
          <div className="text-slate-200 font-semibold mt-0.5">3.6+ YEARS</div>
        </div>
      </div>

      {/* Tab Selector */}
      <div className="flex items-center border-b border-white/[0.08] bg-black/20 px-2 py-1 gap-1">
        <button
          onClick={() => setActiveTab('SERVICES')}
          className={`px-3 py-1 rounded text-[11px] font-medium transition-colors ${
            activeTab === 'SERVICES'
              ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30'
              : 'text-slate-400 hover:text-slate-200'
          }`}
          data-cursor="EXPLORE"
        >
          SERVICES ({Object.keys(services).length})
        </button>
        <button
          onClick={() => setActiveTab('SYSTEMS')}
          className={`px-3 py-1 rounded text-[11px] font-medium transition-colors ${
            activeTab === 'SYSTEMS'
              ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30'
              : 'text-slate-400 hover:text-slate-200'
          }`}
          data-cursor="EXPLORE"
        >
          CORE SYSTEMS ({systemsList.length})
        </button>
      </div>

      {/* Main Interactive Body */}
      <div className="p-4 sm:p-5">
        {activeTab === 'SERVICES' ? (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Left selector menu */}
            <div className="md:col-span-5 space-y-1">
              <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-2">
                ACTIVE PIPELINES
              </div>
              {Object.keys(services).map((key) => {
                const isSelected = selectedService === key;
                return (
                  <button
                    key={key}
                    onClick={() => setSelectedService(key)}
                    className={`w-full text-left px-3 py-2 rounded-md transition-all duration-150 flex items-center justify-between border ${
                      isSelected
                        ? 'bg-cyan-950/40 border-cyan-500/40 text-cyan-200 font-semibold'
                        : 'bg-white/[0.02] border-transparent text-slate-400 hover:bg-white/[0.05] hover:text-slate-200'
                    }`}
                    data-cursor="INSPECT"
                  >
                    <span className="flex items-center gap-2">
                      <span className={isSelected ? 'text-cyan-400' : 'text-slate-500'}>→</span>
                      <span>{key}</span>
                    </span>
                    <span className="text-[10px] text-emerald-400/90 font-mono">
                      {isSelected ? 'ACTIVE' : 'READY'}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Right inspect details card */}
            <div className="md:col-span-7 bg-black/50 border border-white/[0.08] rounded-lg p-3.5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
                  <div className="flex items-center gap-2">
                    <currentService.icon className="w-4 h-4 text-cyan-400" />
                    <span className="text-slate-200 font-semibold font-sans text-xs">
                      {currentService.name}
                    </span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                    {currentService.status}
                  </span>
                </div>

                <div className="mt-3 space-y-2 text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Runtime:</span>
                    <span className="text-slate-200">{currentService.runtime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Throughput/Bench:</span>
                    <span className="text-cyan-300">{currentService.load}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Protocol:</span>
                    <span className="text-slate-300 font-mono">{currentService.protocol}</span>
                  </div>
                  <p className="text-slate-400 pt-2 border-t border-white/[0.06] text-[11px] leading-relaxed font-sans">
                    {currentService.description}
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-2 border-t border-white/[0.06] flex items-center justify-between text-[10px] text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Activity className="w-3 h-3 text-cyan-400" /> Telemetry nominal
                </span>
                <span>Latency: {currentService.latency}</span>
              </div>
            </div>
          </div>
        ) : (
          /* SYSTEMS LIST */
          <div className="space-y-2">
            <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-2">
              PRODUCTION INFRASTRUCTURE NODES
            </div>
            {systemsList.map((item) => (
              <div
                key={item.name}
                className="flex items-center justify-between p-2.5 rounded bg-black/40 border border-white/[0.06] hover:border-cyan-500/30 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  <span className="font-semibold text-slate-200">{item.name}</span>
                  <span className="text-slate-400 text-[11px] hidden sm:inline font-sans">
                    — {item.role}
                  </span>
                </div>
                <span className="text-[10px] text-emerald-400 font-mono">{item.state}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Terminal prompt footer */}
      <div className="px-4 py-2 border-t border-white/[0.08] bg-black/60 flex items-center justify-between text-[11px] text-slate-400">
        <span className="flex items-center gap-1.5">
          <Terminal className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-slate-300">pk@systems:~$</span>
          <span className="text-slate-400">nest start --watch && docker compose up -d</span>
        </span>
        <span className="hidden sm:inline text-slate-400">node_env=production</span>
      </div>
    </div>
  );
};
