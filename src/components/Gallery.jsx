import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const items = [
  {
    src: 'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1600&auto=format&fit=crop',
    title: 'Kids Programming',
    caption: 'Creative coding sessions that make logic fun.'
  },
  {
    src: 'https://images.unsplash.com/photo-1504197885-609741792ce7?q=80&w=1600&auto=format&fit=crop',
    title: 'Drone Workshops',
    caption: 'Hands-on flight labs with safety-first training.'
  },
  {
    src: 'https://images.unsplash.com/photo-1532885297236-290e7dd12d8b?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxEcm9uZSUyMFdvcmtzaG9wc3xlbnwwfDB8fHwxNzYzNTY2NzM3fDA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80',
    title: '3D Printing',
    caption: 'From CAD to real-world prototypes in class.'
  },
  {
    src: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1600&auto=format&fit=crop',
    title: 'Team Projects',
    caption: 'Collaborative builds that boost confidence.'
  },
  {
    src: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1600&auto=format&fit=crop',
    title: 'Robotics',
    caption: 'Sensors, actuators, and problem solving.'
  },
  {
    src: 'https://images.unsplash.com/photo-1535223289827-42f1e9919769?q=80&w=1600&auto=format&fit=crop',
    title: 'Showcase Day',
    caption: 'Parents and friends celebrate student demos.'
  }
]

function Lightbox({ open, item, onClose }) {
  return (
    <AnimatePresence>
      {open && item && (
        <motion.div
          className="fixed inset-0 z-50 grid place-items-center bg-slate-900/70 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative w-full max-w-4xl"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <img src={item.src} alt={item.title} className="h-auto w-full rounded-2xl object-cover shadow-2xl" />
            <div className="mt-3 rounded-xl bg-white/90 p-4 text-slate-800 shadow">
              <h4 className="text-lg font-semibold">{item.title}</h4>
              <p className="text-sm text-slate-600">{item.caption}</p>
            </div>
            <button onClick={onClose} className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-sm font-medium text-slate-700 shadow hover:bg-white">Close</button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function Gallery() {
  const [selected, setSelected] = useState(null)

  return (
    <section id="gallery" className="relative mx-auto max-w-7xl px-6 py-16">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Student Gallery</h2>
        <p className="mt-2 text-slate-600">A glimpse into our kids programming, drone, robotics, and 3D printing labs.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it, i) => (
          <motion.button
            key={it.src}
            onClick={() => setSelected(it)}
            className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-slate-200 bg-slate-50"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.45, delay: i * 0.03 }}
            viewport={{ once: true }}
          >
            <img src={it.src} alt={it.title} className="h-full w-full object-cover transition duration-300 group-hover:scale-105" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-black/0 opacity-0 transition group-hover:opacity-100" />
            <div className="absolute bottom-3 left-3 rounded-lg bg-white/90 px-3 py-1.5 text-left shadow">
              <p className="text-sm font-semibold text-slate-900">{it.title}</p>
              <p className="text-xs text-slate-600">{it.caption}</p>
            </div>
          </motion.button>
        ))}
      </div>

      <Lightbox open={!!selected} item={selected} onClose={() => setSelected(null)} />
    </section>
  )
}
