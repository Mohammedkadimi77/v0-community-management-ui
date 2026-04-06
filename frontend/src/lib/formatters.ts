import { format, isValid } from "date-fns"

export function parseBackendDateTime(date?: string | null, time?: string | null): Date | null {
  if (!date || typeof date !== "string") return null

  const normalizedTime =
    typeof time === "string" && time.trim().length > 0
      ? time.trim().length === 5
        ? `${time.trim()}:00`
        : time.trim()
      : "09:00:00"

  const parsed = new Date(`${date}T${normalizedTime}`)
  if (!isValid(parsed)) return null

  return parsed
}

export function formatDateTimeSafe(date?: string | null, time?: string | null, fallback = "Date non definie"): string {
  const parsed = parseBackendDateTime(date, time)
  if (!parsed) return fallback

  return format(parsed, "PPP p")
}

export function normalizeImageUrl(url?: string | null): string | undefined {
  if (!url || typeof url !== "string") return undefined

  const trimmed = url.trim()
  if (!trimmed) return undefined

  if (trimmed.startsWith("/")) return trimmed
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) return trimmed

  return undefined
}
