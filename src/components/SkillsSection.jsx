import React, { useEffect, useState, useRef } from 'react';
import * as echarts from 'echarts';
import * as LucideIcons from 'lucide-react';
import skillsData from './data/Skills';
import translations from './data/translation';

export default function SkillsSection({ darkMode, language = 'en' }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const sliderRef = useRef(null);
  const autoPlayRef = useRef(null);
  const chartsRef = useRef({});

  const skills = skillsData(language);
  const filteredSkills = activeCategory === 'all' 
    ? skills 
    : skills.filter(skill => skill.category === activeCategory);

  // Responsive cards per view
  const getCardsPerView = () => {
    if (typeof window === 'undefined') return 4;
    const width = window.innerWidth;
    if (width >= 1280) return 4; // xl
    if (width >= 768) return 2;  // md
    return 1; // mobile
  };

  const [cardsPerView, setCardsPerView] = useState(getCardsPerView());

  useEffect(() => {
    const handleResize = () => {
      setCardsPerView(getCardsPerView());
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, filteredSkills.length - cardsPerView);

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying && filteredSkills.length > cardsPerView) {
      autoPlayRef.current = setInterval(() => {
        setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
      }, 4000);
    }
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isAutoPlaying, maxIndex, cardsPerView, filteredSkills.length]);

  // Initialize charts - only once per skill
  useEffect(() => {
    filteredSkills.forEach((skill) => {
      const chartId = `skill-chart-${skill.name.replace(/[^a-zA-Z0-9]/g, '')}`;
      const chartDom = document.getElementById(chartId);
      
      if (chartDom && !chartsRef.current[chartId]) {
        const myChart = echarts.init(chartDom);
        const option = {
          animation: true,
          animationDuration: 1000,
          series: [{
            type: 'gauge',
            startAngle: 90,
            endAngle: -270,
            pointer: { show: false },
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
            splitLine: { show: false },
            axisTick: { show: false },
            axisLabel: { show: false },
            detail: {
              valueAnimation: true,
              formatter: '{value}%',
              fontSize: 18,
              offsetCenter: [0, 0],
              color: darkMode ? '#f8fafc' : '#1e293b'
            },
            data: [{ value: skill.proficiency }]
          }]
        };
        myChart.setOption(option);
        chartsRef.current[chartId] = myChart;
      }
    });

    const resizeHandler = () => {
      Object.values(chartsRef.current).forEach(chart => {
        if (chart && !chart.isDisposed()) {
          chart.resize();
        }
      });
    };
    window.addEventListener('resize', resizeHandler);

    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, [filteredSkills, darkMode]);

  // Update chart colors when dark mode changes
  useEffect(() => {
    Object.entries(chartsRef.current).forEach(([chartId, chart]) => {
      if (chart && !chart.isDisposed()) {
        chart.setOption({
          series: [{
            progress: {
              itemStyle: {
                color: darkMode ? '#818cf8' : '#6366f1'
              }
            },
            axisLine: {
              lineStyle: {
                color: [[1, darkMode ? '#1e293b' : '#e9ecef']]
              }
            },
            detail: {
              color: darkMode ? '#f8fafc' : '#1e293b'
            }
          }]
        });
      }
    });
  }, [darkMode]);

  // Clean up charts when category changes
  useEffect(() => {
    return () => {
      Object.values(chartsRef.current).forEach(chart => {
        if (chart && !chart.isDisposed()) {
          chart.dispose();
        }
      });
      chartsRef.current = {};
    };
  }, [activeCategory]);

  const categories = ['all', 'frontend', 'backend', 'mobile', 'database', 'others'];

  const handlePrevious = () => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
    setIsAutoPlaying(false);
  };

  const handleNext = () => {
    setCurrentIndex(prev => Math.min(maxIndex, prev + 1));
    setIsAutoPlaying(false);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && currentIndex < maxIndex) {
      handleNext();
    }
    if (isRightSwipe && currentIndex > 0) {
      handlePrevious();
    }
  };

  const cardWidth = 100 / cardsPerView;
  const translateX = -(currentIndex * cardWidth);

  return (
    <section id="skills" className={`py-20 ${darkMode ? 'bg-[#0f172a]' : 'bg-[#f0fff1]'}`}>
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-8 text-center">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
            {translations[language].title}
          </span>
        </h2>
        
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setActiveCategory(category);
                setCurrentIndex(0);
              }}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-gradient-to-r from-purple-600 to-blue-500 text-white shadow-lg scale-105'
                  : darkMode
                  ? 'bg-[#1e293b] text-gray-300 hover:bg-[#334155]'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {translations[language].categories[category]}
            </button>
          ))}
        </div>
        
        {/* Carousel Container */}
        {filteredSkills.length > 0 ? (
          <div className="relative">
            {/* Navigation Buttons */}
            {filteredSkills.length > cardsPerView && (
              <>
                <button
                  onClick={handlePrevious}
                  disabled={currentIndex === 0}
                  className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                    currentIndex === 0
                      ? 'opacity-0 cursor-not-allowed'
                      : darkMode
                      ? 'bg-[#1e293b] hover:bg-[#334155] text-white shadow-lg hover:shadow-purple-500/30'
                      : 'bg-white hover:bg-gray-50 text-gray-800 shadow-lg hover:shadow-xl'
                  }`}
                  aria-label="Previous slide"
                >
                  <LucideIcons.ChevronLeft className="w-6 h-6" />
                </button>
                
                <button
                  onClick={handleNext}
                  disabled={currentIndex >= maxIndex}
                  className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                    currentIndex >= maxIndex
                      ? 'opacity-0 cursor-not-allowed'
                      : darkMode
                      ? 'bg-[#1e293b] hover:bg-[#334155] text-white shadow-lg hover:shadow-purple-500/30'
                      : 'bg-white hover:bg-gray-50 text-gray-800 shadow-lg hover:shadow-xl'
                  }`}
                  aria-label="Next slide"
                >
                  <LucideIcons.ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            {/* Slider */}
            <div 
              className="overflow-hidden"
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
            >
              <div
                ref={sliderRef}
                className="flex transition-transform duration-700 ease-out"
                style={{ transform: `translateX(${translateX}%)` }}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                {filteredSkills.map((skill, index) => {
                  const IconComponent = LucideIcons[skill.icon];
                  
                  return (
                    <div
                      key={index}
                      className="flex-shrink-0 px-4"
                      style={{ width: `${cardWidth}%` }}
                    >
                      <div 
                        className={`p-6 rounded-xl transition-all duration-300 h-full ${
                          darkMode 
                            ? 'bg-[#1e293b] hover:shadow-lg hover:shadow-purple-500/20' 
                            : 'bg-white hover:shadow-xl'
                        }`}
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className={`text-xl font-bold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                              {skill.name}
                            </h3>
                          </div>
                          {IconComponent && (
                            <IconComponent className={`w-8 h-8 ${skill.iconColor}`} />
                          )}
                        </div>
                        
                        <div className="h-[180px]" id={`skill-chart-${skill.name.replace(/[^a-zA-Z0-9]/g, '')}`}></div>
                        
                        <div className="mt-4">
                          <h4 className={`font-semibold mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                            {translations[language].keySkills}:
                          </h4>
                          <ul className={`list-disc list-inside text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                            {skill.keySkills.map((keySkill, idx) => (
                              <li key={idx}>{keySkill}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Pagination Dots */}
            {filteredSkills.length > cardsPerView && (
              <div className="flex justify-center gap-2 mt-8">
                {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`transition-all duration-300 rounded-full ${
                      currentIndex === index
                        ? 'w-8 h-2 bg-gradient-to-r from-purple-600 to-blue-500'
                        : darkMode
                        ? 'w-2 h-2 bg-gray-600 hover:bg-gray-500'
                        : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            )}

            {/* Auto-play indicator */}
            {filteredSkills.length > cardsPerView && (
              <div className="flex justify-center mt-4">
                <button
                  onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    darkMode
                      ? 'bg-[#1e293b] text-gray-300 hover:bg-[#334155]'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {isAutoPlaying ? (
                    <span className="flex items-center gap-2">
                      <LucideIcons.Pause className="w-4 h-4" />
                      {language === 'fr' ? 'Pause' : 'Pause'}
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <LucideIcons.Play className="w-4 h-4" />
                      {language === 'fr' ? 'Lecture auto' : 'Auto-play'}
                    </span>
                  )}
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className={`text-xl ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {language === 'fr' ? 'Aucune compétence trouvée' : 'No skills found'}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}