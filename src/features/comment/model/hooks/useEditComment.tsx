import { http } from "@shared/api"
import { useMutation } from "@tanstack/react-query"

interface UpdateCommentBody {
  id: number
  body: string
}

const editComment = async (formData: UpdateCommentBody) => {
  const { id, body } = formData

  const response = await http.put(`/comments/${id}`, { body })

  return response
}

export const useEditComment = () => {
  return useMutation({
    mutationFn: editComment,
  })
}
