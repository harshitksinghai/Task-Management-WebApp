import { ThemeProvider } from "@/components/providers/theme-provider";
import TaskHome from "@/components/HomeScreen/TaskHome";
import HomeNav from "@/components/HomeScreen/HomeNavBar/HomeNav";


const HomeScreen = () => {
  return (
    <ThemeProvider defaultTheme="system" storageKey="task-theme">
      <div className="h-full dark:bg-[#1F1F1F] flex flex-col justify-center items-center">
        <HomeNav />
        <div className="pt-40">
          <TaskHome />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default HomeScreen;
