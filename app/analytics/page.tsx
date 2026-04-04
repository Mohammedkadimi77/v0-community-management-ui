import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { StatsCard } from "@/components/dashboard/stats-card"
import { AnalyticsCharts } from "@/components/analytics/analytics-charts"
import { TopPosts } from "@/components/analytics/top-posts"
import { BestTimes } from "@/components/analytics/best-times"
import { Users, Heart, Eye, Share2 } from "lucide-react"

export default function AnalyticsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">
            Track your social media performance and gain insights to improve engagement.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Total Impressions"
            value="2.4M"
            change="+18.2%"
            changeType="positive"
            icon={Eye}
          />
          <StatsCard
            title="Total Engagement"
            value="156K"
            change="+12.5%"
            changeType="positive"
            icon={Heart}
          />
          <StatsCard
            title="New Followers"
            value="8,420"
            change="+24.1%"
            changeType="positive"
            icon={Users}
          />
          <StatsCard
            title="Total Shares"
            value="12.8K"
            change="-2.3%"
            changeType="negative"
            icon={Share2}
          />
        </div>

        {/* Charts */}
        <div className="grid gap-6 lg:grid-cols-2">
          <AnalyticsCharts />
          <div className="space-y-6">
            <BestTimes />
          </div>
        </div>

        {/* Top Posts */}
        <TopPosts />
      </div>
    </DashboardLayout>
  )
}
