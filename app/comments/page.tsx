"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  Send, 
  ThumbsUp, 
  ThumbsDown,
  Smile,
  Meh,
  Frown,
  Reply,
  Trash2,
  Flag,
  CheckCircle,
  Sparkles
} from "lucide-react"
import { cn } from "@/lib/utils"

const comments = [
  {
    id: 1,
    author: "Sarah Miller",
    avatar: "/avatars/sarah.jpg",
    content: "This is absolutely amazing! I've been looking for a tool like this for months. The AI features are game-changing!",
    platform: "Instagram",
    post: "Product Launch Announcement",
    time: "2 min ago",
    sentiment: "positive",
    replied: false,
  },
  {
    id: 2,
    author: "James Wilson",
    avatar: "/avatars/james.jpg",
    content: "Interesting concept, but I'm not sure about the pricing. Can you share more details about the plans?",
    platform: "Twitter",
    post: "Pricing Update",
    time: "15 min ago",
    sentiment: "neutral",
    replied: false,
  },
  {
    id: 3,
    author: "Emily Chen",
    avatar: "/avatars/emily.jpg",
    content: "This doesn't work for me at all. I've been having issues with the sync feature for days now.",
    platform: "Facebook",
    post: "Feature Release",
    time: "1 hour ago",
    sentiment: "negative",
    replied: true,
  },
  {
    id: 4,
    author: "Michael Brown",
    avatar: "/avatars/michael.jpg",
    content: "Great update! Love the new calendar feature. Makes scheduling so much easier.",
    platform: "LinkedIn",
    post: "Weekly Tips",
    time: "2 hours ago",
    sentiment: "positive",
    replied: true,
  },
  {
    id: 5,
    author: "Lisa Davis",
    avatar: "/avatars/lisa.jpg",
    content: "How does this compare to other tools in the market? Looking for honest opinions.",
    platform: "Twitter",
    post: "Product Comparison",
    time: "3 hours ago",
    sentiment: "neutral",
    replied: false,
  },
]

const sentimentConfig = {
  positive: { icon: Smile, color: "text-success", bg: "bg-success/10", label: "Positive" },
  neutral: { icon: Meh, color: "text-warning", bg: "bg-warning/10", label: "Neutral" },
  negative: { icon: Frown, color: "text-destructive", bg: "bg-destructive/10", label: "Negative" },
}

const platformColors: Record<string, string> = {
  Instagram: "bg-gradient-to-r from-purple-500 to-pink-500 text-white",
  Twitter: "bg-sky-500 text-white",
  Facebook: "bg-blue-500 text-white",
  LinkedIn: "bg-blue-600 text-white",
}

export default function CommentsPage() {
  const [selectedComment, setSelectedComment] = useState<number | null>(1)
  const [replyText, setReplyText] = useState("")

  const selectedCommentData = comments.find((c) => c.id === selectedComment)

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Comments</h1>
            <p className="text-muted-foreground">
              Manage and respond to comments across all your social platforms.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="gap-1">
              <span className="h-2 w-2 rounded-full bg-destructive" />
              12 Unread
            </Badge>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Comments List */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle>All Comments</CardTitle>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        placeholder="Search comments..."
                        className="w-64 pl-9"
                      />
                    </div>
                    <Button variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="all">
                  <TabsList className="mb-4">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="unreplied">Unreplied</TabsTrigger>
                    <TabsTrigger value="positive">Positive</TabsTrigger>
                    <TabsTrigger value="negative">Negative</TabsTrigger>
                  </TabsList>
                  <TabsContent value="all" className="space-y-2">
                    {comments.map((comment) => {
                      const sentiment = sentimentConfig[comment.sentiment as keyof typeof sentimentConfig]
                      const SentimentIcon = sentiment.icon

                      return (
                        <div
                          key={comment.id}
                          className={cn(
                            "flex gap-4 rounded-lg border p-4 transition-colors cursor-pointer",
                            selectedComment === comment.id
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-primary/50"
                          )}
                          onClick={() => setSelectedComment(comment.id)}
                        >
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={comment.avatar} alt={comment.author} />
                            <AvatarFallback>{comment.author[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="font-semibold">{comment.author}</span>
                                <Badge variant="secondary" className={platformColors[comment.platform]}>
                                  {comment.platform}
                                </Badge>
                                {comment.replied && (
                                  <Badge variant="outline" className="gap-1 text-success border-success">
                                    <CheckCircle className="h-3 w-3" />
                                    Replied
                                  </Badge>
                                )}
                              </div>
                              <span className="text-xs text-muted-foreground">{comment.time}</span>
                            </div>
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {comment.content}
                            </p>
                            <div className="flex items-center gap-2">
                              <div className={cn("flex items-center gap-1 rounded-full px-2 py-0.5", sentiment.bg)}>
                                <SentimentIcon className={cn("h-3.5 w-3.5", sentiment.color)} />
                                <span className={cn("text-xs font-medium", sentiment.color)}>
                                  {sentiment.label}
                                </span>
                              </div>
                              <span className="text-xs text-muted-foreground">
                                on &quot;{comment.post}&quot;
                              </span>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </TabsContent>
                  <TabsContent value="unreplied">
                    <p className="text-center text-muted-foreground py-8">
                      Filter by unreplied comments
                    </p>
                  </TabsContent>
                  <TabsContent value="positive">
                    <p className="text-center text-muted-foreground py-8">
                      Filter by positive sentiment
                    </p>
                  </TabsContent>
                  <TabsContent value="negative">
                    <p className="text-center text-muted-foreground py-8">
                      Filter by negative sentiment
                    </p>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Reply Panel */}
          <div className="space-y-4">
            {selectedCommentData && (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Comment Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Avatar>
                        <AvatarImage src={selectedCommentData.avatar} alt={selectedCommentData.author} />
                        <AvatarFallback>{selectedCommentData.author[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{selectedCommentData.author}</p>
                        <p className="text-xs text-muted-foreground">{selectedCommentData.time}</p>
                      </div>
                    </div>
                    <p className="text-sm leading-relaxed">{selectedCommentData.content}</p>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <ThumbsUp className="mr-1 h-4 w-4" />
                        Like
                      </Button>
                      <Button variant="outline" size="sm">
                        <Flag className="mr-1 h-4 w-4" />
                        Report
                      </Button>
                      <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                        <Trash2 className="mr-1 h-4 w-4" />
                        Hide
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Reply</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Write your reply..."
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        className="flex-1"
                      />
                      <Button size="icon">
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs font-medium text-muted-foreground">AI Suggested Replies</p>
                      <div className="space-y-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full justify-start text-left h-auto py-2 gap-2"
                          onClick={() => setReplyText("Thank you so much for your kind words! We're thrilled you're enjoying the AI features. Let us know if you have any questions!")}
                        >
                          <Sparkles className="h-4 w-4 shrink-0 text-primary" />
                          <span className="line-clamp-2">Thank you so much for your kind words! We&apos;re thrilled you&apos;re enjoying the AI features...</span>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full justify-start text-left h-auto py-2 gap-2"
                          onClick={() => setReplyText("We appreciate your feedback! Our team is constantly working to improve. Stay tuned for more updates!")}
                        >
                          <Sparkles className="h-4 w-4 shrink-0 text-primary" />
                          <span className="line-clamp-2">We appreciate your feedback! Our team is constantly working to improve...</span>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
