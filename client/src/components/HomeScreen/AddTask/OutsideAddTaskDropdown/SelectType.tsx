import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { setType } from "@/manageState/slices/addTaskStatesSlice";
import { useDispatch } from "react-redux";

const SelectType = () => {
  const defaultTypeValue = "task";
  const dispatch = useDispatch();
  return (
    <Select
            onValueChange={(value) => dispatch(setType(value))}
            defaultValue={defaultTypeValue}
          >
            <SelectTrigger className="w-[87px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="task">Task</SelectItem>
                <SelectItem value="project">Project</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
  )
}

export default SelectType
