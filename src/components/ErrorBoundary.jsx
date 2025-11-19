import React from 'react'

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    // eslint-disable-next-line no-console
    console.error('App crashed:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50">
          <div className="max-w-lg w-full rounded-2xl border border-slate-200 bg-white p-6 text-center shadow">
            <div className="mx-auto mb-3 h-2 w-2 rounded-full bg-rose-500 animate-pulse" />
            <h1 className="text-xl font-semibold text-slate-900">Something went wrong</h1>
            <p className="mt-2 text-sm text-slate-600">The page failed to render. Please reload. If the issue persists, share this error with support.</p>
            <pre className="mt-4 overflow-auto rounded-lg bg-slate-900 p-3 text-left text-xs text-white">
              {String(this.state.error)}
            </pre>
            <button onClick={() => window.location.reload()} className="mt-4 rounded-lg bg-slate-900 px-4 py-2 text-white">Reload</button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
