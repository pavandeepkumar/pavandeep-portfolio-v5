import React, { useState, useEffect } from 'react';
import { Terminal, Send, Sparkles, CheckCircle2, Loader2, ArrowRight, Play, RefreshCw } from 'lucide-react';

interface Scenario {
  prompt: string;
  thinking: string;
  context: string;
  toolCall: string;
  backendAction: string;
  response: string;
}

export const AiTerminalSimulation: React.FC = () => {
  const scenarios: Scenario[] = [
    {
      prompt: 'Check driver capacity for MitGo route #941 and dispatch nearest driver via gRPC.',
      thinking: 'Analyzing location coordinates, driver state machine, and Protobuf dispatch protocol...',
      context: 'Querying Redis geospatial index for active drivers within 3.5km radius...',
      toolCall: 'call_grpc_driver_service(geo_hash="ts5p8v", ride_type="STANDARD", timeout_ms=300)',
      backendAction: 'Location Service returned Driver #4821 (0.8km away). Dispatched ride event to Redis pub/sub.',
      response: 'Driver #4821 confirmed in 42ms via internal gRPC channel. FCM push alert sent to passenger.'
    },
    {
      prompt: 'Process incoming Razorpay webhook for Aunest digital gold purchase order #AG-8821.',
      thinking: 'Verifying webhook cryptographic HMAC signature to prevent replay attacks...',
      context: 'Fetching transaction lock from Redis for idempotency key: "razorpay_pay_8821"...',
      toolCall: 'verify_signature_and_acquire_lock(key="order_AG8821", signature="hmac_sha256_...")',
      backendAction: 'PostgreSQL ACID transaction executed: Ledger balance incremented by 2.50g Gold. Order status marked COMPLETED.',
      response: 'Transaction reconciled successfully. No double-crediting risk. Audit log committed to PostgreSQL.'
    },
    {
      prompt: 'Travel Buddy: Suggest a 3-day family itinerary in Ahmedabad with verified hotel slots.',
      thinking: 'Extracting constraints: family travel, 3 days, Ahmedabad, require real-time room availability...',
      context: 'Searching vector store for curated cultural attractions and historical monuments...',
      toolCall: 'query_partner_inventory(city="Ahmedabad", checkin="2026-10-01", rooms=1, type="HOTEL")',
      backendAction: 'Relational DB filtered 4 available verified partner properties with real-time rate validation.',
      response: 'Synthesized 3-day itinerary: Day 1 Heritage Walk & Sabarmati Ashram, Day 2 Science City & Adalaj, Day 3 Calico Museum. Partner hotel rooms verified and held.'
    }
  ];

  const [activeScenarioIdx, setActiveScenarioIdx] = useState<number>(0);
  const [customInput, setCustomInput] = useState<string>('');
  const [stage, setStage] = useState<'IDLE' | 'THINKING' | 'RETRIEVING' | 'CALLING_TOOL' | 'EXECUTING' | 'DONE'>('DONE');

  const currentScenario = scenarios[activeScenarioIdx];

  const runSimulation = (idx: number) => {
    setActiveScenarioIdx(idx);
    setStage('THINKING');

    setTimeout(() => {
      setStage('RETRIEVING');
      setTimeout(() => {
        setStage('CALLING_TOOL');
        setTimeout(() => {
          setStage('EXECUTING');
          setTimeout(() => {
            setStage('DONE');
          }, 700);
        }, 700);
      }, 700);
    }, 600);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInput.trim()) return;
    runSimulation(0);
    setCustomInput('');
  };

  return (
    <div className="rounded-xl border border-white/[0.12] bg-[#06080e] shadow-2xl overflow-hidden font-mono text-xs">
      {/* Terminal Titlebar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.08] bg-black/60">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
          </div>
          <span className="ml-2 text-slate-300 font-semibold">AI_AGENT_PIPELINE.sh</span>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-slate-400">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span>TOOL ENGINE ONLINE</span>
        </div>
      </div>

      {/* Preset Query Selector */}
      <div className="p-3 border-b border-white/[0.06] bg-white/[0.02] flex flex-wrap items-center gap-2">
        <span className="text-[10px] uppercase text-slate-400 font-semibold mr-1">
          SAMPLE INSTRUCTIONS:
        </span>
        {scenarios.map((sc, idx) => (
          <button
            key={idx}
            onClick={() => runSimulation(idx)}
            className={`px-2.5 py-1 text-[11px] rounded transition-all flex items-center gap-1.5 border ${
              activeScenarioIdx === idx && stage === 'DONE'
                ? 'bg-cyan-500/15 border-cyan-500/40 text-cyan-200 font-medium'
                : 'bg-black/30 border-white/[0.08] text-slate-400 hover:text-slate-200'
            }`}
            data-cursor="RUN"
          >
            <Play className="w-2.5 h-2.5 text-cyan-400" />
            <span>Scenario {idx + 1}</span>
          </button>
        ))}
      </div>

      {/* Terminal Interactive Canvas */}
      <div className="p-4 sm:p-6 space-y-4 min-h-[320px] bg-black/40 text-slate-200">
        {/* User Prompt */}
        <div className="flex items-start gap-2 text-slate-100">
          <span className="text-cyan-400 font-bold shrink-0">&gt; USER_INPUT:</span>
          <span className="font-sans font-medium text-sm text-cyan-100">
            "{currentScenario.prompt}"
          </span>
        </div>

        {/* Step 1: Thinking */}
        <div className="flex items-start gap-2.5 text-slate-400 pt-2">
          {stage === 'THINKING' ? (
            <Loader2 className="w-3.5 h-3.5 text-amber-400 animate-spin shrink-0 mt-0.5" />
          ) : (
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
          )}
          <div>
            <span className="text-slate-500 uppercase text-[10px]">Step 1 · </span>
            <span className={stage === 'THINKING' ? 'text-amber-300 font-semibold' : 'text-slate-300'}>
              Thinking...
            </span>
            <div className="text-[11px] text-slate-400 mt-0.5">{currentScenario.thinking}</div>
          </div>
        </div>

        {/* Step 2: Retrieving context (RAG) */}
        {(stage === 'RETRIEVING' || stage === 'CALLING_TOOL' || stage === 'EXECUTING' || stage === 'DONE') && (
          <div className="flex items-start gap-2.5 text-slate-400 animate-in fade-in duration-150">
            {stage === 'RETRIEVING' ? (
              <Loader2 className="w-3.5 h-3.5 text-sky-400 animate-spin shrink-0 mt-0.5" />
            ) : (
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
            )}
            <div>
              <span className="text-slate-500 uppercase text-[10px]">Step 2 · </span>
              <span className={stage === 'RETRIEVING' ? 'text-sky-300 font-semibold' : 'text-slate-300'}>
                Retrieving context (RAG / Vector Store)...
              </span>
              <div className="text-[11px] text-slate-400 mt-0.5">{currentScenario.context}</div>
            </div>
          </div>
        )}

        {/* Step 3: Calling Tool / Schema Validation */}
        {(stage === 'CALLING_TOOL' || stage === 'EXECUTING' || stage === 'DONE') && (
          <div className="flex items-start gap-2.5 text-slate-400 animate-in fade-in duration-150">
            {stage === 'CALLING_TOOL' ? (
              <Loader2 className="w-3.5 h-3.5 text-cyan-400 animate-spin shrink-0 mt-0.5" />
            ) : (
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
            )}
            <div>
              <span className="text-slate-500 uppercase text-[10px]">Step 3 · </span>
              <span className={stage === 'CALLING_TOOL' ? 'text-cyan-300 font-semibold' : 'text-slate-300'}>
                Calling Typed Backend Tool...
              </span>
              <div className="mt-1 p-2 rounded bg-cyan-950/30 border border-cyan-500/20 text-cyan-300 text-[11px] font-mono">
                {currentScenario.toolCall}
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Executing Backend Action */}
        {(stage === 'EXECUTING' || stage === 'DONE') && (
          <div className="flex items-start gap-2.5 text-slate-400 animate-in fade-in duration-150">
            {stage === 'EXECUTING' ? (
              <Loader2 className="w-3.5 h-3.5 text-indigo-400 animate-spin shrink-0 mt-0.5" />
            ) : (
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
            )}
            <div>
              <span className="text-slate-500 uppercase text-[10px]">Step 4 · </span>
              <span className={stage === 'EXECUTING' ? 'text-indigo-300 font-semibold' : 'text-slate-300'}>
                Executing deterministic backend action...
              </span>
              <div className="text-[11px] text-slate-400 mt-0.5">{currentScenario.backendAction}</div>
            </div>
          </div>
        )}

        {/* Final Synthesized Response */}
        {stage === 'DONE' && (
          <div className="mt-4 p-3.5 rounded-lg bg-emerald-950/20 border border-emerald-500/30 text-emerald-200 animate-in fade-in duration-200">
            <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-semibold mb-1">
              <CheckCircle2 className="w-4 h-4" />
              <span>Response generated & verified:</span>
            </div>
            <p className="font-sans text-xs sm:text-sm text-slate-200 leading-relaxed">
              {currentScenario.response}
            </p>
          </div>
        )}
      </div>

      {/* Input bar */}
      <form
        onSubmit={handleCustomSubmit}
        className="p-3 border-t border-white/[0.08] bg-black/60 flex items-center gap-2"
      >
        <span className="text-cyan-400 text-xs pl-1">&gt;</span>
        <input
          type="text"
          value={customInput}
          onChange={(e) => setCustomInput(e.target.value)}
          placeholder="Ask the system something (e.g., 'Simulate RAG vector search for booking')..."
          className="flex-1 bg-transparent border-none text-xs text-white placeholder-slate-400 focus:outline-none font-mono"
        />
        <button
          type="submit"
          className="px-3 py-1 rounded bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 text-xs flex items-center gap-1"
        >
          <span>Run</span>
          <Send className="w-3 h-3" />
        </button>
      </form>
    </div>
  );
};
