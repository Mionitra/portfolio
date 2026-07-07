import { useLayoutEffect, useRef } from 'react'
import gsap from '@/lib/gsap'
import { useTheme } from '@/context/ThemeContext'
import { useLanguage } from '@/context/LanguageContext'
import translations from '@/i18n/translations'

export default function Hero() {
  const { darkMode } = useTheme()
  const { language } = useLanguage()

  const lang = (language || 'en').toLowerCase().startsWith('fr') ? 'fr' : 'en'
  const t = translations[lang].hero

  const sectionRef = useRef(null)
  const bgRef = useRef(null)
  const titleTopRef = useRef(null)
  const titleBottomRef = useRef(null)
  const screensRef = useRef(null)
  const descTopRightRef = useRef(null)
  const descBottomLeftRef = useRef(null)

  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set([bgRef.current, titleTopRef.current, titleBottomRef.current, screensRef.current, descTopRightRef.current, descBottomLeftRef.current], { clearProps: 'all' })
        return
      }
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.fromTo(bgRef.current, { opacity: 0, scale: 1.08 }, { opacity: 1, scale: 1, duration: 1.6, ease: 'power2.out' }, 0)
        .fromTo(titleTopRef.current, { x: -80, opacity: 0 }, { x: 0, opacity: 1, duration: 1.1 }, 0.15)
        .fromTo(titleBottomRef.current, { x: 80, opacity: 0 }, { x: 0, opacity: 1, duration: 1.1 }, 0.25)
        .fromTo(screensRef.current, { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.2 }, 0.3)
        .fromTo([descTopRightRef.current, descBottomLeftRef.current], { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, stagger: 0.2 }, 0.55)
      gsap.to(screensRef.current, { y: -16, duration: 2.6, ease: 'sine.inOut', yoyo: true, repeat: -1 })
      gsap.to(bgRef.current, { yPercent: 10, ease: 'none', scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: 'bottom top', scrub: true } })
      gsap.to(screensRef.current, { yPercent: -6, ease: 'none', scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: 'bottom top', scrub: true } })
    }, sectionRef)
    return () => ctx.revert()
  }, [lang])

  return (
    <section
      ref={sectionRef}
      className={`relative isolate flex min-h-screen w-full flex-col overflow-hidden transition-colors duration-500 ${darkMode ? 'bg-slate-950' : 'bg-white'}`}
    >
      <div ref={bgRef} className="pointer-events-none absolute inset-0 bg-center bg-no-repeat bg-cover will-change-transform" style={{ backgroundImage: "url('/images/waves.png')" }} aria-hidden="true" />
      <div className={`pointer-events-none absolute inset-0 transition-colors duration-500 ${darkMode ? 'bg-slate-950/65' : 'bg-white/50'}`} aria-hidden="true" />
      <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${darkMode ? 'from-blue-500/10 via-transparent to-transparent' : 'from-blue-500/5 via-transparent to-transparent'}`} aria-hidden="true" />

      <div className="relative z-10 mx-auto flex w-full max-w-[1600px] flex-1 flex-col px-6 py-10 sm:px-10 md:px-14 md:py-14 lg:px-20">
        <div className="flex flex-1 flex-col items-start justify-start gap-6 md:flex-row md:items-start md:justify-between">
          <h1 ref={titleTopRef} className={`font-['Space_Grotesk',sans-serif] text-[clamp(2.75rem,9vw,7.5rem)] font-bold leading-[0.95] tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            {t.titleTop}
          </h1>
          <p ref={descTopRightRef} className={`max-w-[420px] font-['Inter',sans-serif] text-base leading-relaxed sm:text-lg md:text-right ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
            {t.descTopRight}
          </p>
        </div>

        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <img
            ref={screensRef}
            src="/images/screens.png"
            alt={t.screensAlt}
            draggable={false}
            className="w-[68%] max-w-[760px] min-w-[220px] select-none drop-shadow-2xl sm:w-[55%] md:w-[44%]"
            onError={(e) => { e.currentTarget.style.display = 'none' }}
          />
        </div>

        <div className="flex flex-1 flex-col items-start justify-end gap-3 md:flex-row md:items-end md:justify-between md:gap-6">
          <p ref={descBottomLeftRef} className={`max-w-[420px] font-['Inter',sans-serif] text-base leading-relaxed sm:text-lg md:mb-6 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
            {t.descBottomLeft}
          </p>
          <h2 ref={titleBottomRef} className={`self-end font-['Space_Grotesk',sans-serif] text-[clamp(2.75rem,9vw,7.5rem)] font-bold leading-[0.95] tracking-tight text-right`}>
            <span className="bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">{t.titleBottom}</span>
          </h2>
        </div>
      </div>
    </section>
  )
}
