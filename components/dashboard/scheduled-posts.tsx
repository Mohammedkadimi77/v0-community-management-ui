"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, MoreHorizontal, Edit2, Trash2 } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from "next/image"

const scheduledPosts = [
  {
    id: 1,
    title: "Summer Sale Announcement",
    preview: "Get ready for our biggest summer sale ever! Up to 50% off on selected items...",
    platforms: ["Instagram", "Facebook"],
    scheduledFor: "Today, 2:00 PM",
    image: "/placeholder.svg",
  },
  {
    id: 2,
    title: "Behind the Scenes",
    preview: "Take a sneak peek at our creative process and meet the team behind the magic...",
    platforms: ["Twitter", "LinkedIn"],
    scheduledFor: "Tomorrow, 10:00 AM",
    image: "/placeholder.svg",
  },
  {
    id: 3,
    title: "Product Launch Teaser",
    preview: "Something exciting is coming! Stay tuned for our biggest product reveal...",
    platforms: ["All"],
    scheduledFor: "Mar 15, 9:00 AM",
    image: "/placeholder.svg",
  },
]

const platformIcons: Record<string, string> = {
  Instagram: "📸",
  Facebook: "📘",
  Twitter: "🐦",
  LinkedIn: "💼",
  All: "🌐",
}

export function ScheduledPosts() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Upcoming Posts</CardTitle>
        <Button variant="outline" size="sm" className="gap-2">
          <Calendar className="h-4 w-4" />
          View Calendar
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {scheduledPosts.map((post) => (
            <div
              key={post.id}
              className="flex gap-4 rounded-lg border border-border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-sm"
            >
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-muted">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex items-start justify-between">
                  <h4 className="font-semibold">{post.title}</h4>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Edit2 className="mr-2 h-4 w-4" />
                        Edit Post
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <p className="line-clamp-1 text-sm text-muted-foreground">{post.preview}</p>
                <div className="flex items-center justify-between">
                  <div className="flex gap-1">
                    {post.platforms.map((platform) => (
                      <Badge key={platform} variant="secondary" className="text-xs">
                        {platformIcons[platform]} {platform}
                      </Badge>
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">{post.scheduledFor}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
