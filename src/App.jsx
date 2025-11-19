import Hero from './components/Hero'
import Categories from './components/Categories'
import Staff from './components/Staff'
import ContactSubscribe from './components/ContactSubscribe'

function App() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Navbar */}
      <header className="sticky top-0 z-40 w-full bg-white/70 backdrop-blur border-b border-slate-200">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a href="#" className="flex items-center gap-2 font-semibold">
            <span className="inline-block h-3 w-3 rounded-full bg-emerald-500" />
            FutureCode Academy
          </a>
          <nav className="hidden gap-6 text-sm sm:flex">
            <a href="#categories" className="text-slate-600 hover:text-slate-900">Tracks</a>
            <a href="#team" className="text-slate-600 hover:text-slate-900">Team</a>
            <a href="#subscribe" className="text-slate-600 hover:text-slate-900">Contact</a>
          </nav>
          <a href="#subscribe" className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-slate-800">Enroll</a>
        </div>
      </header>

      <main>
        <Hero />
        <Categories />
        <div id="team">
          <Staff />
        </div>
        <ContactSubscribe />
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-10">
        <div className="mx-auto max-w-7xl px-6 text-sm text-slate-600">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row">
            <p>© {new Date().getFullYear()} FutureCode Academy. All rights reserved.</p>
            <a href="/test" className="text-slate-500 hover:text-slate-900">System status</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
