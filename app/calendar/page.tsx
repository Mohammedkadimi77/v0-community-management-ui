import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { CalendarView } from "@/components/calendar/calendar-view"
import { UpcomingPosts } from "@/components/calendar/upcoming-posts"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

export default function CalendarPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Calendar</h1>
            <p className="text-muted-foreground">
              Plan and schedule your content across all platforms.
            </p>
          </div>
          <Button asChild className="gap-2">
            <Link href="/create">
              <Plus className="h-4 w-4" />
              Schedule Post
            </Link>
          </Button>
        </div>

        {/* Calendar and Upcoming Posts */}
        <div className="grid gap-6 lg:grid-cols-3">
          <CalendarView />
          <UpcomingPosts />
        </div>
      </div>
    </DashboardLayout>
  )
}
