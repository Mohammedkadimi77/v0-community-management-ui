"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, MoreHorizontal, Edit2, Trash2 } from "lucide-react"
import { useCalendar } from "@/hooks/use-community-data"
import { formatDateTimeSafe } from "@/lib/formatters"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ScheduledPosts() {
  const { entries, loading } = useCalendar("?a_venir=1")

  const scheduledPosts = entries.slice(0, 5).map((entry) => {
    return {
      id: entry.id,
      title: entry.titre,
      preview: entry.description ?? "Publication planifiee depuis le calendrier editorial",
      platforms: [entry.plateforme?.nom ?? "Platform"],
      scheduledFor: formatDateTimeSafe(entry.date_publication, entry.heure_publication),
      image: "/placeholder.svg",
    }
  })

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
          {loading && <p className="text-sm text-muted-foreground">Chargement...</p>}
          {!loading && scheduledPosts.length === 0 && (
            <p className="text-sm text-muted-foreground">Aucune publication planifiee.</p>
          )}
          {scheduledPosts.map((post) => (
            <div
              key={post.id}
              className="flex gap-4 rounded-lg border border-border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-sm"
            >
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-muted">
                <img src={post.image} alt={post.title} className="h-full w-full object-cover" />
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
                        {platform}
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
