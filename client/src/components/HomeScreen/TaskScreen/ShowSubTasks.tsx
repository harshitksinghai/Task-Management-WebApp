import Task from "../Task/Task";
import { Separator } from "@/components/ui/separator";
import { useFetchSubTasksQuery } from "@/manageState/slices/taskApiSlice";
import {
  Task as TaskInterface,
  fetchTasksToLocal,
} from "@/manageState/slices/taskSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const ShowSubTasks = (props: { parentId: string | undefined }) => {
  const {
    data: fetchedSubTasks,
    isSuccess,
    isError,
    error,
  } = useFetchSubTasksQuery(props.parentId);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess && fetchedSubTasks) {
      dispatch(fetchTasksToLocal(fetchedSubTasks));
    } else if (isError) {
      console.log(error);
    }
  }, [props.parentId, isSuccess, isError, fetchedSubTasks]);

  function fetchSubTasksFromLocal(
    tasks: TaskInterface[],
    parentId: string | undefined
  ): TaskInterface[] {
    // Find the parent task by ID
    const parentTask = tasks.find(
      (task: TaskInterface) => task._id === parentId
    );

    // Fetch sub-tasks based on parent task's subTasks array
    let filteredSubTasks: TaskInterface[] = [];
    if (parentTask && parentTask.subTasks) {
      const subTaskIds = parentTask.subTasks;
      filteredSubTasks = tasks.filter((task: TaskInterface) => subTaskIds.includes(task._id));
    } else {
      // Handle case where parentTask or its subTasks are undefined
      return [];
    }
    return filteredSubTasks;
  }

  // Access the tasks state from Redux store
  const tasks: TaskInterface[] = useSelector((state: any) => state.task.tasks);

  // Ensure that parentId is defined before fetching subtasks
  const subTasks: TaskInterface[] = props.parentId
    ? fetchSubTasksFromLocal(tasks, props.parentId)
    : [];

  return (
    <div>
      <div>
        <label className="block mb-2 text-lg font-bold">Sub Tasks</label>
        <Separator className="my-3" />

        {subTasks &&
          subTasks.map((task: any) => (
            <div key={task._id} className="mt-1">
              <Task task={task} parentId={props.parentId} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default ShowSubTasks;
