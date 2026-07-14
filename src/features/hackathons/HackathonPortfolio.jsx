import { Trophy, Award, Heart, Code, Calendar, Users, ArrowRight, ArrowLeft } from 'lucide-react'
import { useTheme } from '@/context/ThemeContext'
import { useLanguage } from '@/context/LanguageContext'
import translations from '@/i18n/translations'

const projectsData = (language) => [
  { id: 1, title: 'DevFest Antsirabe', date: 'Oct 18–19, 2025', rank: language === 'fr' ? '1er prix' : '1st place', icon: Trophy, description: language === 'fr' ? 'Application web utilisant l\'IA pour proposer des idées d\'entreprise et suivre leur évolution.' : 'Web application using AI to suggest business ideas and track their evolution.', tags: ['AI', 'Business', 'Web App'] },
  { id: 2, title: 'INSI DevWeb Hackathon', date: 'Feb 2025', rank: language === 'fr' ? '3e place' : '3rd place', icon: Award, description: language === 'fr' ? 'Application web pour le suivi des animaux endémiques dans les réserves naturelles et la surveillance de la déforestation.' : 'Web application for tracking endemic animals in nature reserves and monitoring deforestation.', tags: ['Ecology', 'Conservation', 'Web'] },
  { id: 3, title: 'Stupid Hackathon', date: 'Jul 26, 2025', rank: language === 'fr' ? 'Coup de cœur du jury' : 'Jury\'s favorite', icon: Heart, description: language === 'fr' ? 'Projet humoristique présenté lors d\'un hackathon non conventionnel.' : 'Humorous project presented at an unconventional hackathon.', tags: ['Fun', 'Creativity', 'Innovation'] },
  { id: 4, title: 'MAT', date: 'Aug 2025', rank: language === 'fr' ? 'Participation' : 'Participation', icon: Code, description: language === 'fr' ? 'Résolution d\'algorithmes complexes en Python sous contrainte de temps.' : 'Solving complex algorithms in Python under time constraints.', tags: ['Python', 'Algorithms', 'Performance'] },
  { id: 5, title: 'Webcup Madagascar', date: 'May 2025', rank: language === 'fr' ? 'Participation' : 'Participation', icon: Calendar, description: language === 'fr' ? 'Développement en 24 heures de \'The End Page\', une plateforme pour rédiger un message final avant un départ définitif.' : '24-hour development of \'The End Page\', a platform for writing a final message before a definitive departure.', tags: ['24h', 'Challenge', 'Platform'] },
  { id: 6, title: 'Redshalk Hackathon', date: 'Nov 29, 2024', rank: language === 'fr' ? 'Participation' : 'Participation', icon: Users, description: language === 'fr' ? 'Application pour le suivi des races de porcs et la gestion des exploitations.' : 'Application for tracking pig breeds and farm management.', tags: ['AgriTech', 'Management', 'Tracking'] },
]

export default function HackathonPortfolio() {
  const { darkMode } = useTheme()
  const { language } = useLanguage()

  const projects = projectsData(language)
  const t = translations[language].hackathons

  return (
    <div className={`min-h-screen px-4 py-20 transition-colors duration-500 ${darkMode ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950' : 'bg-gray-50'}`}>
      <div className="mx-auto max-w-5xl">
        <div className="mb-20 text-center">
          <h1 className={`mb-4 text-3xl font-bold md:text-6xl ${darkMode ? 'text-white' : 'text-slate-900'}`}>{t.title}</h1>
          <p className={`mx-auto max-w-2xl text-lg ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>{t.subtitle}</p>
        </div>

        <div className="relative">
          {/* Connecting line: left edge on mobile, centered from md up */}
          <div className={`absolute left-5 top-0 bottom-0 w-px md:left-1/2 md:-translate-x-1/2 ${darkMode ? 'bg-slate-700' : 'bg-slate-300'}`} aria-hidden="true" />

          <div className="flex flex-col gap-10 md:gap-6">
            {projects.map((project, index) => {
              const Icon = project.icon
              const number = String(index + 1).padStart(2, '0')
              const isEven = index % 2 === 0

              const numberNode = (
                <div className="relative z-10 col-start-1 flex-shrink-0 md:col-start-2">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 text-sm font-bold text-white shadow-lg ring-4 ${darkMode ? 'ring-slate-950' : 'ring-gray-50'}`}>
                    {number}
                  </div>
                </div>
              )

              const iconNode = (
                <div className={`hidden h-11 w-11 flex-shrink-0 items-center justify-center rounded-full md:flex ${darkMode ? 'border border-slate-700 bg-slate-800' : 'border border-slate-200 bg-white shadow-sm'}`}>
                  <Icon className={`h-5 w-5 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                </div>
              )

              const arrowNode = isEven ? (
                <ArrowRight className={`hidden h-5 w-5 flex-shrink-0 md:block ${darkMode ? 'text-slate-600' : 'text-slate-400'}`} aria-hidden="true" />
              ) : (
                <ArrowLeft className={`hidden h-5 w-5 flex-shrink-0 md:block ${darkMode ? 'text-slate-600' : 'text-slate-400'}`} aria-hidden="true" />
              )

              const card = (
                <div className={`w-full rounded-2xl p-5 md:p-6 ${darkMode ? 'border border-white/10 bg-slate-800/50 backdrop-blur-sm' : 'border border-slate-200 bg-white/80'}`}>
                  <div className="mb-3 flex items-center gap-2 md:hidden">
                    <div className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full ${darkMode ? 'border border-slate-700 bg-slate-800' : 'border border-slate-200 bg-white'}`}>
                      <Icon className={`h-4 w-4 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                    </div>
                    <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>{project.title}</h3>
                  </div>

                  <h3 className={`mb-2 hidden text-xl font-bold md:block ${darkMode ? 'text-white' : 'text-slate-900'}`}>{project.title}</h3>

                  <div className="mb-3 flex flex-wrap items-center gap-2">
                    <span className={`flex items-center gap-1.5 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      <Calendar className="h-4 w-4" aria-hidden="true" />
                      {project.date}
                    </span>
                    <span className="rounded-full bg-gradient-to-r from-blue-500 to-blue-600 px-3 py-1 text-xs font-semibold text-white">
                      {project.rank}
                    </span>
                  </div>

                  <p className={`mb-4 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>{project.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, i) => (
                      <span key={i} className={`rounded-full px-3 py-1 text-xs ${darkMode ? 'border border-slate-600/50 bg-slate-700/50 text-gray-300' : 'border border-slate-200 bg-slate-50 text-slate-700'}`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )

              return (
                <div key={project.id} className="relative">
                  {/* Mobile: number on the line, card to the right */}
                  <div className="grid grid-cols-[2.5rem_1fr] items-start gap-4 md:hidden">
                    {numberNode}
                    <div className="pt-1">{card}</div>
                  </div>

                  {/* Desktop: alternating sides around the center line */}
                  {isEven ? (
                    <div className="hidden md:grid md:grid-cols-[1fr_2.5rem_1fr] md:items-center md:gap-4">
                      <div className="flex items-center justify-end gap-3">
                        {iconNode}
                        {arrowNode}
                      </div>
                      {numberNode}
                      <div>{card}</div>
                    </div>
                  ) : (
                    <div className="hidden md:grid md:grid-cols-[1fr_2.5rem_1fr] md:items-center md:gap-4">
                      <div className="flex justify-end">{card}</div>
                      {numberNode}
                      <div className="flex items-center gap-3">
                        {arrowNode}
                        {iconNode}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-6 md:mt-20 md:grid-cols-4">
          {[
            { label: language === 'fr' ? 'Hackathons' : 'Hackathons', value: '6', icon: Trophy },
            { label: language === 'fr' ? 'Récompenses' : 'Awards won', value: '3', icon: Award },
            { label: language === 'fr' ? 'Projets créés' : 'Projects created', value: '10+', icon: Code },
            { label: language === 'fr' ? 'Heures de code' : 'Hours of code', value: '100+', icon: Calendar },
          ].map((stat, i) => {
            const StatIcon = stat.icon
            return (
              <div key={i} className={`rounded-xl p-6 text-center ${darkMode ? 'border border-slate-700/50 bg-slate-800/30' : 'border border-slate-200 bg-white'}`}>
                <StatIcon className={`mx-auto mb-2 h-8 w-8 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                <div className={`mb-1 text-3xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>{stat.value}</div>
                <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{stat.label}</div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}