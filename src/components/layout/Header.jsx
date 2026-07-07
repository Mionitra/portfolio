import React, { useState } from 'react'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { useTheme } from '@/context/ThemeContext'
import { useLanguage } from '@/context/LanguageContext'
import translations from '@/i18n/translations'

export default function Header() {
  const { darkMode, toggleDarkMode } = useTheme()
  const { language, setLanguage } = useLanguage()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const t = translations[language].header

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const navItems = [
    { href: '#home', label: t.home },
    { href: '#skills', label: t.skills },
    { href: '#projects', label: t.projects },
    { href: '#contact', label: t.contact },
  ]

  return (
    <header className={`sticky top-0 z-50 backdrop-blur-md ${darkMode ? 'bg-[#1e293b]/80' : 'bg-[#f0fff1]/80'} border-b ${darkMode ? 'border-[#1e293b]' : 'border-[#e9ecef]'}`}>
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">Mionitra</h1>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map(item => (
            <a key={item.href} href={item.href} className="hover:text-[#6366f1] transition-colors duration-200 cursor-pointer">{item.label}</a>
          ))}

          <div className="flex items-center gap-3">
            <button
              onClick={toggleDarkMode}
              className={`py-2 px-2.5 rounded-full !rounded-button whitespace-nowrap cursor-pointer ${darkMode ? 'bg-[#f8fafc] text-[#0f172a]' : 'bg-[#1e293b] text-[#f0fff1]'}`}
            >
              {darkMode ? <Sun /> : <Moon />}
            </button>

            <div className={`flex items-center gap-1 rounded-full p-1 ${darkMode ? 'bg-white/5' : 'bg-slate-100/60'}`}>
              <button
                aria-label="Switch to English"
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 rounded-full text-sm transition ${language === 'en' ? (darkMode ? 'bg-white/50 text-white' : 'bg-blue-200 text-slate-900') : 'opacity-70'}`}
              >
                EN
              </button>
              <button
                aria-label="Switch to French"
                onClick={() => setLanguage('fr')}
                className={`px-3 py-1 rounded-full text-sm transition ${language === 'fr' ? (darkMode ? 'bg-white/50 text-white' : 'bg-blue-200 text-slate-900') : 'opacity-70'}`}
              >
                FR
              </button>
            </div>
          </div>
        </nav>

        <div className="md:hidden flex items-center space-x-4">
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-full !rounded-button whitespace-nowrap cursor-pointer ${darkMode ? 'bg-[#f8fafc] text-[#0f172a]' : 'bg-[#1e293b] text-[#f0fff1]'}`}
          >
            {darkMode ? <Sun /> : <Moon />}
          </button>

          <button onClick={toggleMenu} className="text-2xl cursor-pointer">
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} ${darkMode ? 'bg-[#1e293b]' : 'bg-[#f0fff1]'} border-b ${darkMode ? 'border-[#1e293b]' : 'border-[#e9ecef]'}`}>
        <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
          {navItems.map(item => (
            <a key={item.href} href={item.href} className="hover:text-[#6366f1] transition-colors duration-200 cursor-pointer" onClick={() => setIsMenuOpen(false)}>{item.label}</a>
          ))}
          <div className={`flex items-center gap-1 rounded-full p-1 ${darkMode ? 'bg-white/5' : 'bg-slate-100/60'}`}>
            <button
              aria-label="Switch to English"
              onClick={() => setLanguage('en')}
              className={`flex-1 px-3 py-1 rounded-full text-sm transition ${language === 'en' ? (darkMode ? 'bg-white/50 text-white' : 'bg-blue-200 text-slate-900') : 'opacity-70'}`}
            >
              EN
            </button>
            <button
              aria-label="Switch to French"
              onClick={() => setLanguage('fr')}
              className={`flex-1 px-3 py-1 rounded-full text-sm transition ${language === 'fr' ? (darkMode ? 'bg-white/50 text-white' : 'bg-blue-200 text-slate-900') : 'opacity-70'}`}
            >
              FR
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
