import { Button } from "../../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import DeleteTaskInDropdown from "./InsideTaskDropdown/DeleteTaskInDropdown";
import IsCompletedCheckBox from "./OutsideTaskDropdown/IsCompletedCheckBox";
import { SetAndSeeDueDate } from "./OutsideTaskDropdown/SetAndSeeDueDate";
import TaskInput from "./OutsideTaskDropdown/TaskInput";
import { useUpdateTaskMutation } from "@/manageState/slices/taskApiSlice";
import {
  TaskProperties,
  updateTaskLocal,
} from "@/manageState/slices/taskSlice";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const Task = (props: any) => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState<boolean>(false);

  const [daysLeft, setDaysLeft] = useState<number | string>(
    props.task.properties.daysLeft
  );
  const [properties, setProperties] = useState(props.task.properties);

  const subTasks: string[] = [];
  const parentId = props.parentId ? props.parentId : undefined;

  const [updateTask] = useUpdateTaskMutation();

  function handleSetProperties(key: string, value: any, properties: any) {
    const updatedProperties = { ...properties };
    if (value !== undefined) {
      updatedProperties[key as keyof TaskProperties] = value;
    } else {
      if (updatedProperties.hasOwnProperty(key as keyof TaskProperties)) {
        // If the value is undefined, delete the key-value pair if it exists
        delete updatedProperties[key as keyof TaskProperties];
      }
    }
    console.log("set updatedProperties");
    console.log(updatedProperties);
    setProperties(updatedProperties);

    return updatedProperties;
  }
  async function handleUpdateProperties(updatedProperties: any) {
    try {
      console.log("update updatedProperties");
      console.log(updatedProperties);
      await updateTask({
        taskId: props.task._id,
        properties: updatedProperties,
      });
      console.log("Task updated successfully in database");

      dispatch(
        updateTaskLocal({
          taskId: props.task._id,
          properties: updatedProperties,
        })
      );
      console.log("Task updated successfully in local");
    } catch (error) {
      console.error("Error updating task:", error);
    }
  }

  return (
    <div className="flex w-full flex-col items-start justify-between rounded-md border space-x-1 px-1 py-1 sm:flex-row sm:items-center">
      <div className="min-w-[3rem] h-10 px-4 py-2   inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50   border border-input bg-background">
        <IsCompletedCheckBox
          isCompleted={props.task.properties.isCompleted}
          handleSetProperties={handleSetProperties}
          handleUpdateProperties={handleUpdateProperties}
          properties={properties}
        />
      </div>

      <TaskInput
        title={props.task.properties.title}
        handleSetProperties={handleSetProperties}
        handleUpdateProperties={handleUpdateProperties}
        properties={properties}
      />

      <Link to={`/main/${props.task._id}`}>
        <Button variant={"outline"}>Open</Button>
      </Link>

      <span className="min-w-[3rem] h-10 px-4 py-2   inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50   border border-input bg-background hover:bg-accent hover:text-accent-foreground">
        {daysLeft}
      </span>

      <SetAndSeeDueDate
        properties={properties}
        handleSetProperties={handleSetProperties}
        handleUpdateProperties={handleUpdateProperties}
        dueDate={props.task.properties.dueDate}
        setDaysLeft={setDaysLeft}
      />

      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="border-[1px] h-[40px]">
            <DotsHorizontalIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[200px]">
          <DropdownMenuLabel>More Properties</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            {/*set due date... */}

            {/*Delete */}
            <DeleteTaskInDropdown taskId={props.task._id} />
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Task;
