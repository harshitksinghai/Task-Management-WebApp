import apiRequest from "@/connects/apiRequest";
import { useState } from "react";

const [title, setTitle] = useState("");
//const [project, getProject] = useState(false);
const [tasks, setTasks] = useState<TTask[]>([]);
const [type, setType] = useState("task");
const [properties, setProperties] = useState({});

type TTask = {
    _id: string;
    type: string;
    properties: TaskProperties;
  };
  interface TaskProperties {
    title?: string;
    // Add other properties here as needed
  }

  const addOrUpdateProperty = (key: string, value: any) => {
    setProperties((prevProperties) => ({
      ...prevProperties,
      [key]: value,
    }));
  };
  async function deleteTaskById(taskId: string) {
    await apiRequest.delete(`/api/tasks/${taskId}`);
    setTasks(tasks.filter((task) => task._id !== taskId));
  }
  
  export {
    title,
    setTitle,
    tasks,
    setTasks,
    type,
    setType,
    properties,
    setProperties,
    addOrUpdateProperty,
    deleteTaskById
  }