import React, { useEffect, useState, useRef } from 'react';
import { ArrowLeft, ArrowRight, ExternalLink, Github } from 'lucide-react';
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
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const currentProject = projects[currentIndex] || projects[0];

  const handleNext = () => {
    if (currentIndex < projects.length - 1) {
      setIsFlipping(true);
      setTimeout(() => {
        onIndexChange(currentIndex + 1);
        setIsFlipping(false);
      }, 150);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setIsFlipping(true);
      setTimeout(() => {
        onIndexChange(currentIndex - 1);
        setIsFlipping(false);
      }, 150);
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

  // Touch swipe support with vertical scroll rejection to prevent accidental flips
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const diffX = touchStartX.current - touchEndX;
    const diffY = touchStartY.current - touchEndY;

    // Only trigger horizontal flip if horizontal delta dominates vertical delta
    if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY) * 1.4) {
      if (diffX > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  if (!currentProject) return null;

  return (
    <div className="relative py-6 sm:py-12 max-w-6xl mx-auto px-4 sm:px-12 lg:px-16 w-full">
      
      {/* Main Folio Book Spread Container */}
      <div 
        className="relative"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        
        {/* Desktop Side Navigation Chevrons — Gutter positioned with ample clearance to avoid touching */}
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          aria-label="Previous work"
          className="tactile-interactive hidden md:flex absolute -left-5 lg:-left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white/95 border border-[#242820]/12 shadow-folio items-center justify-center text-[#242820] hover:bg-stone-50 disabled:opacity-20 disabled:pointer-events-none transition-all active:scale-95 shrink-0"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        <button
          onClick={handleNext}
          disabled={currentIndex === projects.length - 1}
          aria-label="Next work"
          className="tactile-interactive hidden md:flex absolute -right-5 lg:-right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white/95 border border-[#242820]/12 shadow-folio items-center justify-center text-[#242820] hover:bg-stone-50 disabled:opacity-20 disabled:pointer-events-none transition-all active:scale-95 shrink-0"
        >
          <ArrowRight className="w-4 h-4" />
        </button>

        {/* 2-Page Physical Spread Container with Zero-Displacement Settle Animation */}
        <div 
          className={`relative rounded-2xl bg-white border border-[#242820]/10 shadow-folio overflow-hidden transition-all duration-200 ${
            isFlipping ? 'opacity-80 scale-[0.993]' : 'opacity-100 scale-100'
          }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 relative min-h-[460px] lg:min-h-[520px]">
            
            {/* Center Book Spine Crease (Desktop only) */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-8 -translate-x-1/2 book-spine-crease pointer-events-none z-20" />

            {/* LEFT PAGE: Quiet Artwork Presentation with Safe Touch Target */}
            <div className="p-4 sm:p-7 lg:p-9 page-left-shadow flex flex-col justify-center bg-stone-50/40 relative">
              <div
                onClick={() => onOpenDrawer(currentProject)}
                className="group relative rounded-xl overflow-hidden border border-[#242820]/10 bg-[#242820]/5 shadow-sm aspect-[16/10] block cursor-pointer select-none"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onOpenDrawer(currentProject); }}
                aria-label={`Inspect ${currentProject.title} details`}
              >
                <img
                  src={currentProject.thumbnail}
                  alt={currentProject.title}
                  loading="eager"
                  decoding="async"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.style.display = 'none';
                    const fallback = target.nextElementSibling as HTMLElement | null;
                    if (fallback) fallback.style.display = 'flex';
                  }}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105 pointer-events-none"
                />

                {/* Graceful image error fallback card */}
                <div 
                  style={{ display: 'none' }}
                  className="absolute inset-0 flex-col items-center justify-center p-6 text-center bg-stone-100"
                >
                  <span className="font-serif font-bold text-xl text-[#242820]">{currentProject.title}</span>
                  <span className="text-xs font-mono text-[#5E6357] mt-1.5 uppercase tracking-wider">{currentProject.category}</span>
                </div>

                {/* Hover overlay hint */}
                <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-[#242820] font-sans text-xs font-semibold shadow-md">
                    <span>Inspect details</span>
                  </span>
                </div>
              </div>
            </div>

            {/* RIGHT PAGE: Editorial Typography & Intent */}
            <div className="p-5 sm:p-7 lg:p-9 page-right-shadow flex flex-col justify-between bg-white relative">
              
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
                    className="tactile-interactive inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-full bg-[#242820] text-[#F3EFE3] hover:bg-black font-sans text-xs font-medium shadow-xs transition-colors shrink-0"
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
      <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Mobile Prev Button */}
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            aria-label="Previous work"
            className="md:hidden tactile-interactive w-9 h-9 rounded-full bg-white border border-[#242820]/12 flex items-center justify-center text-[#242820] disabled:opacity-20 shadow-xs active:scale-95 transition-transform shrink-0"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
          </button>

          {/* Folio Dots Container */}
          <div className="flex items-center gap-1 sm:gap-1.5 px-2 py-1 max-w-[280px] sm:max-w-none overflow-x-auto scrollbar-none">
            {projects.map((proj, idx) => (
              <button
                key={proj.id}
                onClick={() => onIndexChange(idx)}
                className={`tactile-interactive h-1.5 rounded-full transition-all shrink-0 ${
                  idx === currentIndex
                    ? 'w-5 sm:w-6 bg-[#242820]'
                    : 'w-1.5 sm:w-2 bg-[#242820]/20 hover:bg-[#242820]/40'
                }`}
                title={`${proj.index} — ${proj.title}`}
                aria-label={`Jump to work ${idx + 1}`}
              />
            ))}
          </div>

          {/* Mobile Next Button */}
          <button
            onClick={handleNext}
            disabled={currentIndex === projects.length - 1}
            aria-label="Next work"
            className="md:hidden tactile-interactive w-9 h-9 rounded-full bg-white border border-[#242820]/12 flex items-center justify-center text-[#242820] disabled:opacity-20 shadow-xs active:scale-95 transition-transform shrink-0"
          >
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Tactile Mobile Index Indicator */}
        <span className="text-[11px] font-mono text-[#8B9084] md:hidden">
          {currentProject.index} / {projects.length.toString().padStart(2, '0')}
        </span>
      </div>

    </div>
  );
};
