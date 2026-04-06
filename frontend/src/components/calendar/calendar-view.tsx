"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  addDays,
  addMonths,
  format,
  getDay,
  isSameDay,
  isSameMonth,
  isToday,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns"

interface ScheduledPost {
  id: number
  title: string
  time: string
  platform: string
  color: string
}

const scheduledPosts: Record<string, ScheduledPost[]> = {
  "2024-03-15": [
    { id: 1, title: "Product Launch", time: "09:00", platform: "All", color: "bg-primary" },
    { id: 2, title: "Behind the Scenes", time: "14:00", platform: "Instagram", color: "bg-pink-500" },
  ],
  "2024-03-18": [
    { id: 3, title: "Weekly Tips", time: "10:00", platform: "LinkedIn", color: "bg-blue-600" },
  ],
  "2024-03-20": [
    { id: 4, title: "Customer Story", time: "11:00", platform: "Facebook", color: "bg-blue-500" },
    { id: 5, title: "Flash Sale", time: "15:00", platform: "Twitter", color: "bg-sky-500" },
  ],
  "2024-03-22": [
    { id: 6, title: "Team Spotlight", time: "12:00", platform: "LinkedIn", color: "bg-blue-600" },
  ],
  "2024-03-25": [
    { id: 7, title: "New Feature", time: "09:00", platform: "All", color: "bg-primary" },
  ],
}

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

export function CalendarView() {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const monthStart = startOfMonth(currentMonth)
  const startDate = startOfWeek(monthStart)

  const days: Date[] = []
  let day = startDate
  for (let i = 0; i < 42; i++) {
    days.push(day)
    day = addDays(day, 1)
  }

  const getPostsForDate = (date: Date): ScheduledPost[] => {
    const dateKey = format(date, "yyyy-MM-dd")
    return scheduledPosts[dateKey] || []
  }

  return (
    <Card className="col-span-2">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle>Calendar</CardTitle>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="min-w-[140px] text-center font-medium">
            {format(currentMonth, "MMMM yyyy")}
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {/* Week Days Header */}
        <div className="mb-2 grid grid-cols-7 gap-1">
          {weekDays.map((day) => (
            <div
              key={day}
              className="py-2 text-center text-sm font-medium text-muted-foreground"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1">
          {days.map((date, index) => {
            const posts = getPostsForDate(date)
            const isCurrentMonth = isSameMonth(date, currentMonth)
            const isSelected = selectedDate && isSameDay(date, selectedDate)

            return (
              <div
                key={index}
                className={cn(
                  "min-h-[100px] rounded-lg border p-2 transition-colors cursor-pointer",
                  isCurrentMonth ? "bg-card" : "bg-muted/30",
                  isToday(date) && "border-primary",
                  isSelected && "ring-2 ring-primary",
                  "hover:border-primary/50"
                )}
                onClick={() => setSelectedDate(date)}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={cn(
                      "flex h-7 w-7 items-center justify-center rounded-full text-sm",
                      isToday(date) && "bg-primary text-primary-foreground",
                      !isCurrentMonth && "text-muted-foreground"
                    )}
                  >
                    {format(date, "d")}
                  </span>
                  {posts.length > 0 && (
                    <Badge variant="secondary" className="text-xs">
                      {posts.length}
                    </Badge>
                  )}
                </div>
                <div className="mt-1 space-y-1">
                  {posts.slice(0, 2).map((post) => (
                    <div
                      key={post.id}
                      className={cn(
                        "truncate rounded px-1.5 py-0.5 text-xs text-white",
                        post.color
                      )}
                    >
                      {post.time} {post.title}
                    </div>
                  ))}
                  {posts.length > 2 && (
                    <div className="text-xs text-muted-foreground">
                      +{posts.length - 2} more
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
