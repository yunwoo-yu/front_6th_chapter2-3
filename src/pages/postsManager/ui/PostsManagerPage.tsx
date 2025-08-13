import { AddPostButton, Pagination } from "@features/post"
import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card"
import { PostDetailModal } from "@widgets/postDetailModal"
import { PostsFilter } from "@widgets/postsFilter"
import { PostsTable } from "@widgets/postsTable"
import { UserModal } from "@widgets/userModal"

import { Post } from "@entities/post"
import { User } from "@entities/user"
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"

export const PostsManagerPage = () => {
  // 상태 관리 (URL에 없는 것들만)
  const [posts, setPosts] = useState<Post[]>([])
  const [total, setTotal] = useState(0)
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(false)
  const [showPostDetailDialog, setShowPostDetailDialog] = useState(false)
  const [showUserModal, setShowUserModal] = useState(false)
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null)
  const [searchParams] = useSearchParams()

  // URL params에서 직접 값 가져오기
  const skip = parseInt(searchParams.get("skip") || "0")
  const limit = parseInt(searchParams.get("limit") || "10")
  const searchQuery = searchParams.get("search") || ""
  const sortBy = searchParams.get("sortBy") || ""
  const sortOrder = searchParams.get("sortOrder") || "asc"
  const selectedTag = searchParams.get("tag") || ""

  // 기본 포스트 목록 훅 (검색/태그 없을 때만)
  // const { data: hookPosts } = useGetPosts({
  //   skip,
  //   limit,
  //   sortBy: sortBy as "id" | "title" | "reactions" | undefined,
  //   order: sortOrder as "asc" | "desc",
  // })

  // console.log(hookPosts)

  // URL 업데이트 함수

  // 게시물 가져오기
  const fetchPosts = () => {
    setLoading(true)
    let postsData: any
    let usersData: any

    fetch(`/api/posts?limit=${limit}&skip=${skip}&sortBy=${sortBy}&order=${sortOrder}`)
      .then((response) => response.json())
      .then((data) => {
        postsData = data
        return fetch("/api/users?limit=0&select=username,image")
      })
      .then((response) => response.json())
      .then((users) => {
        usersData = users.users
        const postsWithUsers = postsData.posts.map((post: any) => ({
          ...post,
          author: usersData.find((user: any) => user.id === post.userId),
        }))
        setPosts(postsWithUsers)
        setTotal(postsData.total)
      })
      .catch((error) => {
        console.error("게시물 가져오기 오류:", error)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  // 실제 태그별 데이터 로딩 (useEffect에서 호출)
  const fetchPostsByTag = async (tag: string) => {
    setLoading(true)
    try {
      const [postsResponse, usersResponse] = await Promise.all([
        fetch(`/api/posts/tag/${tag}`),
        fetch("/api/users?limit=0&select=username,image"),
      ])
      const postsData = await postsResponse.json()
      const usersData = await usersResponse.json()

      const postsWithUsers = postsData.posts.map((post: any) => ({
        ...post,
        author: usersData.users.find((user: any) => user.id === post.userId),
      }))

      setPosts(postsWithUsers)
      setTotal(postsData.total)
    } catch (error) {
      console.error("태그별 게시물 가져오기 오류:", error)
    }
    setLoading(false)
  }

  // 검색 실행 (useEffect에서 호출)
  const executeSearch = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/posts/search?q=${searchQuery}`)
      const data = await response.json()
      setPosts(data.posts)
      setTotal(data.total)
    } catch (error) {
      console.error("게시물 검색 오류:", error)
    }
    setLoading(false)
  }

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

  // URL 파라미터 변경에 따른 데이터 로딩
  useEffect(() => {
    if (searchQuery) {
      executeSearch()
    } else if (selectedTag) {
      fetchPostsByTag(selectedTag)
    } else {
      fetchPosts()
    }
  }, [skip, limit, sortBy, sortOrder, selectedTag, searchQuery])

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
          {/* 검색 및 필터 컨트롤 */}
          <PostsFilter />

          {/* 게시물 테이블 */}
          {loading ? (
            <div className="flex justify-center p-4">로딩 중...</div>
          ) : (
            <PostsTable posts={posts} openUserModal={openUserModal} openPostDetail={openPostDetail} />
          )}
          <Pagination total={total} />
        </div>
      </CardContent>

      {/* 게시물 상세 보기 대화상자 */}
      <PostDetailModal post={selectedPost} open={showPostDetailDialog} onOpenChange={setShowPostDetailDialog} />
      {/* 사용자 모달 */}
      <UserModal userId={selectedUserId} open={showUserModal} onOpenChange={setShowUserModal} />
    </Card>
  )
}
