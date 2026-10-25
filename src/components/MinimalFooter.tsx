import React from 'react';
import { ArrowUp, ArrowUpRight } from 'lucide-react';
import { BrandGlyph } from './BrandGlyph';

export const MinimalFooter: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const email = 'shaikubaidullah689@gmail.com';
  const linkedin = 'https://www.linkedin.com/in/shaik-ubaidullah-610284394/';
  const github = 'https://github.com/shaikubaidullah-coder';

  return (
    <footer className="border-t border-[#242820]/10 py-6 sm:py-8 pb-20 sm:pb-8 bg-[#FAF7EE] text-xs font-mono text-[#5E6357]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        
        {/* Left: Author & Statement */}
        <div className="flex items-center gap-2">
          <BrandGlyph size={14} className="text-[#242820]" />
          <span className="font-serif font-bold text-sm text-[#242820]">
            Shaik Ubaidullah
          </span>
          <span>•</span>
          <span className="text-[#8B9084]">2026 Archive</span>
        </div>

        {/* Center: Scroll to top */}
        <button
          onClick={scrollToTop}
          className="tactile-interactive inline-flex items-center gap-1.5 text-[#5E6357] hover:text-[#242820] transition-colors py-1 px-2 rounded-md hover:bg-black/5"
        >
          <span>Back to top</span>
          <ArrowUp className="w-3 h-3" />
        </button>

        {/* Right: Quick Links */}
        <div className="flex items-center gap-4 sm:gap-5 text-xs font-sans">
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#5E6357] hover:text-[#242820] inline-flex items-center gap-1 transition-colors py-1"
          >
            <span>LinkedIn</span>
            <ArrowUpRight className="w-3 h-3 text-[#8B9084]" />
          </a>

          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#5E6357] hover:text-[#242820] inline-flex items-center gap-1 transition-colors py-1"
          >
            <span>GitHub</span>
            <ArrowUpRight className="w-3 h-3 text-[#8B9084]" />
          </a>

          <a
            href={`mailto:${email}`}
            className="text-[#5E6357] hover:text-[#242820] inline-flex items-center gap-1 transition-colors py-1"
          >
            <span>Email</span>
            <ArrowUpRight className="w-3 h-3 text-[#8B9084]" />
          </a>
        </div>

      </div>
    </footer>
  );
};
