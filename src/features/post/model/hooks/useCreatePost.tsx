import { http } from "@shared/api"
import { useMutation } from "@tanstack/react-query"

export interface CreatePostBody {
  title: string
  body: string
  userId: number
}

const createPost = async (formData: CreatePostBody) => {
  const response = await http.post("/posts/add", formData)

  return response
}

export const useCreatePost = () => {
  return useMutation({
    mutationFn: createPost,
  })
}
