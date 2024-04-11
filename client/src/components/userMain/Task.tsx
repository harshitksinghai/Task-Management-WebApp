import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import { useDeleteTaskMutation } from "@/manageState/slices/taskApiSlice";
import {
  TaskProperties,
  deleteTaskLocal,
} from "@/manageState/slices/taskSlice";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Task = (props: any) => {
  const [title, setTitle] = useState<string>("");
  const [type, setType] = useState<string>("task");
  const [properties, setProperties] = useState<TaskProperties>({});

  const dispatch = useDispatch();

  const { userInfo } = useSelector((state: any) => state.auth);
  const userId = userInfo._id;

  const [deleteTask] = useDeleteTaskMutation();

  const content: string[] = [];
  const parentId = props.parentId ? props.parentId : null;
  const isCompleted = false;

  const addOrUpdateProperty = (key: string, value: any) => {
    setProperties((prevProperties) => ({
      ...prevProperties,
      [key]: value,
    }));
  };

  async function deleteTaskById(taskId: string) {
    try {
      await deleteTask(taskId);
      dispatch(deleteTaskLocal({ taskId }));
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="flex items-center space-x-4">
      <Checkbox />
      <Input
        className="min-w-[17rem]"
        value={props.task.properties.title}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const updatedTitle = e.target.value;
          setTitle(updatedTitle);
          addOrUpdateProperty("title", updatedTitle);
        }}
      />
      <Link to={`/main/:${props.task._id}`}>
        <Button variant={"outline"}>Open</Button>
      </Link>
      <Button variant={"ghost"} onClick={() => deleteTaskById(props.task._id)}>
        X
      </Button>
    </div>
  );
};

export default Task;
