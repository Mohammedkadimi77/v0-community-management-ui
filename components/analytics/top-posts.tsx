import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, MessageCircle, Share2, Eye } from "lucide-react"
import Image from "next/image"

const topPosts = [
  {
    id: 1,
    title: "AI Marketing Revolution",
    platform: "LinkedIn",
    image: "/placeholder.svg",
    likes: 2845,
    comments: 234,
    shares: 156,
    impressions: 45200,
    engagementRate: 7.2,
  },
  {
    id: 2,
    title: "Behind the Scenes",
    platform: "Instagram",
    image: "/placeholder.svg",
    likes: 3421,
    comments: 189,
    shares: 92,
    impressions: 38500,
    engagementRate: 9.6,
  },
  {
    id: 3,
    title: "Product Launch Event",
    platform: "Facebook",
    image: "/placeholder.svg",
    likes: 1892,
    comments: 312,
    shares: 245,
    impressions: 52000,
    engagementRate: 4.7,
  },
  {
    id: 4,
    title: "Weekly Tips Thread",
    platform: "Twitter",
    image: "/placeholder.svg",
    likes: 956,
    comments: 145,
    shares: 287,
    impressions: 28400,
    engagementRate: 4.9,
  },
]

const platformColors: Record<string, string> = {
  LinkedIn: "bg-blue-600 text-white",
  Instagram: "bg-gradient-to-r from-purple-500 to-pink-500 text-white",
  Facebook: "bg-blue-500 text-white",
  Twitter: "bg-sky-500 text-white",
}

export function TopPosts() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Performing Posts</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {topPosts.map((post, index) => (
            <div
              key={post.id}
              className="flex gap-4 rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/50"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-lg font-bold">
                {index + 1}
              </div>
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-muted">
                <Image src={post.image} alt={post.title} fill className="object-cover" />
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-semibold">{post.title}</h4>
                    <Badge variant="secondary" className={platformColors[post.platform]}>
                      {post.platform}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary">{post.engagementRate}%</p>
                    <p className="text-xs text-muted-foreground">Engagement Rate</p>
                  </div>
                </div>
                <div className="flex gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Heart className="h-4 w-4" />
                    {post.likes.toLocaleString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="h-4 w-4" />
                    {post.comments.toLocaleString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <Share2 className="h-4 w-4" />
                    {post.shares.toLocaleString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    {post.impressions.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
