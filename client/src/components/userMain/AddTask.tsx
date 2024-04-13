import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Separator } from "../ui/separator";
import MorePropertiesDropdownAddTask from "./MorePropertiesDropdownAddTask";
import {
  setDueDate,
  setType,
  setTitle,
  setParentId,
  clearProperties,
} from "@/manageState/slices/addTaskStatesSlice";
import { useCreateTaskMutation } from "@/manageState/slices/taskApiSlice";
import { createTaskLocal } from "@/manageState/slices/taskSlice";
import { useDispatch, useSelector } from "react-redux";

const AddTask = (props: { parentId: string | null }) => {
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state: any) => state.auth);
  const userId = userInfo._id;

  const { type } = useSelector((state: any) => state.addTaskStates);
  const defaultTypeValue = "task";

  const { properties } = useSelector((state: any) => state.addTaskStates);
  const title = useSelector((state: any) => state.addTaskStates.properties.title);

  const { content } = useSelector((state: any) => state.addTaskStates);
  const { parentId } = useSelector((state: any) => state.addTaskStates);
  if (props.parentId !== null) {
    dispatch(setParentId(props.parentId));
  }

  const [createTask] = useCreateTaskMutation();

  async function handleCreateTask(e: React.FormEvent) {
    e.preventDefault();
    // Check if title is empty
    if (!title.trim()) {
      console.log("Title is required.");
      return; // Exit the function early if title is empty
    }
    try {
      const task = await createTask({
        userId,
        type,
        properties,
        content,
        parentId,
      });
      //console.log(task); // data {....}
      dispatch(createTaskLocal(task));

      dispatch(setType("task"));
      dispatch(setDueDate(undefined));
      dispatch(setTitle(""));
      dispatch(setParentId(null));
      dispatch(clearProperties());
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <label className="block mb-2 text-lg font-bold">Add Task</label>
      <Separator className="my-3" />

      <form
        onSubmit={handleCreateTask}
        className="flex w-full items-center space-x-1"
      >
        <div className="flex w-full flex-col items-start justify-between rounded-md border space-x-1 px-1 py-1 sm:flex-row sm:items-center">
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

          <Input
            className="min-w-[37rem]"
            placeholder="Enter task..."
            value={title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const updatedTitle = e.target.value;
              dispatch(setTitle(updatedTitle));
            }}
          />
          <MorePropertiesDropdownAddTask />
          <div className="flex flex-col items-start justify-between rounded-md border px-1 py-0 sm:flex-row sm:items-center">
            <Button variant={"ghost"} type="submit">
              Add
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default AddTask;
