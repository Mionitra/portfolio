import React, { useState } from 'react';
import projects from './data/projects'; 

export default function ProjectsSection({ darkMode, language = 'en' }) {
  
  
  const [activeFilter, setActiveFilter] = useState('All');
  
  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(project => project.technologies.includes(activeFilter));

  return (
    <section id="projects" className={`py-20 ${darkMode ? 'bg-[#1e293b]' : 'bg-[#e9ecef]'}`}>
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-16 text-center">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">{language === 'fr' ? 'Projets personnels' : 'Personnal projects'}</span>
        </h2>
        
        <div className="flex justify-center mb-10 flex-wrap gap-4">
          <button 
            onClick={() => setActiveFilter('All')} 
            className={`px-6 py-2 rounded-full !rounded-button whitespace-nowrap transition-all duration-200 cursor-pointer ${activeFilter === 'All' ? 
              (darkMode ? 'bg-[#818cf8] text-white' : 'bg-[#6366f1] text-white') : 
              (darkMode ? 'bg-[#0f172a] text-[#f8fafc]' : 'bg-gray-200 text-[#1e293b]')
            }`}
          >
            All
          </button>
          
          {['React', 'Java', 'Django', 'TailwindCSS', 'GSAP', 'Angular', 'Nestjs'].map((tech, index) => (
            <button 
              key={index}
              onClick={() => setActiveFilter(tech)} 
              className={`px-6 py-2 rounded-full !rounded-button whitespace-nowrap transition-all duration-200 cursor-pointer ${activeFilter === tech ? 
                (darkMode ? 'bg-[#818cf8] text-white' : 'bg-[#6366f1] text-white') : 
                (darkMode ? 'bg-[#0f172a] text-[#f8fafc]' : 'bg-gray-200 text-[#1e293b]')
              }`}
            >
              {tech}
            </button>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div 
              key={project.id} 
              className={`group rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 ${darkMode ? 'bg-[#0f172a] hover:shadow-lg hover:shadow-purple-500/20' : 'bg-gray-200 hover:shadow-xl'}`}
            >
              <div className="relative overflow-hidden h-64">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-transparent to-black via-black opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                    <p className="text-gray-200 mb-4">{project.description}</p>
                    <div className="flex gap-2 mb-4">
                      {project.technologies.map((tech, index) => (
                        <span key={index} className="px-3 py-1 bg-[#6366f1]/80 text-white text-sm rounded-full !rounded-button whitespace-nowrap">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-4">
                      <a 
                        href={project.liveLink} 
                        className="px-4 py-2 bg-gray-200 text-[#1e293b] rounded-full !rounded-button whitespace-nowrap font-medium hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
                      >
                        Live Preview
                      </a>
                      <a 
                        href={project.githubLink} 
                        className="px-4 py-2 bg-gray-800 text-white rounded-full !rounded-button whitespace-nowrap font-medium hover:bg-gray-700 transition-colors duration-200 cursor-pointer"
                      >
                        <i className="fab fa-github mr-2"></i>
                        Code
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <span 
                      key={index} 
                      className={`px-3 py-1 text-sm rounded-full !rounded-button whitespace-nowrap ${
                        darkMode ? 'bg-[#1e293b] text-[#f8fafc]' : 'bg-[#e9ecef] text-[#1e293b]'
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};