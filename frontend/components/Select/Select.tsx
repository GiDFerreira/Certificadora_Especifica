import * as React from "react"
 
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface ItemProps {
    title: string
    value: number
}

interface SelectComponentProps {
    placeholder: string
    items: ItemProps[]
}
 
const SelectComponent = ({ placeholder, items }: SelectComponentProps) => {
  return (
    <Select>
        <SelectTrigger className="w-full">
            <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
            <SelectGroup>
                {items.map((item, index) => (
                    <SelectItem value={item.value.toString()} key={index}>
                        {item.title}
                    </SelectItem>
                ))}
            </SelectGroup>
        </SelectContent>
    </Select>
  )
}

export default SelectComponent