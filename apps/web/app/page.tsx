/**
 * ============================================================================
 * The primary dashboard page for a logged-in user.
 * ============================================================================
 * This component serves as the main landing page after a user authenticates.
 * It's designed to provide a high-level overview of their fantasy football
 * leagues, including power rankings, recent transactions, and key player
 * values.
 *
 * >> Current State:
 *    - This is a static, presentational component with placeholder data. It
 *      showcases the basic layout and styling of the dashboard cards.
 *
 * >> Future Work (MVP):
 *    - Convert to a Client Component: Add the 'use client' directive to enable
 *      data fetching and state management hooks.
 *    - Data Fetching: Implement logic (e.g., using SWR or React Query) to
 *      fetch the user's league summary from the backend API.
 *    - Dynamic Rendering: Replace the placeholder map with a loop that renders
 *      real data, such as "Power Ranking", "Contender Score", etc.
 *    - Loading/Error States: Add UI states to handle the period during which
 *      data is being fetched and to gracefully manage any API errors.
 * ============================================================================
 */
export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-slate-400">Welcome back to your league summary.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/*
          This is a placeholder loop to generate the card layout. In the MVP,
          this will be replaced with a dynamic list of components that are

          populated with real data from the backend API.
        */}
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
