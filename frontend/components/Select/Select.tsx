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
    value: string | number
}

interface SelectComponentProps {
    placeholder: string
    items: ItemProps[]
    value?: string | number
    onChange?: (value:string) => void
    className?: string
}
 
const SelectComponent = ({ placeholder, items, value, onChange, className }: SelectComponentProps) => {
  return (
    <Select value={value?.toString()} onValueChange={onChange}>
        <SelectTrigger className={`w-full ${className}`}>
            <SelectValue placeholder={placeholder}/>
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