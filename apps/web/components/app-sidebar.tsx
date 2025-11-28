"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, BarChart2, TrendingUp, Settings, Shuffle } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const routes = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Trade Generator", href: "/trade-generator", icon: Shuffle },
  { name: "Deep Insights", href: "/insights", icon: BarChart2 },
  { name: "Power Rankings", href: "/power-rankings", icon: TrendingUp },
  { name: "Settings", href: "/settings", icon: Settings },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <div className="flex flex-col h-full w-64 bg-slate-900 text-white border-r border-slate-800">
      <div className="p-6">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Superfan
        </h1>
      </div>
      <nav className="flex-1 px-4 space-y-2">
        {routes.map((route) => {
          const Icon = route.icon
          const isActive = pathname === route.href
          return (
            <Link key={route.href} href={route.href}>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start gap-3 text-slate-300 hover:text-white hover:bg-slate-800",
                  isActive && "bg-slate-800 text-white font-medium"
                )}
              >
                <Icon className="h-5 w-5" />
                {route.name}
              </Button>
            </Link>
          )
        })}
      </nav>
      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-slate-700" />
          <div className="text-sm">
            <p className="font-medium">User</p>
            <p className="text-xs text-slate-400">View Profile</p>
          </div>
        </div>
      </div>
    </div>
  )
}
