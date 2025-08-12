import { SearchPostInput } from "@features/post"
import { SortBySelect, SortOrderSelect } from "@features/sort"
import { TagSelectFilter } from "@features/tag"

export const PostsFilter = () => {
  return (
    <div className="flex gap-4">
      <SearchPostInput />
      <TagSelectFilter />
      <SortBySelect />
      <SortOrderSelect />
    </div>
  )
}
