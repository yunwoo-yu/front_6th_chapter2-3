import { http } from "@shared/api"
import { useMutation } from "@tanstack/react-query"

const likeComment = async (commentId: number) => {
  const response = await http.patch(`/comments/${commentId}`, {
    likes: 1, // 간단하게 1 증가로 처리
  })
  return response
}

export const useLikeComment = () => {
  return useMutation({
    mutationFn: likeComment,
  })
}
