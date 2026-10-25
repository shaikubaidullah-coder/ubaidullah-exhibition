import React, { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, ExternalLink, ArrowUpRight, Github } from 'lucide-react';
import { Project } from '../data/projects';

interface FolioSpreadViewProps {
  projects: Project[];
  currentIndex: number;
  onIndexChange: (idx: number) => void;
  onOpenDrawer: (project: Project) => void;
}

export const FolioSpreadView: React.FC<FolioSpreadViewProps> = ({
  projects,
  currentIndex,
  onIndexChange,
  onOpenDrawer,
}) => {
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState<'next' | 'prev'>('next');

  const currentProject = projects[currentIndex] || projects[0];

  const handleNext = () => {
    if (currentIndex < projects.length - 1) {
      setFlipDirection('next');
      setIsFlipping(true);
      setTimeout(() => {
        onIndexChange(currentIndex + 1);
        setIsFlipping(false);
      }, 160);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setFlipDirection('prev');
      setIsFlipping(true);
      setTimeout(() => {
        onIndexChange(currentIndex - 1);
        setIsFlipping(false);
      }, 160);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, projects.length]);

  if (!currentProject) return null;

  return (
    <div className="relative py-8 sm:py-14 max-w-5xl mx-auto px-4 sm:px-6">
      
      {/* Main Folio Book Spread */}
      <div className="relative">
        
        {/* Navigation Chevrons */}
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          aria-label="Previous work"
          className="tactile-interactive absolute -left-4 sm:-left-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/95 border border-[#0E1726]/12 shadow-folio flex items-center justify-center text-[#0E1726] hover:bg-stone-50 disabled:opacity-20 disabled:pointer-events-none transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        <button
          onClick={handleNext}
          disabled={currentIndex === projects.length - 1}
          aria-label="Next work"
          className="tactile-interactive absolute -right-4 sm:-right-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/95 border border-[#0E1726]/12 shadow-folio flex items-center justify-center text-[#0E1726] hover:bg-stone-50 disabled:opacity-20 disabled:pointer-events-none transition-all"
        >
          <ArrowRight className="w-4 h-4" />
        </button>

        {/* 2-Page Physical Spread Container */}
        <div 
          className={`relative rounded-2xl bg-white border border-[#0E1726]/10 shadow-folio overflow-hidden transition-all duration-200 ${
            isFlipping ? (flipDirection === 'next' ? 'opacity-85 translate-x-1' : 'opacity-85 -translate-x-1') : 'opacity-100 translate-x-0'
          }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 relative min-h-[480px] lg:min-h-[520px]">
            
            {/* Center Book Spine Crease */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-8 -translate-x-1/2 book-spine-crease pointer-events-none z-20" />

            {/* LEFT PAGE: Quiet Artwork Presentation */}
            <div className="p-6 sm:p-8 lg:p-10 page-left-shadow flex flex-col justify-center bg-stone-50/30 relative">
              <a
                href={currentProject.productionUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative rounded-xl overflow-hidden border border-[#0E1726]/10 bg-stone-900 shadow-sm aspect-[16/10] block"
              >
                <img
                  src={currentProject.thumbnail}
                  alt={currentProject.title}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-[#0E1726] font-sans text-xs font-semibold shadow-md">
                    <span>Visit live site</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </a>
            </div>

            {/* RIGHT PAGE: Editorial Typography & Intent */}
            <div className="p-6 sm:p-8 lg:p-10 page-right-shadow flex flex-col justify-between bg-white relative">
              
              <div className="space-y-5">
                
                {/* Clean Category & Index Numeral */}
                <div className="flex items-baseline justify-between">
                  <span className="text-xs font-mono text-[#0E1726]/50 uppercase tracking-widest">
                    {currentProject.category}
                  </span>
                  <span className="text-xs font-mono text-[#0E1726]/40">
                    {currentProject.index} / {projects.length.toString().padStart(2, '0')}
                  </span>
                </div>

                {/* Title */}
                <div className="space-y-3">
                  <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0E1726] leading-tight">
                    {currentProject.title}
                  </h2>
                  
                  <p className="font-sans text-sm sm:text-base text-[#0E1726]/80 leading-relaxed max-w-prose">
                    {currentProject.summary}
                  </p>
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {currentProject.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-0.5 rounded-full bg-stone-100 text-xs font-mono text-[#0E1726]/75"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

              </div>

              {/* Actions Footer */}
              <div className="pt-6 mt-6 border-t border-[#0E1726]/8 flex items-center justify-between gap-3">
                <button
                  onClick={() => onOpenDrawer(currentProject)}
                  className="tactile-interactive text-xs font-sans text-[#0E1726]/70 hover:text-[#0E1726] underline underline-offset-4"
                >
                  Read details
                </button>

                <div className="flex items-center gap-2">
                  {currentProject.repositoryUrl && !currentProject.isPrivateRepo && (
                    <a
                      href={currentProject.repositoryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="tactile-interactive p-2 rounded-lg border border-[#0E1726]/12 text-[#0E1726]/70 hover:text-[#0E1726] transition-colors"
                      title="GitHub Repository"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}

                  <a
                    href={currentProject.productionUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tactile-interactive inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#0E1726] text-white hover:bg-black font-sans text-xs font-medium shadow-xs transition-colors"
                  >
                    <span>Visit site</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>

      {/* Folio Dots Pagination */}
      <div className="mt-8 flex items-center justify-center gap-2">
        {projects.map((proj, idx) => (
          <button
            key={proj.id}
            onClick={() => onIndexChange(idx)}
            className={`tactile-interactive h-1.5 rounded-full transition-all ${
              idx === currentIndex
                ? 'w-6 bg-[#0E1726]'
                : 'w-2 bg-[#0E1726]/20 hover:bg-[#0E1726]/40'
            }`}
            title={proj.title}
          />
        ))}
      </div>

    </div>
  );
};
