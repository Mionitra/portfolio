import { useState, useEffect, useRef, useCallback } from 'react'
import { createPortal } from 'react-dom'
import gsap from 'gsap'
import { ZoomIn, ZoomOut, RotateCcw, Download, X } from 'lucide-react'
import { useTheme } from '@/context/ThemeContext'
import { useLanguage } from '@/context/LanguageContext'
import translations from '@/i18n/translations'
import certificates from '@/data/certifications'

const MIN_ZOOM = 1
const MAX_ZOOM = 4
const ZOOM_STEP = 0.6
const clamp = (value, min, max) => Math.min(max, Math.max(min, value))

function CertificateModal({ cert, darkMode, language, onClose }) {
  const [displayScale, setDisplayScale] = useState(1)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef(null)
  const imgRef = useRef(null)
  const scaleRef = useRef(1)
  const panRef = useRef({ x: 0, y: 0 })
  const dragStartRef = useRef({ x: 0, y: 0, panX: 0, panY: 0 })
  const pinchRef = useRef({ distance: 0, midX: 0, midY: 0 })

  const getBounds = useCallback((scale) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return { x: 0, y: 0 }
    return { x: Math.max(0, ((scale - 1) * rect.width) / 2), y: Math.max(0, ((scale - 1) * rect.height) / 2) }
  }, [])

  const applyZoom = useCallback((rawScale, cx, cy, animate) => {
    const newScale = clamp(rawScale, MIN_ZOOM, MAX_ZOOM)
    const oldScale = scaleRef.current
    const ratio = newScale / oldScale
    let newX = cx - ratio * (cx - panRef.current.x)
    let newY = cy - ratio * (cy - panRef.current.y)
    const bounds = getBounds(newScale)
    newX = clamp(newX, -bounds.x, bounds.x)
    newY = clamp(newY, -bounds.y, bounds.y)
    if (newScale === MIN_ZOOM) { newX = 0; newY = 0 }
    scaleRef.current = newScale
    panRef.current = { x: newX, y: newY }
    setDisplayScale(newScale)
    if (!imgRef.current) return
    if (animate) {
      gsap.to(imgRef.current, { x: newX, y: newY, scale: newScale, duration: 0.35, ease: 'power2.out', overwrite: true })
    } else {
      gsap.set(imgRef.current, { x: newX, y: newY, scale: newScale })
    }
  }, [getBounds])

  const resetZoom = useCallback(() => applyZoom(MIN_ZOOM, 0, 0, true), [applyZoom])
  const zoomIn = useCallback(() => applyZoom(scaleRef.current + ZOOM_STEP, 0, 0, true), [applyZoom])
  const zoomOut = useCallback(() => applyZoom(scaleRef.current - ZOOM_STEP, 0, 0, true), [applyZoom])

  useEffect(() => {
    if (imgRef.current) gsap.set(imgRef.current, { x: 0, y: 0, scale: 1 })
  }, [])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === '+' || e.key === '=') zoomIn()
      if (e.key === '-' || e.key === '_') zoomOut()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose, zoomIn, zoomOut])

  const handleWheel = (e) => {
    e.preventDefault()
    const rect = containerRef.current.getBoundingClientRect()
    const cx = e.clientX - (rect.left + rect.width / 2)
    const cy = e.clientY - (rect.top + rect.height / 2)
    const newScale = scaleRef.current * (1 - e.deltaY * 0.0015)
    applyZoom(newScale, cx, cy, false)
  }

  const handleMouseDown = (e) => {
    if (scaleRef.current <= MIN_ZOOM) return
    setIsDragging(true)
    dragStartRef.current = { x: e.clientX, y: e.clientY, panX: panRef.current.x, panY: panRef.current.y }
  }

  useEffect(() => {
    if (!isDragging) return
    const handleMouseMove = (e) => {
      const dx = e.clientX - dragStartRef.current.x
      const dy = e.clientY - dragStartRef.current.y
      const bounds = getBounds(scaleRef.current)
      const newX = clamp(dragStartRef.current.panX + dx, -bounds.x, bounds.x)
      const newY = clamp(dragStartRef.current.panY + dy, -bounds.y, bounds.y)
      panRef.current = { x: newX, y: newY }
      if (imgRef.current) gsap.set(imgRef.current, { x: newX, y: newY })
    }
    const handleMouseUp = () => setIsDragging(false)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
    return () => { window.removeEventListener('mousemove', handleMouseMove); window.removeEventListener('mouseup', handleMouseUp) }
  }, [isDragging, getBounds])

  const handleTouchStart = (e) => {
    if (e.touches.length === 2) {
      const [t1, t2] = e.touches
      const dx = t1.clientX - t2.clientX
      const dy = t1.clientY - t2.clientY
      const rect = containerRef.current.getBoundingClientRect()
      pinchRef.current = { distance: Math.hypot(dx, dy), midX: (t1.clientX + t2.clientX) / 2 - (rect.left + rect.width / 2), midY: (t1.clientY + t2.clientY) / 2 - (rect.top + rect.height / 2) }
    } else if (e.touches.length === 1 && scaleRef.current > MIN_ZOOM) {
      setIsDragging(true)
      dragStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY, panX: panRef.current.x, panY: panRef.current.y }
    }
  }

  const handleTouchMove = (e) => {
    if (e.touches.length === 2) {
      e.preventDefault()
      const [t1, t2] = e.touches
      const dx = t1.clientX - t2.clientX
      const dy = t1.clientY - t2.clientY
      const distance = Math.hypot(dx, dy)
      const rect = containerRef.current.getBoundingClientRect()
      const midX = (t1.clientX + t2.clientX) / 2 - (rect.left + rect.width / 2)
      const midY = (t1.clientY + t2.clientY) / 2 - (rect.top + rect.height / 2)
      if (pinchRef.current.distance > 0) {
        const scaleDelta = distance / pinchRef.current.distance
        applyZoom(scaleRef.current * scaleDelta, midX, midY, false)
      }
      pinchRef.current = { distance, midX, midY }
    } else if (e.touches.length === 1 && isDragging) {
      const dx = e.touches[0].clientX - dragStartRef.current.x
      const dy = e.touches[0].clientY - dragStartRef.current.y
      const bounds = getBounds(scaleRef.current)
      const newX = clamp(dragStartRef.current.panX + dx, -bounds.x, bounds.x)
      const newY = clamp(dragStartRef.current.panY + dy, -bounds.y, bounds.y)
      panRef.current = { x: newX, y: newY }
      if (imgRef.current) gsap.set(imgRef.current, { x: newX, y: newY })
    }
  }

  const handleTouchEnd = (e) => {
    if (e.touches.length < 2) pinchRef.current.distance = 0
    if (e.touches.length === 0) setIsDragging(false)
  }

  const handleDownload = useCallback(async () => {
    try {
      const response = await fetch(cert.image)
      if (!response.ok) throw new Error('Network response was not ok')
      const blob = await response.blob()
      const blobUrl = URL.createObjectURL(blob)
      const extMatch = cert.image.match(/\.(\w+)$/)
      const ext = extMatch ? extMatch[1] : 'jpg'
      const filename = `${cert.name.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}.${ext}`
      const link = document.createElement('a')
      link.href = blobUrl
      link.download = filename
      document.body.appendChild(link)
      link.click()
      link.remove()
      URL.revokeObjectURL(blobUrl)
    } catch {
      window.open(cert.image, '_blank', 'noopener,noreferrer')
    }
  }, [cert.image, cert.name])

  const zoomPercent = Math.round(displayScale * 100)
  const canZoomIn = displayScale < MAX_ZOOM - 0.01
  const canZoomOut = displayScale > MIN_ZOOM + 0.01
  const isZoomed = displayScale > MIN_ZOOM + 0.01
  const glass = darkMode ? 'border-white/10 bg-white/5 text-white backdrop-blur-xl' : 'border-white/40 bg-white/60 text-slate-800 backdrop-blur-xl'
  const glassButton = darkMode ? 'hover:bg-white/15 disabled:opacity-30 disabled:hover:bg-transparent' : 'hover:bg-white/70 disabled:opacity-30 disabled:hover:bg-transparent'

  return (
    <div className="animate-fadeIn fixed inset-0 z-[9999] flex min-h-screen items-center justify-center bg-black/95 backdrop-blur-sm md:h-screen" style={{ left: 0, right: 0, top: 0, bottom: 0, width: '100vw', height: '100vh' }} onClick={onClose}>
      <button className="group absolute right-6 top-6 z-20 text-white transition-colors hover:text-gray-300" onClick={onClose} aria-label="Close">
        <X className="h-9 w-9 transform transition-transform duration-300 group-hover:rotate-90" strokeWidth={2} />
      </button>
      <div className="absolute left-6 right-20 top-6 z-20">
        <h3 className="text-2xl font-bold text-white md:text-3xl">{cert.name}</h3>
      </div>
      <div
        ref={containerRef}
        className="animate-scaleIn relative mx-4 h-[70vh] w-full max-w-6xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ cursor: isZoomed ? (isDragging ? 'grabbing' : 'grab') : 'default' }}
      >
        <img ref={imgRef} src={cert.image} alt={cert.name} draggable={false} className="pointer-events-none h-full w-full select-none object-contain shadow-2xl" />
      </div>
      <div className={`absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1 rounded-full border px-2 py-1.5 shadow-2xl ${glass}`} onClick={(e) => e.stopPropagation()}>
        <button onClick={zoomOut} disabled={!canZoomOut} aria-label="Zoom out" className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors ${glassButton}`}><ZoomOut className="h-5 w-5" /></button>
        <span className="min-w-[3.2rem] select-none text-center text-sm font-medium tabular-nums">{zoomPercent}%</span>
        <button onClick={zoomIn} disabled={!canZoomIn} aria-label="Zoom in" className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors ${glassButton}`}><ZoomIn className="h-5 w-5" /></button>
        <div className={`mx-1 h-6 w-px ${darkMode ? 'bg-white/15' : 'bg-slate-900/10'}`} />
        <button onClick={resetZoom} disabled={!isZoomed} aria-label={language === 'fr' ? 'Réinitialiser le zoom' : 'Reset zoom'} className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors ${glassButton}`}><RotateCcw className="h-5 w-5" /></button>
        <button onClick={handleDownload} aria-label={language === 'fr' ? 'Télécharger le certificat' : 'Download certificate'} className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors ${glassButton}`}><Download className="h-5 w-5" /></button>
      </div>
    </div>
  )
}

export default function CertificationsSection() {
  const { darkMode } = useTheme()
  const { language } = useLanguage()
  const [selectedCert, setSelectedCert] = useState(null)
  const certifications = certificates(language)

  useEffect(() => {
    document.body.style.overflow = selectedCert ? 'hidden' : 'unset'
    return () => { document.body.style.overflow = 'unset' }
  }, [selectedCert])

  const t = translations[language].certifications

  return (
    <>
      <div className="overflow-hidden px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <h2 className={`mb-6 text-center text-4xl font-bold md:text-5xl ${darkMode ? 'text-white' : 'text-gray-900'}`}>{t.title}</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="group relative h-80 transform cursor-pointer overflow-hidden rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                onClick={() => setSelectedCert(cert)}
              >
                <img src={cert.image} alt={cert.name} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-black/60 transition-all duration-300 group-hover:bg-black/30" />
                <div className="absolute inset-0 flex items-center justify-center p-6">
                  <h3 className="transform text-center text-2xl font-bold text-white opacity-0 transition-all duration-300 group-hover:opacity-100">{cert.name}</h3>
                </div>
                <div className="absolute inset-0 rounded-2xl border-4 border-transparent transition-all duration-300 group-hover:border-blue-500" />
              </div>
            ))}
          </div>
        </div>
      </div>
      {selectedCert && createPortal(<CertificateModal cert={selectedCert} darkMode={darkMode} language={language} onClose={() => setSelectedCert(null)} />, document.body)}
      <style>{`@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } } @keyframes scaleIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } } .animate-fadeIn { animation: fadeIn 0.2s ease-out; } .animate-scaleIn { animation: scaleIn 0.3s ease-out; }`}</style>
    </>
  )
}
