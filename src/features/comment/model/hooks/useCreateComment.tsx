import { http } from "@shared/api"
import { useMutation } from "@tanstack/react-query"

export interface CreateCommentBody {
  body: string
  postId: number | null
  userId: number
}

const createComment = async (formData: CreateCommentBody) => {
  const response = await http.post("/comments/add", formData)

  return response
}

export const useCreateComment = () => {
  return useMutation({
    mutationFn: createComment,
  })
}
