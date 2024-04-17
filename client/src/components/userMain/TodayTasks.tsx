import { Separator } from "../ui/separator";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFetchAllTasksMutation } from "@/manageState/slices/taskApiSlice";
import { fetchTasksToLocal } from "@/manageState/slices/taskSlice";
import Task from "./Task";

const TodayTasks = (props: { parentId: string | undefined }) => {

  const { userInfo } = useSelector((state: any) => state.auth);
  const userId = userInfo._id;

  const [fetchTasks] = useFetchAllTasksMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    async function getTasks() {
      console.log("useEffect []");
      try {
        const tasks = await fetchTasks({userId});
        dispatch(fetchTasksToLocal(tasks));
      } catch (err) {
        console.error("Error fetching tasks:", err);
      }
    }
    if (tasks.length === 0) {
      getTasks();
    }
  }, []);

  const { tasks } = useSelector((state: any) => state.task);
  
  return (
    <div>
      <div>
        
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
