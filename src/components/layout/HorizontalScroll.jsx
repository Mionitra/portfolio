import { useEffect, useRef } from 'react'
import gsap, { ScrollTrigger } from '@/lib/gsap'
import { useTheme } from '@/context/ThemeContext'
import CertificationsSection from '@/features/certifications/CertificationsSection'
import CursorPage from '@/features/cursor/CursorPage'
import HackathonPortfolio from '@/features/hackathons/HackathonPortfolio'

export default function HorizontalScroll() {
  const { darkMode } = useTheme()
  const sectionRef = useRef(null)
  const triggerRef = useRef(null)

  useEffect(() => {
    let pinAnim = null
    const setup = () => {
      if (pinAnim) {
        pinAnim.scrollTrigger.kill()
        pinAnim.kill()
        pinAnim = null
        ScrollTrigger.refresh()
      }
      const wrapper = sectionRef.current
      const firstSection = wrapper?.querySelector('.section-1')
      const extraHeight = firstSection ? Math.max(firstSection.scrollHeight - window.innerHeight, 0) : 0
      const totalHorizontalScroll = Math.max(wrapper.scrollWidth - window.innerWidth, 0)
      const startValue = `top top+=${Math.round(extraHeight)}`
      const endValue = `+=${Math.round(totalHorizontalScroll)}`
      pinAnim = gsap.fromTo(wrapper, { x: 0 }, { x: () => `-${window.innerWidth}px`, ease: 'none', duration: 1, scrollTrigger: { trigger: triggerRef.current, start: startValue, end: endValue, scrub: 1, pin: true, anticipatePin: 1, invalidateOnRefresh: true } })
    }
    setup()
    const onResize = () => { setup(); ScrollTrigger.refresh() }
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
      if (pinAnim) { pinAnim.scrollTrigger?.kill(); pinAnim.kill(); pinAnim = null }
    }
  }, [])

  return (
    <>
      <div className="min-h-screen overflow-x-hidden">
        <div ref={triggerRef}>
          <div className="main-wrapper flex w-[200vw] h-screen relative" ref={sectionRef}>
            <section className={`section-1 shrink-0 w-screen h-screen flex items-start justify-center ${darkMode ? 'bg-slate-900' : 'bg-slate-100'}`}>
              <div className="w-full overflow-auto max-h-screen">
                <CertificationsSection />
              </div>
            </section>
            <section className={`section-2 shrink-0 w-screen h-screen relative bg-cover bg-center ${darkMode ? 'bg-opacity-80' : ''}`}>
              <CursorPage />
            </section>
          </div>
        </div>
      </div>
      <div className="next-section overflow-x-hidden">
        <HackathonPortfolio />
      </div>
    </>
  )
}
