import React, { useState, useEffect } from 'react';
import { Trophy, Award, Heart, Code, Calendar, Users } from 'lucide-react';

export default function HackathonPortfolio({ darkMode = true, language = 'en' }) {
  const [hoveredId, setHoveredId] = useState(null);

  useEffect(() => {
    const handleOnMoveMouse = (e) => {
      const { currentTarget: target } = e;
      const rect = target.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      target.style.setProperty("--mouse-x", `${x}px`);
      target.style.setProperty("--mouse-y", `${y}px`);
    };

    const cards = document.querySelectorAll(".portfolio-card");
    cards.forEach(card => {
      card.onmousemove = handleOnMoveMouse;
    });

    return () => {
      cards.forEach(card => {
        card.onmousemove = null;
      });
    };
  }, []);

  const projects = [
    {
      id: 1,
      title: "DevFest Antsirabe",
      date: "Oct 18–19, 2025",
      rank: language === 'fr' ? "1er prix" : "1st place",
      icon: Trophy,
      color: "from-blue-500 to-purple-600",
      badge: "🥇",
      description: language === 'fr'
        ? "Application web utilisant l'IA pour proposer des idées d'entreprise et suivre leur évolution."
        : "Web application using AI to suggest business ideas and track their evolution.",
      tags: ["AI", "Business", "Web App"]
    },
    {
      id: 2,
      title: "INSI DevWeb Hackathon",
      date: "Feb 2025",
      rank: language === 'fr' ? "3e place" : "3rd place",
      icon: Award,
      color: "from-purple-500 to-blue-600",
      badge: "🥉",
      description: language === 'fr'
        ? "Application web pour le suivi des animaux endémiques dans les réserves naturelles et la surveillance de la déforestation."
        : "Web application for tracking endemic animals in nature reserves and monitoring deforestation.",
      tags: ["Ecology", "Conservation", "Web"]
    },
    {
      id: 3,
      title: "Stupid Hackathon",
      date: "Jul 26, 2025",
      rank: language === 'fr' ? "Coup de cœur du jury" : "Jury's favorite",
      icon: Heart,
      color: "from-blue-600 to-purple-500",
      badge: "❤️",
      description: language === 'fr'
        ? "Projet humoristique présenté lors d'un hackathon non conventionnel."
        : "Humorous project presented at an unconventional hackathon.",
      tags: ["Fun", "Creativity", "Innovation"]
    },
    {
      id: 4,
      title: "MAT",
      date: "Aug 2025",
      rank: language === 'fr' ? "Participation" : "Participation",
      icon: Code,
      color: "from-purple-600 to-blue-500",
      badge: "💻",
      description: language === 'fr'
        ? "Résolution d'algorithmes complexes en Python sous contrainte de temps."
        : "Solving complex algorithms in Python under time constraints.",
      tags: ["Python", "Algorithms", "Performance"]
    },
    {
      id: 5,
      title: "Webcup Madagascar",
      date: "May 2025",
      rank: language === 'fr' ? "Participation" : "Participation",
      icon: Calendar,
      color: "from-blue-500 to-purple-500",
      badge: "⚡",
      description: language === 'fr'
        ? "Développement en 24 heures de 'The End Page', une plateforme pour rédiger un message final avant un départ définitif."
        : "24-hour development of 'The End Page', a platform for writing a final message before a definitive departure.",
      tags: ["24h", "Challenge", "Platform"]
    },
    {
      id: 6,
      title: "Redshalk Hackathon",
      date: "Nov 29, 2024",
      rank: language === 'fr' ? "Participation" : "Participation",
      icon: Users,
      color: "from-purple-500 to-blue-600",
      badge: "🐷",
      description: language === 'fr'
        ? "Application pour le suivi des races de porcs et la gestion des exploitations."
        : "Application for tracking pig breeds and farm management.",
      tags: ["AgriTech", "Management", "Tracking"]
    }
  ];

  return (
    <div className={`min-h-screen py-20 px-4 ${darkMode ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 animate-fadeIn">
          <h1 className={`text-3xl md:text-6xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            {language === 'fr' ? 'Hackathons et projets' : 'Hackathons & Projects'}
          </h1>
          <p className={`text-lg max-w-2xl mx-auto ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
            {language === 'fr' ? "Une collection de défis relevés, d'innovations créées et de récompenses obtenues" : "A collection of challenges tackled, innovations created, and awards won"}
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => {
            const Icon = project.icon;
            const isHovered = hoveredId === project.id;
            
            return (
              <div
                key={project.id}
                className="portfolio-card group relative"
                onMouseEnter={() => setHoveredId(project.id)}
                onMouseLeave={() => setHoveredId(null)}
                style={{
                  animation: `slideUp 0.6s ease-out ${index * 0.1}s both`
                }}
              >
                {/* Light border effect */}
                <div className="card-border"></div>
                
                {/* Card Content */}
                <div className={`hover:shadow-md hover:shadow-cyan-600 hover:-translate-y-5 duration-500 card-content relative h-full rounded-2xl p-6 overflow-hidden ${darkMode ? 'bg-slate-800/50 backdrop-blur-sm' : 'bg-white/80 border border-slate-200'}`}>
                  {/* Content */}
                  <div className="relative z-10">
                    {/* Header with icon and badge */}
                    <div className="flex items-start justify-between mb-4">
                      <div className={`
                        p-3 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500
                        transform transition-transform duration-500
                        ${isHovered ? 'scale-110 rotate-6' : ''}
                      `}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
 
                    {/* Title */}
                    <h3 className={`text-xl font-bold mb-2 line-clamp-2 min-h-[3.5rem] ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                      {project.title}
                    </h3>
 
                    {/* Date and Rank */}
                    <div className="flex flex-col gap-2 mb-4">
                      <span className="text-sm text-gray-400 flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {project.date}
                      </span>
                      <span className={`
                        inline-flex items-center gap-2 text-sm font-semibold px-3 py-1 rounded-full
                        bg-gradient-to-r from-blue-600 to-cyan-500 text-white w-fit
                      `}>
                        {project.rank}
                      </span>
                    </div>
 
                    {/* Description */}
                    <p className={`text-sm mb-4 transition-all duration-500 ${darkMode ? `text-gray-400 ${isHovered ? 'text-gray-300' : ''}` : 'text-gray-700'}`}>
                      {project.description}
                    </p>
 
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, i) => (
                        <span
                          key={i}
                          className={`text-xs px-3 py-1 rounded-full transition-colors duration-300 hover:brightness-95 ${darkMode ? 'bg-slate-700/50 text-gray-300 border border-slate-600/50 hover:bg-slate-600/50 hover:border-slate-500' : 'bg-white/60 text-slate-700 border border-slate-200 hover:bg-white/80'}`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
 
        {/* Stats Footer */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: language === 'fr' ? "Hackathons" : "Hackathons", value: "6", icon: Trophy },
            { label: language === 'fr' ? "Récompenses" : "Awards won", value: "3", icon: Award },
            { label: language === 'fr' ? "Projets créés" : "Projects created", value: "10+", icon: Code },
            { label: language === 'fr' ? "Heures de code" : "Hours of code", value: "100+", icon: Calendar }
          ].map((stat, i) => {
             const StatIcon = stat.icon;
             return (
              <div
                key={i}
                className={`text-center p-6 rounded-xl hover:transition-all hover:duration-300 hover:scale-105 ${darkMode ? 'bg-slate-800/30 border border-slate-700/50 hover:bg-slate-800/50' : 'bg-white border border-slate-200 hover:bg-white/80'}`}
                style={{
                  animation: `fadeIn 0.6s ease-out ${0.8 + i * 0.1}s both`
                }}
              >
                <StatIcon className={`w-8 h-8 mx-auto mb-2 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                <div className={`text-3xl font-bold mb-1 ${darkMode ? 'text-white' : 'text-slate-900'}`}>{stat.value}</div>
                <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{stat.label}</div>
               </div>
              );
            })}
          </div>
       </div>
 
       <style jsx>{`
         @keyframes slideUp {
           from {
             opacity: 0;
             transform: translateY(30px);
           }
           to {
             opacity: 1;
             transform: translateY(0);
           }
         }
         
         @keyframes fadeIn {
           from {
             opacity: 0;
           }
           to {
             opacity: 1;
             transform: scale(1);
           }
         }
 
         .portfolio-card {
           position: relative;
           border-radius: 1rem;
         }
 
         .card-border {
           position: absolute;
           inset: 0;
           border-radius: 1rem;
           padding: 1px;
           background: radial-gradient(
             400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
             rgba(99, 102, 241, 0.6),
             rgba(139, 92, 246, 0.4),
             transparent 50%
           );
           -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
           -webkit-mask-composite: xor;
           mask-composite: exclude;
           opacity: 0;
           transition: opacity 500ms;
           pointer-events: none;
         }
 
         .portfolio-card:hover .card-border {
           opacity: 1;
         }
 
         .card-content {
           position: relative;
           border-radius: 1rem;
         }
 
         .card-content::before {
           content: "";
           position: absolute;
           inset: 0;
           border-radius: 1rem;
           background: radial-gradient(
             600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
             rgba(99, 102, 241, 0.08),
             transparent 50%
           );
           opacity: 0;
           transition: opacity 500ms;
         }
 
         .portfolio-card:hover .card-content::before {
           opacity: 1;
         }
       `}</style>
     </div>
   );
 }