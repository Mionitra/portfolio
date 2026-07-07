import { Facebook, Github, Globe, Linkedin, Mail, MapPin } from 'lucide-react'
import { useTheme } from '@/context/ThemeContext'
import { useLanguage } from '@/context/LanguageContext'
import translations from '@/i18n/translations'

const LOCATION_COORDS = '-18.95056447517788,47.50703292274993'
const WEBSITE_URL = 'https://portfolio-2025-iota-two.vercel.app/'

export default function ContactSection() {
  const { darkMode } = useTheme()
  const { language } = useLanguage()
  const t = translations[language].contact

  const infoRows = [
    { icon: Mail, label: 'Email', value: 'rlmionitra@gmail.com', href: 'mailto:rlmionitra@gmail.com' },
    { icon: MapPin, label: t.location, value: 'Madagascar, Antananarivo, Tanjombato', href: `https://www.google.com/maps?q=${LOCATION_COORDS}` },
    { icon: Globe, label: t.website, value: WEBSITE_URL, href: WEBSITE_URL },
  ]

  return (
    <section id="contact" className={`py-20 ${darkMode ? 'bg-[#0f172a]' : 'bg-[#f0fff1]'}`}>
      <div className="mx-auto w-full px-4 md:w-1/2">
        <h2 className="mb-16 text-center text-4xl font-bold">
          <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">{t.title}</span>
        </h2>
        <div className="grid grid-cols-1 gap-12">
          <div>
            <h3 className="mb-6 text-2xl font-bold">{t.subtitle}</h3>
            <p className={`mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{t.description}</p>
            <div className="space-y-4">
              {infoRows.map(({ icon: IconComponent, label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('mailto:') ? undefined : '_blank'}
                  rel={href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                  className={`group flex items-center gap-4 rounded-xl p-2 -m-2 transition-colors duration-200 ${darkMode ? 'hover:bg-[#1e293b]/60' : 'hover:bg-[#e9ecef]/60'}`}
                >
                  <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full transition-colors duration-200 ${darkMode ? 'bg-[#1e293b] group-hover:bg-[#6366f1]' : 'bg-[#e9ecef] group-hover:bg-[#6366f1]'}`}>
                    <IconComponent className="text-[#6366f1] transition-colors duration-200 group-hover:text-white" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-semibold">{label}</h4>
                    <p className={`truncate transition-colors duration-200 ${darkMode ? 'text-gray-300 group-hover:text-white' : 'text-gray-600 group-hover:text-gray-900'}`}>{value}</p>
                  </div>
                </a>
              ))}
            </div>
            <div className="mt-8 flex gap-4">
              <a href="https://github.com/Mionitra" target="_blank" rel="noopener noreferrer" className={`flex h-12 w-12 cursor-pointer items-center justify-center rounded-full transition-colors duration-200 ${darkMode ? 'bg-[#1e293b] hover:bg-[#818cf8] hover:text-white' : 'bg-[#e9ecef] hover:bg-[#6366f1] hover:text-white'}`}><Github /></a>
              <a href="https://www.linkedin.com/in/lova-mionitra-rakotondradaoro-441954395/" target="_blank" rel="noopener noreferrer" className={`flex h-12 w-12 cursor-pointer items-center justify-center rounded-full transition-colors duration-200 ${darkMode ? 'bg-[#1e293b] hover:bg-[#818cf8] hover:text-white' : 'bg-[#e9ecef] hover:bg-[#6366f1] hover:text-white'}`}><Linkedin /></a>
              <a href="https://www.facebook.com/younah.yzuki" target="_blank" rel="noopener noreferrer" className={`flex h-12 w-12 cursor-pointer items-center justify-center rounded-full transition-colors duration-200 ${darkMode ? 'bg-[#1e293b] hover:bg-[#818cf8] hover:text-white' : 'bg-[#e9ecef] hover:bg-[#6366f1] hover:text-white'}`}><Facebook /></a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
