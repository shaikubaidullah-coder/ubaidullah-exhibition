import React, { useEffect, useState, useRef } from 'react';
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
  const touchStartX = useRef<number | null>(null);

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

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, projects.length]);

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartX.current = null;
  };

  if (!currentProject) return null;

  return (
    <div className="relative py-6 sm:py-14 max-w-5xl mx-auto px-4 sm:px-6">
      
      {/* Main Folio Book Spread */}
      <div 
        className="relative"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        
        {/* Desktop Side Navigation Chevrons (Hidden on mobile to prevent overlapping content) */}
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          aria-label="Previous work"
          className="tactile-interactive hidden sm:flex absolute -left-4 sm:-left-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/95 border border-[#242820]/12 shadow-folio items-center justify-center text-[#242820] hover:bg-stone-50 disabled:opacity-20 disabled:pointer-events-none transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        <button
          onClick={handleNext}
          disabled={currentIndex === projects.length - 1}
          aria-label="Next work"
          className="tactile-interactive hidden sm:flex absolute -right-4 sm:-right-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/95 border border-[#242820]/12 shadow-folio items-center justify-center text-[#242820] hover:bg-stone-50 disabled:opacity-20 disabled:pointer-events-none transition-all"
        >
          <ArrowRight className="w-4 h-4" />
        </button>

        {/* 2-Page Physical Spread Container */}
        <div 
          className={`relative rounded-2xl bg-white border border-[#242820]/10 shadow-folio overflow-hidden transition-all duration-200 ${
            isFlipping ? (flipDirection === 'next' ? 'opacity-85 translate-x-1' : 'opacity-85 -translate-x-1') : 'opacity-100 translate-x-0'
          }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 relative min-h-[460px] lg:min-h-[520px]">
            
            {/* Center Book Spine Crease (Desktop only) */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-8 -translate-x-1/2 book-spine-crease pointer-events-none z-20" />

            {/* LEFT PAGE: Quiet Artwork Presentation */}
            <div className="p-4 sm:p-8 lg:p-10 page-left-shadow flex flex-col justify-center bg-stone-50/40 relative">
              <a
                href={currentProject.productionUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative rounded-xl overflow-hidden border border-[#242820]/10 bg-[#242820]/5 shadow-sm aspect-[16/10] block"
              >
                <img
                  src={currentProject.thumbnail}
                  alt={currentProject.title}
                  loading="eager"
                  decoding="async"
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-[#242820] font-sans text-xs font-semibold shadow-md">
                    <span>Visit live site</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </a>
            </div>

            {/* RIGHT PAGE: Editorial Typography & Intent */}
            <div className="p-5 sm:p-8 lg:p-10 page-right-shadow flex flex-col justify-between bg-white relative">
              
              <div className="space-y-4 sm:space-y-5">
                
                {/* Category & Index Numeral */}
                <div className="flex items-baseline justify-between">
                  <span className="text-[11px] sm:text-xs font-mono text-[#5E6357] uppercase tracking-widest font-medium">
                    {currentProject.category}
                  </span>
                  <span className="text-xs font-mono text-[#8B9084] font-medium">
                    {currentProject.index} / {projects.length.toString().padStart(2, '0')}
                  </span>
                </div>

                {/* Title */}
                <div className="space-y-2 sm:space-y-3">
                  <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#242820] leading-tight">
                    {currentProject.title}
                  </h2>
                  
                  <p className="font-sans text-xs sm:text-base text-[#5E6357] leading-relaxed max-w-prose">
                    {currentProject.summary}
                  </p>
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {currentProject.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-0.5 rounded-full bg-stone-100 text-[11px] sm:text-xs font-mono text-[#242820]/80"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

              </div>

              {/* Actions Footer */}
              <div className="pt-4 sm:pt-6 mt-4 sm:mt-6 border-t border-[#242820]/8 flex items-center justify-between gap-3">
                <button
                  onClick={() => onOpenDrawer(currentProject)}
                  className="tactile-interactive text-xs font-sans text-[#5E6357] hover:text-[#242820] underline underline-offset-4"
                >
                  Read details
                </button>

                <div className="flex items-center gap-2">
                  {currentProject.repositoryUrl && !currentProject.isPrivateRepo && (
                    <a
                      href={currentProject.repositoryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="tactile-interactive p-2 rounded-lg border border-[#242820]/12 text-[#5E6357] hover:text-[#242820] transition-colors"
                      title="GitHub Repository"
                      aria-label="GitHub Repository"
                    >
                      <Github className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </a>
                  )}

                  <a
                    href={currentProject.productionUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tactile-interactive inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-full bg-[#242820] text-[#F3EFE3] hover:bg-black font-sans text-xs font-medium shadow-xs transition-colors"
                  >
                    <span>Visit site</span>
                    <ExternalLink className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  </a>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>

      {/* Pagination & Mobile Navigation Row */}
      <div className="mt-6 sm:mt-8 flex items-center justify-center gap-3 sm:gap-4">
        {/* Mobile Prev Button */}
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          aria-label="Previous work"
          className="sm:hidden tactile-interactive w-9 h-9 rounded-full bg-white border border-[#242820]/12 flex items-center justify-center text-[#242820] disabled:opacity-20 shadow-xs active:scale-95 transition-transform"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
        </button>

        {/* Folio Dots */}
        <div className="flex items-center gap-1.5">
          {projects.map((proj, idx) => (
            <button
              key={proj.id}
              onClick={() => onIndexChange(idx)}
              className={`tactile-interactive h-1.5 rounded-full transition-all ${
                idx === currentIndex
                  ? 'w-5 sm:w-6 bg-[#242820]'
                  : 'w-1.5 sm:w-2 bg-[#242820]/20 hover:bg-[#242820]/40'
              }`}
              title={proj.title}
              aria-label={`Jump to work ${idx + 1}`}
            />
          ))}
        </div>

        {/* Mobile Next Button */}
        <button
          onClick={handleNext}
          disabled={currentIndex === projects.length - 1}
          aria-label="Next work"
          className="sm:hidden tactile-interactive w-9 h-9 rounded-full bg-white border border-[#242820]/12 flex items-center justify-center text-[#242820] disabled:opacity-20 shadow-xs active:scale-95 transition-transform"
        >
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
};
