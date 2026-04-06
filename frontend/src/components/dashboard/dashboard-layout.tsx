"use client"

import { Sidebar } from "./sidebar"
import { TopNavbar } from "./top-navbar"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="pl-64 transition-all duration-300">
        <TopNavbar />
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}
