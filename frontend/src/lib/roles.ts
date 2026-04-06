import type { BackendUser } from "@/lib/types"

export type UserRole = BackendUser["role"]

export type AppFeature =
  | "dashboard"
  | "create"
  | "calendar"
  | "analytics"
  | "comments"
  | "accounts"
  | "ai-assistant"
  | "settings"
  | "help"

const FEATURE_BY_ROLE: Record<UserRole, AppFeature[]> = {
  admin: [
    "dashboard",
    "create",
    "calendar",
    "analytics",
    "comments",
    "accounts",
    "ai-assistant",
    "settings",
    "help",
  ],
  community_manager: [
    "dashboard",
    "create",
    "calendar",
    "analytics",
    "comments",
    "accounts",
    "ai-assistant",
    "settings",
    "help",
  ],
  redacteur: [
    "dashboard",
    "create",
    "calendar",
    "analytics",
    "comments",
    "ai-assistant",
    "settings",
    "help",
  ],
  lecteur: [
    "dashboard",
    "calendar",
    "settings",
    "help",
  ],
}

export function hasFeatureAccess(role: UserRole | null | undefined, feature: AppFeature): boolean {
  if (!role) {
    return false
  }

  return FEATURE_BY_ROLE[role].includes(feature)
}
