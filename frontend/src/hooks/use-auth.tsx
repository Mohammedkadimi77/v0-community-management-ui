import { createContext, useContext, useEffect, useMemo, useState } from "react"
import { authApi, setStoredToken, getStoredToken } from "@/lib/api"
import { BackendUser } from "@/lib/types"

interface AuthContextValue {
  user: BackendUser | null
  loading: boolean
  isAuthenticated: boolean
  login: (payload: { email: string; password: string }) => Promise<void>
  register: (payload: {
    first_name: string
    last_name: string
    email: string
    password: string
    password_confirmation: string
    role: "community_manager" | "redacteur" | "lecteur"
  }) => Promise<void>
  logout: () => Promise<void>
  refreshMe: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<BackendUser | null>(null)
  const [loading, setLoading] = useState(true)

  async function refreshMe() {
    const token = getStoredToken()

    if (!token) {
      setUser(null)
      return
    }

    try {
      const me = await authApi.me()
      setUser(me)
    } catch {
      setStoredToken(null)
      setUser(null)
    }
  }

  useEffect(() => {
    ;(async () => {
      await refreshMe()
      setLoading(false)
    })()
  }, [])

  async function login(payload: { email: string; password: string }) {
    const response = await authApi.login(payload)
    setStoredToken(response.token)
    setUser(response.user ?? response.utilisateur ?? null)

    if (!(response.user ?? response.utilisateur)) {
      await refreshMe()
    }
  }

  async function register(payload: {
    first_name: string
    last_name: string
    email: string
    password: string
    password_confirmation: string
    role: "community_manager" | "redacteur" | "lecteur"
  }) {
    const response = await authApi.register(payload)
    setStoredToken(response.token)
    setUser(response.user ?? response.utilisateur ?? null)

    if (!(response.user ?? response.utilisateur)) {
      await refreshMe()
    }
  }

  async function logout() {
    try {
      await authApi.logout()
    } finally {
      setStoredToken(null)
      setUser(null)
    }
  }

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      loading,
      isAuthenticated: Boolean(user),
      login,
      register,
      logout,
      refreshMe,
    }),
    [user, loading],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }

  return context
}
