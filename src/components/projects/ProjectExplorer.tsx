import React, { useState, useMemo, useCallback } from 'react';
import { projectsData } from '../../data/projects';
import { Project } from '../../types/portfolio';
import { FeaturedProjectCard } from './FeaturedProjectCard';
import { ProjectModal } from './ProjectModal';
import { Section } from '../layout/Section';
import { LayoutGrid } from 'lucide-react';
import { domainIcon } from './projectIcons';

const filters = ['All', 'Backend', 'Full Stack', 'Microservices', 'AI', 'FinTech', 'SaaS', 'Mobile', 'Enterprise'];

const matchesFilter = (project: Project, filter: string) =>
  filter === 'All' || project.category === filter || project.tags.includes(filter);

export const ProjectExplorer: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedModalProject, setSelectedModalProject] = useState<Project | null>(null);

  const filteredProjects = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    return projectsData.filter((project) => {
      const matchesSearch =
        !query ||
        project.title.toLowerCase().includes(query) ||
        project.subtitle.toLowerCase().includes(query) ||
        project.technologies.some((t) => t.toLowerCase().includes(query)) ||
        project.summary.toLowerCase().includes(query) ||
        project.problem.toLowerCase().includes(query);
      return matchesFilter(project, selectedFilter) && matchesSearch;
    });
  }, [selectedFilter, searchQuery]);

  const closeModal = useCallback(() => setSelectedModalProject(null), []);

  const featured = filteredProjects.filter((p) => p.featured);
  const others = filteredProjects.filter((p) => !p.featured);

  const resetFilters = () => {
    setSelectedFilter('All');
    setSearchQuery('');
  };

  return (
    <Section
      id="projects"
      index="01"
      label="Selected work"
      title={
        <>
          Case studies from <em>production</em>, not side projects.
        </>
      }
      intro="Each one is a system I shipped with a real constraint behind it: webhook retries that must not double-credit, ride dispatch under concurrent bookings, AI that must not invent hotel rates."
    >
      {/* Filters */}
      <div className="flex flex-col gap-5 border-b border-line pb-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="-mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0" role="group" aria-label="Filter projects by domain">
          <div className="flex gap-2 whitespace-nowrap text-sm sm:flex-wrap">
            {filters.map((filter) => {
              const count = projectsData.filter((p) => matchesFilter(p, filter)).length;
              if (count === 0) return null;
              const isSelected = selectedFilter === filter;
              const Icon = domainIcon[filter];
              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setSelectedFilter(filter)}
                  aria-pressed={isSelected}
                  className={`group inline-flex items-center gap-1.5 rounded-full border py-1 pr-3 pl-1 transition-all duration-300 ${
                    isSelected
                      ? 'border-accent/60 bg-tint text-ink shadow-[0_6px_20px_-12px_var(--color-accent)]'
                      : 'border-line bg-raised/60 text-muted hover:border-line-strong hover:text-ink'
                  }`}
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-bg">
                    {Icon ? (
                      <Icon className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-px" />
                    ) : (
                      <LayoutGrid className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                    )}
                  </span>
                  {filter}
                  <span className={`font-mono text-[10px] ${isSelected ? 'text-accent' : 'text-faint'}`}>{count}</span>
                </button>
              );
            })}
          </div>
        </div>

        <label className="flex items-center gap-3 border-b border-line-strong pb-1.5 transition-colors focus-within:border-accent lg:w-72">
          <span className="font-mono text-xs text-faint">find</span>
          <input
            type="search"
            placeholder="gRPC, Razorpay, Redis…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent text-sm text-ink placeholder:text-faint focus:outline-none"
          />
        </label>
      </div>

      <p className="mt-4 font-mono text-xs text-faint" aria-live="polite">
        {filteredProjects.length} of {projectsData.length} projects
      </p>

      {filteredProjects.length === 0 ? (
        <div className="py-16">
          <p className="text-body">
            Nothing matches{searchQuery && <> “{searchQuery}”</>}
            {selectedFilter !== 'All' && <> in {selectedFilter}</>}.
          </p>
          <button type="button" onClick={resetFilters} className="link mt-3 text-sm">
            Clear filters
          </button>
        </div>
      ) : (
        <>
          {featured.length > 0 && (
            <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
              {featured.map((project, index) => (
                <FeaturedProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  wide={index === 0 || (featured.length % 2 === 0 && index === featured.length - 1)}
                  onOpenModal={setSelectedModalProject}
                />
              ))}
            </div>
          )}

          {others.length > 0 && (
            <div className="mt-16 grid grid-cols-1 gap-y-6 lg:grid-cols-12 lg:gap-x-8">
              <h3 className="eyebrow lg:col-span-3 lg:pt-5">Also built</h3>
              <ul className="border-t border-line lg:col-span-9">
                {others.map((project) => (
                  <li key={project.id} className="border-b border-line">
                    <button
                      type="button"
                      onClick={() => setSelectedModalProject(project)}
                      className="group grid w-full grid-cols-[1fr_auto] items-baseline gap-x-6 gap-y-1 py-5 text-left sm:grid-cols-[10rem_1fr_auto]"
                    >
                      <span className="font-serif text-2xl text-ink">{project.title}</span>
                      <span className="order-3 col-span-2 text-sm text-muted sm:order-none sm:col-span-1">
                        {project.subtitle}
                      </span>
                      <span className="flex items-center gap-3 font-mono text-xs text-faint">
                        {project.year}
                        <span className="text-accent transition-transform group-hover:translate-x-1" aria-hidden="true">
                          →
                        </span>
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}

      <ProjectModal project={selectedModalProject} onClose={closeModal} />
    </Section>
  );
};
