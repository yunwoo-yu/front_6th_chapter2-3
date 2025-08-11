import { Post } from "@entities/post/model/types"
import { createQueryKeys, http } from "@shared/api"
import { useQuery } from "@tanstack/react-query"

export const POSTS_QUERY_KEY = createQueryKeys("posts")

interface GetPostsRequestParams {
  skip?: number
  limit?: number
  select?: keyof Post
  sortBy?: "id" | "title" | "reactions"
  order?: "asc" | "desc"
}

interface GetPostsResponse {
  limit: number
  skip: number
  total: number
  posts: Post[]
}

const getPosts = async (params: GetPostsRequestParams) => {
  const { skip, limit, select, sortBy, order } = params

  const response = await http.get<GetPostsResponse>("/posts", {
    params: {
      skip,
      limit,
      select,
      sortBy,
      order,
    },
  })

  return response
}

export const useGetPosts = (params: GetPostsRequestParams) => {
  return useQuery({
    queryKey: POSTS_QUERY_KEY.list([params]),
    queryFn: () => getPosts(params),
  })
}
