import UseScrollTop from "@/components/helpers/useScrollTop";
import Logo from "../Logo";
import { cn } from "@/lib/utils";
import { ModeToggle } from "../mode-toggle";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";


const Navbar = () => {
    const scrolled = UseScrollTop();
    return (
        <div className={cn("z-50 bg-background dark:bg-[#1F1F1F] fixed top-0 flex items-center w-full p-2.5",
            scrolled && "border-b shadow-sm")}>
              <Logo />
              <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
                <Link to={"/login"}>
                  <Button variant="outline" className="dark:bg-[#1F1F1F] dark:hover:bg-[#1c1c1c]">
                    Login
                  </Button>
                </Link>
                <Link to={"/register"}>
                <Button>
                  Get WorkNow free
                </Button>
                </Link>
                <div className="h-6 border-l border-gray-300 mx-0.5"></div>
                <ModeToggle /> 
              </div>
        </div>
    )
}
export default Navbar;
