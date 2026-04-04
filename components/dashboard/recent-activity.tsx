import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Clock, Heart, MessageCircle, Share2, Send } from "lucide-react"

const activities = [
  {
    id: 1,
    type: "published",
    content: "Your post 'AI in Marketing 2024' was published",
    platform: "LinkedIn",
    time: "2 min ago",
    icon: Send,
  },
  {
    id: 2,
    type: "engagement",
    content: "234 new likes on your Instagram post",
    platform: "Instagram",
    time: "15 min ago",
    icon: Heart,
  },
  {
    id: 3,
    type: "comment",
    content: "New comment from @sarah_m on your post",
    platform: "Twitter",
    time: "32 min ago",
    icon: MessageCircle,
  },
  {
    id: 4,
    type: "share",
    content: "Your post was shared 45 times",
    platform: "Facebook",
    time: "1 hour ago",
    icon: Share2,
  },
  {
    id: 5,
    type: "scheduled",
    content: "Post scheduled for tomorrow at 9:00 AM",
    platform: "All platforms",
    time: "2 hours ago",
    icon: Clock,
  },
]

const platformColors: Record<string, string> = {
  LinkedIn: "bg-[#0A66C2] text-white",
  Instagram: "bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] text-white",
  Twitter: "bg-[#1DA1F2] text-white",
  Facebook: "bg-[#1877F2] text-white",
  "All platforms": "bg-primary text-primary-foreground",
}

export function RecentActivity() {
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
