import { Tag } from "@entities/tag"
import { SearchPostInput } from "@features/post"
import { SortBySelect, SortOrderSelect } from "@features/sort"
import { TagSelectFilter } from "@features/tag"
import { Dispatch, SetStateAction } from "react"

interface PostsFilterProps {
  searchQuery: string
  selectedTag: string
  sortBy: string
  sortOrder: string
  searchPosts: () => void
  setSearchQuery: Dispatch<SetStateAction<string>>
  setSelectedTag: Dispatch<SetStateAction<string>>
  setSortOrder: Dispatch<SetStateAction<string>>
  setSortBy: Dispatch<SetStateAction<string>>
  fetchPostsByTag: (tag: string) => void
  updateURL: () => void
  tags: Tag[]
}

export const PostsFilter = ({
  searchQuery,
  setSearchQuery,
  searchPosts,
  selectedTag,
  setSelectedTag,
  fetchPostsByTag,
  updateURL,
  tags,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
}: PostsFilterProps) => {
  return (
    <div className="flex gap-4">
      <SearchPostInput searchQuery={searchQuery} setSearchQuery={setSearchQuery} searchPosts={searchPosts} />
      <TagSelectFilter
        selectedTag={selectedTag}
        setSelectedTag={setSelectedTag}
        fetchPostsByTag={fetchPostsByTag}
        updateURL={updateURL}
        tags={tags}
      />
      <SortBySelect sortBy={sortBy} setSortBy={setSortBy} />
      <SortOrderSelect sortOrder={sortOrder} setSortOrder={setSortOrder} />
    </div>
  )
}
