import { Button } from "../../ui/button";
import { Separator } from "../../ui/separator";
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
import SelectType from "./OutsideAddTaskDropdown/SelectType";
import AddTaskInput from "./OutsideAddTaskDropdown/AddTaskInput";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../../ui/dropdown-menu';
import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import SetDueDate from './InsideAddTaskDropdown/SetDueDate'

const AddTask = (props: { parentId: string | undefined }) => {
  
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state: any) => state.auth);
  const userId = userInfo._id;

  const { type } = useSelector((state: any) => state.addTaskStates);

  const { properties } = useSelector((state: any) => state.addTaskStates);
  const title = useSelector((state: any) => state.addTaskStates.properties.title);
  const { subTasks } = useSelector((state: any) => state.addTaskStates);

  const [open, setOpen] = useState<boolean>(false);

  const { parentId } = useSelector((state: any) => state.addTaskStates);
  useEffect(() => {
    if (props.parentId !== undefined) {
      dispatch(setParentId(props.parentId));
      console.log("props.parentId addtask");
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
          <SelectType />
          <AddTaskInput />

          {/* inside dropdown */}
          <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="border-[1px] h-[40px]"
              >
                <DotsHorizontalIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuLabel>More Properties</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                {/*set due date... */}
                <SetDueDate />


              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

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
