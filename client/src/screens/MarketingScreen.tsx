import Heroes from "@/components/MarketingScreen/Heroes";
import Footer from "@/components/MarketingScreen/Footer";
import { Heading } from "@/components/MarketingScreen/Heading";
import Navbar from "@/components/MarketingScreen/Navbar";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const MarketingScreen = () => {
  const navigate = useNavigate();
  const {userInfo} = useSelector((state: any) => state.auth);
  
  useEffect(() => {
    if(userInfo){
      navigate('/main');
    }
  }, [navigate, userInfo]);
  
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

export default MarketingScreen;
