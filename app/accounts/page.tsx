"use client"

import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { 
  Check, 
  X, 
  RefreshCw, 
  Settings, 
  Plus,
  ExternalLink,
  AlertCircle
} from "lucide-react"
import { cn } from "@/lib/utils"

const connectedAccounts = [
  {
    id: "facebook",
    name: "Facebook",
    icon: "📘",
    color: "bg-[#1877F2]",
    connected: true,
    account: "Your Brand Page",
    followers: "12.5K",
    lastSync: "2 min ago",
    autoPost: true,
  },
  {
    id: "instagram",
    name: "Instagram",
    icon: "📸",
    color: "bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737]",
    connected: true,
    account: "@yourbrand",
    followers: "28.3K",
    lastSync: "5 min ago",
    autoPost: true,
  },
  {
    id: "twitter",
    name: "Twitter / X",
    icon: "🐦",
    color: "bg-[#1DA1F2]",
    connected: true,
    account: "@yourbrand",
    followers: "8.9K",
    lastSync: "1 min ago",
    autoPost: false,
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    icon: "💼",
    color: "bg-[#0A66C2]",
    connected: true,
    account: "Your Brand",
    followers: "5.2K",
    lastSync: "10 min ago",
    autoPost: true,
  },
]

const availableAccounts = [
  {
    id: "tiktok",
    name: "TikTok",
    icon: "🎵",
    color: "bg-black",
    description: "Connect your TikTok business account",
  },
  {
    id: "youtube",
    name: "YouTube",
    icon: "📺",
    color: "bg-[#FF0000]",
    description: "Connect your YouTube channel",
  },
  {
    id: "pinterest",
    name: "Pinterest",
    icon: "📌",
    color: "bg-[#E60023]",
    description: "Connect your Pinterest business account",
  },
]

export default function AccountsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Social Accounts</h1>
          <p className="text-muted-foreground">
            Manage your connected social media accounts and permissions.
          </p>
        </div>

        {/* Connected Accounts */}
        <Card>
          <CardHeader>
            <CardTitle>Connected Accounts</CardTitle>
            <CardDescription>
              These accounts are connected and ready to publish content.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {connectedAccounts.map((account) => (
                <div
                  key={account.id}
                  className="flex items-center gap-4 rounded-lg border border-border bg-card p-4"
                >
                  <div className={cn("flex h-12 w-12 items-center justify-center rounded-lg text-2xl", account.color)}>
                    {account.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold">{account.name}</h4>
                      <Badge variant="outline" className="gap-1 text-success border-success">
                        <Check className="h-3 w-3" />
                        Connected
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{account.account}</p>
                    <div className="mt-1 flex items-center gap-4 text-xs text-muted-foreground">
                      <span>{account.followers} followers</span>
                      <span>Last sync: {account.lastSync}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">Auto-post</span>
                      <Switch checked={account.autoPost} />
                    </div>
                    <Button variant="ghost" size="icon">
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Settings className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Available Accounts */}
        <Card>
          <CardHeader>
            <CardTitle>Add More Accounts</CardTitle>
            <CardDescription>
              Connect additional social media platforms to expand your reach.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              {availableAccounts.map((account) => (
                <div
                  key={account.id}
                  className="flex flex-col items-center gap-3 rounded-lg border border-dashed border-border p-6 text-center transition-colors hover:border-primary hover:bg-muted/50"
                >
                  <div className={cn("flex h-14 w-14 items-center justify-center rounded-lg text-3xl", account.color)}>
                    {account.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold">{account.name}</h4>
                    <p className="text-sm text-muted-foreground">{account.description}</p>
                  </div>
                  <Button variant="outline" className="gap-2">
                    <Plus className="h-4 w-4" />
                    Connect
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Account Health */}
        <Card>
          <CardHeader>
            <CardTitle>Account Health</CardTitle>
            <CardDescription>
              Monitor the status and health of your connected accounts.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-lg bg-success/10 p-4">
                <div className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-success" />
                  <div>
                    <p className="font-medium">All tokens are valid</p>
                    <p className="text-sm text-muted-foreground">Your account connections are healthy</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="gap-2">
                  <RefreshCw className="h-4 w-4" />
                  Refresh All
                </Button>
              </div>

              <div className="flex items-center justify-between rounded-lg bg-warning/10 p-4">
                <div className="flex items-center gap-3">
                  <AlertCircle className="h-5 w-5 text-warning" />
                  <div>
                    <p className="font-medium">Instagram token expires in 7 days</p>
                    <p className="text-sm text-muted-foreground">Re-authenticate to maintain connection</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="gap-2">
                  <ExternalLink className="h-4 w-4" />
                  Re-authenticate
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
