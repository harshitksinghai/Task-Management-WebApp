import { useParams } from "react-router-dom";
import AddTask from "@/components/userMain/AddTask";
import ListInfo from "@/components/userMain/TaskScreenComponents/ListInfo";
import ShowSubTasks from "@/components/userMain/TaskScreenComponents/ShowSubTasks";

const TaskScreen = () => {

  const { taskId } = useParams();
  console.log("taskId");
  console.log(taskId);

  
  return (
    <div className="flex w-full flex-col justify-center pt-20 rounded-md space-x-1 px-1 py-1 sm:flex-row sm:items-center">
    <div className="">
      <AddTask parentId={taskId} />
      <ListInfo />
      <ShowSubTasks parentId={taskId}/>
    </div>
    </div>
  );
};

export default TaskScreen;
