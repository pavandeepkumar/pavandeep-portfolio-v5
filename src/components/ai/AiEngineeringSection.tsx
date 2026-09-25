import React from 'react';
import { AiTerminalSimulation } from './AiTerminalSimulation';
import { Section } from '../layout/Section';
import { AiPipeline } from './AiPipeline';
import { RagIcon, ToolIcon, BackendIcon, ShieldIcon } from './AiIcons';

const practices = [
  {
    icon: RagIcon,
    title: 'RAG architectures & vector stores',
    text: 'Grounding models in domain-specific documents and database catalogs, eliminating hallucinations through contextual chunk retrieval.'
  },
  {
    icon: ToolIcon,
    title: 'Strict tool & function calling',
    text: 'Defining rigid JSON schema signatures for LLM tool invocation, ensuring every tool call conforms to backend DTOs before touching databases.'
  },
  {
    icon: BackendIcon,
    title: 'AI + backend transactions',
    text: 'Executing real-world transactions (room reservation, ride dispatch, ledger updates) within atomic ACID database transactions, never relying on raw LLM strings.'
  },
  {
    icon: ShieldIcon,
    title: 'Prompts & guardrails',
    text: 'Hardened system prompts enforcing format conformance, defensive input sanitization, and graceful fallback behaviors when tools error.'
  }
];

export const AiEngineeringSection: React.FC = () => {
  return (
    <Section
      id="ai"
      index="04"
      label="Applied AI"
      title={
        <>
          The model reasons. <em>The backend decides.</em>
        </>
      }
      intro="I don't treat AI as a marketing word. I build LLM features where probabilistic reasoning hands off to deterministic, schema-validated backend transactions, so a model can suggest a booking but never invent one."
    >
      <div className="grid grid-cols-1 gap-y-14 md:grid-cols-12 md:gap-x-8">
        {/* Pipeline */}
        <div className="md:col-span-12">
          <h3 className="eyebrow">The path an AI request takes</h3>
          <div className="mt-5">
            <AiPipeline />
          </div>
        </div>

        {/* Practices + walkthrough */}
        <div className="grid grid-cols-1 gap-y-12 md:col-span-12 lg:grid-cols-12 lg:gap-x-8">
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1 lg:content-start">
            {practices.map(({ icon: Icon, title, text }) => (
              <li key={title} className="group flex gap-4 rounded-lg border border-line bg-raised card-shadow card-shadow-hover p-4 transition-colors hover:border-line-strong">
                <Icon className="h-11 w-11 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:rotate-[-4deg]" />
                <div>
                  <h3 className="text-[15px] text-ink">{title}</h3>
                  <p className="mt-1 text-[13.5px] leading-relaxed text-muted">{text}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="lg:col-span-7">
            <AiTerminalSimulation />
          </div>
        </div>
      </div>
    </Section>
  );
};
