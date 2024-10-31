import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Filter } from "lucide-react"

const TopicFilter = ({
  bookshelves,
  onSelect,
  selectedItem,
}: {
  bookshelves: string[]
  onSelect: (shelf: string, type: "topic") => void
  selectedItem: string
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center p-2">
          {selectedItem?.length > 0 ? (
            <span className="flex items-center">
              <small className="mr-1 tracking-wide">
                {selectedItem.length > 15 ? selectedItem.slice(0, 15) + "..." : selectedItem}
              </small>
            </span>
          ) : (
            <Filter className="size-4 text-gray-700" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent sideOffset={6} className="mr-4 max-h-80 overflow-y-auto xl:mr-20">
        {bookshelves.map((shelf) => (
          <DropdownMenuItem
            key={shelf}
            onClick={() => {
              if (selectedItem === shelf) {
                onSelect("", "topic")
                return
              }
              onSelect(shelf, "topic")
            }}
          >
            <DropdownMenuCheckboxItem checked={selectedItem === shelf}>
              {shelf}
            </DropdownMenuCheckboxItem>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default TopicFilter
