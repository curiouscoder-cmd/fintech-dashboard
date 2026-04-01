function App() {
  return (
    <div className="min-h-screen font-sans text-slate-800 selection:bg-indigo-100 selection:text-indigo-900">
      {/* Mesh gradient background */}
      <div className="mesh-bg">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
      </div>

      <div className="flex items-center justify-center h-screen">
        <h1 className="text-4xl font-bold text-slate-800">
          💎 FinSight
        </h1>
      </div>
    </div>
  )
}

export default App
