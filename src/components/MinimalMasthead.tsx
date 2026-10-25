import React from 'react';
import { Search, X } from 'lucide-react';
import { BrandGlyph } from './BrandGlyph';

export type ViewMode = 'folio' | 'spatial' | 'index';

interface MinimalMastheadProps {
  currentMode: ViewMode;
  onModeChange: (mode: ViewMode) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  totalProjects: number;
}

export const MinimalMasthead: React.FC<MinimalMastheadProps> = ({
  currentMode,
  onModeChange,
  searchQuery,
  onSearchChange,
  totalProjects,
}) => {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7EE]/95 backdrop-blur-md border-b border-[#242820]/10 transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Main Header Bar */}
        <div className="h-14 sm:h-16 flex items-center justify-between gap-3">
          
          {/* Brand Wordmark & Glyph */}
          <div className="flex items-center shrink-0">
            <a href="#" className="flex items-center gap-2 hover:opacity-85 transition-opacity group">
              <span className="text-[#242820]">
                <BrandGlyph size={20} />
              </span>
              <div className="flex flex-col">
                <span className="font-serif font-bold text-base sm:text-xl text-[#242820] tracking-tight leading-tight">
                  Shaik Ubaidullah
                </span>
                <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-[#5E6357] hidden md:block">
                  Systems &amp; Web Builder
                </span>
              </div>
            </a>
          </div>

          {/* Desktop Center: Segmented Pill Switcher */}
          <nav
            aria-label="Exhibition view modes (Desktop)"
            className="hidden sm:flex items-center p-1 rounded-full bg-[#242820]/5 border border-[#242820]/10 shadow-[inset_0_1px_2px_rgba(0,0,0,0.03)]"
          >
            {/* Folio */}
            <button
              onClick={() => onModeChange('folio')}
              className={`tactile-interactive flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-sans transition-all ${
                currentMode === 'folio'
                  ? 'bg-white text-[#242820] font-semibold shadow-[0_1px_3px_rgba(0,0,0,0.08),0_1px_1px_rgba(0,0,0,0.04)]'
                  : 'text-[#242820]/65 hover:text-[#242820] hover:bg-black/5 font-medium'
              }`}
              title="Folio: Interactive dual-page physical book view"
              aria-pressed={currentMode === 'folio'}
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={currentMode === 'folio' ? 'text-[#242820]' : 'text-[#242820]/60'}
              >
                <path d="M2 3h5a2 2 0 0 1 2 2v9a2 2 0 0 0-2-2H2z" />
                <path d="M14 3H9a2 2 0 0 0-2 2v9a2 2 0 0 1 2-2h5z" />
              </svg>
              <span>Folio</span>
            </button>

            {/* Spatial */}
            <button
              onClick={() => onModeChange('spatial')}
              className={`tactile-interactive flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-sans transition-all ${
                currentMode === 'spatial'
                  ? 'bg-white text-[#242820] font-semibold shadow-[0_1px_3px_rgba(0,0,0,0.08),0_1px_1px_rgba(0,0,0,0.04)]'
                  : 'text-[#242820]/65 hover:text-[#242820] hover:bg-black/5 font-medium'
              }`}
              title="Spatial: Edge-to-edge unboxed masonry gallery"
              aria-pressed={currentMode === 'spatial'}
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={currentMode === 'spatial' ? 'text-[#242820]' : 'text-[#242820]/60'}
              >
                <rect x="2" y="2" width="5" height="5" rx="1" />
                <rect x="9" y="2" width="5" height="5" rx="1" />
                <rect x="2" y="9" width="5" height="5" rx="1" />
                <rect x="9" y="9" width="5" height="5" rx="1" />
              </svg>
              <span>Spatial</span>
            </button>

            {/* Index */}
            <button
              onClick={() => onModeChange('index')}
              className={`tactile-interactive flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-sans transition-all ${
                currentMode === 'index'
                  ? 'bg-white text-[#242820] font-semibold shadow-[0_1px_3px_rgba(0,0,0,0.08),0_1px_1px_rgba(0,0,0,0.04)]'
                  : 'text-[#242820]/65 hover:text-[#242820] hover:bg-black/5 font-medium'
              }`}
              title="Index: Typographic catalog with floating live hover preview"
              aria-pressed={currentMode === 'index'}
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={currentMode === 'index' ? 'text-[#242820]' : 'text-[#242820]/60'}
              >
                <line x1="6" y1="4" x2="14" y2="4" />
                <line x1="6" y1="8" x2="14" y2="8" />
                <line x1="6" y1="12" x2="14" y2="12" />
                <circle cx="3" cy="4" r="0.75" fill="currentColor" />
                <circle cx="3" cy="8" r="0.75" fill="currentColor" />
                <circle cx="3" cy="12" r="0.75" fill="currentColor" />
              </svg>
              <span>Index</span>
            </button>
          </nav>

          {/* Right Actions: Search & Contact */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            
            {/* Desktop Search */}
            <div className="relative hidden md:block">
              <Search className="w-3.5 h-3.5 text-[#8B9084] absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder={`Search ${totalProjects} works...`}
                className="w-32 lg:w-44 pl-8 pr-7 py-1.5 text-xs font-sans rounded-full bg-white border border-[#242820]/15 focus:outline-none focus:ring-1 focus:ring-[#242820] focus:w-48 transition-all placeholder:text-[#8B9084]"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-[#8B9084] hover:text-[#242820]"
                  aria-label="Clear search"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Jump to Contact (Signature Sage Pill) */}
            <button
              onClick={scrollToContact}
              className="tactile-interactive inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-full bg-[#D2DCB4] hover:bg-[#C4D0A0] text-[#263319] text-xs font-semibold shadow-xs transition-all border border-[#263319]/12 active:translate-y-0 hover:-translate-y-0.5"
            >
              <BrandGlyph size={12} className="text-[#263319]" />
              <span>Say hello</span>
            </button>

          </div>

        </div>

        {/* Mobile View Switcher Bar (Row 2 on phones) */}
        <div className="sm:hidden pb-2.5 pt-0.5 flex items-center justify-center">
          <nav
            aria-label="Exhibition view modes (Mobile)"
            className="flex items-center p-1 rounded-full bg-[#242820]/5 border border-[#242820]/10 shadow-[inset_0_1px_2px_rgba(0,0,0,0.03)] w-full max-w-xs justify-between"
          >
            {/* Mobile Folio */}
            <button
              onClick={() => onModeChange('folio')}
              className={`tactile-interactive flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-full text-xs font-sans transition-all ${
                currentMode === 'folio'
                  ? 'bg-white text-[#242820] font-semibold shadow-[0_1px_3px_rgba(0,0,0,0.08)]'
                  : 'text-[#242820]/65 hover:text-[#242820] font-medium'
              }`}
              aria-pressed={currentMode === 'folio'}
            >
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M2 3h5a2 2 0 0 1 2 2v9a2 2 0 0 0-2-2H2z" />
                <path d="M14 3H9a2 2 0 0 0-2 2v9a2 2 0 0 1 2-2h5z" />
              </svg>
              <span>Folio</span>
            </button>

            {/* Mobile Spatial */}
            <button
              onClick={() => onModeChange('spatial')}
              className={`tactile-interactive flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-full text-xs font-sans transition-all ${
                currentMode === 'spatial'
                  ? 'bg-white text-[#242820] font-semibold shadow-[0_1px_3px_rgba(0,0,0,0.08)]'
                  : 'text-[#242820]/65 hover:text-[#242820] font-medium'
              }`}
              aria-pressed={currentMode === 'spatial'}
            >
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6">
                <rect x="2" y="2" width="5" height="5" rx="1" />
                <rect x="9" y="2" width="5" height="5" rx="1" />
                <rect x="2" y="9" width="5" height="5" rx="1" />
                <rect x="9" y="9" width="5" height="5" rx="1" />
              </svg>
              <span>Spatial</span>
            </button>

            {/* Mobile Index */}
            <button
              onClick={() => onModeChange('index')}
              className={`tactile-interactive flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-full text-xs font-sans transition-all ${
                currentMode === 'index'
                  ? 'bg-white text-[#242820] font-semibold shadow-[0_1px_3px_rgba(0,0,0,0.08)]'
                  : 'text-[#242820]/65 hover:text-[#242820] font-medium'
              }`}
              aria-pressed={currentMode === 'index'}
            >
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6">
                <line x1="6" y1="4" x2="14" y2="4" />
                <line x1="6" y1="8" x2="14" y2="8" />
                <line x1="6" y1="12" x2="14" y2="12" />
                <circle cx="3" cy="4" r="0.75" fill="currentColor" />
                <circle cx="3" cy="8" r="0.75" fill="currentColor" />
                <circle cx="3" cy="12" r="0.75" fill="currentColor" />
              </svg>
              <span>Index</span>
            </button>
          </nav>
        </div>

      </div>
    </header>
  );
};
