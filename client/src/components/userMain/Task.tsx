import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import MorePropertiesDropdown from "./MorePropertiesDropdown";
import { SetAndSeeDueDate } from "./TaskProperties/SetAndSeeDueDate";
import { useUpdateTaskMutation } from "@/manageState/slices/taskApiSlice";
import {
  TaskProperties,
  updateTaskLocal,
} from "@/manageState/slices/taskSlice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setTitle } from "@/manageState/slices/addTaskStatesSlice";

const Task = (props: any) => {
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state: any) => state.auth);
  const userId = userInfo._id;

  const [title1, setTitle1] = useState(props.task.properties.title);
  const [isCompleted, setIsCompleted] = useState(
    props.task.properties.isCompleted
  );
  const [daysLeft, setDaysLeft] = useState<number | string>(
    props.task.properties.daysLeft
  );
  const [properties, setProperties] = useState(props.task.properties);

  const subTasks: string[] = [];
  const parentId = props.parentId ? props.parentId : undefined;

  const [updateTask] = useUpdateTaskMutation();

  const handleTitleChange = (e: any) => {
    const updatedTitle = e.target.value;
    setTitle1(updatedTitle);
    dispatch(setTitle(updatedTitle));
  };

  const handleIsCompletedChange = (checked: boolean) => {
    const updatedIsCompleted = checked ? true : false;
    setIsCompleted(updatedIsCompleted);
    const updatedProperties = handleSetProperties(
      "isCompleted",
      updatedIsCompleted,
      properties
    );
    handleUpdateProperties(updatedProperties);
  };

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
        <Checkbox
          className=" h-5 w-5 "
          checked={isCompleted}
          onCheckedChange={handleIsCompletedChange}
        />
      </div>
      <Input
        className="min-w-[24rem]"
        value={title1}
        onChange={handleTitleChange}
        onBlur={() => {
          const updatedProperties = handleSetProperties(
            "title",
            title1,
            properties
          );
          handleUpdateProperties(updatedProperties);
        }}
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

      <MorePropertiesDropdown task={props.task} />
    </div>
  );
};

export default Task;
