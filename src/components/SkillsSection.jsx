import React, { useEffect } from 'react';
import * as echarts from 'echarts';

export default function SkillsSection({ darkMode, language = 'en' }) {
  useEffect(() => {
    const frameworks = ['React', 'Sass', 'Django', 'TailwindCSS'];
    const proficiencies = [95, 73, 82, 90];
    
    frameworks.forEach((framework, index) => {
      const chartDom = document.getElementById(`skill-chart-${index}`);
      if (chartDom) {
        const myChart = echarts.init(chartDom);
        const option = {
          animation: false,
          series: [{
            type: 'gauge',
            startAngle: 90,
            endAngle: -270,
            pointer: {
              show: false
            },
            progress: {
              show: true,
              overlap: false,
              roundCap: true,
              clip: false,
              itemStyle: {
                color: darkMode ? '#818cf8' : '#6366f1'
              }
            },
            axisLine: {
              lineStyle: {
                width: 15,
                color: [[1, darkMode ? '#1e293b' : '#e9ecef']]
              }
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false
            },
            detail: {
              valueAnimation: true,
              formatter: '{value}%',
              fontSize: 18,
              offsetCenter: [0, 0],
              color: darkMode ? '#f8fafc' : '#1e293b'
            },
            data: [{
              value: proficiencies[index]
            }]
          }]
        };
        myChart.setOption(option);
        
        window.addEventListener('resize', () => {
          myChart.resize();
        });
      }
    });
  }, [darkMode]);

  return (
    <section id="skills" className={`py-20 ${darkMode ? 'bg-[#0f172a]' : 'bg-[#f0fff1]'}`}>
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-16 text-center">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
            {language === 'fr' ? 'Expérience avec les Frameworks' : 'Framework Experience'}
          </span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {['React', 'Java', 'Django', 'TailwindCSS'].map((framework, index) => (
            <div 
              key={index} 
              className={`p-6 rounded-xl transition-all duration-300 hover:scale-105 ${darkMode ? 'bg-[#1e293b] hover:shadow-lg hover:shadow-purple-500/20' : 'bg-gray-200 hover:shadow-xl'}`}
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold mb-2">{framework}</h3>
                  
                </div>
                <i className={`text-3xl fab ${
                  framework === 'React' ? 'fa-react text-blue-400' : 
                  framework === 'Java' ? 'fa-java text-red-500' : 
                  framework === 'Django' ? 'fa-python text-green-700' : 
                  'fa-css3 text-blue-500'
                }`}></i>
              </div>
              
              <div className="h-[200px]" id={`skill-chart-${index}`}></div>
              
              <div className="mt-6">
                <h4 className="font-semibold mb-2">Key Skills:</h4>
                <ul className={`list-disc list-inside ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {framework === 'React' && (
                    <>
                      <li>Redux & Context API</li>
                      <li>React Hooks</li>
                      <li>React Testing Library</li>
                    </>
                  )}
                  {framework === 'Java' && (
                    <>
                      <li>Object Oriented Programming(OOP)</li>
                      <li>Multithreading</li>
                    </>
                  )}
                  {framework === 'Django' && (
                    <>
                      <li>Django REST Framework</li>
                      <li>Django ORM</li>
                      <li>Authentication & Security</li>
                    </>
                  )}
                  {framework === 'TailwindCSS' && (
                    <>
                      <li>Responsive Design</li>
                      <li>UI Component Design</li>
                      <li>Dark Mode Implementation</li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};