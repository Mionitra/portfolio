import { lazy, Suspense } from 'react'
import { ThemeProvider } from '@/context/ThemeContext'
import { LanguageProvider } from '@/context/LanguageContext'
import ErrorBoundary from '@/components/ui/ErrorBoundary'

const MainLayout = lazy(() => import('@/components/layout/MainLayout'))

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <ErrorBoundary>
          <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-slate-950 text-white text-xl">Loading...</div>}>
            <MainLayout />
          </Suspense>
        </ErrorBoundary>
      </LanguageProvider>
    </ThemeProvider>
  )
}
