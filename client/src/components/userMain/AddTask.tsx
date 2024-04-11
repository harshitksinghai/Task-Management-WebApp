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
import { useCreateTaskMutation } from "@/manageState/slices/taskApiSlice";
import { TaskProperties, createTaskLocal } from "@/manageState/slices/taskSlice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";


const AddTask = (props: { parentId: string | null }) => {

  const [title, setTitle] = useState<string>("");

  const defaultTypeValue = "task";
  const [type, setType] = useState<string>(defaultTypeValue);

  const [properties, setProperties] = useState<TaskProperties>({});

  const dispatch = useDispatch();

  const { userInfo } = useSelector((state: any) => state.auth);
  const userId = userInfo._id;

  const [createTask] = useCreateTaskMutation();

  const content: string[] = [];
  const parentId = props.parentId ? props.parentId : null;
  const isCompleted = false;

  const addOrUpdateProperty = (key: string, value: any) => {
    setProperties((prevProperties) => ({
      ...prevProperties,
      [key]: value,
    }));
  };

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
        isCompleted,
      });
      //console.log(task); // data {....}
      dispatch(createTaskLocal(task));
      setTitle("");
      setType('task');
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <form onSubmit={handleCreateTask}>
        <label className="block mb-2 text-lg font-bold ">Add Task</label>
        <div className="mt-4 flex items-center border-t border-gray-300 pt-4 space-x-4">
          <Select onValueChange={(value) => setType(value)} defaultValue={defaultTypeValue}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder={type === 'task' ? 'Task' : 'Project'} />
            </SelectTrigger>
            <SelectContent>
            <SelectGroup>
              <SelectItem value="task">
                Task
              </SelectItem>
              <SelectItem value="project">Project</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Input
            className="min-w-[17rem]"
            placeholder="Enter task..."
            value={title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const updatedTitle = e.target.value;
              setTitle(updatedTitle);
              addOrUpdateProperty("title", updatedTitle);
            }}
          />
          <Button variant={"outline"} type="submit">Add</Button>
        </div>
      </form>
      
    </div>
  );
};

export default AddTask;
