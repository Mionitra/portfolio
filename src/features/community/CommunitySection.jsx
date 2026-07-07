import { useEffect, useRef, useState } from 'react'
import gsap, { ScrollTrigger } from '@/lib/gsap'
import * as LucideIcons from 'lucide-react'
const { ChevronRight, Star, Code2 } = LucideIcons
import { useTheme } from '@/context/ThemeContext'
import { useLanguage } from '@/context/LanguageContext'
import translations from '@/i18n/translations'
import { getRoles } from '@/data/community'

function RoleCard({ role, index, darkMode, seeMoreLabel }) {
  const cardRef = useRef(null)
  const imageRef = useRef(null)
  const lineRef = useRef(null)
  const [hovered, setHovered] = useState(false)
  const Icon = LucideIcons[role.icon]

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(cardRef.current, { opacity: 0, y: 60, rotateX: 8 }, { opacity: 1, y: 0, rotateX: 0, duration: 0.9, delay: index * 0.15, ease: 'power3.out', scrollTrigger: { trigger: cardRef.current, start: 'top 88%', toggleActions: 'play none none reverse' } })
      gsap.fromTo(lineRef.current, { scaleX: 0 }, { scaleX: 1, duration: 0.7, delay: index * 0.15 + 0.35, ease: 'power2.out', scrollTrigger: { trigger: cardRef.current, start: 'top 88%', toggleActions: 'play none none reverse' } })
    }, cardRef)
    return () => ctx.revert()
  }, [index])

  useEffect(() => {
    if (!imageRef.current) return
    gsap.to(imageRef.current, { scale: hovered ? 1.07 : 1, duration: 0.55, ease: 'power2.out' })
  }, [hovered])

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ transformStyle: 'preserve-3d' }}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border transition-all duration-500 ${
        darkMode
          ? `bg-white/[0.03] ${hovered ? 'border-blue-500/40 bg-white/5' : 'border-white/10'} shadow-lg ${hovered ? 'shadow-blue-500/10' : ''}`
          : `bg-white/80 ${hovered ? 'border-blue-500/40' : 'border-slate-200'} shadow-lg ${hovered ? 'shadow-blue-500/10' : ''}`
      }`}
    >
      <div className={`pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-blue-500/20 blur-3xl transition-opacity duration-500 ${hovered ? 'opacity-100' : 'opacity-40'}`} aria-hidden="true" />
      <div className="relative h-44 overflow-hidden">
        <div className={`absolute inset-0 z-[2] bg-gradient-to-b from-transparent via-transparent ${darkMode ? 'to-slate-950' : 'to-white'}`} />
        <img ref={imageRef} src={role.image} alt={role.org} className="block h-full w-full origin-center object-cover" />
        <div className="absolute left-3.5 top-3.5 z-[3] rounded-full border border-blue-400/50 bg-blue-500/25 px-3 py-1 font-['Space_Grotesk',sans-serif] text-[0.68rem] uppercase tracking-wider text-blue-100 backdrop-blur-sm">{role.tag}</div>
      </div>
      <div className="relative z-[1] flex flex-1 flex-col gap-3 px-6 py-6">
        <div className={`font-['Space_Grotesk',sans-serif] text-xs tracking-widest ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>{role.period}</div>
        <div>
          <div className={`font-['Space_Grotesk',sans-serif] text-2xl font-extrabold leading-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>{role.title}</div>
          <div className={`mt-0.5 font-['Space_Grotesk',sans-serif] text-lg font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>{role.org}</div>
          <div className={`mt-0.5 text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{role.full}</div>
        </div>
        <div ref={lineRef} className={`h-px origin-left bg-gradient-to-r ${darkMode ? 'from-blue-500/70' : 'from-blue-500/50'} to-transparent`} />
        <p className={`flex-1 text-sm leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>{role.description}</p>
        <div className="mt-1 flex items-center justify-between">
          <div className={`flex items-center gap-1.5 text-xs ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
            <Icon size={14} className={darkMode ? 'text-blue-400' : 'text-blue-600'} />
            {role.stat}
          </div>
          <div className={`flex items-center gap-1 text-xs transition-opacity duration-300 ${darkMode ? 'text-blue-400' : 'text-blue-600'} ${hovered ? 'opacity-100' : 'opacity-0'}`}>
            {seeMoreLabel} <ChevronRight size={13} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CommunitySection() {
  const { darkMode } = useTheme()
  const { language } = useLanguage()
  const lang = (language || 'en').toLowerCase().startsWith('fr') ? 'fr' : 'en'
  const roles = getRoles(lang)
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const subtitleRef = useRef(null)
  const badgeRef = useRef(null)
  const orbRef1 = useRef(null)
  const orbRef2 = useRef(null)
  const t = translations[lang].community

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(orbRef1.current, { y: -30, x: 20, duration: 5, repeat: -1, yoyo: true, ease: 'sine.inOut' })
      gsap.to(orbRef2.current, { y: 25, x: -15, duration: 6.5, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 1 })
      gsap.fromTo(badgeRef.current, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', delay: 0.1 })
      gsap.fromTo(headerRef.current, { opacity: 0, y: 30, clipPath: 'inset(0 0 100% 0)' }, { opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)', duration: 1, ease: 'power3.out', delay: 0.25 })
      gsap.fromTo(subtitleRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 0.55 })
    }, sectionRef)
    return () => ctx.revert()
  }, [lang])

  return (
    <section ref={sectionRef} className={`relative overflow-hidden px-6 py-20 transition-colors duration-500 md:px-10 lg:px-20 ${darkMode ? 'bg-slate-950' : 'bg-slate-50'}`}>
      <div ref={orbRef1} className="pointer-events-none absolute left-[5%] top-[10%] h-72 w-72 rounded-full bg-blue-500/15 blur-3xl" aria-hidden="true" />
      <div ref={orbRef2} className="pointer-events-none absolute bottom-[10%] right-[5%] h-80 w-80 rounded-full bg-blue-600/10 blur-3xl" aria-hidden="true" />
      <div className="relative z-10 mx-auto max-w-6xl">
        <div ref={badgeRef} className={`mb-7 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 ${darkMode ? 'border-blue-500/30 bg-blue-500/10' : 'border-blue-500/30 bg-blue-500/5'}`}>
          <Star size={12} className="fill-blue-500 text-blue-500" />
          <span className={`font-['Space_Grotesk',sans-serif] text-[0.65rem] uppercase tracking-[0.2em] ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>{t.badge}</span>
        </div>
        <h2 ref={headerRef} className={`mb-4 max-w-2xl font-['Space_Grotesk',sans-serif] text-[clamp(2.2rem,5vw,3.8rem)] font-extrabold leading-[1.1] ${darkMode ? 'text-white' : 'text-slate-900'}`}>
          {t.titleLine1}{' '}
          <span className="bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">{t.titleAccent}</span>
          <br />{t.titleLine2}
        </h2>
        <p ref={subtitleRef} className={`mb-14 max-w-xl text-base leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>{t.subtitle}</p>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {roles.map((role, i) => (
            <RoleCard key={role.id} role={role} index={i} darkMode={darkMode} seeMoreLabel={t.seeMore} />
          ))}
        </div>
        <div className="mt-16 flex items-center gap-4 opacity-40">
          <div className={`h-px flex-1 bg-gradient-to-r from-transparent via-transparent ${darkMode ? 'to-blue-400/50' : 'to-blue-600/50'}`} />
          <Code2 size={14} className={darkMode ? 'text-blue-400' : 'text-blue-600'} />
          <span className={`font-['Space_Grotesk',sans-serif] text-[0.65rem] tracking-[0.15em] ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>COMMUNITY · IMPACT · TECH</span>
          <Code2 size={14} className={darkMode ? 'text-blue-400' : 'text-blue-600'} />
          <div className={`h-px flex-1 bg-gradient-to-l from-transparent ${darkMode ? 'to-blue-400/50' : 'to-blue-600/50'}`} />
        </div>
      </div>
    </section>
  )
}
