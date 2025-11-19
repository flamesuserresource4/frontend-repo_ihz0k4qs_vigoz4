import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Code2, Bot, Cpu, Rocket, Cube, ChevronRight } from 'lucide-react'

const iconMap = {
  'web-development': Code2,
  'ai-programming': Bot,
  'robotics': Cpu,
  'drone': Rocket,
  '3d-printing': Cube,
}

function CategoryCard({ item, onOpen }) {
  const Icon = iconMap[item.slug] || Cube
  return (
    <motion.button
      onClick={() => onOpen(item)}
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="group w-full rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm ring-emerald-200/60 transition hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-4"
      style={{ outlineColor: item.accent || '#10b981' }}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl" style={{ background: (item.color || '#10b981') + '20', color: item.color || '#10b981' }}>
            <Icon className="h-6 w-6" />
          </span>
          <div>
            <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
            <p className="mt-1 text-sm text-slate-600">{item.blurb}</p>
          </div>
        </div>
        <ChevronRight className="h-5 w-5 text-slate-400 transition group-hover:translate-x-1" />
      </div>
      {item.highlights && (
        <ul className="mt-4 flex flex-wrap gap-2">
          {item.highlights.map((h) => (
            <li key={h} className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700">{h}</li>
          ))}
        </ul>
      )}
    </motion.button>
  )
}

function CategoryModal({ item, open, onClose }) {
  if (!open || !item) return null
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-900/40 backdrop-blur-sm p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        className="relative w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl"
      >
        <button onClick={onClose} className="absolute right-3 top-3 rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600 hover:bg-slate-200">Close</button>
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-xl flex items-center justify-center" style={{ background: (item.color || '#0ea5e9') + '20', color: item.color || '#0ea5e9' }}>
            {(iconMap[item.slug] || Cube)({ className: 'h-6 w-6' })}
          </div>
          <h3 className="text-2xl font-bold text-slate-900">{item.title}</h3>
        </div>
        <p className="mt-3 text-slate-600">{item.blurb}</p>
        {item.highlights && (
          <div className="mt-4">
            <h4 className="font-semibold text-slate-800">You will learn</h4>
            <ul className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
              {item.highlights.map((h) => (
                <li key={h} className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700">{h}</li>
              ))}
            </ul>
          </div>
        )}
      </motion.div>
    </div>
  )
}

function Categories() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    const load = async () => {
      try {
        const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
        const res = await fetch(`${baseUrl}/api/categories`)
        const data = await res.json()
        setItems(data.items || [])
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
    <section id="categories" className="relative mx-auto max-w-7xl px-6 py-16">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Popular Tracks</h2>
        <p className="mt-2 text-slate-600">Pick a category to see details. Each one includes beginner to advanced modules.</p>
      </div>

      {loading ? (
        <div className="grid place-items-center py-16 text-slate-500">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <CategoryCard key={item.slug} item={item} onOpen={setSelected} />
          ))}
        </div>
      )}

      <CategoryModal item={selected} open={!!selected} onClose={() => setSelected(null)} />
    </section>
  )
}

export default Categories
