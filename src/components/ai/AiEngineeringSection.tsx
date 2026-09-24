import React from 'react';
import { AiTerminalSimulation } from './AiTerminalSimulation';
import { Sparkles, ArrowRight, ShieldCheck, Database, Cpu, Bot, GitMerge, FileCode } from 'lucide-react';

export const AiEngineeringSection: React.FC = () => {
  const pipelineSteps = [
    { label: 'USER', sub: 'Intent & Input' },
    { label: 'AI APPLICATION', sub: 'Client Session' },
    { label: 'PROMPT / CONTEXT', sub: 'System Guardrails' },
    { label: 'RAG', sub: 'Vector Embeddings' },
    { label: 'LLM', sub: 'Reasoning Engine' },
    { label: 'TOOL CALLING', sub: 'JSON Schema' },
    { label: 'BACKEND SERVICE', sub: 'NestJS / DB' },
    { label: 'REAL-WORLD ACTION', sub: 'Deterministic State' }
  ];

  return (
    <section id="ai" className="py-24 border-b border-white/[0.08] bg-[#05070b] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>PRACTICAL AI ENGINEERING</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Where software meets AI.
          </h2>
          <p className="text-base sm:text-lg text-slate-300 mt-4 leading-relaxed">
            I don't treat AI as marketing buzzwords. I engineer practical LLM systems that bridge probabilistic natural language reasoning with deterministic, schema-validated backend transactions and relational databases.
          </p>
        </div>

        {/* The Concrete AI Pipeline Banner */}
        <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.08] mb-12">
          <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-4 flex items-center justify-between">
            <span>DETERMINISTIC AI AGENT EXECUTION PIPELINE</span>
            <span className="text-cyan-400 hidden sm:inline">PROBABILISTIC → DETERMINISTIC</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 text-center font-mono">
            {pipelineSteps.map((step, idx) => (
              <div
                key={step.label}
                className="p-2.5 rounded-lg bg-black/50 border border-white/[0.06] flex flex-col justify-center items-center relative"
              >
                <span className="text-[10px] text-cyan-400 font-bold mb-1">0{idx + 1}</span>
                <span className="text-xs font-semibold text-slate-100 leading-tight">
                  {step.label}
                </span>
                <span className="text-[10px] text-slate-400 mt-1">{step.sub}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 2-Column Section: Left Core AI Capabilities + Right Interactive Terminal Simulation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Core Practical Pillars */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08]">
              <div className="flex items-center gap-2 text-sm font-semibold text-white">
                <Bot className="w-4 h-4 text-cyan-400" />
                <span>RAG Architectures & Vector Stores</span>
              </div>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Grounding models in domain-specific documents and database catalogs, eliminating hallucinations through contextual chunk retrieval.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08]">
              <div className="flex items-center gap-2 text-sm font-semibold text-white">
                <GitMerge className="w-4 h-4 text-sky-400" />
                <span>Strict Tool & Function Calling</span>
              </div>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Defining rigid JSON schema signatures for LLM tool invocation, ensuring every tool call conforms to backend DTOs before touching databases.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08]">
              <div className="flex items-center gap-2 text-sm font-semibold text-white">
                <Database className="w-4 h-4 text-emerald-400" />
                <span>AI + Backend Transaction Integration</span>
              </div>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Executing real-world transactions (room reservation, ride dispatch, ledger updates) within atomic ACID database transactions, never relying on raw LLM strings.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08]">
              <div className="flex items-center gap-2 text-sm font-semibold text-white">
                <ShieldCheck className="w-4 h-4 text-purple-400" />
                <span>Prompt Engineering & Guardrails</span>
              </div>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Hardened system prompts enforcing format conformance, defensive input sanitization, and graceful fallback behaviors when tools error.
              </p>
            </div>
          </div>

          {/* Right: Live Interactive Terminal Simulation */}
          <div className="lg:col-span-7">
            <AiTerminalSimulation />
          </div>
        </div>
      </div>
    </section>
  );
};
