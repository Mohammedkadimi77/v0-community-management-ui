import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { StatsCard } from "@/components/dashboard/stats-card"
import { EngagementChart } from "@/components/dashboard/engagement-chart"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { ScheduledPosts } from "@/components/dashboard/scheduled-posts"
import { FileText, Users, Calendar, TrendingUp } from "lucide-react"
import { useCalendar, usePosts } from "@/hooks/use-community-data"

export default function DashboardPage() {
  const { total: totalPosts, posts } = usePosts()
  const { total: scheduledPosts } = useCalendar("?a_venir=1")

  const publishedPosts = posts.filter((post) => post.statut === "publie").length
  const engagementRate = posts.length === 0 ? 0 : Math.round((publishedPosts / posts.length) * 100)

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
            value={String(totalPosts)}
            change="Live"
            changeType="positive"
            icon={FileText}
          />
          <StatsCard
            title="Total Followers"
            value="N/A"
            change="Soon"
            changeType="positive"
            icon={Users}
          />
          <StatsCard
            title="Scheduled Posts"
            value={String(scheduledPosts)}
            change="Live"
            changeType="neutral"
            icon={Calendar}
          />
          <StatsCard
            title="Engagement Rate"
            value={`${engagementRate}%`}
            change="Derived"
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
