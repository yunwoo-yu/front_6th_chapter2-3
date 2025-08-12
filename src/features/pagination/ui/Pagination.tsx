import { Button } from "@shared/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@shared/ui/select"

interface PaginationProps {
  skip: number
  limit: number
  total: number
  limits?: number[]
  onLimitChange: (value: number) => void
  onPrev: () => void
  onNext: () => void
}

export const Pagination = ({
  skip,
  limit,
  total,
  limits = [10, 20, 30],
  onLimitChange,
  onPrev,
  onNext,
}: PaginationProps) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <span>표시</span>
        <Select value={limit.toString()} onValueChange={(value) => onLimitChange(Number(value))}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="10" />
          </SelectTrigger>
          <SelectContent>
            {limits.map((v) => (
              <SelectItem key={v} value={String(v)}>
                {v}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span>항목</span>
      </div>
      <div className="flex gap-2">
        <Button disabled={skip === 0} onClick={onPrev}>
          이전
        </Button>
        <Button disabled={skip + limit >= total} onClick={onNext}>
          다음
        </Button>
      </div>
    </div>
  )
}
