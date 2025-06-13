"use client"
 
import * as React from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
 
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useEffect } from "react"

interface DataPickerComponentProps {
  selected?: Date
  onSelect?: (date: Date | undefined) => void
  fromDate?: Date
  className?: string
}

const DatePickerComponent = ({ selected, onSelect, fromDate, className }: DataPickerComponentProps) => {
  const [internalDate, setInternalDate] = React.useState<Date | undefined>(selected)

  useEffect(() => {
    setInternalDate(selected)
  }, [selected])

  const handleSelect = (date: Date | undefined) => {
    setInternalDate(date)
    if (onSelect) {
      onSelect(date)
    }
  }
 
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            `w-full justify-start text-left font-normal ${className}`,
            !internalDate && "text-muted-foreground"
          )}
        >
          <CalendarIcon />
          {internalDate ? format(internalDate, "PPP") : <span>Escolha uma data</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={internalDate}
          onSelect={handleSelect}
          fromDate={fromDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}

export default DatePickerComponent;