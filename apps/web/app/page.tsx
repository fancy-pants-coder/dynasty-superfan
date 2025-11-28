export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-slate-400">Welcome back to your league summary.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Placeholder Cards */}
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="p-6 rounded-xl bg-slate-900 border border-slate-800">
            <h3 className="font-medium text-sm text-slate-400">Stat {i}</h3>
            <p className="text-2xl font-bold mt-2">--</p>
          </div>
        ))}
      </div>
    </div>
  )
}
