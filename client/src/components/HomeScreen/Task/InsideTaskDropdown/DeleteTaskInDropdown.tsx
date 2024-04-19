import {
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";
import { useDeleteTaskMutation } from "@/manageState/slices/taskApiSlice";
import { deleteTaskLocal } from "@/manageState/slices/taskSlice";
import { useDispatch } from "react-redux";

const DeleteTaskInDropdown = (props: {taskId:string}) => {
    const dispatch = useDispatch();
    const [deleteTask] = useDeleteTaskMutation();

    async function deleteTaskById(taskId: string) {
        try {
          await deleteTask(taskId);
          dispatch(deleteTaskLocal({ taskId }));
        } catch (err) {
          console.log(err);
        }
      }
  return (
    <div>
      <DropdownMenuSeparator />
      <DropdownMenuItem
        className="text-red-600"
        onClick={() => deleteTaskById(props.taskId)}
      >
        Delete
        <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
      </DropdownMenuItem>
    </div>
  );
};

export default DeleteTaskInDropdown;
