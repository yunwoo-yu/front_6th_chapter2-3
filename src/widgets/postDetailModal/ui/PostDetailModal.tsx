import { useGetComment, useLikeComment } from "@entities/comment"
import { Post } from "@entities/post"
import { AddCommentButton, EditCommentButton, DeleteCommentButton } from "@features/comment"
import { highlightText } from "@shared/lib/highlightText"
import { Button } from "@shared/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@shared/ui/dialog"
import { ThumbsUp } from "lucide-react"

interface PostDetailModalProps {
  post: Post | null
  searchQuery?: string
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const PostDetailModal = ({ post, searchQuery = "", open, onOpenChange }: PostDetailModalProps) => {
  const { data: commentsData } = useGetComment(post?.id || 1, {
    enabled: !!post?.id && open,
  })
  const { mutate: likeCommentMutation } = useLikeComment(post?.id || 1)

  const comments = commentsData?.comments || []

  const handleLikeComment = (commentId: number) => {
    likeCommentMutation(commentId)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{highlightText(post?.title || "", searchQuery)}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>{highlightText(post?.body || "", searchQuery)}</p>
          {/* 댓글 섹션 */}
          <div className="mt-2">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold">댓글</h3>
              <AddCommentButton postId={post?.id || 1} />
            </div>
            <div className="space-y-1">
              {comments.map((comment: any) => (
                <div key={comment.id} className="flex items-center justify-between text-sm border-b pb-1">
                  <div className="flex items-center space-x-2 overflow-hidden">
                    <span className="font-medium truncate">{comment.user.username}:</span>
                    <span className="truncate">{highlightText(comment.body, searchQuery)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Button variant="ghost" size="sm" onClick={() => handleLikeComment(comment.id)}>
                      <ThumbsUp className="w-3 h-3" />
                      <span className="ml-1 text-xs">{comment.likes}</span>
                    </Button>
                    <EditCommentButton comment={comment} />
                    <DeleteCommentButton comment={comment} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
