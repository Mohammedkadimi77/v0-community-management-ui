"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

const data = [
  { name: "Jan", likes: 4000, comments: 2400, shares: 1200 },
  { name: "Feb", likes: 3000, comments: 1398, shares: 800 },
  { name: "Mar", likes: 5000, comments: 3800, shares: 1800 },
  { name: "Apr", likes: 4780, comments: 3908, shares: 2200 },
  { name: "May", likes: 5890, comments: 4800, shares: 2600 },
  { name: "Jun", likes: 6390, comments: 3800, shares: 2100 },
  { name: "Jul", likes: 7490, comments: 4300, shares: 2900 },
]

export function EngagementChart() {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Engagement Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorLikes" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="oklch(0.55 0.25 265)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="oklch(0.55 0.25 265)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorComments" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="oklch(0.65 0.18 180)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="oklch(0.65 0.18 180)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorShares" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="oklch(0.7 0.15 140)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="oklch(0.7 0.15 140)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis
                dataKey="name"
                className="text-xs"
                tick={{ fill: "oklch(0.5 0 0)" }}
                axisLine={{ stroke: "oklch(0.3 0 0)" }}
              />
              <YAxis
                className="text-xs"
                tick={{ fill: "oklch(0.5 0 0)" }}
                axisLine={{ stroke: "oklch(0.3 0 0)" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "oklch(0.14 0 0)",
                  border: "1px solid oklch(0.25 0 0)",
                  borderRadius: "8px",
                  color: "oklch(0.95 0 0)",
                }}
              />
              <Area
                type="monotone"
                dataKey="likes"
                stroke="oklch(0.55 0.25 265)"
                fillOpacity={1}
                fill="url(#colorLikes)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="comments"
                stroke="oklch(0.65 0.18 180)"
                fillOpacity={1}
                fill="url(#colorComments)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="shares"
                stroke="oklch(0.7 0.15 140)"
                fillOpacity={1}
                fill="url(#colorShares)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 flex items-center justify-center gap-6">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-chart-1" />
            <span className="text-sm text-muted-foreground">Likes</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-chart-2" />
            <span className="text-sm text-muted-foreground">Comments</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-chart-3" />
            <span className="text-sm text-muted-foreground">Shares</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
