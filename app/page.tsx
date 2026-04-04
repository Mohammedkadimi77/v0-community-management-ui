import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { StatsCard } from "@/components/dashboard/stats-card"
import { EngagementChart } from "@/components/dashboard/engagement-chart"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { ScheduledPosts } from "@/components/dashboard/scheduled-posts"
import { FileText, Users, Calendar, TrendingUp } from "lucide-react"

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here&apos;s an overview of your social media performance.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Total Posts"
            value="1,284"
            change="+12.5%"
            changeType="positive"
            icon={FileText}
          />
          <StatsCard
            title="Total Followers"
            value="48.2K"
            change="+8.2%"
            changeType="positive"
            icon={Users}
          />
          <StatsCard
            title="Scheduled Posts"
            value="24"
            change="+3"
            changeType="neutral"
            icon={Calendar}
          />
          <StatsCard
            title="Engagement Rate"
            value="4.8%"
            change="+0.5%"
            changeType="positive"
            icon={TrendingUp}
          />
        </div>

        {/* Charts and Activity */}
        <div className="grid gap-6 lg:grid-cols-3">
          <EngagementChart />
          <RecentActivity />
        </div>

        {/* Scheduled Posts */}
        <ScheduledPosts />
      </div>
    </DashboardLayout>
  )
}
