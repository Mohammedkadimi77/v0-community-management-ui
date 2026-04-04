"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

const platforms = [
  {
    id: "facebook",
    name: "Facebook",
    icon: "📘",
    color: "bg-[#1877F2]",
    connected: true,
    account: "@yourbrand",
  },
  {
    id: "instagram",
    name: "Instagram",
    icon: "📸",
    color: "bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737]",
    connected: true,
    account: "@yourbrand",
  },
  {
    id: "twitter",
    name: "Twitter / X",
    icon: "🐦",
    color: "bg-[#1DA1F2]",
    connected: true,
    account: "@yourbrand",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    icon: "💼",
    color: "bg-[#0A66C2]",
    connected: true,
    account: "Your Brand",
  },
]

export function PlatformSelector() {
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(["facebook", "instagram"])

  const togglePlatform = (platformId: string) => {
    if (selectedPlatforms.includes(platformId)) {
      setSelectedPlatforms(selectedPlatforms.filter((id) => id !== platformId))
    } else {
      setSelectedPlatforms([...selectedPlatforms, platformId])
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Publish To</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {platforms.map((platform) => (
          <div
            key={platform.id}
            className={cn(
              "flex items-center gap-3 rounded-lg border p-3 transition-all cursor-pointer",
              selectedPlatforms.includes(platform.id)
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary/50"
            )}
            onClick={() => togglePlatform(platform.id)}
          >
            <Checkbox
              id={platform.id}
              checked={selectedPlatforms.includes(platform.id)}
              onCheckedChange={() => togglePlatform(platform.id)}
            />
            <div className={cn("flex h-8 w-8 items-center justify-center rounded-lg text-lg", platform.color)}>
              {platform.icon}
            </div>
            <div className="flex-1">
              <Label htmlFor={platform.id} className="font-medium cursor-pointer">
                {platform.name}
              </Label>
              <p className="text-xs text-muted-foreground">{platform.account}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
