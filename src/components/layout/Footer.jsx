import React from 'react'
import { ArrowUp } from 'lucide-react'
import { useTheme } from '@/context/ThemeContext'
import { useLanguage } from '@/context/LanguageContext'
import translations from '@/i18n/translations'

export default function Footer() {
  const { darkMode } = useTheme()
  const { language } = useLanguage()
  const year = new Date().getFullYear()
  const t = translations[language].footer

  return (
    <footer className={`py-10 ${darkMode ? 'bg-[#1e293b]' : 'bg-[#e9ecef]'}`}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            &copy; {year} &mdash; {t.rights}
          </div>
        </div>
      </div>

      <a
        href="#home"
        className={`fixed bottom-6 right-6 w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-200 cursor-pointer ${darkMode ? 'bg-[#818cf8] text-white' : 'bg-[#6366f1] text-white'} shadow-lg`}
      >
        <ArrowUp />
      </a>
    </footer>
  )
}
