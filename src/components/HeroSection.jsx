import React, { useState, useEffect } from 'react';

const HeroSection = ({ darkMode, language = 'en' }) => {
  const [typedText, setTypedText] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);
  
  const fullText = language === 'fr' 
    ? "Développeur full‑stack créant des applications web modernes" 
    : "Full-stack developer specializing in modern web technologies";
  
  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index < fullText.length) {
        setTypedText(fullText.substring(0, index + 1));
        index++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);
    
    // Cursor blinking effect
    const cursorInterval = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 500);
    
    return () => {
      clearInterval(typingInterval);
      clearInterval(cursorInterval);
    };
  }, [fullText]);

  return (
    <section id="home" className="relative min-h-[calc(100vh-80px)] flex justify-around flex-col md:flex-row-reverse items-center md:px-20">
      <img src="/media/images/Mionitra1.png" alt="" className='md:h-96 h-56 mx-auto' />
      
      <div className="container mx-auto px-4 z-10">
        <div className="max-w-2xl">
          <h1 className="text-3xl md:text-5xl font-bold mb-6">RAKOTONDRADAORO Lova</h1>
          <h1 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500 animate-gradient">Mionitra</h1>
          <div className="text-xl md:text-2xl mb-8">
            <span>{typedText}</span>
            <span className={`ml-1 inline-block w-2 h-6 bg-[#6366f1] ${cursorVisible ? 'opacity-100' : 'opacity-0'}`}></span>
          </div>
          
          <div className="flex flex-wrap gap-4 mb-8">
            {['React', 'Django', 'TailwindCSS', 'Java'].map((tech, index) => (
              <div 
                key={index} 
                className={`px-4 py-2 rounded-full ${darkMode ? 'bg-[#1e293b]' : 'bg-[#e9ecef]'} flex items-center gap-2 animate-float`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <i className={`fab ${
                  tech === 'React' ? 'fa-react' : 
                  tech === 'TailwindCSS' ? 'fa-css3' : 
                  tech === 'Django' ? 'fa-python' : 
                  tech === 'Java' ? 'fa-java' : 
                  'fa-css3'
                }`}></i>
                {tech}
              </div>
            ))}
          </div>
          
          <a 
            href="#contact" 
            className={`inline-block px-8 py-3 rounded-full !rounded-button whitespace-nowrap text-white font-medium transition-all duration-300 bg-gradient-to-r from-purple-600 to-blue-500 hover:shadow-lg hover:shadow-purple-500/30 cursor-pointer`}
          >
            {language === 'fr' ? "Contactez‑moi" : "Get in touch"}
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;