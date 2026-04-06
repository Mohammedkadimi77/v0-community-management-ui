"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

type EngagementPoint = {
  name: string
  likes: number
  comments: number
  shares: number
  impressions: number
}

type FollowersPoint = {
  name: string
  followers: number
}

type PlatformEngagementPoint = {
  platform: string
  engagement: number
}

interface AnalyticsChartsProps {
  engagementData: EngagementPoint[]
  followerGrowthData: FollowersPoint[]
  platformEngagement: PlatformEngagementPoint[]
}

export function AnalyticsCharts({ engagementData, followerGrowthData, platformEngagement }: AnalyticsChartsProps) {
  return (
    <div className="space-y-6">
      {/* Engagement Over Time */}
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Engagement Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="engagement" className="space-y-4">
            <TabsList>
              <TabsTrigger value="engagement">Engagement</TabsTrigger>
              <TabsTrigger value="impressions">Impressions</TabsTrigger>
              <TabsTrigger value="followers">Followers</TabsTrigger>
            </TabsList>
            <TabsContent value="engagement" className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={engagementData}>
                  <defs>
                    <linearGradient id="colorLikes" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="oklch(0.55 0.25 265)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="oklch(0.55 0.25 265)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorComments" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="oklch(0.65 0.18 180)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="oklch(0.65 0.18 180)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="name" tick={{ fill: "oklch(0.5 0 0)" }} />
                  <YAxis tick={{ fill: "oklch(0.5 0 0)" }} />
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
                </AreaChart>
              </ResponsiveContainer>
            </TabsContent>
            <TabsContent value="impressions" className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={engagementData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="name" tick={{ fill: "oklch(0.5 0 0)" }} />
                  <YAxis tick={{ fill: "oklch(0.5 0 0)" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "oklch(0.14 0 0)",
                      border: "1px solid oklch(0.25 0 0)",
                      borderRadius: "8px",
                      color: "oklch(0.95 0 0)",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="impressions"
                    stroke="oklch(0.75 0.18 60)"
                    strokeWidth={2}
                    dot={{ fill: "oklch(0.75 0.18 60)" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </TabsContent>
            <TabsContent value="followers" className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={followerGrowthData}>
                  <defs>
                    <linearGradient id="colorFollowers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="oklch(0.7 0.15 140)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="oklch(0.7 0.15 140)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="name" tick={{ fill: "oklch(0.5 0 0)" }} />
                  <YAxis tick={{ fill: "oklch(0.5 0 0)" }} />
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
                    dataKey="followers"
                    stroke="oklch(0.7 0.15 140)"
                    fillOpacity={1}
                    fill="url(#colorFollowers)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Platform Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Engagement Rate by Platform</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={platformEngagement} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis type="number" tick={{ fill: "oklch(0.5 0 0)" }} />
                <YAxis dataKey="platform" type="category" tick={{ fill: "oklch(0.5 0 0)" }} width={80} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "oklch(0.14 0 0)",
                    border: "1px solid oklch(0.25 0 0)",
                    borderRadius: "8px",
                    color: "oklch(0.95 0 0)",
                  }}
                  formatter={(value) => [`${value}%`, "Engagement Rate"]}
                />
                <Bar dataKey="engagement" fill="oklch(0.55 0.25 265)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
