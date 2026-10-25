import React, { useState } from 'react';
import { Copy, Check, ArrowUpRight } from 'lucide-react';
import { BrandGlyph } from './BrandGlyph';

export const LetterContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [sent, setSent] = useState(false);
  const [message, setMessage] = useState('');

  const email = 'shaikubaidullah689@gmail.com';
  const linkedin = 'https://www.linkedin.com/in/shaik-ubaidullah-610284394/';
  const github = 'https://github.com/shaikubaidullah-coder';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePostLetter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    setSent(true);
    const subject = encodeURIComponent('Inquiry from Website Showcase');
    const body = encodeURIComponent(message);
    setTimeout(() => {
      window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    }, 500);
  };

  return (
    <section
      id="contact"
      className="border-t border-[#242820]/10 py-12 sm:py-16 bg-[#FAF7EE] text-[#242820]"
      aria-labelledby="contact-heading"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Compact, Unpretentious Letter Card */}
        <div className="rounded-2xl bg-white border-[1.5px] border-[#242820]/15 p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.03)] space-y-6">
          
          {/* Header Row: Title & Direct Email Pill */}
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 pb-5 border-b border-[#242820]/8">
            <div className="space-y-1">
              <div className="flex items-center gap-2.5">
                <span className="text-[#242820]">
                  <BrandGlyph size={20} />
                </span>
                <h2
                  id="contact-heading"
                  className="font-serif text-2xl sm:text-3xl font-medium tracking-tight text-[#242820]"
                >
                  Send a letter
                </h2>
              </div>
              <p className="font-sans text-xs sm:text-sm text-[#5E6357]">
                Open for creative engineering, automation architecture, and web projects.
              </p>
            </div>

            {/* Direct Email with 1-Click Copy */}
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <a
                href={`mailto:${email}`}
                className="font-mono text-xs font-semibold text-[#242820] hover:text-[#3B5F19] underline underline-offset-3 transition-colors"
              >
                {email}
              </a>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="tactile-interactive p-1.5 rounded-full bg-[#FAF7EE] hover:bg-stone-200 text-[#5E6357] hover:text-[#242820] transition-colors border border-[#242820]/10"
                title="Copy email address"
                aria-label="Copy email address"
              >
                {copied ? (
                  <Check className="w-3.5 h-3.5 text-emerald-700" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
              {copied && (
                <span className="text-xs text-emerald-700 font-mono font-medium">
                  Copied!
                </span>
              )}
            </div>
          </div>

          {/* Form / Note Dispatch */}
          {sent ? (
            <div className="py-6 text-center space-y-2">
              <div className="inline-flex p-2 rounded-full bg-emerald-50 text-emerald-700 mb-1 border border-emerald-200">
                <Check className="w-4 h-4" />
              </div>
              <h3 className="font-serif text-lg font-medium text-[#242820]">
                Letter prepared.
              </h3>
              <p className="font-sans text-xs text-[#5E6357]">
                Opening your email client to dispatch to {email}
              </p>
            </div>
          ) : (
            <form onSubmit={handlePostLetter} className="space-y-4">
              <div className="relative">
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write your note, question, or project brief here..."
                  className="w-full px-4 py-3 rounded-xl bg-[#FAF7EE]/70 border border-[#242820]/15 text-sm font-sans text-[#242820] focus:bg-white focus:outline-none focus:border-[#242820] focus:ring-2 focus:ring-[#242820]/10 placeholder:text-[#8B9084] resize-none transition-all"
                  required
                />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                {/* Social & Location Links */}
                <div className="flex items-center gap-4 text-xs font-sans text-[#5E6357]">
                  <a
                    href={linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 hover:text-[#242820] transition-colors"
                  >
                    <span>LinkedIn</span>
                    <ArrowUpRight className="w-3 h-3 text-[#8B9084]" />
                  </a>

                  <a
                    href={github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 hover:text-[#242820] transition-colors"
                  >
                    <span>GitHub</span>
                    <ArrowUpRight className="w-3 h-3 text-[#8B9084]" />
                  </a>

                  <span className="hidden sm:inline text-[#8B9084]">•</span>
                  <span className="hidden sm:inline text-[#8B9084]">Andhra Pradesh, India</span>
                </div>

                {/* Signature Sage Green Pill Button */}
                <button
                  type="submit"
                  className="tactile-interactive inline-flex items-center justify-center gap-2 px-5 py-2 rounded-full bg-[#D2DCB4] hover:bg-[#C4D0A0] text-[#263319] font-sans text-xs font-semibold shadow-[0_1px_2px_rgba(0,0,0,0.04)] border border-[#263319]/15 transition-all active:translate-y-0 hover:-translate-y-0.5"
                >
                  <BrandGlyph size={12} className="text-[#263319]" />
                  <span>Post letter</span>
                </button>
              </div>
            </form>
          )}

        </div>

      </div>
    </section>
  );
};
