import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { PostEditor } from "@/components/create/post-editor"
import { PlatformSelector } from "@/components/create/platform-selector"
import { AIAssistantPanel } from "@/components/create/ai-assistant-panel"
import { SchedulePicker } from "@/components/create/schedule-picker"

export default function CreatePostPage() {
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
            <PostEditor />
            <AIAssistantPanel />
          </div>

          {/* Right Column - Platform Selection and Schedule */}
          <div className="space-y-6">
            <PlatformSelector />
            <SchedulePicker />
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
