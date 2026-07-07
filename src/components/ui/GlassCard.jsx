import { cn } from '@/lib/cn'

export default function GlassCard({ children, className, darkMode, hover = false, isActive = false, ...props }) {
  return (
    <div
      className={cn(
        'rounded-3xl border transition-all duration-500',
        isActive
          ? darkMode
            ? 'border-white/20 bg-white/10 shadow-2xl shadow-blue-500/20 backdrop-blur-xl'
            : 'border-white/60 bg-white/50 shadow-2xl shadow-blue-500/10 backdrop-blur-xl'
          : darkMode
            ? 'border-white/5 bg-white/5 backdrop-blur-md'
            : 'border-slate-200/60 bg-white/30 backdrop-blur-md',
        hover && (darkMode
          ? 'hover:border-blue-500/40 hover:bg-white/5'
          : 'hover:border-blue-500/40 hover:bg-white/80'),
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
