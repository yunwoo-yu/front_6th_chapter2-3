import { AddPostButton, Pagination } from "@features/post"
import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card"
import { PostDetailModal } from "@widgets/postDetailModal"
import { PostsFilter } from "@widgets/postsFilter"
import { PostsTable } from "@widgets/postsTable"
import { UserModal } from "@widgets/userModal"

import { Post } from "@entities/post"
import { User } from "@entities/user"
import { useState } from "react"

export const PostsManagerPage = () => {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [showPostDetailDialog, setShowPostDetailDialog] = useState(false)
  const [showUserModal, setShowUserModal] = useState(false)
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null)

  // 게시물 상세 보기
  const openPostDetail = (post: Post) => {
    setSelectedPost(post)
    setShowPostDetailDialog(true)
  }

  // 사용자 모달 열기
  const openUserModal = (user: User) => {
    setSelectedUserId(user.id)
    setShowUserModal(true)
  }

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>게시물 관리자</span>
          <AddPostButton />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <PostsFilter />
          <PostsTable openUserModal={openUserModal} openPostDetail={openPostDetail} />
          <Pagination />
        </div>
      </CardContent>
      <PostDetailModal post={selectedPost} open={showPostDetailDialog} onOpenChange={setShowPostDetailDialog} />
      <UserModal userId={selectedUserId} open={showUserModal} onOpenChange={setShowUserModal} />
    </Card>
  )
}
