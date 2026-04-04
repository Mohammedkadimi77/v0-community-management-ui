"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const heatmapData = [
  { day: "Mon", hours: [2, 3, 5, 7, 8, 9, 8, 6, 4, 3, 5, 7, 8, 9, 7, 5, 4, 3, 2, 1, 1, 1, 1, 1] },
  { day: "Tue", hours: [1, 2, 4, 6, 7, 8, 9, 8, 6, 5, 6, 8, 9, 10, 9, 7, 5, 4, 3, 2, 1, 1, 1, 1] },
  { day: "Wed", hours: [2, 2, 3, 5, 6, 7, 8, 7, 5, 4, 5, 7, 8, 9, 8, 6, 4, 3, 2, 2, 1, 1, 1, 1] },
  { day: "Thu", hours: [1, 2, 4, 6, 8, 9, 10, 9, 7, 5, 6, 8, 9, 10, 9, 7, 5, 4, 3, 2, 1, 1, 1, 1] },
  { day: "Fri", hours: [2, 3, 4, 5, 6, 7, 8, 7, 5, 4, 5, 6, 7, 8, 7, 6, 5, 4, 3, 3, 2, 2, 1, 1] },
  { day: "Sat", hours: [3, 4, 5, 6, 5, 4, 3, 3, 4, 5, 6, 7, 8, 8, 7, 6, 5, 5, 4, 4, 3, 3, 2, 2] },
  { day: "Sun", hours: [4, 5, 5, 5, 4, 3, 3, 3, 4, 5, 6, 7, 8, 8, 7, 6, 5, 5, 4, 4, 3, 3, 2, 2] },
]

const hours = Array.from({ length: 24 }, (_, i) => i)

const getIntensityColor = (value: number) => {
  if (value <= 2) return "bg-primary/10"
  if (value <= 4) return "bg-primary/20"
  if (value <= 6) return "bg-primary/40"
  if (value <= 8) return "bg-primary/60"
  return "bg-primary/90"
}

export function BestTimes() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Best Times to Post</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Heatmap */}
          <div className="overflow-x-auto">
            <div className="min-w-[600px]">
              {/* Hour Labels */}
              <div className="mb-1 flex pl-10">
                {hours.filter((h) => h % 3 === 0).map((hour) => (
                  <div
                    key={hour}
                    className="text-xs text-muted-foreground"
                    style={{ width: "12.5%", textAlign: "center" }}
                  >
                    {hour === 0 ? "12am" : hour === 12 ? "12pm" : hour > 12 ? `${hour - 12}pm` : `${hour}am`}
                  </div>
                ))}
              </div>

              {/* Heatmap Grid */}
              {heatmapData.map((row) => (
                <div key={row.day} className="flex items-center">
                  <div className="w-10 text-sm font-medium">{row.day}</div>
                  <div className="flex flex-1 gap-0.5">
                    {row.hours.map((value, index) => (
                      <div
                        key={index}
                        className={cn(
                          "h-6 flex-1 rounded-sm transition-colors hover:ring-1 hover:ring-primary",
                          getIntensityColor(value)
                        )}
                        title={`${row.day} ${index}:00 - Engagement: ${value}/10`}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center gap-2">
            <span className="text-xs text-muted-foreground">Low</span>
            <div className="flex gap-0.5">
              <div className="h-4 w-4 rounded-sm bg-primary/10" />
              <div className="h-4 w-4 rounded-sm bg-primary/20" />
              <div className="h-4 w-4 rounded-sm bg-primary/40" />
              <div className="h-4 w-4 rounded-sm bg-primary/60" />
              <div className="h-4 w-4 rounded-sm bg-primary/90" />
            </div>
            <span className="text-xs text-muted-foreground">High</span>
          </div>

          {/* Top Recommendations */}
          <div className="rounded-lg bg-primary/10 p-4">
            <h4 className="font-semibold text-primary">AI Recommendations</h4>
            <ul className="mt-2 space-y-1 text-sm">
              <li>Best overall: <strong>Thursday at 9:00 AM</strong></li>
              <li>Peak engagement: <strong>Tuesday & Thursday afternoons</strong></li>
              <li>Weekend sweet spot: <strong>Saturday at 1:00 PM</strong></li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
