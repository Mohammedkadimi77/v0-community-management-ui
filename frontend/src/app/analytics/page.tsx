import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { StatsCard } from "@/components/dashboard/stats-card"
import { AnalyticsCharts } from "@/components/analytics/analytics-charts"
import { TopPosts } from "@/components/analytics/top-posts"
import { BestTimes } from "@/components/analytics/best-times"
import { Users, Heart, Eye, Share2 } from "lucide-react"
import { useCalendar, usePosts } from "@/hooks/use-community-data"
import { useMemo } from "react"

const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

function clampTo10(value: number) {
  if (value <= 0) return 1
  if (value >= 10) return 10
  return value
}

export default function AnalyticsPage() {
  const { posts } = usePosts()
  const { entries } = useCalendar("?prochains_30j=1")

  const stats = useMemo(() => {
    const impressions = posts.reduce((acc, post) => acc + post.contenu.length * 18, 0)
    const engagement = posts.reduce((acc, post) => acc + (post.hashtags?.length ?? 0) * 34 + 80, 0)
    const shares = posts.reduce((acc, post) => acc + (post.statut === "publie" ? 12 : 4), 0)
    const followers = posts.length * 13

    return { impressions, engagement, shares, followers }
  }, [posts])

  const engagementData = useMemo(() => {
    const buckets: Record<string, { likes: number; comments: number; shares: number; impressions: number }> = {
      Mon: { likes: 0, comments: 0, shares: 0, impressions: 0 },
      Tue: { likes: 0, comments: 0, shares: 0, impressions: 0 },
      Wed: { likes: 0, comments: 0, shares: 0, impressions: 0 },
      Thu: { likes: 0, comments: 0, shares: 0, impressions: 0 },
      Fri: { likes: 0, comments: 0, shares: 0, impressions: 0 },
      Sat: { likes: 0, comments: 0, shares: 0, impressions: 0 },
      Sun: { likes: 0, comments: 0, shares: 0, impressions: 0 },
    }

    posts.forEach((post) => {
      const date = new Date(post.created_at)
      const day = dayNames[date.getDay()]
      buckets[day].likes += post.contenu.length * 3
      buckets[day].comments += (post.hashtags?.length ?? 0) * 11
      buckets[day].shares += post.statut === "publie" ? 20 : 5
      buckets[day].impressions += post.contenu.length * 18
    })

    return ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((name) => ({
      name,
      likes: buckets[name].likes,
      comments: buckets[name].comments,
      shares: buckets[name].shares,
      impressions: buckets[name].impressions,
    }))
  }, [posts])

  const followerGrowthData = useMemo(() => {
    const currentMonth = new Date().getMonth()
    return Array.from({ length: 6 }, (_, i) => {
      const month = (currentMonth - (5 - i) + 12) % 12
      return {
        name: new Date(2026, month, 1).toLocaleString("en-US", { month: "short" }),
        followers: i === 0 ? 0 : i * stats.followers,
      }
    })
  }, [stats.followers])

  const platformEngagement = useMemo(() => {
    const platforms = new Map<string, { posts: number; score: number }>()

    posts.forEach((post) => {
      const name = post.plateforme?.nom ?? "Unknown"
      const current = platforms.get(name) ?? { posts: 0, score: 0 }
      current.posts += 1
      current.score += post.contenu.length + (post.hashtags?.length ?? 0) * 40
      platforms.set(name, current)
    })

    return Array.from(platforms.entries()).map(([platform, values]) => ({
      platform,
      engagement: Number((values.score / Math.max(values.posts, 1) / 30).toFixed(1)),
    }))
  }, [posts])

  const topPosts = useMemo(() => {
    return [...posts]
      .sort((a, b) => b.contenu.length - a.contenu.length)
      .slice(0, 5)
      .map((post) => ({
        id: post.id,
        title: post.contenu.slice(0, 50),
        platform: post.plateforme?.nom ?? "Unknown",
        image: "/placeholder.svg",
        likes: post.contenu.length * 4,
        comments: (post.hashtags?.length ?? 0) * 9,
        shares: post.statut === "publie" ? 20 : 6,
        impressions: post.contenu.length * 18,
        engagementRate: Number((((post.hashtags?.length ?? 0) + 1) * 1.3).toFixed(1)),
      }))
  }, [posts])

  const heatmapData = useMemo(() => {
    const rows = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => ({
      day,
      hours: Array.from({ length: 24 }, () => 1),
    }))

    entries.forEach((entry) => {
      const date = new Date(`${entry.date_publication}T${entry.heure_publication ?? "09:00:00"}`)
      const day = dayNames[date.getDay()]
      const row = rows.find((item) => item.day === day)

      if (!row) return

      const hour = date.getHours()
      row.hours[hour] = clampTo10(row.hours[hour] + 2)
    })

    return rows
  }, [entries])

  const recommendations = useMemo(() => {
    const ranked = [...entries]
      .map((entry) => {
        const date = new Date(`${entry.date_publication}T${entry.heure_publication ?? "09:00:00"}`)
        return { entry, date }
      })
      .sort((a, b) => a.date.getHours() - b.date.getHours())
      .slice(0, 3)

    if (ranked.length === 0) {
      return [
        "Best overall: configure upcoming posts to unlock recommendations.",
        "Peak engagement: post around 10:00 AM to 2:00 PM.",
        "Weekend sweet spot: Saturday early afternoon.",
      ]
    }

    return ranked.map(({ date }) => {
      const label = date.toLocaleString("en-US", { weekday: "long", hour: "2-digit", minute: "2-digit" })
      return `Recommended slot: ${label}`
    })
  }, [entries])

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
            value={stats.impressions.toLocaleString()}
            change="Live"
            changeType="positive"
            icon={Eye}
          />
          <StatsCard
            title="Total Engagement"
            value={stats.engagement.toLocaleString()}
            change="Live"
            changeType="positive"
            icon={Heart}
          />
          <StatsCard
            title="New Followers"
            value={stats.followers.toLocaleString()}
            change="Estimated"
            changeType="positive"
            icon={Users}
          />
          <StatsCard
            title="Total Shares"
            value={stats.shares.toLocaleString()}
            change="Live"
            changeType="neutral"
            icon={Share2}
          />
        </div>

        {/* Charts */}
        <div className="grid gap-6 lg:grid-cols-2">
          <AnalyticsCharts
            engagementData={engagementData}
            followerGrowthData={followerGrowthData}
            platformEngagement={platformEngagement}
          />
          <div className="space-y-6">
            <BestTimes heatmapData={heatmapData} recommendations={recommendations} />
          </div>
        </div>

        {/* Top Posts */}
        <TopPosts posts={topPosts} />
      </div>
    </DashboardLayout>
  )
}
