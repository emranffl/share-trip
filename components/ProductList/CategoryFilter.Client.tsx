"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { QUERY } from "@/query.config"
import { getCategoryList } from "@/services/api/category/category-list"
import { useQuery } from "@tanstack/react-query"
import { replace, startCase } from "lodash"
import { Filter, X } from "lucide-react"
import truncate from "truncate"

const CategoryFilter = ({
  onSelect,
  selectedItem,
}: {
  onSelect: (shelf: string, type: "category") => void
  selectedItem: string
}) => {
  const { data } = useQuery({
    queryKey: [QUERY.CATEGORY.LIST().key],
    queryFn: getCategoryList,
  })

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center p-2">
          {selectedItem?.length > 0 ? (
            <small className="tracking-wide">
              {truncate(startCase(replace(selectedItem, /-/g, " ")), 15)}
            </small>
          ) : (
            <Filter className="size-4 text-gray-700" />
          )}
        </Button>
      </DropdownMenuTrigger>
      {selectedItem?.length > 0 && (
        <Button
          variant="outline"
          className="flex items-center p-2"
          onClick={() => onSelect("", "category")}
        >
          <X className="size-4 text-gray-700" />
        </Button>
      )}

      {/* // + DD content */}
      <DropdownMenuContent sideOffset={6} className="mr-4 max-h-80 overflow-y-auto xl:mr-20">
        {data?.map((item) => (
          <DropdownMenuItem
            key={item}
            onClick={() => {
              if (selectedItem === item) {
                onSelect("", "category")
                return
              }
              onSelect(item, "category")
            }}
          >
            <DropdownMenuCheckboxItem checked={selectedItem === item}>
              {startCase(replace(item, /-/g, " "))}
            </DropdownMenuCheckboxItem>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export { CategoryFilter }
