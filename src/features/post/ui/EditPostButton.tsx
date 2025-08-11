import { EditPostDialog } from "@features/post/ui/EditPostDialog"
import { Button } from "@shared/ui/button"
import { PostWithUser } from "@widgets/postsTable/ui/PostsTable"
import { Edit2 } from "lucide-react"
import { useState } from "react"

interface EditPostButtonProps {
  post: PostWithUser
}

export const EditPostButton = ({ post }: EditPostButtonProps) => {
  const [selectedPost, setSelectedPost] = useState<PostWithUser | null>(null)
  const [open, setOpen] = useState(false)

  const handleShowEditPostDialog = () => {
    setSelectedPost(post)
    setOpen(true)
  }

  const handleChangePost = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    setSelectedPost((prev) => {
      if (!prev) return null

      return { ...prev, [name]: value }
    })
  }
  return (
    <>
      <Button variant="ghost" size="sm" onClick={handleShowEditPostDialog}>
        <Edit2 className="w-4 h-4" />
      </Button>
      <EditPostDialog
        open={open}
        onOpenChange={setOpen}
        selectedPost={selectedPost}
        handleChangePost={handleChangePost}
      />
    </>
  )
}
