import { useEffect, useState, useRef, useCallback } from 'react'
import gsap from '@/lib/gsap'
import * as LucideIcons from 'lucide-react'
import { useTheme } from '@/context/ThemeContext'
import { useLanguage } from '@/context/LanguageContext'
import translations from '@/i18n/translations'
import skillsData from '@/data/skills'

const AUTOPLAY_INTERVAL = 4000
const RESUME_DELAY = 3500
const STEP_X_PERCENT = 62
const STEP_ROTATE = 38
const STEP_Z = 140
const STEP_SCALE = 0.16
const STEP_OPACITY = 0.32
const MAX_VISIBLE_OFFSET = 3

export default function SkillsSection() {
  const { darkMode } = useTheme()
  const { language } = useLanguage()

  const [activeCategory, setActiveCategory] = useState('all')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const touchState = useRef({ startX: 0, endX: 0 })
  const autoPlayTimer = useRef(null)
  const resumeTimer = useRef(null)
  const cardRefs = useRef([])
  const sliderRef = useRef(null)
  const blobARef = useRef(null)
  const blobBRef = useRef(null)

  const skills = skillsData(language)
  const filteredSkills = activeCategory === 'all' ? skills : skills.filter(skill => skill.category === activeCategory)
  const len = filteredSkills.length
  const categories = ['all', 'frontend', 'backend', 'mobile', 'database', 'others']
  const t = translations[language].skills

  const goTo = useCallback((index) => {
    if (len === 0) return
    setCurrentIndex(((index % len) + len) % len)
  }, [len])

  const pauseThenResume = useCallback(() => {
    setIsAutoPlaying(false)
    if (resumeTimer.current) clearTimeout(resumeTimer.current)
    resumeTimer.current = setTimeout(() => setIsAutoPlaying(true), RESUME_DELAY)
  }, [])

  const handlePrevious = () => { goTo(currentIndex - 1); pauseThenResume() }
  const handleNext = () => { goTo(currentIndex + 1); pauseThenResume() }
  const handleDotOrCardClick = (index) => { goTo(index); pauseThenResume() }

  useEffect(() => {
    if (isAutoPlaying && len > 1) {
      autoPlayTimer.current = setInterval(() => setCurrentIndex(prev => (prev + 1) % len), AUTOPLAY_INTERVAL)
    }
    return () => clearInterval(autoPlayTimer.current)
  }, [isAutoPlaying, len])

  useEffect(() => {
    return () => { clearInterval(autoPlayTimer.current); clearTimeout(resumeTimer.current) }
  }, [])

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'ArrowLeft') handlePrevious()
      else if (e.key === 'ArrowRight') handleNext()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [currentIndex, len])

  const handleTouchStart = (e) => { touchState.current.startX = e.targetTouches[0].clientX; setIsAutoPlaying(false) }
  const handleTouchMove = (e) => { touchState.current.endX = e.targetTouches[0].clientX }
  const handleTouchEnd = () => {
    const { startX, endX } = touchState.current
    if (!startX || !endX) { pauseThenResume(); return }
    const distance = startX - endX
    if (distance > 50) handleNext()
    else if (distance < -50) handlePrevious()
    else pauseThenResume()
    touchState.current = { startX: 0, endX: 0 }
  }

  useEffect(() => {
    cardRefs.current.forEach((el, index) => {
      if (!el) return
      let raw = index - currentIndex
      if (raw > len / 2) raw -= len
      if (raw < -len / 2) raw += len
      const abs = Math.abs(raw)
      const isActive = raw === 0
      const hidden = abs > MAX_VISIBLE_OFFSET
      gsap.to(el, {
        xPercent: raw * STEP_X_PERCENT,
        z: -abs * STEP_Z,
        rotationY: -raw * STEP_ROTATE,
        scale: Math.max(0.4, 1 - abs * STEP_SCALE),
        opacity: hidden ? 0 : Math.max(0, 1 - abs * STEP_OPACITY),
        zIndex: 100 - abs,
        duration: 0.75,
        ease: 'power3.out',
        pointerEvents: hidden ? 'none' : 'auto',
        overwrite: 'auto',
      })
      const chips = el.querySelector('[data-chips]')
      if (chips) {
        gsap.to(chips, { opacity: isActive ? 1 : 0, y: isActive ? 0 : 8, duration: 0.5, delay: isActive ? 0.25 : 0, ease: 'power2.out' })
      }
    })
  }, [currentIndex, len])

  useEffect(() => {
    const tl = gsap.timeline({ repeat: -1, yoyo: true, defaults: { ease: 'sine.inOut' } })
    tl.to(blobARef.current, { x: 40, y: -30, duration: 8 }, 0)
    tl.to(blobBRef.current, { x: -50, y: 20, duration: 9 }, 0)
    return () => tl.kill()
  }, [])

  return (
    <section id="skills" className={`relative overflow-hidden py-20 transition-colors duration-500 ${darkMode ? 'bg-slate-950' : 'bg-slate-50'}`}>
      <div ref={blobARef} className={`pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full blur-3xl ${darkMode ? 'bg-blue-500/20' : 'bg-blue-500/20'}`} aria-hidden="true" />
      <div ref={blobBRef} className={`pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full blur-3xl ${darkMode ? 'bg-blue-600/15' : 'bg-blue-600/15'}`} aria-hidden="true" />

      <div className="relative z-10 container mx-auto px-4">
        <h2 className="mb-8 text-center text-4xl font-bold">
          <span className="bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">{t.title}</span>
        </h2>

        <div className="mb-14 flex flex-wrap justify-center gap-3">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`rounded-full px-6 py-2 text-sm font-semibold transition-all duration-300 sm:text-base ${
                activeCategory === category
                  ? 'scale-105 bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30'
                  : darkMode
                    ? 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
                    : 'bg-white text-slate-700 shadow-sm hover:bg-slate-100'
              }`}
            >
              {t.categories[category]}
            </button>
          ))}
        </div>

        {len > 0 ? (
          <div
            className="relative mx-auto flex h-[380px] max-w-5xl items-center justify-center sm:h-[420px] md:h-[460px]"
            style={{ perspective: '1400px' }}
            tabIndex={0}
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            <button
              onClick={handlePrevious}
              aria-label="Previous framework"
              className={`absolute left-0 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border backdrop-blur-xl transition-all duration-300 hover:scale-110 sm:h-12 sm:w-12 ${
                darkMode ? 'border-white/10 bg-white/5 text-white hover:bg-white/10' : 'border-slate-200 bg-white/60 text-slate-700 hover:bg-white/90'
              }`}
            >
              <LucideIcons.ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>

            <button
              onClick={handleNext}
              aria-label="Next framework"
              className={`absolute right-0 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border backdrop-blur-xl transition-all duration-300 hover:scale-110 sm:h-12 sm:w-12 ${
                darkMode ? 'border-white/10 bg-white/5 text-white hover:bg-white/10' : 'border-slate-200 bg-white/60 text-slate-700 hover:bg-white/90'
              }`}
            >
              <LucideIcons.ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>

            <div
              ref={sliderRef}
              className="relative h-full w-full"
              style={{ transformStyle: 'preserve-3d' }}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {filteredSkills.map((skill, index) => {
                const IconComponent = LucideIcons[skill.icon]
                const isActive = index === currentIndex
                return (
                  <div
                    key={`${activeCategory}-${skill.name}`}
                    ref={(el) => (cardRefs.current[index] = el)}
                    onClick={() => !isActive && handleDotOrCardClick(index)}
                    className="absolute inset-0 m-auto flex h-[320px] w-52 flex-col items-center justify-center rounded-3xl px-6 py-8 text-center sm:h-[360px] sm:w-60 md:h-[400px] md:w-72"
                    style={{ cursor: isActive ? 'default' : 'pointer', backfaceVisibility: 'hidden' }}
                  >
                    <div className={`flex h-full w-full flex-col items-center justify-center rounded-3xl border transition-all duration-500 ${
                      isActive
                        ? darkMode ? 'border-white/20 bg-white/10 shadow-2xl shadow-blue-500/20 backdrop-blur-xl' : 'border-white/60 bg-white/50 shadow-2xl shadow-blue-500/10 backdrop-blur-xl'
                        : darkMode ? 'border-white/5 bg-white/5 backdrop-blur-md' : 'border-slate-200/60 bg-white/30 backdrop-blur-md'
                    }`}>
                      {IconComponent && (
                        <IconComponent className={`mb-4 h-14 w-14 sm:h-16 sm:w-16 md:h-20 md:w-20 ${skill.iconColor}`} strokeWidth={1.5} />
                      )}
                      <div className={`mb-1 text-xs font-semibold tracking-wide sm:text-sm ${darkMode ? 'text-blue-300' : 'text-blue-600'}`}>{skill.proficiency}%</div>
                      <div className={`text-xl font-bold sm:text-2xl ${darkMode ? 'text-white' : 'text-slate-900'}`}>{skill.name}</div>
                      <div className={`mt-1 text-xs uppercase tracking-wider sm:text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{t.categories[skill.category]}</div>
                      {skill.keySkills && skill.keySkills.length > 0 && (
                        <div data-chips className="mt-4 flex flex-wrap items-center justify-center gap-1.5 opacity-0">
                          {skill.keySkills.slice(0, 4).map((keySkill, idx) => (
                            <span key={idx} className={`rounded-full px-2.5 py-1 text-[10px] font-medium sm:text-xs ${darkMode ? 'bg-white/10 text-slate-200' : 'bg-slate-900/5 text-slate-700'}`}>{keySkill}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ) : (
          <div className="py-12 text-center">
            <p className={`text-xl ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{t.noSkills}</p>
          </div>
        )}

        {len > 1 && (
          <div className="mt-8 flex justify-center gap-2">
            {filteredSkills.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotOrCardClick(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentIndex === index ? 'w-8 bg-gradient-to-r from-blue-500 to-blue-600' : darkMode ? 'w-2 bg-slate-700 hover:bg-slate-600' : 'w-2 bg-slate-300 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>
        )}

        {len > 1 && (
          <div className="mt-4 flex justify-center">
            <button
              onClick={() => setIsAutoPlaying(prev => !prev)}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-300 ${darkMode ? 'bg-slate-800/80 text-slate-300 hover:bg-slate-700' : 'bg-white text-slate-700 shadow-sm hover:bg-slate-100'}`}
            >
              {isAutoPlaying ? (
                <><LucideIcons.Pause className="h-4 w-4" />{t.pause}</>
              ) : (
                <><LucideIcons.Play className="h-4 w-4" />{t.autoPlay}</>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
