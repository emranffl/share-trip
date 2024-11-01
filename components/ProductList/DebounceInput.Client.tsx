import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { X } from "lucide-react"
import { useEffect, useState } from "react"

const DebouncedSearchInput = ({
  value,
  onChange,
  placeholder = "Search products",
  delay = 1000,
}: {
  value: string
  onChange: (value: string, type: "searchText") => void
  placeholder?: string
  delay?: number
}) => {
  const [localValue, setLocalValue] = useState(value)

  useEffect(() => {
    setLocalValue(value)
  }, [value])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (localValue !== value) {
        onChange(localValue, "searchText")
      }
    }, delay)

    return () => clearTimeout(timeoutId)
  }, [localValue, value, onChange, delay])

  return (
    <div className="relative w-full sm:w-72">
      <Input
        type="search"
        placeholder={placeholder}
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        className="relative w-full sm:max-w-sm"
      />
      <X
        className={cn(
          "absolute right-2 top-2 size-5 cursor-pointer text-gray-700",
          localValue.length === 0 && "hidden",
        )}
        onClick={() => setLocalValue("")}
      />
    </div>
  )
}

export default DebouncedSearchInput
