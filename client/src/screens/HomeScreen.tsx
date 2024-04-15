import { ThemeProvider } from "@/components/providers/theme-provider";
import TaskHome from "@/components/userMain/TaskHome";
import HomeNav from "@/components/userMain/HomeNav";


const HomeScreen = () => {
  return (
    <ThemeProvider defaultTheme="system" storageKey="task-theme">
      <div className="h-full dark:bg-[#1F1F1F] flex flex-col justify-center items-center">
        <HomeNav />
        <div className="h-full pt-40 flex flex-col items-center justify-center">
          <TaskHome />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default HomeScreen;
