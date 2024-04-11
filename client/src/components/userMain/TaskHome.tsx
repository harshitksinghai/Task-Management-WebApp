import AddTask from "./AddTask";
import TodayTasks from "./TodayTasks";

const TaskHome = () => {

  return (
    <div>
      <AddTask parentId={null} />
      <TodayTasks parentId={null} />
    </div>
  );
};

export default TaskHome;
