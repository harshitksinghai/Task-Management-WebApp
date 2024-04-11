import { Separator } from "../ui/separator";
import { useEffect } from "react";

import Task from "./Task";
import { useDispatch, useSelector } from "react-redux";
import { useFetchTasksMutation } from "@/manageState/slices/taskApiSlice";
import { fetchTasksToLocal } from "@/manageState/slices/taskSlice";

const TodayTasks = (props: { parentId: string | null }) => {

  const { userInfo } = useSelector((state: any) => state.auth);
  const userId = userInfo._id;
  const [fetchTasks] = useFetchTasksMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    async function getTasks() {
      try {
        const tasks = await fetchTasks({userId});
        dispatch(fetchTasksToLocal(tasks));
      } catch (err) {
        console.error("Error fetching tasks:", err);
      }
    }
    getTasks();
  }, []);

  const { tasks } = useSelector((state: any) => state.task);
  
  return (
    <div>
      <div>
        <Separator className="my-4" />
        <label className="block mb-2 text-lg font-bold">My Tasks</label>
        <Separator className="my-3" />

        {tasks.map((task: any) => (
          <div key={task._id} className='mt-1'>
            <Task task={task} parentId={props.parentId} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodayTasks;
