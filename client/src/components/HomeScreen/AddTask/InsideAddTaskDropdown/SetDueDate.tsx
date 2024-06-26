import { Calendar } from "@/components/ui/calendar";
import {
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import { setDaysLeft, setDueDate } from "@/manageState/slices/addTaskStatesSlice";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";


const SetDueDate = () => {

  const dueDate = useSelector((state: any) => state.addTaskStates.properties.dueDate); // currently in UTC

  const memoizedDueDate = useMemo(() => {
    return dueDate ? new Date(dueDate) : undefined;
  }, [dueDate]);

  const dispatch = useDispatch();

  function handleDueDateUpdate(dueDate: Date | undefined){
    const serializableDate = dueDate ? dueDate.toISOString() : undefined; // local time to UTC
    dispatch(setDueDate(serializableDate));
    dispatch(setDaysLeft(serializableDate));
  }

  return (
    <div>
      <DropdownMenuSub>
        <DropdownMenuSubTrigger>Set Due Date...</DropdownMenuSubTrigger>
        <DropdownMenuSubContent className="p-0">
          <Calendar
            mode="single"
            selected={memoizedDueDate}
            onSelect={handleDueDateUpdate}
            initialFocus
          />
        </DropdownMenuSubContent>
      </DropdownMenuSub>
    </div>
  );
};

export default SetDueDate;
