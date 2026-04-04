"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  Sparkles, 
  Send, 
  Wand2, 
  Hash, 
  Lightbulb, 
  PenLine,
  Copy,
  RefreshCw,
  MessageSquare,
  FileText,
  TrendingUp,
  ImageIcon,
  Bot,
  User
} from "lucide-react"

const chatHistory = [
  {
    id: 1,
    role: "user",
    content: "Generate a catchy caption for a product launch post",
  },
  {
    id: 2,
    role: "assistant",
    content: "Here are some caption ideas for your product launch:\n\n1. \"The wait is over! Introducing [Product Name] - where innovation meets simplicity. Ready to transform your [industry]? Link in bio!\"\n\n2. \"Big things come in smart packages. Our newest creation is here to revolutionize the way you [action]. Are you ready?\"\n\n3. \"Drumroll please... Introducing the game-changer you've been waiting for! [Product Name] is officially here, and it's everything you dreamed of (and more).\"\n\nWould you like me to customize any of these for your specific product?",
  },
  {
    id: 3,
    role: "user",
    content: "I like the second one! Can you add some relevant hashtags?",
  },
  {
    id: 4,
    role: "assistant",
    content: "Here's your caption with relevant hashtags:\n\n\"Big things come in smart packages. Our newest creation is here to revolutionize the way you work. Are you ready?\"\n\n#ProductLaunch #Innovation #NewProduct #TechLaunch #GameChanger #WorkSmarter #BusinessGrowth #Productivity #NewRelease #ExcitingNews\n\nI've included a mix of broad reach hashtags and niche-specific ones for optimal engagement. Would you like me to adjust any of these?",
  },
]

const quickPrompts = [
  { icon: PenLine, label: "Generate Caption", prompt: "Generate a catchy caption for" },
  { icon: Hash, label: "Suggest Hashtags", prompt: "Suggest relevant hashtags for" },
  { icon: Lightbulb, label: "Content Ideas", prompt: "Give me content ideas about" },
  { icon: MessageSquare, label: "Improve Text", prompt: "Improve this text:" },
  { icon: FileText, label: "Write Post", prompt: "Write a social media post about" },
  { icon: TrendingUp, label: "Trending Topics", prompt: "What are trending topics in" },
]

const templates = [
  {
    id: 1,
    title: "Product Launch",
    description: "Announce a new product or feature",
    prompt: "Write an engaging product launch post for [product name] that highlights [key features]",
  },
  {
    id: 2,
    title: "Behind the Scenes",
    description: "Share your company culture",
    prompt: "Create a behind-the-scenes post about [topic] that humanizes our brand",
  },
  {
    id: 3,
    title: "Customer Story",
    description: "Share success stories",
    prompt: "Write a customer success story post featuring [customer name] and their results with [product]",
  },
  {
    id: 4,
    title: "Tips & Tricks",
    description: "Educational content",
    prompt: "Create a tips post with 5 actionable insights about [topic]",
  },
  {
    id: 5,
    title: "Event Promotion",
    description: "Promote upcoming events",
    prompt: "Write an event promotion post for [event name] on [date] at [location]",
  },
  {
    id: 6,
    title: "Holiday Post",
    description: "Seasonal greetings",
    prompt: "Create a [holiday name] post that connects our brand with the celebration",
  },
]

export default function AIAssistantPage() {
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState(chatHistory)
  const [isGenerating, setIsGenerating] = useState(false)

  const handleSend = () => {
    if (!input.trim()) return
    
    setMessages([...messages, { id: messages.length + 1, role: "user", content: input }])
    setInput("")
    setIsGenerating(true)
    
    // Simulate AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          role: "assistant",
          content: "I'd be happy to help you with that! Here's what I came up with based on your request...\n\n[Generated content would appear here based on your specific prompt]\n\nWould you like me to adjust anything or generate more options?",
        },
      ])
      setIsGenerating(false)
    }, 1500)
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Assistant</h1>
          <p className="text-muted-foreground">
            Your AI-powered content creation companion. Generate captions, hashtags, and content ideas.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Chat Interface */}
          <div className="lg:col-span-2">
            <Card className="flex h-[calc(100vh-220px)] flex-col">
              <CardHeader className="border-b">
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  Chat with AI
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col p-0">
                {/* Messages */}
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}
                      >
                        <Avatar className="h-8 w-8 shrink-0">
                          <AvatarFallback className={message.role === "assistant" ? "bg-primary text-primary-foreground" : "bg-muted"}>
                            {message.role === "assistant" ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
                          </AvatarFallback>
                        </Avatar>
                        <div
                          className={`max-w-[80%] rounded-lg p-3 ${
                            message.role === "user"
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted"
                          }`}
                        >
                          <p className="whitespace-pre-wrap text-sm">{message.content}</p>
                          {message.role === "assistant" && (
                            <div className="mt-2 flex gap-1">
                              <Button variant="ghost" size="sm" className="h-7 gap-1 text-xs">
                                <Copy className="h-3 w-3" />
                                Copy
                              </Button>
                              <Button variant="ghost" size="sm" className="h-7 gap-1 text-xs">
                                <RefreshCw className="h-3 w-3" />
                                Regenerate
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                    {isGenerating && (
                      <div className="flex gap-3">
                        <Avatar className="h-8 w-8 shrink-0">
                          <AvatarFallback className="bg-primary text-primary-foreground">
                            <Bot className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                        <div className="rounded-lg bg-muted p-3">
                          <div className="flex gap-1">
                            <span className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:-0.3s]" />
                            <span className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:-0.15s]" />
                            <span className="h-2 w-2 animate-bounce rounded-full bg-primary" />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollArea>

                {/* Quick Actions */}
                <div className="border-t p-4">
                  <div className="mb-3 flex flex-wrap gap-2">
                    {quickPrompts.slice(0, 4).map((prompt) => (
                      <Button
                        key={prompt.label}
                        variant="outline"
                        size="sm"
                        className="gap-1.5"
                        onClick={() => setInput(prompt.prompt + " ")}
                      >
                        <prompt.icon className="h-3.5 w-3.5" />
                        {prompt.label}
                      </Button>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Ask AI anything about your content..."
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSend()}
                      className="flex-1"
                    />
                    <Button onClick={handleSend} disabled={isGenerating}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Content Templates</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {templates.map((template) => (
                  <Button
                    key={template.id}
                    variant="outline"
                    className="w-full justify-start h-auto py-3 flex-col items-start gap-1"
                    onClick={() => setInput(template.prompt)}
                  >
                    <span className="font-medium">{template.title}</span>
                    <span className="text-xs text-muted-foreground font-normal">
                      {template.description}
                    </span>
                  </Button>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">AI Capabilities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="rounded-lg bg-primary/10 p-2">
                      <PenLine className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Caption Generation</p>
                      <p className="text-xs text-muted-foreground">Create engaging captions for any platform</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="rounded-lg bg-primary/10 p-2">
                      <Hash className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Hashtag Suggestions</p>
                      <p className="text-xs text-muted-foreground">Get trending and relevant hashtags</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="rounded-lg bg-primary/10 p-2">
                      <Wand2 className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Text Improvement</p>
                      <p className="text-xs text-muted-foreground">Enhance your existing content</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="rounded-lg bg-primary/10 p-2">
                      <ImageIcon className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Image Suggestions</p>
                      <p className="text-xs text-muted-foreground">Get ideas for visual content</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
