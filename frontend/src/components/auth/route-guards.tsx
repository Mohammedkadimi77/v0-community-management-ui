import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "@/hooks/use-auth"
import { AppFeature, hasFeatureAccess } from "@/lib/roles"

export function ProtectedRoute({ requiredFeature }: { requiredFeature?: AppFeature }) {
  const { isAuthenticated, loading, user } = useAuth()

  if (loading) {
    return <div className="min-h-screen grid place-items-center text-muted-foreground">Loading...</div>
  }

  if (isAuthenticated && requiredFeature && !hasFeatureAccess(user?.role, requiredFeature)) {
    return <Navigate to="/" replace />
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />
}

export function GuestRoute() {
  const { isAuthenticated, loading } = useAuth()

  if (loading) {
    return <div className="min-h-screen grid place-items-center text-muted-foreground">Loading...</div>
  }

  return isAuthenticated ? <Navigate to="/" replace /> : <Outlet />
}
