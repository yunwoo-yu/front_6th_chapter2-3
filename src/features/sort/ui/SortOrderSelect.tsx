import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@shared/ui/select"
import { Dispatch, SetStateAction } from "react"

interface SortOrderSelectProps {
  sortOrder: string
  setSortOrder: Dispatch<SetStateAction<string>>
}

export const SortOrderSelect = ({ sortOrder, setSortOrder }: SortOrderSelectProps) => {
  return (
    <Select value={sortOrder} onValueChange={setSortOrder}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="정렬 순서" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="asc">오름차순</SelectItem>
        <SelectItem value="desc">내림차순</SelectItem>
      </SelectContent>
    </Select>
  )
}
