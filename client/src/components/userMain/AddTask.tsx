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
import {
  useCreateTaskMutation,
  useUpdateParentTaskSubTasksFieldMutation,
} from "@/manageState/slices/taskApiSlice";
import { createTaskLocal, updateParentTaskSubTasksFieldLocal } from "@/manageState/slices/taskSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const AddTask = (props: { parentId: string | undefined }) => {
  
  const dispatch = useDispatch();
  const [localTitle, setLocalTitle] = useState("");
  const { userInfo } = useSelector((state: any) => state.auth);
  const userId = userInfo._id;

  const { type } = useSelector((state: any) => state.addTaskStates);
  const defaultTypeValue = "task";

  const { properties } = useSelector((state: any) => state.addTaskStates);
  const title = useSelector(
    (state: any) => state.addTaskStates.properties.title
  );

  const { subTasks } = useSelector((state: any) => state.addTaskStates);
  const { parentId } = useSelector((state: any) => state.addTaskStates);

  useEffect(() => {
    setLocalTitle(properties.title);
  }, [properties.title]);

  useEffect(() => {
    if (props.parentId !== undefined) {
      dispatch(setParentId(props.parentId));
      console.log("props.parentId");
      console.log(props.parentId);
    } else {
      dispatch(setParentId(undefined));
    }
  }, [props.parentId]);

  const [createTask] = useCreateTaskMutation();
  const [UpdateParentTaskSubTasksField] = useUpdateParentTaskSubTasksFieldMutation();

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
        subTasks,
        parentId,
      });
      console.log(task); // data {....}
      dispatch(createTaskLocal(task));

      if(props.parentId !== undefined && 'data' in task ){
        const taskId = task.data?._id;

        await UpdateParentTaskSubTasksField({
          parentId: props.parentId,
          taskId:  taskId
        });
        dispatch(updateParentTaskSubTasksFieldLocal({
          parentId: props.parentId,
          taskId:  taskId
        }))
      }

      dispatch(setType("task"));
      dispatch(setDueDate(undefined));
      dispatch(setTitle(""));
      dispatch(setParentId(undefined));
      dispatch(clearProperties());
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <label className="block mb-2 text-lg font-bold">
        {props.parentId ? "Add Sub-Task" : "Add Task"}
      </label>
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
            value={localTitle}
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
      <Separator className="my-3" />
    </>
  );
};

export default AddTask;
