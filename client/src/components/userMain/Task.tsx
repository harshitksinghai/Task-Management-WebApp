import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import {
  TaskProperties,
  updateTaskLocal,
} from "@/manageState/slices/taskSlice";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { SetAndSeeDueDate } from "./taskProperties/SetAndSeeDueDate";
import MorePropertiesDropdown from "./MorePropertiesDropdown";
import { useUpdateTaskMutation } from "@/manageState/slices/taskApiSlice";

const Task = (props: any) => {

  const [title, setTitle] = useState<string>(props.task.properties.title);
  const [isCompleted, setIsCompleted] = useState<boolean>(props.task.properties.isCompleted);

  const dispatch = useDispatch();

  const { userInfo } = useSelector((state: any) => state.auth);
  const userId = userInfo._id;

  const content: string[] = [];
  const parentId = props.parentId ? props.parentId : null;

  const [updateTask] = useUpdateTaskMutation();

  function updateProperties(key: string, value: any){
    const properties = {...props.task.properties};

    if (value !== undefined) {
      properties[key as keyof TaskProperties] = value;
    } else {
      if (properties.hasOwnProperty(key as keyof TaskProperties)) { // If the value is undefined, delete the key-value pair if it exists
        delete properties[key as keyof TaskProperties];
      }
    }
 
    return properties;
  }
  async function handleUpdateTaskProperty(key: string, value: any){
    try {
      const updatedProperties = updateProperties(key, value);
      
      await updateTask({ taskId: props.task._id, properties: updatedProperties });
      console.log('Task updated successfully in database');

      dispatch(updateTaskLocal({taskId: props.task._id, properties: updatedProperties}))
      console.log('Task updated successfully in local');
    } catch (error) {
      console.error('Error updating task:', error);
    }
  }
  

  return (

      <div className="flex w-full flex-col items-start justify-between rounded-md border space-x-1 px-1 py-1 sm:flex-row sm:items-center">
      <Button variant={"outline"} onClick={() => {}} className="hover:bg-transparent hover:text-primary-foreground hover:border-secondary hover:ring-0">
      <Checkbox 
        className="h-5 w-5" 
        checked={isCompleted} 
        onCheckedChange={(checked) => {
          const updatedIsCompleted = checked ? true : false;
          setIsCompleted(updatedIsCompleted);
          handleUpdateTaskProperty("isCompleted", updatedIsCompleted);
        }}
        />
      </Button>
      <Input
        className="min-w-[24rem]"
        value={title}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const updatedTitle = e.target.value;
          setTitle(updatedTitle);
        }}
        onBlur={() => {handleUpdateTaskProperty("title", title);}}
      />
      <Link to={`/main/:${props.task._id}`}>
        <Button variant={"outline"}>Open</Button>
      </Link>
      <SetAndSeeDueDate dueDate={props.task.properties.dueDate} handleUpdateTaskProperty={handleUpdateTaskProperty}/>

      
      <MorePropertiesDropdown task={props.task} />
  </div>
  );
};

export default Task;
