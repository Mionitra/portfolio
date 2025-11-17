import React from 'react';

export default function CertificationsSection({ darkMode = true, language = 'en' }) {
  const certifications = [
    {
      name: language === 'fr' ? "Anglais pour les affaires et l'entrepreneuriat" : "English for Business and Entrepreneurship",
      icon: "☁️",
      image: "/images/certificats/be.png"
    },
    {
      name: language === 'fr' ? "Anglais pour le développement de carrière" : "English for Career Development",
      icon: "🎯",
      image: "/images/certificats/cd.png"
    },
    {
      name: language === 'fr' ? "Anglais pour les STEM" : "English for STEM",
      icon: "⚡",
      image: "/images/certificats/stem.png"
    }
  ];

  return (
    <div className={`min-h-screen flex items-center justify-center p-8 ${darkMode ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900' : 'bg-white'}`}>
      <div className="w-full">
        {/* Titre */}
        <h2 className={`text-5xl font-bold text-center mb-6 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
          {language === 'fr' ? 'Mes certifications' : 'My Certifications'}
        </h2>
        
        {/* Paragraphe */}
        <p className={`text-center text-lg mb-12 mx-10 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          {language === 'fr'
            ? "Notre équipe possède des certifications reconnues dans l'industrie, garantissant une expertise technique de premier ordre et des solutions de qualité professionnelle pour vos projets."
            : "Our team holds industry-recognized certifications, ensuring top-tier technical expertise and professional-quality solutions for your projects."}
        </p>
        
        {/* Images de certifications */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {certifications.map((cert, index) => (
            <div
              key={index}
              className="group relative h-80 rounded-2xl overflow-hidden cursor-pointer
                         hover:scale-105 transition-transform duration-500"
              style={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.2}s both`
              }}
            >
              {/* Image de fond */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700
                           group-hover:scale-110"
                style={{
                  backgroundImage: `url(${cert.image})`
                }}
              />
              
              {/* Overlay sombre qui s'estompe au hover */}
              <div className={`absolute inset-0 ${darkMode ? 'bg-black/20 group-hover:bg-black/0' : 'bg-white/20 group-hover:bg-white/0'} transition-all duration-500`} />
              
              {/* Titre qui apparaît au hover */}
              <div className={`absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${darkMode ? 'bg-gradient-to-t from-slate-900/95 via-slate-900/90 to-slate-900/95' : 'bg-gradient-to-t from-white/95 via-white/90 to-white/95'}`}>
                <h3 className={`text-2xl font-bold text-center px-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  {cert.name}
                </h3>
              </div>
              
              {/* Bordure qui apparaît au hover */}
              <div className={`absolute inset-0 border-2 border-transparent rounded-2xl transition-colors duration-500 ${darkMode ? 'group-hover:border-white/40' : 'group-hover:border-slate-700/40'}`} />
            </div>
          ))}
        </div>
      </div>
      
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}