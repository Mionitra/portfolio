import React, { useState, useEffect } from 'react'
import { useTheme } from '@/context/ThemeContext'
import { useLanguage } from '@/context/LanguageContext'
import translations from '@/i18n/translations'

export default function HeroSection() {
  const { darkMode } = useTheme()
  const { language } = useLanguage()
  const [typedText, setTypedText] = useState('')
  const [cursorVisible, setCursorVisible] = useState(true)

  const t = translations[language]
  const fullText = t.hero.tagline

  useEffect(() => {
    let index = 0
    const typingInterval = setInterval(() => {
      if (index < fullText.length) {
        setTypedText(fullText.substring(0, index + 1))
        index++
      } else {
        clearInterval(typingInterval)
      }
    }, 100)
    const cursorInterval = setInterval(() => {
      setCursorVisible(prev => !prev)
    }, 500)
    return () => {
      clearInterval(typingInterval)
      clearInterval(cursorInterval)
    }
  }, [fullText])

  const techs = t.techs || ['React', 'Django', 'TailwindCSS', 'Java']

  return (
    <section id="home" className="relative min-h-[calc(100vh-80px)] flex justify-around flex-col md:flex-row-reverse items-center md:px-20">
      <img src="/media/images/Mionitra3.png" alt="" className="md:h-auto h-56 mx-auto rounded-full flex-1" />
      <div className="container mx-auto px-4 z-10 flex-1/2">
        <div className="max-w-2xl">
          <div className="text-center md:text-start mt-5 md:mt-0">
            <div className="singleLine overflow-hidden">
              <div>
                <h1 className="text-3xl lg:text-5xl font-bold">{t.hero.name}</h1>
              </div>
            </div>
            <div className="singleLine overflow-hidden">
              <div>
                <h1 className="text-3xl lg:text-5xl font-bold">
                  {t.hero.firstName}{' '}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">{t.hero.lastName}</span>
                </h1>
              </div>
            </div>
          </div>
          <div className="text-xl md:text-2xl mb-8">
            <span>{typedText}</span>
            <span className={`ml-1 inline-block w-2 h-6 bg-[#6366f1] ${cursorVisible ? 'opacity-100' : 'opacity-0'}`}></span>
          </div>
          <div className="flex flex-wrap gap-4 mb-8">
            {techs.map((tech, index) => (
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
            className="inline-block px-8 py-3 rounded-full !rounded-button whitespace-nowrap text-white font-medium transition-all duration-300 bg-gradient-to-r from-blue-600 to-cyan-500 hover:shadow-lg hover:shadow-purple-500/30 cursor-pointer"
          >
            {t.hero.getInTouch}
          </a>
        </div>
      </div>
    </section>
  )
}
