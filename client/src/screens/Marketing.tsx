import Heroes from "@/components/marketing/Heroes";
import Footer from "@/components/marketing/Footer";
import { Heading } from "@/components/marketing/Heading";
import Navbar from "@/components/marketing/Navbar";
import { ThemeProvider } from "@/components/providers/theme-provider";

const Marketing = () => {
  return (
    <ThemeProvider defaultTheme="system" storageKey="task-theme">
    <div className="h-full dark:bg-[#1F1F1F]">
        <Navbar />
      <div className="h-full pt-40">
        <div className="min-h-full flex flex-col">
          <div className="flex flex-col items-center justify-center md:justify-start text-center gap-y-8 flex-1 px-6 pb-10">
            <Heading />
            <Heroes />
          </div>
          <Footer />
        </div>
      </div>
    </div>
    </ThemeProvider>
  );
};

export default Marketing;
