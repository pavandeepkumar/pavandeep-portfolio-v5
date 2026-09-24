import React from 'react';
import { X, Download, Printer, ExternalLink, Mail, MapPin, Briefcase, GraduationCap, CheckCircle } from 'lucide-react';
import { profileData } from '../../data/profile';
import { careerTimeline } from '../../data/experience';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#090d16] border border-white/[0.15] rounded-2xl shadow-2xl overflow-hidden my-8 text-slate-200">
        {/* Modal Action Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08] bg-black/50">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <span>PAVANDEEP_KUMAR_RESUME.pdf</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono bg-white/[0.06] hover:bg-white/[0.1] text-slate-200 border border-white/[0.1] transition-colors"
              data-cursor="PRINT"
            >
              <Printer className="w-3.5 h-3.5 text-cyan-400" />
              <span>Print / PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] text-slate-400 hover:text-white transition-colors"
              data-cursor="CLOSE"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Formatted Resume Body */}
        <div className="p-6 sm:p-10 max-h-[80vh] overflow-y-auto space-y-8 scrollbar-thin scrollbar-thumb-white/10 bg-[#07090e]">
          {/* Resume Header */}
          <div className="border-b border-white/[0.1] pb-6">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <div>
                <h1 className="text-3xl font-extrabold text-white tracking-tight">
                  {profileData.name}
                </h1>
                <div className="text-base font-medium text-cyan-400 font-mono mt-1">
                  {profileData.role}
                </div>
              </div>
              <div className="text-xs font-mono text-slate-400 space-y-1 sm:text-right">
                <div>{profileData.contacts.email}</div>
                <div>{profileData.contacts.locationText} · {profileData.relocation}</div>
                <div>{profileData.contacts.linkedinHandle}</div>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 mt-4 leading-relaxed font-sans">
              Senior Full Stack Engineer with {profileData.experienceYears} years of experience engineering high-throughput backend systems, distributed microservices using NestJS and gRPC, scalable relational schemas in PostgreSQL, and practical generative AI tool-calling pipelines.
            </p>
          </div>

          {/* Core Technical Competencies */}
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold mb-3">
              TECHNICAL COMPETENCIES
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded bg-white/[0.02] border border-white/[0.06]">
                <div className="font-semibold text-slate-200">Backend & Architecture:</div>
                <div className="text-slate-400 font-mono mt-0.5">
                  Node.js, NestJS, Express, Microservices, gRPC / Protobuf, REST APIs, WebSockets, RBAC
                </div>
              </div>
              <div className="p-3 rounded bg-white/[0.02] border border-white/[0.06]">
                <div className="font-semibold text-slate-200">Databases & Caching:</div>
                <div className="text-slate-400 font-mono mt-0.5">
                  PostgreSQL, Redis, TypeORM, MongoDB, MySQL, ACID Transactions, Row Locking
                </div>
              </div>
              <div className="p-3 rounded bg-white/[0.02] border border-white/[0.06]">
                <div className="font-semibold text-slate-200">Frontend & Languages:</div>
                <div className="text-slate-400 font-mono mt-0.5">
                  TypeScript, JavaScript (ES6+), React, Next.js, Redux, Tailwind CSS, Vite
                </div>
              </div>
              <div className="p-3 rounded bg-white/[0.02] border border-white/[0.06]">
                <div className="font-semibold text-slate-200">Cloud, DevOps & AI:</div>
                <div className="text-slate-400 font-mono mt-0.5">
                  AWS (EC2, S3, RDS), Docker, Docker Compose, Nginx, RAG, LLM Tool Calling, FCM
                </div>
              </div>
            </div>
          </div>

          {/* Professional Experience */}
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold mb-4">
              PROFESSIONAL WORK EXPERIENCE
            </div>
            <div className="space-y-6">
              {careerTimeline.map((item) => (
                <div key={item.period} className="border-l border-white/[0.1] pl-4 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono">
                    <div className="font-bold text-white text-sm">{item.role}</div>
                    <div className="text-cyan-400">{item.period}</div>
                  </div>
                  <div className="text-xs text-slate-400 font-mono">
                    {item.company} · {item.location}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                    {item.description}
                  </p>
                  <ul className="space-y-1.5 pt-1 text-xs text-slate-400 font-sans">
                    {item.responsibilities.map((resp, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-cyan-400 font-mono text-xs">▪</span>
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Key Production Projects Brief */}
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold mb-3">
              KEY PRODUCTION DELIVERABLES
            </div>
            <div className="space-y-3 text-xs">
              <div className="p-3 rounded bg-white/[0.02] border border-white/[0.06]">
                <div className="font-bold text-white font-mono">
                  MitGo — Distributed Ride-Sharing Microservices (NestJS, gRPC, PostgreSQL, Docker)
                </div>
                <div className="text-slate-400 mt-1">
                  Decomposed monolithic dispatch into 7 microservices with sub-millisecond inter-service gRPC RPCs and Redis geospatial driver allocation.
                </div>
              </div>
              <div className="p-3 rounded bg-white/[0.02] border border-white/[0.06]">
                <div className="font-bold text-white font-mono">
                  Aunest — Wealth & FinTech Platform (NestJS, Razorpay, Webhooks, Redis)
                </div>
                <div className="text-slate-400 mt-1">
                  Engineered idempotent webhook processing and cryptographic signature validation preventing double-crediting in gold and mutual fund purchases.
                </div>
              </div>
              <div className="p-3 rounded bg-white/[0.02] border border-white/[0.06]">
                <div className="font-bold text-white font-mono">
                  Travel Buddy — AI Travel Discovery (AI APIs, NestJS, PostgreSQL)
                </div>
                <div className="text-slate-400 mt-1">
                  Implemented structured tool-calling pipelines allowing conversational LLM agents to query and hold inventory via deterministic backend APIs.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-white/[0.08] bg-black/50 flex items-center justify-between text-xs font-mono">
          <span className="text-slate-400">Pavandeep Kumar · Ahmedabad, Gujarat, India</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded bg-cyan-400 text-black font-semibold hover:bg-cyan-300 transition-colors"
          >
            Close Viewer
          </button>
        </div>
      </div>
    </div>
  );
};
