import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import apiRequest from "@/connects/apiRequest";
import { useEffect, useState } from "react";

type TTask = {
  _id: string;
  title: string;
  completion: boolean;
  project: boolean;
};

const TodayTasks = () => {
  const [title, setTitle] = useState("");
  //const [project, getProject] = useState(false);
  const [tasks, setTasks] = useState<TTask[]>([]);

  useEffect(() => {
    async function fetchTasks() {
      try {
        const response = await apiRequest
          .get("/api/tasks")
          .then((response) => response.data);
        setTasks(response);
      } catch (err) {
        console.error("Error fetching tasks:", err);
      }
    }
    fetchTasks();
  }, []);

  async function handleCreateTask(e: React.FormEvent) {
    e.preventDefault();
    const response = await apiRequest.post(`/api/tasks`, {
      title,
    });
    const task = await response.data;
    setTasks([...tasks, task]);
    setTitle("");
  }

  async function handleDeleteTaskById(taskId: string) {
    await apiRequest.delete(`/api/tasks/${taskId}`);
    setTasks(tasks.filter((task) => task._id !== taskId));
  }

  return (
    <div>
      <form onSubmit={handleCreateTask}>
        <label className="block mb-2 text-lg font-bold ">Add Task</label>
        <div className="mt-4 flex items-center border-t border-gray-300 pt-4">
          <Checkbox />
          <div className="h-6 border-l border-gray-300 mx-2"></div>
          <Input
            className="min-w-[17rem]"
            placeholder="Enter task..."
            value={title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setTitle(e.target.value);
            }}
          />
          <Button variant={"outline"}>Add</Button>
        </div>
      </form>
      <div>
        <Separator className="my-4" />
        <label className="block mb-2 text-lg font-bold">My Tasks</label>
        <Separator className="my-3" />

        {tasks.map((task) => (
          <>
            <div className="flex items-center text-sm left-0">
              <Checkbox />
              <div className="h-6 border-l border-gray-300 mx-2"></div>
              <div
                key={task._id}
                className="border border-gray-200 rounded-lg p-2 min-w-[17rem]"
              >
                <Link to={`/main/:${task._id}`}>{task.title}</Link>
              </div>
              <Button
                variant={"ghost"}
                onClick={() => handleDeleteTaskById(task._id)}
              >
                X
              </Button>
            </div>
            <Separator className="my-3" />
          </>
        ))}
      </div>
    </div>
  );
};

export default TodayTasks;
