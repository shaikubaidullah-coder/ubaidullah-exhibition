import React from 'react';
import { ExternalLink } from 'lucide-react';
import { Project } from '../data/projects';

interface SpatialWallViewProps {
  projects: Project[];
  onOpenDrawer: (project: Project) => void;
}

export const SpatialWallView: React.FC<SpatialWallViewProps> = ({
  projects,
  onOpenDrawer,
}) => {
  return (
    <div className="py-8 sm:py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Clean Unboxed Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
        {projects.map((project) => (
          <article
            key={project.id}
            className="group flex flex-col justify-between space-y-4"
          >
            {/* Project Artwork */}
            <a
              href={project.productionUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative rounded-xl overflow-hidden bg-stone-900 border border-[#0E1726]/10 aspect-[16/10] shadow-xs transition-all duration-300 group-hover:shadow-md block"
            >
              <img
                src={project.thumbnail}
                alt={project.title}
                loading="lazy"
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white text-[#0E1726] text-xs font-sans font-medium shadow-md">
                  <span>Visit site</span>
                  <ExternalLink className="w-3 h-3" />
                </span>
              </div>
            </a>

            {/* Typography */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-[#0E1726]/50">
                <span className="uppercase tracking-wider">{project.category}</span>
                <span>{project.index}</span>
              </div>

              <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#0E1726] tracking-tight group-hover:opacity-80 transition-opacity">
                {project.title}
              </h3>

              <p className="font-sans text-xs sm:text-sm text-[#0E1726]/75 line-clamp-2 leading-relaxed">
                {project.summary}
              </p>
            </div>

            {/* Bottom Actions & Tags */}
            <div className="pt-2 border-t border-[#0E1726]/6 flex items-center justify-between">
              <div className="flex flex-wrap gap-1">
                {project.technologies.slice(0, 3).map((tech) => (
                  <span
                    key={tech}
                    className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-stone-100 text-[#0E1726]/70"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <button
                onClick={() => onOpenDrawer(project)}
                className="tactile-interactive text-xs font-sans text-[#0E1726]/60 hover:text-[#0E1726] underline underline-offset-2"
              >
                Details
              </button>
            </div>

          </article>
        ))}
      </div>

    </div>
  );
};
