import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Heart, MessageCircle, Share2, Send } from "lucide-react"
import { useCalendar, usePosts } from "@/hooks/use-community-data"
import { useMemo } from "react"

const platformColors: Record<string, string> = {
  LinkedIn: "bg-[#0A66C2] text-white",
  Instagram: "bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] text-white",
  Twitter: "bg-[#1DA1F2] text-white",
  Facebook: "bg-[#1877F2] text-white",
  "All platforms": "bg-primary text-primary-foreground",
}

export function RecentActivity() {
  const { posts } = usePosts()
  const { entries } = useCalendar("?a_venir=1")

  const activities = useMemo(() => {
    const postActivities = posts.slice(0, 3).map((post) => ({
      id: `post-${post.id}`,
      content: `Post updated: ${post.contenu.slice(0, 45)}${post.contenu.length > 45 ? "..." : ""}`,
      platform: post.plateforme?.nom ?? "All platforms",
      time: new Date(post.created_at).toLocaleString(),
      icon: post.statut === "publie" ? Send : Heart,
    }))

    const calendarActivities = entries.slice(0, 2).map((entry) => ({
      id: `calendar-${entry.id}`,
      content: `Scheduled: ${entry.titre}`,
      platform: entry.plateforme?.nom ?? "All platforms",
      time: `${entry.date_publication} ${entry.heure_publication ?? "09:00"}`,
      icon: Clock,
    }))

    return [...postActivities, ...calendarActivities]
  }, [posts, entries])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start gap-4 rounded-lg p-3 transition-colors hover:bg-muted/50"
            >
              <div className="rounded-full bg-muted p-2">
                <activity.icon className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-tight">{activity.content}</p>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className={platformColors[activity.platform]}>
                    {activity.platform}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
