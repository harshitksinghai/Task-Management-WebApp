import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ModeToggleDropdown } from "./mode-toggle-dropdown";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "@/manageState/slices/usersApiSlice";
import { logoutLocal } from "@/manageState/slices/authSlice";
import { clearTasksLocal } from "@/manageState/slices/taskSlice";

export function UserNav() {

  const {userInfo} = useSelector((state: any) => state.auth);
  const userName = userInfo.name;
  const userEmail = userInfo.email;


  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation(); 

  async function handleLogout(){
    try {
      await logoutApiCall({}).unwrap();
      dispatch(logoutLocal());
      dispatch(clearTasksLocal()); // Dispatch the clearTasks action
      navigate('/');
    } catch (err) {
      
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-9 w-9">
            <AvatarImage src="/avatars/03.png" alt="@shadcn" />
            <AvatarFallback>ME</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{userName}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {userEmail}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            Account
            <DropdownMenuShortcut>⇧⌘A</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
              <ModeToggleDropdown />
            <DropdownMenuShortcut>⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <Link to={"/"} onClick={handleLogout}>
          <DropdownMenuItem>
            Log out
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
