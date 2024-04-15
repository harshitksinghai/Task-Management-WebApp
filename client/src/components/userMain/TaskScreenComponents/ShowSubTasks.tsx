import Task from "../Task";
import { Separator } from "@/components/ui/separator";
import { useFetchSubTasksQuery } from "@/manageState/slices/taskApiSlice";
import { useEffect, useState } from "react";

const ShowSubTasks = (props: { parentId: string | undefined }) => {
  const [subTasks, setSubTasks] = useState<any[]>([]);
  const { data: fetchedSubTasks } = useFetchSubTasksQuery(props.parentId);

  console.log("fetchedSubTasks");
  console.log(fetchedSubTasks);

  useEffect(() => {
    if (props.parentId && fetchedSubTasks) {
      setSubTasks(fetchedSubTasks);
    }
  }, [props.parentId, fetchedSubTasks]);
  console.log("subTasks");
  console.log(subTasks);

  return (
    <div>
      <div>
        <label className="block mb-2 text-lg font-bold">My Tasks</label>
        <Separator className="my-3" />
        
        {subTasks && subTasks.map((task: any) => (
          <div key={task._id} className="mt-1">
            <Task task={task} parentId={props.parentId} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowSubTasks;
