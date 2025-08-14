import { SearchPostInput, SortBySelect, SortOrderSelect, TagSelectFilter } from "@features/post"

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
