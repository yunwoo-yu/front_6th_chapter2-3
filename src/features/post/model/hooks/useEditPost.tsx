import { http } from "@shared/api"
import { useMutation } from "@tanstack/react-query"

interface EditPostBody {
  id: number
  title: string
  body: string
}

const editPost = async (post: EditPostBody) => {
  const { id, title, body } = post
  const response = await http.put(`/posts/${id}`, { title, body })

  return response
}

export const useEditPost = () => {
  return useMutation({
    mutationFn: editPost,
  })
}
