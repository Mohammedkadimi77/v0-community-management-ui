import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { Platform } from "@/lib/types"

const iconBySlug: Record<string, string> = {
  facebook: "📘",
  instagram: "📸",
  twitter: "🐦",
  x: "🐦",
  linkedin: "💼",
}

interface PlatformSelectorProps {
  platforms: Platform[]
  selectedPlatforms: number[]
  onChange: (ids: number[]) => void
}

export function PlatformSelector({ platforms, selectedPlatforms, onChange }: PlatformSelectorProps) {

  const togglePlatform = (platformId: number) => {
    if (selectedPlatforms.includes(platformId)) {
      onChange(selectedPlatforms.filter((id) => id !== platformId))
    } else {
      onChange([...selectedPlatforms, platformId])
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
              id={String(platform.id)}
              checked={selectedPlatforms.includes(platform.id)}
              onCheckedChange={() => togglePlatform(platform.id)}
            />
            <div className={cn("flex h-8 w-8 items-center justify-center rounded-lg text-lg", "bg-primary")}>
              {iconBySlug[platform.slug] ?? "🌐"}
            </div>
            <div className="flex-1">
              <Label htmlFor={String(platform.id)} className="font-medium cursor-pointer">
                {platform.nom}
              </Label>
              <p className="text-xs text-muted-foreground">{platform.slug}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
