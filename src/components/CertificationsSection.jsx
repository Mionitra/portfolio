import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

export default function CertificationsSection({ darkMode = true, language = 'en' }) {
  const [selectedCert, setSelectedCert] = useState(null);

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

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedCert) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedCert]);

  const ModalContent = () => (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-sm animate-fadeIn"
      style={{ left: 0, right: 0, top: 0, bottom: 0, width: '100vw', height: '100vh' }}
      onClick={() => setSelectedCert(null)}
    >
      {/* Bouton fermer */}
      <button
        className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors z-10 group"
        onClick={() => setSelectedCert(null)}
        aria-label="Close"
      >
        <svg 
          className="w-10 h-10 transform group-hover:rotate-90 transition-transform duration-300" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Titre du certificat */}
      <div className="absolute top-6 left-6 right-20 z-10">
        <h3 className="text-2xl md:text-3xl font-bold text-white">
          {selectedCert.name}
        </h3>
      </div>

      {/* Container de l'image */}
      <div 
        className="relative max-w-6xl h-[80vh] w-full mx-4 animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={selectedCert.image}
          alt={selectedCert.name}
          className="w-full h-full object-contain rounded-lg shadow-2xl"
        />
      </div>
    </div>
  );

  return (
    <>
      <div className={`py-20 px-4 ${darkMode ? 'bg-gradient-to-b from-gray-900 to-black' : 'bg-gradient-to-b from-gray-50 to-white'} overflow-hidden`}>
        <div className="max-w-7xl mx-auto">
          {/* Titre */}
          <h2 className={`text-4xl md:text-5xl font-bold text-center mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {language === 'fr' ? 'Mes certifications' : 'My Certifications'}
          </h2>

          {/* Images de certifications */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="relative h-80 rounded-2xl overflow-hidden cursor-pointer group transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                onClick={() => setSelectedCert(cert)}
              >
                {/* Image de fond */}
                <img
                  src={cert.image}
                  alt={cert.name}
                  className="w-full h-full object-cover"
                />

                {/* Overlay sombre qui s'estompe au hover */}
                <div className="absolute inset-0 bg-black/60 group-hover:bg-black/30 transition-all duration-300" />

                {/* Titre qui apparaît au hover */}
                <div className="absolute inset-0 flex items-center justify-center p-6">
                  <h3 className={`text-2xl font-bold text-white text-center transform transition-all duration-300 ${darkMode ? 'opacity-0 group-hover:opacity-100' : ''}`}>
                    {cert.name}
                  </h3>
                </div>

                {/* Bordure qui apparaît au hover */}
                <div className="absolute inset-0 border-4 border-transparent group-hover:border-blue-500 rounded-2xl transition-all duration-300" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal rendered via Portal to escape horizontal scroll container */}
      {selectedCert && createPortal(
        <ModalContent />,
        document.body
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }

        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </>
  );
}