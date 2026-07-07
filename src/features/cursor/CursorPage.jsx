import { useEffect, useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import translations from '@/i18n/translations'
import CursorEffect from './CursorEffect'

export default function CursorPage() {
  const { language } = useLanguage()
  const t = translations[language].cursor
  const [y, setY] = useState(0)
  const [x, setX] = useState(0)

  useEffect(() => {
    const handleMouseMovement = (e) => { setX(e.clientX); setY(e.clientY) }
    document.addEventListener('mousemove', handleMouseMovement)
    return () => document.removeEventListener('mousemove', handleMouseMovement)
  }, [])

  return (
    <div className="h-screen w-screen bg-gray-950 items-center justify-center flex text-4xl font-bold relative overflow-hidden">
      <div className="w-3/4 text-white text-center lg:text-5xl text-2xl leading-relaxed lg:leading-[100px]">{t.text}</div>
      <CursorEffect x={x} y={y} />
    </div>
  )
}
