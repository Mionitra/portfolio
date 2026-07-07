import { useState, useRef, useLayoutEffect, useEffect } from 'react'
import { Trophy, Award, Heart, Code, Calendar, Users } from 'lucide-react'
import gsap, { ScrollTrigger } from '@/lib/gsap'
import { useTheme } from '@/context/ThemeContext'
import { useLanguage } from '@/context/LanguageContext'
import translations from '@/i18n/translations'

const projectsData = (language) => [
  { id: 1, title: 'DevFest Antsirabe', date: 'Oct 18–19, 2025', rank: language === 'fr' ? '1er prix' : '1st place', icon: Trophy, badge: '🥇', description: language === 'fr' ? 'Application web utilisant l\'IA pour proposer des idées d\'entreprise et suivre leur évolution.' : 'Web application using AI to suggest business ideas and track their evolution.', tags: ['AI', 'Business', 'Web App'] },
  { id: 2, title: 'INSI DevWeb Hackathon', date: 'Feb 2025', rank: language === 'fr' ? '3e place' : '3rd place', icon: Award, badge: '🥉', description: language === 'fr' ? 'Application web pour le suivi des animaux endémiques dans les réserves naturelles et la surveillance de la déforestation.' : 'Web application for tracking endemic animals in nature reserves and monitoring deforestation.', tags: ['Ecology', 'Conservation', 'Web'] },
  { id: 3, title: 'Stupid Hackathon', date: 'Jul 26, 2025', rank: language === 'fr' ? 'Coup de cœur du jury' : 'Jury\'s favorite', icon: Heart, badge: '❤️', description: language === 'fr' ? 'Projet humoristique présenté lors d\'un hackathon non conventionnel.' : 'Humorous project presented at an unconventional hackathon.', tags: ['Fun', 'Creativity', 'Innovation'] },
  { id: 4, title: 'MAT', date: 'Aug 2025', rank: language === 'fr' ? 'Participation' : 'Participation', icon: Code, badge: '💻', description: language === 'fr' ? 'Résolution d\'algorithmes complexes en Python sous contrainte de temps.' : 'Solving complex algorithms in Python under time constraints.', tags: ['Python', 'Algorithms', 'Performance'] },
  { id: 5, title: 'Webcup Madagascar', date: 'May 2025', rank: language === 'fr' ? 'Participation' : 'Participation', icon: Calendar, badge: '⚡', description: language === 'fr' ? 'Développement en 24 heures de \'The End Page\', une plateforme pour rédiger un message final avant un départ définitif.' : '24-hour development of \'The End Page\', a platform for writing a final message before a definitive departure.', tags: ['24h', 'Challenge', 'Platform'] },
  { id: 6, title: 'Redshalk Hackathon', date: 'Nov 29, 2024', rank: language === 'fr' ? 'Participation' : 'Participation', icon: Users, badge: '🐷', description: language === 'fr' ? 'Application pour le suivi des races de porcs et la gestion des exploitations.' : 'Application for tracking pig breeds and farm management.', tags: ['AgriTech', 'Management', 'Tracking'] },
]

export default function HackathonPortfolio() {
  const { darkMode } = useTheme()
  const { language } = useLanguage()
  const [activeIndex, setActiveIndex] = useState(0)
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const fillRef = useRef(null)
  const cardRefs = useRef([])
  const dotRefs = useRef([])
  const pulseTweenRef = useRef(null)

  const projects = projectsData(language)
  const t = translations[language].hackathons

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(fillRef.current, { scaleY: 0 }, { scaleY: 1, ease: 'none', transformOrigin: 'top center', scrollTrigger: { trigger: trackRef.current, start: 'top center', end: 'bottom center', scrub: 0.5 } })
      cardRefs.current.forEach((card, index) => {
        if (!card) return
        gsap.fromTo(card, { opacity: 0, y: 36, filter: 'blur(6px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8, ease: 'power2.out', scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'play none none none' } })
        ScrollTrigger.create({ trigger: card, start: 'top center', end: 'bottom center', onToggle: (self) => { if (self.isActive) setActiveIndex(index) } })
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [language])

  useEffect(() => {
    if (pulseTweenRef.current) pulseTweenRef.current.kill()
    const ring = dotRefs.current[activeIndex]?.querySelector('[data-pulse-ring]')
    if (!ring) return
    gsap.set(ring, { scale: 1, opacity: 0.55 })
    pulseTweenRef.current = gsap.to(ring, { scale: 2.1, opacity: 0, duration: 1.4, ease: 'power1.out', repeat: -1 })
    return () => pulseTweenRef.current?.kill()
  }, [activeIndex])

  return (
    <div ref={sectionRef} className={`min-h-screen px-4 py-20 transition-colors duration-500 ${darkMode ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950' : 'bg-gray-50'}`}>
      <div className="mx-auto max-w-5xl">
        <div className="mb-20 text-center">
          <h1 className={`mb-4 text-3xl font-bold md:text-6xl ${darkMode ? 'text-white' : 'text-slate-900'}`}>{t.title}</h1>
          <p className={`mx-auto max-w-2xl text-lg ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>{t.subtitle}</p>
        </div>

        <div ref={trackRef} className="relative">
          <div className={`absolute left-5 top-0 bottom-0 w-[3px] md:left-1/2 md:-translate-x-1/2 ${darkMode ? 'bg-slate-700/40' : 'bg-slate-300'}`} aria-hidden="true" />
          <div ref={fillRef} className="absolute left-5 top-0 bottom-0 w-[3px] origin-top bg-gradient-to-b from-blue-500 to-blue-600 md:left-1/2 md:-translate-x-1/2" style={{ transform: 'scaleY(0)' }} aria-hidden="true" />

          {projects.map((project, index) => {
            const Icon = project.icon
            const isLeft = index % 2 === 0
            const status = index < activeIndex ? 'completed' : index === activeIndex ? 'active' : 'future'

            return (
              <div key={project.id} className="relative mb-16 grid grid-cols-[2.5rem_1fr] items-start gap-4 md:mb-24 md:grid-cols-[1fr_2.5rem_1fr] md:gap-8">
                <div ref={(el) => (dotRefs.current[index] = el)} className="relative col-start-1 mt-1 flex h-6 w-6 items-center justify-center md:col-start-2">
                  {status === 'active' && <span data-pulse-ring className="absolute inset-0 rounded-full bg-blue-500" style={{ opacity: 0 }} aria-hidden="true" />}
                  <span className={`relative z-10 rounded-full transition-all duration-500 ${status === 'active' ? 'h-5 w-5 bg-gradient-to-br from-blue-500 to-blue-600 shadow-[0_0_16px_2px_rgba(59,130,246,0.65)]' : status === 'completed' ? 'h-3.5 w-3.5 bg-blue-500' : darkMode ? 'h-3 w-3 border-2 border-slate-600 bg-slate-800' : 'h-3 w-3 border-2 border-slate-300 bg-white'}`} />
                </div>

                <div ref={(el) => (cardRefs.current[index] = el)} className={`col-start-2 min-w-0 ${isLeft ? 'md:col-start-1' : 'md:col-start-3'}`}>
                  <div className={`flex flex-col rounded-2xl p-6 transition-all duration-500 hover:-translate-y-1 ${isLeft ? 'md:items-end md:text-right' : 'md:items-start md:text-left'} ${darkMode ? 'border border-white/10 bg-slate-800/50 backdrop-blur-sm hover:shadow-lg hover:shadow-blue-500/10' : 'border border-slate-200 bg-white/80 hover:shadow-lg hover:shadow-blue-500/10'}`}>
                    <div className={`mb-4 flex w-full items-center gap-3 ${isLeft ? 'md:flex-row-reverse' : ''}`}>
                      <div className="rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 p-3"><Icon className="h-6 w-6 text-white" /></div>
                      <span className="text-2xl leading-none">{project.badge}</span>
                    </div>
                    <span className={`mb-2 flex items-center gap-2 text-sm text-gray-400 ${isLeft ? 'md:flex-row-reverse' : ''}`}><Calendar className="h-4 w-4 shrink-0" />{project.date}</span>
                    <h3 className={`mb-2 text-xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>{project.title}</h3>
                    <span className="mb-4 inline-flex w-fit items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 px-3 py-1 text-sm font-semibold text-white">{project.rank}</span>
                    <p className={`mb-4 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>{project.description}</p>
                    <div className={`flex flex-wrap gap-2 ${isLeft ? 'md:justify-end' : ''}`}>
                      {project.tags.map((tag, i) => (
                        <span key={i} className={`rounded-full px-3 py-1 text-xs transition-colors duration-300 ${darkMode ? 'border border-slate-600/50 bg-slate-700/50 text-gray-300' : 'border border-slate-200 bg-white/60 text-slate-700'}`}>{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-4">
          {[
            { label: language === 'fr' ? 'Hackathons' : 'Hackathons', value: '6', icon: Trophy },
            { label: language === 'fr' ? 'Récompenses' : 'Awards won', value: '3', icon: Award },
            { label: language === 'fr' ? 'Projets créés' : 'Projects created', value: '10+', icon: Code },
            { label: language === 'fr' ? 'Heures de code' : 'Hours of code', value: '100+', icon: Calendar },
          ].map((stat, i) => {
            const StatIcon = stat.icon
            return (
              <div key={i} className={`rounded-xl p-6 text-center transition-all duration-300 hover:scale-105 ${darkMode ? 'border border-slate-700/50 bg-slate-800/30 hover:bg-slate-800/50' : 'border border-slate-200 bg-white hover:bg-white/80'}`}>
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
