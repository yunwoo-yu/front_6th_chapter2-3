import { Button } from "@shared/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@shared/ui/select"
import { useSearchParams } from "react-router-dom"

interface PaginationProps {
  total: number
}

const LIMITS = [10, 20, 30]

export const Pagination = ({ total }: PaginationProps) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const skipParam = searchParams.get("skip")
  const limitParam = searchParams.get("limit")
  const skip = skipParam ? Number(skipParam) : 0
  const limit = limitParam ? Number(limitParam) : 10

  const handleLimitChange = (value: number) => {
    setSearchParams((prev) => {
      const updated = new URLSearchParams(prev)

      updated.set("limit", value.toString())
      updated.set("skip", "0")

      return updated
    })
  }

  const handlePrevMove = () => {
    setSearchParams((prev) => {
      const updated = new URLSearchParams(prev)

      updated.set("skip", Math.max(0, skip - limit).toString())
      return updated
    })
  }

  const handleNextMove = () => {
    setSearchParams((prev) => {
      const updated = new URLSearchParams(prev)
      updated.set("skip", (skip + limit).toString())

      return updated
    })
  }

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <span>표시</span>
        <Select value={limit.toString()} onValueChange={(value) => handleLimitChange(Number(value))}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="10" />
          </SelectTrigger>
          <SelectContent>
            {LIMITS.map((limit) => (
              <SelectItem key={limit} value={String(limit)}>
                {limit}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span>항목</span>
      </div>
      <div className="flex gap-2">
        <Button disabled={skip === 0} onClick={handlePrevMove}>
          이전
        </Button>
        <Button disabled={skip + limit >= total} onClick={handleNextMove}>
          다음
        </Button>
      </div>
    </div>
  )
}
