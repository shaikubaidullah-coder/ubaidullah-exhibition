import React, { useEffect } from 'react';
import { X, ExternalLink, Github, Lock } from 'lucide-react';
import { Project } from '../data/projects';

interface ProjectDrawerProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectDrawer: React.FC<ProjectDrawerProps> = ({
  project,
  onClose,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Details for ${project.title}`}
      className="fixed inset-0 z-50 overflow-hidden bg-black/40 backdrop-blur-xs flex justify-end"
    >
      <div 
        className="relative w-full max-w-lg bg-white h-full shadow-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-200 border-l border-[#0E1726]/10"
      >
        {/* Drawer Header */}
        <div className="p-5 sm:p-6 border-b border-[#0E1726]/8 flex items-center justify-between">
          <span className="text-xs font-mono text-[#0E1726]/50 uppercase tracking-widest">
            {project.category}
          </span>

          <button
            onClick={onClose}
            aria-label="Close"
            className="tactile-interactive w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-[#0E1726]/70 hover:text-[#0E1726] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="p-5 sm:p-8 space-y-6 flex-1">
          
          {/* Specimen Preview */}
          <div className="rounded-xl overflow-hidden border border-[#0E1726]/10 bg-[#242820]/5 aspect-[16/10] shadow-xs">
            <img
              src={project.thumbnail}
              alt={project.title}
              className="w-full h-full object-cover object-top"
            />
          </div>

          {/* Title & Core Intent */}
          <div className="space-y-2">
            <h2 className="font-serif text-3xl font-bold text-[#0E1726] tracking-tight">
              {project.title}
            </h2>
            <p className="font-sans text-sm text-[#0E1726]/80 leading-relaxed">
              {project.summary}
            </p>
          </div>

          {/* Narrative context */}
          <div className="space-y-2 pt-2 border-t border-[#0E1726]/8">
            <p className="font-sans text-xs sm:text-sm text-[#0E1726]/70 leading-relaxed">
              {project.narrative}
            </p>
          </div>

          {/* Stack */}
          <div className="pt-2 border-t border-[#0E1726]/8 space-y-2">
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-full bg-stone-100 text-xs font-mono text-[#0E1726]/75"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Drawer Actions Footer */}
        <div className="p-6 border-t border-[#0E1726]/8 bg-stone-50/40 flex items-center justify-between gap-3">
          {project.isPrivateRepo ? (
            <span className="inline-flex items-center gap-1.5 text-xs font-mono text-[#0E1726]/50">
              <Lock className="w-3.5 h-3.5" />
              <span>Private repository</span>
            </span>
          ) : (
            <a
              href={project.repositoryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="tactile-interactive inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[#0E1726]/15 hover:border-[#0E1726] text-xs font-sans text-[#0E1726] transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              <span>Source code</span>
            </a>
          )}

          <a
            href={project.productionUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="tactile-interactive inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#0E1726] text-white hover:bg-black text-xs font-sans font-medium shadow-xs transition-colors"
          >
            <span>Visit site</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </div>
  );
};
