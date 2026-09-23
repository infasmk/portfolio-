import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion as motionBase } from 'framer-motion';
import Loader from './components/Loader';
import ScrollProgress from './components/ScrollProgress';
import CustomCursor from './components/CustomCursor';
import BackgroundEffects from './components/BackgroundEffects';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Team from './components/Team';
import Contact from './components/Contact';
import FloatingContact from './components/FloatingContact';
import Footer from './components/Footer';
import ProjectDetail from './components/ProjectDetail';
import AllProjects from './components/AllProjects';
import { Project } from './types';

const motion = motionBase as any;

export const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'home' | 'projects'>('home');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Fast branded boot - exits automatically or via callback
  const handleLoaderComplete = () => {
    setLoading(false);
  };

  const handleBrowseAll = () => {
    setView('projects');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleBackToHome = () => {
    setView('home');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleProjectSelect = (project: Project) => {
    setSelectedProject(project);
  };

  return (
    <div className="relative min-h-screen bg-[#050505] text-white selection:bg-cyan-500/30 selection:text-white">
      {/* Precision Custom Cursor */}
      <CustomCursor />

      {/* Global Scroll Progress Bar */}
      <ScrollProgress />

      {/* Floating Quick Action Contact Widget */}
      <FloatingContact />

      <AnimatePresence mode="wait">
        {loading ? (
          <Loader key="loader" onComplete={handleLoaderComplete} />
        ) : (
          <div className="relative">
            {/* Dynamic Section-Aware Background */}
            <BackgroundEffects isAllProjectsView={view === 'projects'} />

            {/* Case Study Full-Screen Overlay */}
            <AnimatePresence>
              {selectedProject && (
                <ProjectDetail
                  project={selectedProject}
                  onClose={() => setSelectedProject(null)}
                />
              )}
            </AnimatePresence>

            {/* View Transitions: Home vs All Projects Archive */}
            <motion.div
              key={view}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="relative z-10"
            >
              {view === 'home' ? (
                <main className="bg-transparent">
                  <Navbar onNavigateProjects={handleBrowseAll} />
                  <Hero />
                  <Marquee />
                  <About />
                  <Projects
                    onBrowseAll={handleBrowseAll}
                    onProjectSelect={handleProjectSelect}
                  />
                  <Skills />
                  <Team />
                  <Contact />
                  <Footer />
                </main>
              ) : (
                <AllProjects
                  onBack={handleBackToHome}
                  onProjectSelect={handleProjectSelect}
                />
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
