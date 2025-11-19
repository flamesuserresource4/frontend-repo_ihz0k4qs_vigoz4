import { useState } from 'react'

const faqs = [
  {
    q: 'What ages can enroll?',
    a: 'We welcome learners aged 7–17. Content and pacing adapt by track and age group.'
  },
  {
    q: 'Do I need prior experience?',
    a: 'No prior experience required for Starter modules. Advanced pathways are available.'
  },
  {
    q: 'Are classes online or in-person?',
    a: 'We offer both formats depending on location. Check upcoming schedules below.'
  },
  {
    q: 'Do you provide certificates?',
    a: 'Yes, certificates are awarded upon completion of Pro tracks and capstone projects.'
  }
]

export default function FAQs() {
  const [open, setOpen] = useState(0)
  return (
    <section id="faqs" className="relative mx-auto max-w-3xl px-6 py-16">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">FAQs</h2>
        <p className="mt-2 text-slate-600">Answers to common questions from parents and students.</p>
      </div>
      <div className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
        {faqs.map((f, i) => (
          <button key={f.q} onClick={() => setOpen(open === i ? -1 : i)} className="w-full text-left">
            <div className="p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-semibold text-slate-900">{f.q}</h3>
                <span className="text-slate-500">{open === i ? '−' : '+'}</span>
              </div>
              {open === i && (
                <p className="mt-2 text-sm text-slate-600">{f.a}</p>
              )}
            </div>
          </button>
        ))}
      </div>
    </section>
  )
}
