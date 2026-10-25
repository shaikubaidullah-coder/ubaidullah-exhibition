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
      className="py-8 sm:py-14 max-w-5xl mx-auto px-4 sm:px-6 relative"
    >
      {/* Floating Cursor Thumbnail */}
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
      <div className="divide-y divide-[#0E1726]/8">
        {projects.map((project) => (
          <div
            key={project.id}
            onMouseEnter={() => setHoveredProject(project)}
            onMouseLeave={() => setHoveredProject(null)}
            className="group py-4 sm:py-5 flex items-center justify-between gap-4 transition-colors hover:bg-black/[0.02] px-2 rounded-lg"
          >
            {/* Index Numeral & Title */}
            <div className="flex items-center gap-4 sm:gap-6 min-w-0">
              <span className="font-mono text-xs text-[#0E1726]/40 group-hover:text-[#0E1726]">
                {project.index}
              </span>

              <div className="truncate">
                <h3 className="font-serif text-lg sm:text-xl font-bold text-[#0E1726] truncate group-hover:opacity-75 transition-opacity">
                  {project.title}
                </h3>
                <p className="font-sans text-xs text-[#0E1726]/60 truncate hidden sm:block">
                  {project.summary}
                </p>
              </div>
            </div>

            {/* Category */}
            <div className="hidden md:block shrink-0 font-mono text-xs text-[#0E1726]/50">
              <span>{project.category}</span>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => onOpenDrawer(project)}
                className="tactile-interactive text-xs font-sans text-[#0E1726]/60 hover:text-[#0E1726] underline underline-offset-2"
              >
                Details
              </button>

              <a
                href={project.productionUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="tactile-interactive inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#0E1726] text-white hover:bg-black font-sans text-xs font-medium shadow-2xs"
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
