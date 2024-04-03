import UseScrollTop from "@/components/helpers/useScrollTop";
import Logo from "../Logo";
import { cn } from "@/lib/utils";
import { UserNav } from "./user-nav";


const UserMainNav = () => {
    const scrolled = UseScrollTop();
    return (
        <div className={cn("z-50 bg-background dark:bg-[#1F1F1F] fixed top-0 flex items-center w-full p-2.5",
            scrolled && "border-b shadow-sm")}>
              <Logo />
              <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
              <div className="h-6 border-l border-gray-300 mx-0.5"></div>
                <UserNav />
              </div>
        </div>
    )
}
export default UserMainNav;
