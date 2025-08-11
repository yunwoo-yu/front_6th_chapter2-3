import { POSTS_QUERY_KEY } from "@entities/post/model/keys"
import { Post } from "@entities/post/model/types"
import { getUsers } from "@entities/user"
import { http } from "@shared/api"
import { useQuery } from "@tanstack/react-query"

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

  const responsePosts = await http.get<GetPostsResponse>("/posts", {
    params: {
      skip,
      limit,
      select,
      sortBy,
      order,
    },
  })

  const responseUsers = await getUsers({
    limit: 0,
    select: "username,image",
  })

  const result = responsePosts.posts.map((post) => ({
    ...post,
    author: responseUsers.users.find((user) => user.id === post.userId),
  }))

  return result
}

export const useGetPosts = (params: GetPostsRequestParams) => {
  return useQuery({
    queryKey: POSTS_QUERY_KEY.list([params]),
    queryFn: () => getPosts(params),
  })
}
