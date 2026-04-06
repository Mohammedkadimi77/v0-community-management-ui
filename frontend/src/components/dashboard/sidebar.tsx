"use client"

import { Link, useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  PenSquare,
  Calendar,
  BarChart3,
  MessageCircle,
  Link2,
  Sparkles,
  Settings,
  HelpCircle,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useAuth } from "@/hooks/use-auth"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { AppFeature, hasFeatureAccess } from "@/lib/roles"

interface NavItem {
  href: string
  icon: React.ComponentType<{ className?: string }>
  label: string
  feature: AppFeature
}

const mainNavItems: NavItem[] = [
  { href: "/", icon: LayoutDashboard, label: "Dashboard", feature: "dashboard" },
  { href: "/create", icon: PenSquare, label: "Create Post", feature: "create" },
  { href: "/calendar", icon: Calendar, label: "Calendar", feature: "calendar" },
  { href: "/analytics", icon: BarChart3, label: "Analytics", feature: "analytics" },
  { href: "/comments", icon: MessageCircle, label: "Comments", feature: "comments" },
  { href: "/accounts", icon: Link2, label: "Accounts", feature: "accounts" },
  { href: "/ai-assistant", icon: Sparkles, label: "AI Assistant", feature: "ai-assistant" },
]

const bottomNavItems: NavItem[] = [
  { href: "/settings", icon: Settings, label: "Settings", feature: "settings" },
  { href: "/help", icon: HelpCircle, label: "Help Center", feature: "help" },
]

export function Sidebar() {
  const { pathname } = useLocation()
  const [collapsed, setCollapsed] = useState(false)
  const { logout, user } = useAuth()
  const navigate = useNavigate()
  const role = user?.role
  const visibleMainNavItems = mainNavItems.filter((item) => hasFeatureAccess(role, item.feature))
  const visibleBottomNavItems = bottomNavItems.filter((item) => hasFeatureAccess(role, item.feature))

  async function handleLogout() {
    try {
      await logout()
      toast.success("Deconnexion reussie")
      navigate("/login", { replace: true })
    } catch {
      toast.error("Echec de la deconnexion")
    }
  }

  const isItemActive = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname === href || pathname.startsWith(`${href}/`)
  }

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 flex h-screen flex-col bg-sidebar text-sidebar-foreground transition-all duration-300 sidebar-scroll",
        collapsed ? "w-[72px]" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center gap-3 border-b border-sidebar-border px-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
          <Sparkles className="h-5 w-5 text-primary-foreground" />
        </div>
        {!collapsed && (
          <span className="text-lg font-semibold tracking-tight">SocialHub AI</span>
        )}
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <div className="space-y-1">
          {visibleMainNavItems.map((item) => {
            const isActive = isItemActive(item.href)
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-muted hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                )}
              >
                <item.icon className={cn("h-5 w-5 shrink-0", isActive && "text-primary")} />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            )
          })}
        </div>
      </nav>

      {/* Bottom Navigation */}
      <div className="border-t border-sidebar-border px-3 py-4">
        <div className="space-y-1">
          {visibleBottomNavItems.map((item) => {
            const isActive = isItemActive(item.href)
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-muted hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                )}
              >
                <item.icon className="h-5 w-5 shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            )
          })}
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-muted transition-colors hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
          >
            <LogOut className="h-5 w-5 shrink-0" />
            {!collapsed && <span>Log out</span>}
          </button>
        </div>
      </div>

      {/* Collapse Button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-3 top-20 h-6 w-6 rounded-full border border-sidebar-border bg-sidebar text-sidebar-foreground hover:bg-sidebar-accent"
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? (
          <ChevronRight className="h-3 w-3" />
        ) : (
          <ChevronLeft className="h-3 w-3" />
        )}
      </Button>
    </aside>
  )
}
