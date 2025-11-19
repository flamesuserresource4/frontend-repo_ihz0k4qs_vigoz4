import { motion } from 'framer-motion'

const sessions = [
  { title: 'Weekend Coding Camp', date: 'Every Sat', time: '10:00–12:00', mode: 'In-person', location: 'Main Campus' },
  { title: 'Drone Flight Lab', date: 'Wed', time: '16:00–18:00', mode: 'In-person', location: 'Aviation Hall' },
  { title: 'AI Builders', date: 'Tue & Thu', time: '17:00–18:30', mode: 'Online', location: 'Zoom' },
  { title: '3D Printing Studio', date: 'Fri', time: '15:30–17:00', mode: 'In-person', location: 'Makerspace' },
]

export default function Schedule() {
  return (
    <section id="schedule" className="relative mx-auto max-w-7xl px-6 py-16">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Upcoming Schedule</h2>
        <p className="mt-2 text-slate-600">Join a session that fits your calendar.</p>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {sessions.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.45, delay: i * 0.05 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <h3 className="text-lg font-semibold text-slate-900">{s.title}</h3>
            <p className="mt-1 text-sm text-slate-600">{s.date} · {s.time}</p>
            <p className="mt-1 text-sm text-slate-600">{s.mode} · {s.location}</p>
            <button className="mt-4 rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-600">Reserve Spot</button>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
