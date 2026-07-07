import { useRef, useEffect } from 'react'
import gsap from '@/lib/gsap'
import { cn } from '@/lib/cn'

export default function AmbientOrbs({ darkMode, className }) {
  const blobARef = useRef(null)
  const blobBRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline({ repeat: -1, yoyo: true, defaults: { ease: 'sine.inOut' } })
    tl.to(blobARef.current, { x: 40, y: -30, duration: 8 }, 0)
    tl.to(blobBRef.current, { x: -50, y: 20, duration: 9 }, 0)
    return () => tl.kill()
  }, [])

  return (
    <div className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)} aria-hidden="true">
      <div
        ref={blobARef}
        className={cn(
          'absolute -left-24 top-10 h-72 w-72 rounded-full blur-3xl',
          darkMode ? 'bg-blue-500/20' : 'bg-blue-500/20'
        )}
      />
      <div
        ref={blobBRef}
        className={cn(
          'absolute -right-20 bottom-0 h-80 w-80 rounded-full blur-3xl',
          darkMode ? 'bg-blue-600/15' : 'bg-blue-600/15'
        )}
      />
    </div>
  )
}
