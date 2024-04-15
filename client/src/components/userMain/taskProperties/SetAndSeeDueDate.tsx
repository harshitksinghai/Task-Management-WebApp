
import { CalendarIcon } from "@radix-ui/react-icons"
import { differenceInDays, format } from "date-fns"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useMemo, useState } from "react"




export function SetAndSeeDueDate(props: any) {
  const [dueDate, setDueDate] = useState(props.dueDate)

  const memoizedDueDate = useMemo(() => {
    return dueDate ? new Date(dueDate) : undefined;
  }, [dueDate]);

  function handleSetDueDate(selectedDate: Date | undefined){
    const serializableDate = selectedDate ? selectedDate.toISOString() : undefined;
    setDueDate(serializableDate);

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const daysLeft = selectedDate ? differenceInDays(selectedDate, today) : '-';
    props.setDaysLeft(daysLeft);
    
    const updatedPropertiesWithDueDate = props.handleSetProperties("dueDate", serializableDate, props.properties);
    const updatedPropertiesWithDueDateDaysLeft = props.handleSetProperties("daysLeft", daysLeft, updatedPropertiesWithDueDate);
    props.handleUpdateProperties(updatedPropertiesWithDueDateDaysLeft);
  }

  return (
    <Popover>
      <PopoverTrigger 
        asChild 
        >
        <Button 
          variant={"outline"}
          className={cn(
            "w-[240px] justify-start text-left font-normal min-w-[13rem]",
            !dueDate && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {dueDate ? format(dueDate, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={memoizedDueDate}
          onSelect={handleSetDueDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
