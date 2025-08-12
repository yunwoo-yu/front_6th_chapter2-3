import { http } from "@shared/api"
import { useMutation } from "@tanstack/react-query"

interface DeleteCommentBody {
  id: number
}

const deleteComment = async ({ id }: DeleteCommentBody) => {
  const response = await http.delete(`/comments/${id}`)

  return response
}

export const useDeleteComment = () => {
  return useMutation({
    mutationFn: deleteComment,
  })
}
