"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { 
  Bold, 
  Italic, 
  Link2, 
  AtSign, 
  Hash, 
  Smile,
  Image as ImageIcon,
  Video,
  X
} from "lucide-react"

const suggestedHashtags = [
  "#marketing",
  "#socialmedia",
  "#digitalmarketing",
  "#contentcreator",
  "#business",
  "#entrepreneur",
]

export function PostEditor() {
  const [content, setContent] = useState("")
  const [selectedHashtags, setSelectedHashtags] = useState<string[]>([])
  const [uploadedMedia, setUploadedMedia] = useState<string[]>([])

  const toggleHashtag = (tag: string) => {
    if (selectedHashtags.includes(tag)) {
      setSelectedHashtags(selectedHashtags.filter((t) => t !== tag))
    } else {
      setSelectedHashtags([...selectedHashtags, tag])
    }
  }

  const characterCount = content.length
  const maxCharacters = 280

  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>Create New Post</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Toolbar */}
        <div className="flex items-center gap-1 rounded-lg border border-border bg-muted/30 p-1">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Bold className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Italic className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Link2 className="h-4 w-4" />
          </Button>
          <div className="mx-2 h-4 w-px bg-border" />
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <AtSign className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Hash className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Smile className="h-4 w-4" />
          </Button>
        </div>

        {/* Text Area */}
        <div className="relative">
          <Textarea
            placeholder="What's on your mind? Start typing or use the AI assistant to generate content..."
            className="min-h-[200px] resize-none border-0 bg-muted/30 text-base focus-visible:ring-1"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <div className="absolute bottom-3 right-3 text-sm text-muted-foreground">
            <span className={characterCount > maxCharacters ? "text-destructive" : ""}>
              {characterCount}
            </span>
            /{maxCharacters}
          </div>
        </div>

        {/* Media Upload */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <ImageIcon className="h-4 w-4" />
              Add Image
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Video className="h-4 w-4" />
              Add Video
            </Button>
          </div>
          
          {uploadedMedia.length > 0 && (
            <div className="flex gap-2">
              {uploadedMedia.map((media, index) => (
                <div key={index} className="relative h-20 w-20 rounded-lg bg-muted">
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute -right-2 -top-2 h-5 w-5 rounded-full"
                    onClick={() => setUploadedMedia(uploadedMedia.filter((_, i) => i !== index))}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Hashtag Suggestions */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">Suggested Hashtags</p>
          <div className="flex flex-wrap gap-2">
            {suggestedHashtags.map((tag) => (
              <Badge
                key={tag}
                variant={selectedHashtags.includes(tag) ? "default" : "outline"}
                className="cursor-pointer transition-colors"
                onClick={() => toggleHashtag(tag)}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Selected Hashtags */}
        {selectedHashtags.length > 0 && (
          <div className="rounded-lg bg-muted/30 p-3">
            <p className="mb-2 text-sm font-medium">Selected Tags</p>
            <div className="flex flex-wrap gap-2">
              {selectedHashtags.map((tag) => (
                <Badge key={tag} className="gap-1">
                  {tag}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => toggleHashtag(tag)}
                  />
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
