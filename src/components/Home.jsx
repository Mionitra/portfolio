import React, { useState, useEffect, useRef } from 'react';
import Header from './Header';
import HeroSection from './HeroSection';
import SkillsSection from './SkillsSection';
import ProjectsSection from './ProjectsSection';
import ContactSection from './ContactSection';
import Footer from './Footer';
import HorizontalScroll from './HorizontalScroll';

const Home = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [lang, setLang] = useState('en'); // 'en' or 'fr'
  const [showHeader, setShowHeader] = useState(true);
  const lastY = useRef(0);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY || 0;
      if (currentY <= 0) {
        setShowHeader(true);
      } else if (currentY > lastY.current) {
        // scrolling down -> hide
        setShowHeader(false);
      } else {
        // scrolling up -> show
        setShowHeader(true);
      }
      lastY.current = currentY;
    };

    const onMouseMove = (e) => {
      if (e.clientY <= 60) {
        setShowHeader(true);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('mousemove', onMouseMove);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-[#0f172a] text-[#f8fafc]' : 'bg-gray-200 text-[#1e293b]'}`}>
      {/* Futuristic Grid Lines Background */}
      <div className="fixed inset-0 z-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0 grid grid-cols-12 gap-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className={`border-l ${darkMode ? 'border-[#818cf8]' : 'border-[#6366f1]'}`}></div>
          ))}
        </div>
        <div className="absolute inset-0 grid grid-rows-12 gap-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className={`border-t ${darkMode ? 'border-[#818cf8]' : 'border-[#6366f1]'}`}></div>
          ))}
        </div>
      </div>
      
      {/* Header container: sticky so layout space is preserved; hide by translating up */}
      <div className={`sticky top-0 left-0 z-50 transition-transform duration-300 ${showHeader ? 'translate-y-0 pointer-events-auto' : '-translate-y-full pointer-events-none'}`}>
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} language={lang} setLanguage={setLang} />
      </div>
      
      <HeroSection darkMode={darkMode} language={lang} />
      <SkillsSection darkMode={darkMode} language={lang} />
      <ProjectsSection darkMode={darkMode} language={lang} />
      <HorizontalScroll darkMode={darkMode} language={lang} />
      <ContactSection darkMode={darkMode} language={lang} />
      <Footer darkMode={darkMode} language={lang} />
      
      
      {/* Custom cursor */}
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 5s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default Home;