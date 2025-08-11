import { useEditPost } from "@features/post/model/hooks/useEditPost"
import { Button } from "@shared/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@shared/ui/dialog"
import { Input } from "@shared/ui/input"
import { Textarea } from "@shared/ui/textarea"
import { PostWithUser } from "@widgets/postsTable/ui/PostsTable"

interface EditPostDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  selectedPost: PostWithUser | null
  handleChangePost: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

export const EditPostDialog = ({ open, onOpenChange, selectedPost, handleChangePost }: EditPostDialogProps) => {
  // 전역 상태 업데이트 필요함 onSucces 처리
  const { mutate: editPost } = useEditPost()

  const handleUpdatePost = () => {
    if (!selectedPost) return

    editPost({
      id: selectedPost.id,
      title: selectedPost.title,
      body: selectedPost.body,
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>게시물 수정</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input placeholder="제목" name="title" value={selectedPost?.title || ""} onChange={handleChangePost} />
          <Textarea
            rows={15}
            placeholder="내용"
            name="body"
            value={selectedPost?.body || ""}
            onChange={handleChangePost}
          />
          <Button onClick={handleUpdatePost}>게시물 업데이트</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
