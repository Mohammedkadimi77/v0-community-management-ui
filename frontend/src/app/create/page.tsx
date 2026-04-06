import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { PostEditor } from "@/components/create/post-editor"
import { PlatformSelector } from "@/components/create/platform-selector"
import { AIAssistantPanel } from "@/components/create/ai-assistant-panel"
import { SchedulePicker, timeSlots } from "@/components/create/schedule-picker"
import { usePlatforms } from "@/hooks/use-community-data"
import { useState } from "react"
import { communityApi } from "@/lib/api"
import { toast } from "sonner"

function to24Hour(value: string): string {
  const [time, period] = value.split(" ")
  const [hourRaw, minute] = time.split(":")
  let hour = Number(hourRaw)

  if (period === "PM" && hour !== 12) hour += 12
  if (period === "AM" && hour === 12) hour = 0

  return `${String(hour).padStart(2, "0")}:${minute}`
}

export default function CreatePostPage() {
  const { platforms, loading: loadingPlatforms } = usePlatforms()
  const [content, setContent] = useState("")
  const [hashtags, setHashtags] = useState<string[]>([])
  const [selectedPlatforms, setSelectedPlatforms] = useState<number[]>([])
  const [publishType, setPublishType] = useState<"now" | "schedule">("schedule")
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [time, setTime] = useState(timeSlots[1])
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function createForSelectedPlatforms(
    mode: "publish" | "schedule" | "draft",
  ) {
    if (selectedPlatforms.length === 0) {
      toast.error("Selectionnez au moins une plateforme")
      return
    }

    if (!content.trim()) {
      toast.error("Le contenu de publication est requis")
      return
    }

    setIsSubmitting(true)

    try {
      const selectedDate = date ?? new Date()
      const isoDate = selectedDate.toISOString().slice(0, 10)
      const hhmm = to24Hour(time)

      await Promise.all(
        selectedPlatforms.map(async (platformId) => {
          await communityApi.createPost({
            plateforme_id: platformId,
            contenu: content,
            type_contenu: "post_statique",
            hashtags,
            statut: mode === "draft" ? "brouillon" : "approuve",
            publie_le: mode === "publish" ? new Date().toISOString() : null,
          })

          if (mode === "schedule") {
            await communityApi.createCalendarEntry({
              plateforme_id: platformId,
              titre: content.slice(0, 60),
              description: content,
              type_contenu: "post_statique",
              date_publication: isoDate,
              heure_publication: hhmm,
              statut: "programme",
            })
          }
        }),
      )

      toast.success(
        mode === "draft"
          ? "Brouillon enregistre"
          : mode === "schedule"
            ? "Publication planifiee"
            : "Publication envoyee",
      )
      setContent("")
      setHashtags([])
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Echec de la creation")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Create Post</h1>
          <p className="text-muted-foreground">
            Craft your message and let AI help you optimize it for maximum engagement.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column - Editor and AI */}
          <div className="space-y-6 lg:col-span-2">
            <PostEditor
              content={content}
              onContentChange={setContent}
              selectedHashtags={hashtags}
              onHashtagsChange={setHashtags}
            />
            <AIAssistantPanel />
          </div>

          {/* Right Column - Platform Selection and Schedule */}
          <div className="space-y-6">
            <PlatformSelector
              platforms={platforms}
              selectedPlatforms={selectedPlatforms}
              onChange={setSelectedPlatforms}
            />
            {!loadingPlatforms && (
              <SchedulePicker
                date={date}
                onDateChange={setDate}
                time={time}
                onTimeChange={setTime}
                publishType={publishType}
                onPublishTypeChange={setPublishType}
                onPrimaryAction={() => createForSelectedPlatforms(publishType === "now" ? "publish" : "schedule")}
                onSaveDraft={() => createForSelectedPlatforms("draft")}
                isSubmitting={isSubmitting}
              />
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
