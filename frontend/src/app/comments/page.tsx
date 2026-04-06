import { useEffect, useMemo, useState } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { communityApi } from "@/lib/api"
import { Comment } from "@/lib/types"
import { toast } from "sonner"

const sentimentLabel: Record<string, string> = {
  positif: "Positive",
  neutre: "Neutral",
  negatif: "Negative",
}

export default function CommentsPage() {
  const [comments, setComments] = useState<Comment[]>([])
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)

  async function loadComments() {
    setLoading(true)

    try {
      const pending = await communityApi.getPendingComments()
      setComments(pending.data)
      return
    } catch {
      // Fallback for non-moderator roles: show comments from the first post.
    }

    try {
      const posts = await communityApi.getPosts()
      const firstPost = posts.data[0]

      if (!firstPost) {
        setComments([])
        return
      }

      const postComments = await communityApi.getPostComments(firstPost.id)
      setComments(postComments.data)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Impossible de charger les commentaires")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void loadComments()
  }, [])

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase()

    if (!query) return comments

    return comments.filter((comment) => {
      const content = comment.contenu.toLowerCase()
      const author = (comment.auteur_externe ?? "").toLowerCase()
      return content.includes(query) || author.includes(query)
    })
  }, [comments, search])

  async function moderate(commentId: number, statut: "approuve" | "masque" | "signale" | "supprime") {
    try {
      await communityApi.moderateComment(commentId, { statut })
      toast.success("Commentaire mis a jour")
      await loadComments()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Echec de moderation")
    }
  }

  async function remove(commentId: number) {
    try {
      await communityApi.deleteComment(commentId)
      toast.success("Commentaire supprime")
      await loadComments()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Echec de suppression")
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Comments</h1>
          <p className="text-muted-foreground">Moderation en temps reel depuis le backend.</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Commentaires</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="Rechercher un commentaire..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            {loading && <p className="text-sm text-muted-foreground">Chargement...</p>}
            {!loading && filtered.length === 0 && (
              <p className="text-sm text-muted-foreground">Aucun commentaire trouve.</p>
            )}

            <div className="space-y-3">
              {filtered.map((comment) => (
                <div key={comment.id} className="rounded-lg border border-border p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="space-y-1">
                      <p className="font-medium">{comment.auteur_externe || "Auteur externe"}</p>
                      <p className="text-sm text-muted-foreground">{comment.contenu}</p>
                    </div>
                    <div className="flex flex-wrap justify-end gap-2">
                      <Badge variant="outline">{comment.statut}</Badge>
                      {comment.sentiment && (
                        <Badge variant="secondary">{sentimentLabel[comment.sentiment] ?? comment.sentiment}</Badge>
                      )}
                    </div>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <Button size="sm" variant="default" onClick={() => moderate(comment.id, "approuve")}>
                      Approve
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => moderate(comment.id, "masque")}>
                      Hide
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => moderate(comment.id, "signale")}>
                      Flag
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => remove(comment.id)}>
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
