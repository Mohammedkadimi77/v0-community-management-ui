import { BackendUser } from "@/lib/types"
import { ApiList, CalendarEntry, Comment, Platform, Publication } from "@/lib/types"

const API_URL = import.meta.env.VITE_API_URL ?? "http://127.0.0.1:8000/api"
const TOKEN_KEY = "cm_token"

export function getStoredToken(): string | null {
  return localStorage.getItem(TOKEN_KEY)
}

export function setStoredToken(token: string | null) {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token)
    return
  }

  localStorage.removeItem(TOKEN_KEY)
}

export async function apiFetch<T>(path: string, init: RequestInit = {}): Promise<T> {
  const token = getStoredToken()
  const headers = new Headers(init.headers)

  if (!headers.has("Content-Type") && !(init.body instanceof FormData)) {
    headers.set("Content-Type", "application/json")
  }

  if (token) {
    headers.set("Authorization", `Bearer ${token}`)
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    headers,
  })

  if (response.status === 204) {
    return undefined as T
  }

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    const message = data?.message ?? `Request failed (${response.status})`
    throw new Error(message)
  }

  return data as T
}

export interface AuthResponse {
  message: string
  token: string
  user?: BackendUser
  utilisateur?: BackendUser
}

export const authApi = {
  async login(payload: { email: string; password: string }) {
    return apiFetch<AuthResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify(payload),
    })
  },

  async register(payload: {
    first_name: string
    last_name: string
    email: string
    password: string
    password_confirmation: string
    role: "community_manager" | "redacteur" | "lecteur"
  }) {
    return apiFetch<AuthResponse>("/auth/register", {
      method: "POST",
      body: JSON.stringify(payload),
    })
  },

  async me() {
    return apiFetch<BackendUser>("/auth/me")
  },

  async logout() {
    return apiFetch<{ message: string }>("/auth/logout", {
      method: "POST",
    })
  },
}

export const communityApi = {
  async getPlatforms() {
    return apiFetch<Platform[]>("/platforms")
  },

  async getPosts(query = "") {
    return apiFetch<ApiList<Publication>>(`/posts${query}`)
  },

  async getCalendar(query = "") {
    return apiFetch<ApiList<CalendarEntry>>(`/calendar${query}`)
  },

  async getPendingComments() {
    return apiFetch<ApiList<Comment>>("/commentaires/en-attente")
  },

  async getPostComments(postId: number) {
    return apiFetch<ApiList<Comment>>(`/posts/${postId}/comments`)
  },

  async moderateComment(commentId: number, payload: { statut: "approuve" | "masque" | "signale" | "supprime"; sentiment?: "positif" | "neutre" | "negatif" }) {
    return apiFetch<Comment>(`/commentaires/${commentId}/moderer`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    })
  },

  async deleteComment(commentId: number) {
    return apiFetch<{ message: string }>(`/commentaires/${commentId}`, {
      method: "DELETE",
    })
  },

  async createPost(payload: {
    plateforme_id: number
    contenu: string
    type_contenu: string
    hashtags?: string[]
    statut?: string
    publie_le?: string | null
  }) {
    return apiFetch<Publication>("/publications", {
      method: "POST",
      body: JSON.stringify(payload),
    })
  },

  async createCalendarEntry(payload: {
    plateforme_id: number
    titre: string
    description?: string
    type_contenu: string
    date_publication: string
    heure_publication?: string
    statut?: string
  }) {
    return apiFetch<CalendarEntry>("/calendrier", {
      method: "POST",
      body: JSON.stringify(payload),
    })
  },
}
