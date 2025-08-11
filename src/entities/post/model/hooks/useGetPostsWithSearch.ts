import { POSTS_QUERY_KEY } from "@entities/post/model/keys"
import { Post } from "@entities/post/model/types"
import { http } from "@shared/api"
import { useQuery } from "@tanstack/react-query"

interface GetPostsWithSearchResponse {
  limit: number
  skip: number
  total: number
  posts: Post[]
}

const getPostsWithSearch = async (searchQuery: string) => {
  const response = await http.get<GetPostsWithSearchResponse>("/posts", {
    params: {
      search: searchQuery,
    },
  })

  return response
}

export const useGetPostsWithSearch = (searchQuery: string) => {
  return useQuery({
    queryKey: POSTS_QUERY_KEY.list([{ search: searchQuery }]),
    queryFn: () => getPostsWithSearch(searchQuery),
  })
}
