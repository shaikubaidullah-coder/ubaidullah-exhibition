import React, { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { Project } from '../data/projects';

interface MinimalIndexViewProps {
  projects: Project[];
  onOpenDrawer: (project: Project) => void;
}

export const MinimalIndexView: React.FC<MinimalIndexViewProps> = ({
  projects,
  onOpenDrawer,
}) => {
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    setCursorPos({ x: e.clientX, y: e.clientY });
  };

  return (
    <div 
      onMouseMove={handleMouseMove}
      className="py-6 sm:py-14 max-w-5xl mx-auto px-4 sm:px-6 relative"
    >
      {/* Floating Cursor Thumbnail (Desktop only) */}
      {hoveredProject && (
        <div
          className="pointer-events-none fixed z-50 hidden lg:block rounded-xl overflow-hidden shadow-cursor-preview border border-white/40 bg-stone-900 transition-opacity duration-150"
          style={{
            width: '240px',
            height: '150px',
            left: `${cursorPos.x + 24}px`,
            top: `${cursorPos.y - 75}px`,
          }}
        >
          <img
            src={hoveredProject.thumbnail}
            alt={hoveredProject.title}
            className="w-full h-full object-cover object-top"
          />
        </div>
      )}

      {/* Index Table Rows */}
      <div className="divide-y divide-[#242820]/10">
        {projects.map((project) => (
          <div
            key={project.id}
            onMouseEnter={() => setHoveredProject(project)}
            onMouseLeave={() => setHoveredProject(null)}
            className="group py-3.5 sm:py-5 flex items-center justify-between gap-3 sm:gap-4 transition-colors hover:bg-black/[0.02] px-2 rounded-lg"
          >
            {/* Index Numeral & Title */}
            <div className="flex items-center gap-3 sm:gap-6 min-w-0 flex-1">
              <span className="font-mono text-xs text-[#8B9084] group-hover:text-[#242820] font-medium shrink-0">
                {project.index}
              </span>

              <div className="min-w-0 flex-1">
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-0.5 sm:gap-2">
                  <h3 className="font-serif text-sm sm:text-xl font-bold text-[#242820] leading-snug group-hover:opacity-75 transition-opacity">
                    {project.title}
                  </h3>
                  <span className="text-[10px] font-mono text-[#8B9084] sm:hidden uppercase tracking-wider">
                    {project.category}
                  </span>
                </div>
                <p className="font-sans text-xs text-[#5E6357] truncate hidden sm:block">
                  {project.summary}
                </p>
              </div>
            </div>

            {/* Category (Tablet & Desktop) */}
            <div className="hidden md:block shrink-0 font-mono text-xs text-[#5E6357]">
              <span>{project.category}</span>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <button
                onClick={() => onOpenDrawer(project)}
                className="tactile-interactive text-xs font-sans text-[#5E6357] hover:text-[#242820] underline underline-offset-2 py-1 px-1.5"
              >
                Details
              </button>

              <a
                href={project.productionUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="tactile-interactive inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#242820] text-[#F3EFE3] hover:bg-black font-sans text-xs font-medium shadow-2xs"
                title={`Visit ${project.title}`}
              >
                <span>Visit</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
