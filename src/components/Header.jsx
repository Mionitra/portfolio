import React, { useState } from 'react';

export default function Header({ darkMode, toggleDarkMode, language = 'en', setLanguage }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={`sticky top-0 z-50 backdrop-blur-md ${darkMode ? 'bg-[#1e293b]/80' : 'bg-[#f0fff1]/80'} border-b ${darkMode ? 'border-[#1e293b]' : 'border-[#e9ecef]'}`}>
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">Mionitra</h1>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#home" className="hover:text-[#6366f1] transition-colors duration-200 cursor-pointer">{language === 'fr' ? 'Accueil' : 'Home'}</a>
          <a href="#skills" className="hover:text-[#6366f1] transition-colors duration-200 cursor-pointer">{language === 'fr' ? 'Compétences' : 'Skills'}</a>
          <a href="#projects" className="hover:text-[#6366f1] transition-colors duration-200 cursor-pointer">{language === 'fr' ? 'Projets' : 'Projects'}</a>
          <a href="#contact" className="hover:text-[#6366f1] transition-colors duration-200 cursor-pointer">{language === 'fr' ? 'Contact' : 'Contact'}</a>
          
          {/* Language Toggle */}
      <div className="flex items-center gap-3">
        {/* Dark Mode Toggle (mobile) */}
        <button 
          onClick={toggleDarkMode} 
          className={`py-2 px-2.5 rounded-full !rounded-button whitespace-nowrap cursor-pointer ${darkMode ? 'bg-[#f8fafc] text-[#0f172a]' : 'bg-[#1e293b] text-[#f0fff1]'}`}
        >
          <i className={`fas ${darkMode ? 'fa-sun' : 'fa-moon'}`}></i>
        </button>

        {/* Language toggle (EN / FR) */}
        <div className={`flex items-center gap-1 rounded-full p-1 ${darkMode ? 'bg-white/5' : 'bg-slate-100/60'}`}>
          <button
            aria-label="Switch to English"
            onClick={() => setLanguage && setLanguage('en')}
            className={`px-3 py-1 rounded-full text-sm transition ${language === 'en' ? (darkMode ? 'bg-white/50 text-white' : 'bg-blue-200 text-slate-900') : 'opacity-70'}`}
          >
            EN
          </button>
          <button
            aria-label="Switch to French"
            onClick={() => setLanguage && setLanguage('fr')}
            className={`px-3 py-1 rounded-full text-sm transition ${language === 'fr' ? (darkMode ? 'bg-white/50 text-white' : 'bg-blue-200 text-slate-900') : 'opacity-70'}`}
          >
            FR
          </button>
        </div>
      </div>
        </nav>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-4">
          <button 
            onClick={toggleDarkMode} 
            className={`p-2 rounded-full !rounded-button whitespace-nowrap cursor-pointer ${darkMode ? 'bg-[#f8fafc] text-[#0f172a]' : 'bg-[#1e293b] text-[#f0fff1]'}`}
          >
            <i className={`fas ${darkMode ? 'fa-sun' : 'fa-moon'}`}></i>
          </button>
          
          <button 
            onClick={toggleMenu} 
            className="text-2xl cursor-pointer"
          >
            <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} ${darkMode ? 'bg-[#1e293b]' : 'bg-[#f0fff1]'} border-b ${darkMode ? 'border-[#1e293b]' : 'border-[#e9ecef]'}`}>
        <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
          <a href="#home" className="hover:text-[#6366f1] transition-colors duration-200 cursor-pointer" onClick={() => setIsMenuOpen(false)}>{language === 'fr' ? 'Accueil' : 'Home'}</a>
          <a href="#skills" className="hover:text-[#6366f1] transition-colors duration-200 cursor-pointer" onClick={() => setIsMenuOpen(false)}>{language === 'fr' ? 'Compétences' : 'Skills'}</a>
          <a href="#projects" className="hover:text-[#6366f1] transition-colors duration-200 cursor-pointer" onClick={() => setIsMenuOpen(false)}>{language === 'fr' ? 'Projets' : 'Projects'}</a>
          <a href="#contact" className="hover:text-[#6366f1] transition-colors duration-200 cursor-pointer" onClick={() => setIsMenuOpen(false)}>{language === 'fr' ? 'Contact' : 'Contact'}</a>
        </div>
      </div>

      
    </header>
  );
}