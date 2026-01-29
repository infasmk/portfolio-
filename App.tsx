
import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion as motionBase } from 'framer-motion';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Stack from './components/Stack';
import Projects from './components/Projects';
import AllProjects from './components/AllProjects';
import ProjectDetail from './components/ProjectDetail';
import Team from './components/Team';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import BackgroundEffects from './components/BackgroundEffects';
import { Project } from './types';

const motion = motionBase as any;

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'home' | 'projects'>('home');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    // Show loader on every mount for exactly 2800ms
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2800); 
    
    return () => clearTimeout(timer);
  }, []);

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
    <div className="relative min-h-screen selection:bg-blue-500/30">
      <CustomCursor />
      
      <AnimatePresence mode="wait">
        {loading ? (
          <Loader key="loader" />
        ) : (
          <div className="relative">
            <BackgroundEffects />
            
            {/* Project Detail Modal */}
            <AnimatePresence>
              {selectedProject && (
                <ProjectDetail 
                  project={selectedProject} 
                  onClose={() => setSelectedProject(null)} 
                />
              )}
            </AnimatePresence>

            <motion.div
              key={view}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="relative z-10"
            >
              {view === 'home' ? (
                <main className="bg-transparent">
                  <Navbar />
                  <Hero />
                  <About />
                  <Skills />
                  <Stack />
                  <Projects 
                    onBrowseAll={handleBrowseAll} 
                    onProjectSelect={handleProjectSelect}
                  />
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
