import { useGetPosts } from "@entities/post/model/hooks/useGetPosts"
import { useGetPostsWithSearch } from "@entities/post/model/hooks/useGetPostsWithSearch"
import { useGetPostsWithTag } from "@entities/post/model/hooks/useGetPostsWithTag"
import { useGetUsers } from "@entities/user"

interface UsePostsQueryParams {
  skip?: number
  limit?: number
  sortBy?: string
  sortOrder?: string
  searchQuery?: string
  selectedTag?: string
}

export const usePostsSelector = (params: UsePostsQueryParams) => {
  const { skip, limit, sortBy, sortOrder, searchQuery, selectedTag } = params

  const { data: hookPosts, isLoading: isLoadingPosts } = useGetPosts({
    skip,
    limit,
    sortBy,
    order: sortOrder,
  })

  const { data: hookPostsWithSearch, isLoading: isLoadingWithSearch } = useGetPostsWithSearch(searchQuery || "", {
    enabled: !!searchQuery,
  })

  const { data: hookPostsWithTag, isLoading: isLoadingWithTag } = useGetPostsWithTag(selectedTag || "", {
    enabled: !!selectedTag,
  })

  const { data: usersData } = useGetUsers({
    limit: 0,
    select: "id,username,image",
  })

  if (searchQuery) {
    return {
      posts:
        hookPostsWithSearch?.posts.map((post) => ({
          ...post,
          author: usersData?.users.find((user) => user.id === post.userId),
        })) || [],
      total: hookPostsWithSearch?.total || 0,
      isLoading: isLoadingWithSearch,
    }
  }

  if (selectedTag) {
    return {
      posts:
        hookPostsWithTag?.posts.map((post) => ({
          ...post,
          author: usersData?.users.find((user) => user.id === post.userId),
        })) || [],
      total: hookPostsWithTag?.total || 0,
      isLoading: isLoadingWithTag,
    }
  }

  return {
    posts:
      hookPosts?.posts.map((post) => ({
        ...post,
        author: usersData?.users.find((user) => user.id === post.userId),
      })) || [],
    total: hookPosts?.total || 0,
    isLoading: isLoadingPosts,
  }
}
