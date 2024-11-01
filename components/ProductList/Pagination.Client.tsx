"use client"

import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { CONSTANTS } from "@/lib/constants"
import { ChevronLeft, ChevronRight } from "lucide-react"
import React from "react"

interface LimitPaginationProps {
  limit: number
  setLimit: (limit: number) => void
  skip: number
  setSkip: (skip: number) => void
  totalCount: number
  isLoading?: boolean
}

const Pagination: React.FC<LimitPaginationProps> = ({
  limit,
  setLimit,
  skip,
  setSkip,
  totalCount,
  isLoading = false,
}) => {
  const currentPage = Math.floor(skip / limit) + 1
  const totalPages = Math.ceil(totalCount / limit)

  const handlePageChange = (newPage: number) => {
    const newSkip = (newPage - 1) * limit
    setSkip(newSkip)
  }

  const handleLimitChange = (newLimit: string) => {
    const limitValue = parseInt(newLimit)
    setLimit(limitValue)
    // Reset to first page when changing limit to avoid issues with pagination
    setSkip(0)
  }

  return (
    <div className="col-span-full flex flex-col gap-4">
      <div className="grid grid-cols-3 gap-5">
        <Button
          variant="outline"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1 || isLoading}
          className="flex h-12 justify-between rounded-xl"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>
        <div className="flex items-center justify-center gap-2">
          <small className="font-medium text-slate-500">
            {skip + 1} - {Math.min(skip + limit, totalCount)} / {totalCount}
          </small>
          <Select
            value={limit.toString()}
            onValueChange={handleLimitChange}
            disabled={isLoading || totalCount < CONSTANTS.limit}
          >
            <SelectTrigger className="w-16 border-none shadow-none focus:ring-0">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 5 }).map((_, i) => (
                <SelectItem key={i} value={(CONSTANTS.limit * (i + 1)).toString()}>
                  {CONSTANTS.limit * (i + 1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button
          variant="outline"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage >= totalPages || isLoading}
          className="flex h-12 justify-between rounded-xl"
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

export { Pagination }
