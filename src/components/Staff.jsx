import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

function StaffCard({ m }) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-lg"
    >
      <div className="flex items-center gap-4">
        <img src={m.avatar} alt={m.name} className="h-16 w-16 rounded-xl object-cover" />
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{m.name}</h3>
          <p className="text-sm text-emerald-600">{m.role}</p>
        </div>
      </div>
      {m.bio && <p className="mt-3 text-sm text-slate-600">{m.bio}</p>}
    </motion.div>
  )
}

export default function Staff() {
  const [items, setItems] = useState([])

  useEffect(() => {
    const load = async () => {
      try {
        const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
        const res = await fetch(`${baseUrl}/api/staff`)
        const data = await res.json()
        setItems(data.items || [])
      } catch (e) {
        console.error(e)
      }
    }
    load()
  }, [])

  return (
    <section className="relative mx-auto max-w-7xl px-6 py-16">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Meet the Team</h2>
        <p className="mt-2 text-slate-600">Industry experts guiding you at every step.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((m) => (
          <StaffCard key={m.name} m={m} />
        ))}
      </div>
    </section>
  )
}
