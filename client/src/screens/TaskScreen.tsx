import { useParams } from "react-router-dom";
import AddTask from "@/components/HomeScreen/AddTask/AddTask";
import ListInfo from "@/components/HomeScreen/TaskScreen/ListInfo";
import ShowSubTasks from "@/components/HomeScreen/TaskScreen/ShowSubTasks";
import HomeNav from "@/components/HomeScreen/HomeNavBar/HomeNav";

const TaskScreen = () => {

  const { taskId } = useParams();
  
  return (
    <div className="flex w-full flex-col justify-center pt-20 rounded-md space-x-1 px-1 py-1 sm:flex-row sm:items-center">
      <HomeNav />
    <div className="">
      
      <AddTask parentId={taskId} />
      <ListInfo />
      <ShowSubTasks parentId={taskId}/>
    </div>
    </div>
  );
};

export default TaskScreen;
