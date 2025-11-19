import { motion } from 'framer-motion'

const tiers = [
  {
    name: 'Starter',
    price: '$199',
    period: 'per course',
    features: ['Beginner modules', 'Weekly projects', 'Email support'],
    highlight: false,
  },
  {
    name: 'Pro',
    price: '$349',
    period: 'per course',
    features: ['Intermediate + Advanced', 'Capstone project', 'Priority support'],
    highlight: true,
  },
  {
    name: 'Team',
    price: 'Custom',
    period: 'per school',
    features: ['School partnerships', 'On-site workshops', 'Coach training'],
    highlight: false,
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="relative mx-auto max-w-7xl px-6 py-16">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Pricing</h2>
        <p className="mt-2 text-slate-600">Flexible options for learners and schools.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {tiers.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.45, delay: i * 0.05 }}
            viewport={{ once: true }}
            className={`rounded-2xl border p-6 shadow-sm ${t.highlight ? 'border-emerald-300 bg-emerald-50' : 'border-slate-200 bg-white'}`}
          >
            <h3 className="text-lg font-semibold text-slate-900">{t.name}</h3>
            <div className="mt-3 flex items-end gap-2">
              <span className="text-3xl font-extrabold text-slate-900">{t.price}</span>
              <span className="text-sm text-slate-500">{t.period}</span>
            </div>
            <ul className="mt-4 space-y-2 text-sm text-slate-700">
              {t.features.map((f) => (
                <li key={f} className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />{f}</li>
              ))}
            </ul>
            <button className="mt-6 w-full rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">Choose {t.name}</button>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
