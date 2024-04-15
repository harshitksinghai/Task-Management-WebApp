import AddTask from "./AddTask";
import TodayTasks from "./TodayTasks";

const TaskHome = () => {

  return (
    <div>
      <AddTask parentId={undefined} />
      <TodayTasks parentId={undefined} />
    </div>
  );
};

export default TaskHome;
