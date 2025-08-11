import { COMMENT_QUERY_KEY } from "@entities/comment/model/keys"
import { http } from "@shared/api"
import { useQuery } from "@tanstack/react-query"

interface GetCommentResponse {
  total: number
  skip: number
  limit: number
  comments: Comment[]
}

const getComment = async (postId: number) => {
  const response = await http.get<GetCommentResponse>(`/comments/post/${postId}`)

  return response
}

export const useGetComment = (postId: number) => {
  return useQuery({
    queryKey: COMMENT_QUERY_KEY.detail([postId]),
    queryFn: () => getComment(postId),
  })
}
