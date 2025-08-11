import { http } from "@shared/api"
import { useMutation } from "@tanstack/react-query"

const deletePost = async (id: number) => {
  const response = await http.delete(`/posts/${id}`)

  return response
}

export const useDeletePost = () => {
  return useMutation({
    mutationFn: deletePost,
  })
}
