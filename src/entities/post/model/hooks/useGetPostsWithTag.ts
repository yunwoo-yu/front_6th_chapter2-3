import { POSTS_QUERY_KEY } from "@entities/post/model/keys"
import { Post } from "@entities/post/model/types"
import { getUsers } from "@entities/user"
import { http } from "@shared/api"
import { useQuery } from "@tanstack/react-query"

interface GetPostsWithTagResponse {
  limit: number
  skip: number
  total: number
  posts: Post[]
}

const getPostsWithTag = async (tag: string) => {
  const responsePosts = await http.get<GetPostsWithTagResponse>(`/posts/tag/${tag}`)

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

export const useGetPostsWithTag = (tag: string) => {
  return useQuery({
    queryKey: POSTS_QUERY_KEY.list([{ tag }]),
    queryFn: () => getPostsWithTag(tag),
  })
}
