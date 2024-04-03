import { ThemeProvider } from "@/components/providers/theme-provider";
import TodayTasks from "@/components/userMain/TodayTasks";
import UserMainNav from "@/components/userMain/UserMainNav";

const UserMain = () => {
  return (
    <ThemeProvider defaultTheme="system" storageKey="task-theme">
      <div className="h-full dark:bg-[#1F1F1F] flex flex-col justify-center items-center">
        <UserMainNav />
        <div className="h-full pt-40 flex flex-col items-center justify-center">
          <TodayTasks />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default UserMain;