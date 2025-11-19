import { useState } from 'react'

function Input({ label, ...props }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <input {...props} className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200" />
    </label>
  )
}

function Textarea({ label, ...props }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <textarea {...props} className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200" />
    </label>
  )
}

export default function ContactSubscribe() {
  const [contactStatus, setContactStatus] = useState(null)
  const [subStatus, setSubStatus] = useState(null)

  const handleContact = async (e) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const payload = Object.fromEntries(form.entries())
    try {
      const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const res = await fetch(`${baseUrl}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (res.ok) setContactStatus({ ok: true, msg: data.detail })
      else setContactStatus({ ok: false, msg: data.detail || 'Failed to send' })
      e.currentTarget.reset()
    } catch (e) {
      setContactStatus({ ok: false, msg: e.message })
    }
  }

  const handleSubscribe = async (e) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const payload = Object.fromEntries(form.entries())
    try {
      const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const res = await fetch(`${baseUrl}/api/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (res.ok) setSubStatus({ ok: true, msg: data.detail })
      else setSubStatus({ ok: false, msg: data.detail || 'Failed to subscribe' })
      e.currentTarget.reset()
    } catch (e) {
      setSubStatus({ ok: false, msg: e.message })
    }
  }

  return (
    <section id="subscribe" className="relative mx-auto max-w-7xl px-6 py-16">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-xl font-semibold text-slate-900">Contact us</h3>
          <p className="mt-1 text-sm text-slate-600">Have a question? Send a message and our team will reply.</p>
          <form onSubmit={handleContact} className="mt-4 space-y-3">
            <Input name="name" label="Full name" placeholder="Jane Doe" required />
            <Input name="email" label="Email" type="email" placeholder="jane@email.com" required />
            <Input name="topic" label="Topic (optional)" placeholder="Enrollment" />
            <Textarea name="message" label="Message" rows={4} placeholder="How can we help?" required />
            <button className="mt-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow hover:bg-slate-800">Send message</button>
            {contactStatus && (
              <p className={`text-sm ${contactStatus.ok ? 'text-emerald-600' : 'text-red-600'}`}>{contactStatus.msg}</p>
            )}
          </form>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-xl font-semibold text-slate-900">Subscribe for updates</h3>
          <p className="mt-1 text-sm text-slate-600">Get course drops, scholarships, and early-bird discounts.</p>
          <form onSubmit={handleSubscribe} className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Input name="name" label="Name" placeholder="Alex" />
            <Input name="email" label="Email" type="email" placeholder="alex@email.com" required />
            <div className="sm:col-span-2">
              <button className="w-full rounded-xl bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-white shadow hover:bg-emerald-600">Subscribe</button>
            </div>
            {subStatus && (
              <p className={`sm:col-span-2 text-sm ${subStatus.ok ? 'text-emerald-600' : 'text-red-600'}`}>{subStatus.msg}</p>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
