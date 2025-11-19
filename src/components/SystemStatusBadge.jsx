import { useEffect, useMemo, useState } from 'react'

function usePing(url, intervalMs = 20000, timeoutMs = 5000) {
  const [status, setStatus] = useState({ state: 'checking', latency: null, lastChecked: null, message: '' })

  const ping = async () => {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), timeoutMs)
    const start = performance.now()
    try {
      const res = await fetch(`${url}/test`, { signal: controller.signal })
      const end = performance.now()
      clearTimeout(timer)
      if (res.ok) {
        const data = await res.json()
        setStatus({ state: 'ok', latency: Math.round(end - start), lastChecked: new Date(), message: data.backend || 'OK' })
      } else {
        setStatus({ state: 'degraded', latency: null, lastChecked: new Date(), message: `${res.status} ${res.statusText}` })
      }
    } catch (e) {
      setStatus({ state: 'down', latency: null, lastChecked: new Date(), message: e.name === 'AbortError' ? 'Timeout' : (e.message || 'Error') })
    }
  }

  useEffect(() => {
    ping()
    const id = setInterval(ping, intervalMs)
    return () => clearInterval(id)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url])

  return { status, ping }
}

export default function SystemStatusBadge() {
  const backendUrl = useMemo(() => import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000', [])
  const { status } = usePing(backendUrl)

  const color = status.state === 'ok' ? 'bg-emerald-500' : status.state === 'degraded' ? 'bg-amber-500' : status.state === 'checking' ? 'bg-slate-400' : 'bg-rose-500'
  const text = status.state === 'ok' ? 'API Live' : status.state === 'degraded' ? 'API Degraded' : status.state === 'checking' ? 'Checking' : 'API Down'

  return (
    <a href="/test" className="group inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-2 py-1 text-xs font-medium text-slate-700 shadow-sm backdrop-blur hover:bg-white transition-colors">
      <span className={`h-2 w-2 rounded-full ${color} animate-pulse`} />
      <span className="hidden sm:inline">{text}</span>
      {status.latency != null && (
        <span className="hidden md:inline text-slate-500">{status.latency}ms</span>
      )}
    </a>
  )
}
