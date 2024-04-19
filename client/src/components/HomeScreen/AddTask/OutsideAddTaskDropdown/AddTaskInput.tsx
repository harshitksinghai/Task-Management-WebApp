import { Input } from "@/components/ui/input";
import { setTitle } from "@/manageState/slices/addTaskStatesSlice";
import { useDispatch, useSelector } from "react-redux";

const AddTaskInput = () => {

  const dispatch = useDispatch();
  
  const title = useSelector((state: any) => state.addTaskStates.properties.title);

  return (
    <Input
      className="min-w-[37rem]"
      placeholder="Enter task..."
      value={title}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        const updatedTitle = e.target.value;
        dispatch(setTitle(updatedTitle));
      }}
    />
  );
};

export default AddTaskInput;
