import { lazy, Suspense, useEffect, useState } from 'react'

// Lazy load Spline to prevent blocking the initial render and avoid crashes on unsupported devices
const SplineLazy = lazy(() => import('@splinetool/react-spline'))

function supportsWebGL() {
  try {
    const canvas = document.createElement('canvas')
    return !!(
      window && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    )
  } catch {
    return false
  }
}

function HeroBackground() {
  const [canRender, setCanRender] = useState(false)

  useEffect(() => {
    const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setCanRender(!reduceMotion && supportsWebGL())
  }, [])

  if (!canRender) {
    return (
      <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50 to-slate-100" />
    )
  }

  return (
    <Suspense fallback={<div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50 to-slate-100" />}>
      <div className="absolute inset-0">
        <SplineLazy scene="https://prod.spline.design/OG17yM2eUIs8MUmA/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
    </Suspense>
  )
}

export default function Hero() {
  return (
    <section className="relative min-h-[80vh] w-full overflow-hidden bg-gradient-to-b from-white to-slate-50">
      {/* 3D background (safe, lazy, with fallback) */}
      <HeroBackground />

      {/* Gradient overlay for readability */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/80 via-white/40 to-white/90" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-24 pb-16 md:pt-28">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-3 py-1 text-xs font-medium text-slate-700 shadow-sm backdrop-blur">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
            Future-ready learning
          </span>
          <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl">
            Learn Programming the Modern Way
          </h1>
          <p className="mt-5 text-lg leading-7 text-slate-600">
            Hands-on courses in Web Development, AI Programming, Robotics, Drones, and 3D Product Design & Printing. Interactive. Playful. Career-focused.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#categories" className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow hover:bg-slate-800 transition-colors">Explore Tracks</a>
            <a href="#subscribe" className="rounded-xl bg-emerald-500/90 px-5 py-3 text-sm font-semibold text-white shadow hover:bg-emerald-600 transition-colors">Get Updates</a>
          </div>
        </div>
      </div>
    </section>
  )
}
