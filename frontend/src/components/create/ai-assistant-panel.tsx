"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  Sparkles, 
  Wand2, 
  RefreshCw, 
  Copy, 
  ThumbsUp, 
  ThumbsDown,
  Send,
  Lightbulb,
  Hash,
  MessageSquare,
  TrendingUp
} from "lucide-react"

const quickActions = [
  { id: "generate", label: "Generate Caption", icon: Wand2 },
  { id: "improve", label: "Improve Text", icon: Sparkles },
  { id: "hashtags", label: "Suggest Hashtags", icon: Hash },
  { id: "ideas", label: "Content Ideas", icon: Lightbulb },
]

const sampleSuggestions = [
  {
    id: 1,
    text: "Discover the future of marketing with AI-powered insights. Our latest feature helps you understand your audience like never before.",
    type: "Professional",
  },
  {
    id: 2,
    text: "Big news! We just dropped something amazing that's going to change how you connect with your audience. Ready to level up?",
    type: "Casual",
  },
  {
    id: 3,
    text: "Attention marketers: The game has changed. Here's what you need to know about AI-driven engagement strategies.",
    type: "Attention-grabbing",
  },
]

export function AIAssistantPanel() {
  const [prompt, setPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [suggestions, setSuggestions] = useState(sampleSuggestions)

  const handleGenerate = () => {
    setIsGenerating(true)
    // Simulate AI generation
    setTimeout(() => {
      setIsGenerating(false)
    }, 1500)
  }

  return (
    <Card className="border-primary/20 bg-gradient-to-b from-primary/5 to-transparent">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <Sparkles className="h-5 w-5 text-primary" />
          AI Assistant
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-2">
          {quickActions.map((action) => (
            <Button
              key={action.id}
              variant="outline"
              size="sm"
              className="justify-start gap-2 text-xs"
            >
              <action.icon className="h-3.5 w-3.5" />
              {action.label}
            </Button>
          ))}
        </div>

        {/* Chat Input */}
        <div className="flex gap-2">
          <Input
            placeholder="Ask AI anything..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="bg-background"
          />
          <Button size="icon" onClick={handleGenerate} disabled={isGenerating}>
            {isGenerating ? (
              <RefreshCw className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* AI Suggestions */}
        <div className="space-y-3">
          <p className="text-sm font-medium text-muted-foreground">Suggestions</p>
          {suggestions.map((suggestion) => (
            <div
              key={suggestion.id}
              className="rounded-lg border border-border bg-background p-3 space-y-2"
            >
              <div className="flex items-start justify-between gap-2">
                <Badge variant="secondary" className="text-xs">
                  {suggestion.type}
                </Badge>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <ThumbsUp className="h-3 w-3" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <ThumbsDown className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              <p className="text-sm leading-relaxed">{suggestion.text}</p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="gap-1.5 text-xs">
                  <Copy className="h-3 w-3" />
                  Copy
                </Button>
                <Button size="sm" className="gap-1.5 text-xs">
                  Use This
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Trending Topics */}
        <div className="space-y-2">
          <p className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
            <TrendingUp className="h-4 w-4" />
            Trending Topics
          </p>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
              #AIMarketing
            </Badge>
            <Badge variant="secondary" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
              #SocialMediaTips
            </Badge>
            <Badge variant="secondary" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
              #ContentStrategy
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
