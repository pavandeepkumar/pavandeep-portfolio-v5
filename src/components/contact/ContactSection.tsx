import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { profileData } from '../../data/profile';
import { Section } from '../layout/Section';
import {
  AiChatIcon,
  ClockIcon,
  EnvelopeIcon,
  LaptopIcon,
  PaymentIcon,
  PinIcon,
  PlaneIcon,
  RoleIcon,
  ServersIcon,
  ServicesIcon
} from './ContactIcons';

const engineeringTopics = [
  {
    title: 'Distributed Backend Architecture',
    short: 'Backend architecture',
    blurb: 'A backend that slows down as traffic grows, and nobody is sure which query is to blame.',
    Icon: ServersIcon
  },
  {
    title: 'Senior Full Stack Engineering Role',
    short: 'Full-stack role',
    blurb: 'An engineer who takes a feature from schema to screen and stays for the on-call.',
    Icon: RoleIcon
  },
  {
    title: 'Microservices & gRPC Decomposition',
    short: 'Microservices / gRPC',
    blurb: 'One codebase doing six jobs, where every deploy is a risk to all of them.',
    Icon: ServicesIcon
  },
  {
    title: 'FinTech & High-Integrity Webhooks',
    short: 'FinTech webhooks',
    blurb: 'Payments that retry, arrive twice or arrive late, and must still be counted once.',
    Icon: PaymentIcon
  },
  {
    title: 'AI RAG & Tool-Calling Systems',
    short: 'AI, RAG & tools',
    blurb: 'An assistant that has to book, pay or update real records without making things up.',
    Icon: AiChatIcon
  },
  {
    title: 'Something else',
    short: 'Something else',
    blurb: 'A problem that does not fit a box. Describe it below and I will reply either way.',
    Icon: EnvelopeIcon
  }
];

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState(engineeringTopics[0].title);
  const [senderMessage, setSenderMessage] = useState('');
  const [composerHover, setComposerHover] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profileData.contacts.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${profileData.contacts.email}`;
    }
  };

  const subjectLine = `Engineering Discussion: ${selectedTopic}`;

  const handleComposeMail = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(subjectLine);
    const body = encodeURIComponent(
      `Hi Pavandeep,\n\nI reviewed your portfolio and would like to discuss: ${selectedTopic}.\n\n${senderMessage ? senderMessage + '\n\n' : ''}Best regards,`
    );
    window.location.href = `mailto:${profileData.contacts.email}?subject=${subject}&body=${body}`;
  };

  const availability = [
    { label: 'Based in', value: profileData.contacts.locationText, Icon: PinIcon },
    { label: 'Time zone', value: 'UTC+5:30 (IST)', Icon: ClockIcon },
    { label: 'Relocation', value: profileData.relocation, Icon: PlaneIcon },
    { label: 'Work mode', value: profileData.workModes.join(', '), Icon: LaptopIcon }
  ];

  return (
    <Section
      id="contact"
      index="08"
      label="Contact"
      title={
        <>
          Have a difficult engineering problem? <em className="text-accent">Let's build the system behind it.</em>
        </>
      }
      intro="Scaling a backend, wiring AI into real transactions, or hiring a full-stack engineer who owns features end to end."
    >
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-x-8">
        {/* Direct channels */}
        <div className="lg:col-span-5">
          <p className="eyebrow">Email</p>
          <a
            href={`mailto:${profileData.contacts.email}`}
            className="mt-2 block break-all font-serif text-2xl text-ink transition-colors hover:text-accent sm:text-[28px]"
          >
            {profileData.contacts.email}
          </a>
          <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
            <button type="button" onClick={copyEmail} className="font-mono text-xs text-muted hover:text-ink" aria-live="polite">
              {copied ? 'copied ✓' : 'copy address'}
            </button>
            <a href={profileData.contacts.linkedin} target="_blank" rel="noopener noreferrer" className="link">
              LinkedIn ↗
            </a>
            <a href={profileData.contacts.github} target="_blank" rel="noopener noreferrer" className="link">
              GitHub ↗
            </a>
          </div>

          <dl className="mt-6 grid grid-cols-2 gap-2">
            {availability.map(({ label, value, Icon }) => (
              <div
                key={label}
                className="group flex items-center gap-2.5 rounded-xl border border-line bg-raised p-2.5 transition-colors hover:border-line-strong"
              >
                <Icon className="h-8 w-8 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5" />
                <div className="min-w-0">
                  <dt className="font-mono text-[9.5px] uppercase tracking-wider text-faint">{label}</dt>
                  <dd className="text-[12.5px] leading-snug text-ink">{value}</dd>
                </div>
              </div>
            ))}
          </dl>
        </div>

        {/* Composer: pick a topic, it becomes the subject */}
        <form
          onSubmit={handleComposeMail}
          onMouseEnter={() => setComposerHover(true)}
          onMouseLeave={() => setComposerHover(false)}
          className="relative rounded-2xl border border-line bg-raised p-5 sm:p-6 lg:col-span-7"
        >
          <div className="flex items-start justify-between gap-4">
            <fieldset className="min-w-0 flex-1">
              <legend className="eyebrow">What is it about?</legend>
              <div className="mt-3 grid grid-cols-2 gap-1.5 sm:grid-cols-3">
                {engineeringTopics.map(({ title, short, blurb, Icon }) => {
                  const isSelected = selectedTopic === title;
                  return (
                    <button
                      key={title}
                      type="button"
                      onClick={() => setSelectedTopic(title)}
                      aria-pressed={isSelected}
                      title={blurb}
                      className={`group relative flex items-center gap-2 rounded-lg border px-2 py-1.5 text-left transition-all duration-300 ${
                        isSelected ? 'border-accent/60 bg-tint' : 'border-line bg-bg/40 hover:border-line-strong'
                      }`}
                    >
                      <Icon className="h-7 w-7 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5" />
                      <span className={`min-w-0 text-[12.5px] leading-tight ${isSelected ? 'text-ink' : 'text-body'}`}>{short}</span>
                      {isSelected && (
                        <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-bg" aria-hidden="true">
                          <Check className="h-2.5 w-2.5" strokeWidth={3} />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </fieldset>
            <EnvelopeIcon className="-mt-1 hidden h-14 w-14 shrink-0 sm:block" open={composerHover || senderMessage.length > 0} />
          </div>

          <p className="mt-4 font-mono text-[11.5px] leading-snug">
            <span className="text-faint">subject </span>
            <span key={selectedTopic} className="anim-in inline-block text-accent">
              {subjectLine}
            </span>
          </p>

          <label htmlFor="contact-note" className="sr-only">
            Context (optional)
          </label>
          <textarea
            id="contact-note"
            rows={3}
            value={senderMessage}
            onChange={(e) => setSenderMessage(e.target.value)}
            placeholder="Optional: your team, the stack, or the problem you're stuck on."
            className="mt-3 w-full resize-none rounded-md border border-line-strong bg-bg/60 p-3 text-sm text-ink placeholder:text-faint focus:border-accent focus:outline-none"
          />

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <button
              type="submit"
              className="group inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-bg transition-colors hover:bg-accent"
            >
              Write the email
              <span className="transition-transform group-hover:translate-x-0.5" aria-hidden="true">→</span>
            </button>
            <span className="font-mono text-[11px] text-faint">opens your mail app</span>
          </div>
        </form>
      </div>
    </Section>
  );
};
