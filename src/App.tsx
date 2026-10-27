import React, { useState, useMemo, useEffect } from 'react';
import { PROJECTS, Project } from './data/projects';
import { MinimalMasthead, ViewMode } from './components/MinimalMasthead';
import { FolioSpreadView } from './components/FolioSpreadView';
import { SpatialWallView } from './components/SpatialWallView';
import { MinimalIndexView } from './components/MinimalIndexView';
import { ProjectDrawer } from './components/ProjectDrawer';
import { LetterContactSection } from './components/LetterContactSection';
import { MinimalFooter } from './components/MinimalFooter';

export const App: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('folio');
  const [currentFolioIndex, setCurrentFolioIndex] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }
  }, []);

  // Search filter
  const filteredProjects = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return PROJECTS;
    return PROJECTS.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.summary.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.technologies.some((t) => t.toLowerCase().includes(q))
    );
  }, [searchQuery]);

  return (
    <div className="min-h-[100dvh] w-full max-w-full overflow-x-hidden flex flex-col bg-[#FAF7EE] text-[#242820] relative bg-paper-grain selection:bg-[#242820] selection:text-white">
      
      {/* Site Masthead Navigation */}
      <MinimalMasthead
        currentMode={viewMode}
        onModeChange={(mode) => setViewMode(mode)}
        searchQuery={searchQuery}
        onSearchChange={(q) => {
          setSearchQuery(q);
          setCurrentFolioIndex(0);
        }}
        totalProjects={PROJECTS.length}
      />

      {/* 3. Main Interactive Stage */}
      <main className="flex-1 w-full">
        {filteredProjects.length === 0 ? (
          <div className="py-24 text-center space-y-3">
            <p className="font-serif text-2xl text-[#242820]">
              No creations matching "{searchQuery}"
            </p>
            <button
              onClick={() => setSearchQuery('')}
              className="tactile-interactive px-4 py-1.5 rounded-full border border-[#242820]/20 font-mono text-xs hover:bg-black/5"
            >
              Clear Search
            </button>
          </div>
        ) : (
          <>
            {viewMode === 'folio' && (
              <FolioSpreadView
                projects={filteredProjects}
                currentIndex={Math.min(currentFolioIndex, filteredProjects.length - 1)}
                onIndexChange={(idx) => setCurrentFolioIndex(idx)}
                onOpenDrawer={(proj) => setSelectedProject(proj)}
              />
            )}

            {viewMode === 'spatial' && (
              <SpatialWallView
                projects={filteredProjects}
                onOpenDrawer={(proj) => setSelectedProject(proj)}
              />
            )}

            {viewMode === 'index' && (
              <MinimalIndexView
                projects={filteredProjects}
                onOpenDrawer={(proj) => setSelectedProject(proj)}
              />
            )}
          </>
        )}
      </main>

      {/* 4. "Send a letter" Contact Section (Vauliys Authentic Layout) */}
      <LetterContactSection />

      {/* 5. Slide-Over Dossier Drawer */}
      <ProjectDrawer
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* 6. Minimal Understated Footer */}
      <MinimalFooter />

    </div>
  );
};
