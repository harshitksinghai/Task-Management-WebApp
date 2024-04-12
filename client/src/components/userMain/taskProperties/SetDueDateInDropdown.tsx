import { Calendar } from "@/components/ui/calendar";
import {
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";


type AddOrUpdatePropertyFunction = (key: string, value: any) => void;

const SetDueDateInDropdown = (props: {addOrUpdateProperty: AddOrUpdatePropertyFunction}) => {
  const [date, setDate] = useState<Date>();
  console.log("initial");
  console.log(date);
  console.log(" z z");

  useEffect(() => {
    console.log(date);
    if (date) {
      props.addOrUpdateProperty("dueDate", date);
    }
  }, [date])

  return (
    <div>
      <DropdownMenuSub>
        <DropdownMenuSubTrigger>Set Due Date...</DropdownMenuSubTrigger>
        <DropdownMenuSubContent className="p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
          />
        </DropdownMenuSubContent>
      </DropdownMenuSub>
    </div>
  );
};

export default SetDueDateInDropdown;
