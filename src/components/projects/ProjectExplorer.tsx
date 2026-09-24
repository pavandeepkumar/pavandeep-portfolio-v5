import React, { useState, useMemo } from 'react';
import { projectsData } from '../../data/projects';
import { Project } from '../../types/portfolio';
import { FeaturedProjectCard } from './FeaturedProjectCard';
import { ProjectModal } from './ProjectModal';
import { Search, SlidersHorizontal, Terminal, Filter } from 'lucide-react';

export const ProjectExplorer: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedModalProject, setSelectedModalProject] = useState<Project | null>(null);

  const filters = [
    'All',
    'Backend',
    'Full Stack',
    'Microservices',
    'AI',
    'FinTech',
    'SaaS',
    'Mobile',
    'Enterprise'
  ];

  const filteredProjects = useMemo(() => {
    return projectsData.filter((project) => {
      const matchesFilter =
        selectedFilter === 'All' ||
        project.category === selectedFilter ||
        project.tags.includes(selectedFilter);

      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        project.title.toLowerCase().includes(query) ||
        project.subtitle.toLowerCase().includes(query) ||
        project.technologies.some((t) => t.toLowerCase().includes(query)) ||
        project.summary.toLowerCase().includes(query) ||
        project.problem.toLowerCase().includes(query);

      return matchesFilter && matchesSearch;
    });
  }, [selectedFilter, searchQuery]);

  return (
    <section id="projects" className="py-24 border-b border-white/[0.08] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2">
              <Terminal className="w-3.5 h-3.5" />
              <span>PRODUCTION SYSTEMS & ARCHITECTURAL CASE STUDIES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Featured Engineering Projects
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mt-2 max-w-2xl">
              In-depth technical breakdowns of production systems: microservices, financial webhooks, virtual coin wallets, scheduling state machines, and AI tool-calling pipelines.
            </p>
          </div>

          <div className="text-xs font-mono text-slate-400">
            SHOWING {filteredProjects.length} OF {projectsData.length} SYSTEMS
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="p-3 sm:p-4 rounded-xl bg-[#090d16] border border-white/[0.08] mb-10 space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            {/* Search Field */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search projects by tech (gRPC, NestJS, Razorpay, Redis, Docker)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-black/50 border border-white/[0.1] rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 font-mono transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-400 hover:text-white"
                >
                  CLEAR
                </button>
              )}
            </div>
          </div>

          {/* Interactive Filter Controls - Segmented tabs, zero-pill discipline */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {filters.map((filter) => {
              const isSelected = selectedFilter === filter;
              return (
                <button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  className={`px-3 py-1.5 text-xs font-mono rounded-md whitespace-nowrap transition-all duration-150 border ${
                    isSelected
                      ? 'bg-cyan-500/15 text-cyan-300 border-cyan-500/40 font-semibold'
                      : 'bg-white/[0.02] text-slate-400 border-white/[0.06] hover:bg-white/[0.05] hover:text-slate-200'
                  }`}
                  data-cursor="FILTER"
                >
                  {filter}
                </button>
              );
            })}
          </div>
        </div>

        {/* Projects List */}
        {filteredProjects.length > 0 ? (
          <div className="space-y-10">
            {filteredProjects.map((project, index) => (
              <FeaturedProjectCard
                key={project.id}
                project={project}
                index={index}
                onOpenModal={setSelectedModalProject}
              />
            ))}
          </div>
        ) : (
          <div className="p-12 text-center rounded-xl bg-white/[0.02] border border-white/[0.08]">
            <p className="text-sm font-mono text-slate-400">
              No engineering projects matched filter "{selectedFilter}" or query "{searchQuery}".
            </p>
            <button
              onClick={() => {
                setSelectedFilter('All');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-1.5 text-xs font-mono rounded bg-white/[0.06] text-slate-200 hover:bg-white/[0.1] border border-white/[0.1]"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Project Case Study Modal */}
        <ProjectModal
          project={selectedModalProject}
          onClose={() => setSelectedModalProject(null)}
        />
      </div>
    </section>
  );
};
