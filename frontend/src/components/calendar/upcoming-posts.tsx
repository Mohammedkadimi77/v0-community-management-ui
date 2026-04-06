"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Clock, 
  MoreHorizontal, 
  Edit2, 
  Trash2, 
  Copy,
  GripVertical
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { useCalendar } from "@/hooks/use-community-data"
import { formatDateTimeSafe } from "@/lib/formatters"

const platformColors: Record<string, string> = {
  Instagram: "bg-gradient-to-r from-purple-500 to-pink-500",
  Facebook: "bg-blue-500",
  Twitter: "bg-sky-500",
  LinkedIn: "bg-blue-600",
  All: "bg-primary",
}

export function UpcomingPosts() {
  const { entries, loading } = useCalendar("?a_venir=1")

  const upcomingPosts = entries.slice(0, 7).map((entry) => {
    return {
      id: entry.id,
      title: entry.titre,
      scheduledFor: formatDateTimeSafe(entry.date_publication, entry.heure_publication),
      platforms: [entry.plateforme?.nom ?? "All"],
      status: entry.statut === "idee" ? "draft" : "scheduled",
    }
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Posts</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {loading && <p className="text-sm text-muted-foreground">Chargement...</p>}
          {!loading && upcomingPosts.length === 0 && (
            <p className="text-sm text-muted-foreground">Aucune publication planifiee.</p>
          )}
          {upcomingPosts.map((post) => (
            <div
              key={post.id}
              className="group flex items-center gap-3 rounded-lg border border-border bg-card p-3 transition-all hover:border-primary/50 hover:shadow-sm"
            >
              <div className="cursor-grab text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">
                <GripVertical className="h-4 w-4" />
              </div>
              
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium">{post.title}</h4>
                  {post.status === "draft" && (
                    <Badge variant="outline" className="text-xs">Draft</Badge>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" />
                    {post.scheduledFor}
                  </div>
                  <div className="flex gap-1">
                    {post.platforms.map((platform) => (
                      <div
                        key={platform}
                        className={cn(
                          "h-5 w-5 rounded-full flex items-center justify-center text-[10px] text-white font-medium",
                          platformColors[platform]
                        )}
                        title={platform}
                      >
                        {platform[0]}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Edit2 className="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Copy className="mr-2 h-4 w-4" />
                    Duplicate
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
