export interface BackendUser {
  id: number
  nom: string
  prenom: string
  email: string
  role: "admin" | "community_manager" | "redacteur" | "lecteur"
  actif: boolean
  avatar_url?: string | null
}

export interface ApiList<T> {
  current_page: number
  data: T[]
  per_page: number
  total: number
}

export interface Platform {
  id: number
  nom: string
  slug: string
  couleur_hex?: string
  actif: boolean
}

export interface Publication {
  id: number
  contenu: string
  type_contenu: string
  statut: string
  hashtags?: string[]
  publie_le?: string | null
  created_at: string
  plateforme?: Platform
  plateforme_id: number
}

export interface CalendarEntry {
  id: number
  titre: string
  description?: string | null
  theme?: string | null
  type_contenu: string
  date_publication: string
  heure_publication?: string | null
  statut: string
  plateforme?: Platform
}

export interface Comment {
  id: number
  contenu: string
  auteur_externe?: string | null
  sentiment?: "positif" | "neutre" | "negatif" | null
  statut: string
  created_at: string
  publication?: {
    id: number
    contenu: string
    plateforme?: Platform
  }
}
