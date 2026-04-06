import { lazy, Suspense } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import { GuestRoute, ProtectedRoute } from "@/components/auth/route-guards"

const DashboardPage = lazy(() => import("./app/page"))
const AccountsPage = lazy(() => import("./app/accounts/page"))
const AIAssistantPage = lazy(() => import("@/app/ai-assistant/page"))
const AnalyticsPage = lazy(() => import("@/app/analytics/page"))
const CalendarPage = lazy(() => import("@/app/calendar/page"))
const CommentsPage = lazy(() => import("@/app/comments/page"))
const CreatePostPage = lazy(() => import("@/app/create/page"))
const HelpPage = lazy(() => import("@/app/help/page"))
const SettingsPage = lazy(() => import("@/app/settings/page"))
const LoginPage = lazy(() => import("@/app/auth/login/page"))
const RegisterPage = lazy(() => import("@/app/auth/register/page"))

export default function App() {
  return (
    <Suspense fallback={<div className="min-h-screen grid place-items-center text-muted-foreground">Loading...</div>}>
      <Routes>
        <Route element={<GuestRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        <Route element={<ProtectedRoute requiredFeature="dashboard" />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/dashboard" element={<Navigate to="/" replace />} />
        </Route>

        <Route element={<ProtectedRoute requiredFeature="accounts" />}>
          <Route path="/accounts" element={<AccountsPage />} />
        </Route>

        <Route element={<ProtectedRoute requiredFeature="ai-assistant" />}>
          <Route path="/ai-assistant" element={<AIAssistantPage />} />
        </Route>

        <Route element={<ProtectedRoute requiredFeature="analytics" />}>
          <Route path="/analytics" element={<AnalyticsPage />} />
        </Route>

        <Route element={<ProtectedRoute requiredFeature="calendar" />}>
          <Route path="/calendar" element={<CalendarPage />} />
        </Route>

        <Route element={<ProtectedRoute requiredFeature="comments" />}>
          <Route path="/comments" element={<CommentsPage />} />
        </Route>

        <Route element={<ProtectedRoute requiredFeature="create" />}>
          <Route path="/create" element={<CreatePostPage />} />
        </Route>

        <Route element={<ProtectedRoute requiredFeature="help" />}>
          <Route path="/help" element={<HelpPage />} />
        </Route>

        <Route element={<ProtectedRoute requiredFeature="settings" />}>
          <Route path="/settings" element={<SettingsPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  )
}
