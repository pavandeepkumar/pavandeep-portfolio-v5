import React, { useState } from 'react';
import { Mail, Linkedin, Github, MapPin, ArrowRight, Copy, Check, Terminal, Send, MessageSquare, Plane } from 'lucide-react';
import { profileData } from '../../data/profile';

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState('Distributed Backend Architecture');
  const [senderMessage, setSenderMessage] = useState('');

  const copyEmail = () => {
    navigator.clipboard.writeText(profileData.contacts.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const engineeringTopics = [
    'Distributed Backend Architecture',
    'Senior Full Stack Engineering Role',
    'Microservices & gRPC Decomposition',
    'FinTech & High-Integrity Webhooks',
    'AI RAG & Tool-Calling Systems'
  ];

  const handleComposeMail = () => {
    const subject = encodeURIComponent(`Engineering Discussion: ${selectedTopic}`);
    const body = encodeURIComponent(
      `Hi Pavandeep,\n\nI reviewed your portfolio and would like to discuss: ${selectedTopic}.\n\n${senderMessage ? senderMessage + '\n\n' : ''}Best regards,`
    );
    window.location.href = `mailto:${profileData.contacts.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-[#07090e]">
      {/* Background ambient gradient */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2">
            <Terminal className="w-3.5 h-3.5" />
            <span>DIRECT CHANNELS & INQUIRIES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Have a difficult engineering problem?
          </h2>
          <p className="text-lg sm:text-xl text-cyan-300 font-medium mt-2">
            Let's build the system behind it.
          </p>
          <p className="text-sm sm:text-base text-slate-300 mt-4 leading-relaxed">
            Whether you are scaling a microservices backend, integrating generative AI with reliable database transactions, or seeking a Senior Full Stack Engineer who owns features end-to-end—let's connect.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: Contact Details & Fast Copy */}
          <div className="lg:col-span-6 space-y-4">
            {/* Direct Email Card */}
            <div className="p-6 rounded-xl bg-white/[0.02] border border-white/[0.08] flex flex-col justify-between">
              <div>
                <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-1 flex items-center justify-between">
                  <span>PRIMARY INBOX</span>
                  <span className="text-emerald-400 text-[10px]">Fast Response</span>
                </div>
                <div className="text-base sm:text-lg font-mono font-bold text-white break-all">
                  {profileData.contacts.email}
                </div>
              </div>

              <div className="flex items-center gap-3 mt-5 pt-4 border-t border-white/[0.06]">
                <button
                  onClick={copyEmail}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] text-xs font-mono text-slate-200 transition-colors"
                  data-cursor="COPY"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-cyan-400" />}
                  <span>{copied ? 'Copied to Clipboard' : 'Copy Email Address'}</span>
                </button>

                <a
                  href={`mailto:${profileData.contacts.email}`}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-cyan-400 hover:bg-cyan-300 text-xs font-mono font-semibold text-black transition-colors"
                  data-cursor="MAIL"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Open Mail Client</span>
                </a>
              </div>
            </div>

            {/* Social & Location Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href={profileData.contacts.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.08] hover:border-cyan-500/40 transition-all group"
                data-cursor="OPEN"
              >
                <div className="flex items-center justify-between text-slate-400">
                  <Linkedin className="w-5 h-5 text-cyan-400" />
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:translate-x-1 group-hover:text-cyan-400 transition-all" />
                </div>
                <div className="text-sm font-bold text-white mt-3">LinkedIn Profile</div>
                <div className="text-xs font-mono text-slate-400 mt-0.5 truncate">
                  {profileData.contacts.linkedinHandle}
                </div>
              </a>

              <a
                href={profileData.contacts.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.08] hover:border-cyan-500/40 transition-all group"
                data-cursor="OPEN"
              >
                <div className="flex items-center justify-between text-slate-400">
                  <Github className="w-5 h-5 text-slate-300" />
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:translate-x-1 group-hover:text-cyan-400 transition-all" />
                </div>
                <div className="text-sm font-bold text-white mt-3">GitHub Repos</div>
                <div className="text-xs font-mono text-slate-400 mt-0.5 truncate">
                  {profileData.contacts.githubHandle}
                </div>
              </a>
            </div>

            {/* Location marker */}
            <div className="p-4 rounded-xl bg-black/40 border border-white/[0.06] space-y-3 text-xs font-mono text-slate-400">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-slate-300">
                  <MapPin className="w-4 h-4 text-cyan-400" aria-hidden="true" />
                  <span>{profileData.contacts.locationText}</span>
                </div>
                <span className="text-slate-500">UTC+5:30 (IST)</span>
              </div>
              <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-white/[0.06]">
                <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
                  <Plane className="w-3.5 h-3.5" aria-hidden="true" />
                  {profileData.relocation}
                </span>
                {profileData.workModes.map((mode) => (
                  <span key={mode} className="px-2 py-1 rounded bg-white/[0.04] border border-white/[0.08] text-slate-300">
                    {mode}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Technical Conversation Launcher */}
          <div className="lg:col-span-6 p-6 sm:p-7 rounded-xl bg-[#090d16] border border-white/[0.1] flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex items-center gap-2 pb-3 border-b border-white/[0.08] text-xs font-mono text-cyan-400">
                <MessageSquare className="w-4 h-4" />
                <span>QUICK TOPIC SELECTION</span>
              </div>

              <div className="mt-4">
                <label className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-2">
                  WHAT ARE YOU LOOKING TO BUILD OR SOLVE?
                </label>
                <div className="flex flex-wrap gap-2 mb-4">
                  {engineeringTopics.map((topic) => (
                    <button
                      key={topic}
                      type="button"
                      onClick={() => setSelectedTopic(topic)}
                      className={`px-3 py-1.5 text-xs font-mono rounded-md text-left transition-all border ${
                        selectedTopic === topic
                          ? 'bg-cyan-500/15 border-cyan-500/40 text-cyan-200 font-semibold'
                          : 'bg-white/[0.02] border-white/[0.06] text-slate-400 hover:text-slate-200'
                      }`}
                      data-cursor="SELECT"
                    >
                      {topic}
                    </button>
                  ))}
                </div>

                <label className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-2">
                  PROJECT CONTEXT / NOTE (OPTIONAL)
                </label>
                <textarea
                  rows={3}
                  value={senderMessage}
                  onChange={(e) => setSenderMessage(e.target.value)}
                  placeholder="Share a brief overview of your team, stack requirements, or architecture challenge..."
                  className="w-full p-3 rounded-lg bg-black/50 border border-white/[0.1] text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-sans transition-colors resize-none"
                />
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/[0.08]">
              <button
                onClick={handleComposeMail}
                className="w-full py-3 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-black text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-150 shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:shadow-[0_0_25px_rgba(34,211,238,0.5)] cursor-pointer"
                data-cursor="LET'S GO"
              >
                <span>Start a Conversation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
