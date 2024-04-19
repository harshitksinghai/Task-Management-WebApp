import Logo from "../../Logo";
import { UserNav } from "./user-nav";
import UseScrollTop from "@/components/helpers/useScrollTop";
import { cn } from "@/lib/utils";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const HomeNav = () => {
  const scrolled = UseScrollTop();
  const { userInfo } = useSelector((state: any) => state.auth);

  return (
    <div
      className={cn(
        "z-50 bg-background dark:bg-[#1F1F1F] fixed top-0 flex items-center w-full p-2.5",
        scrolled && "border-b shadow-sm"
      )}
    >
      {userInfo ? (
        <Link to={"/main"}>
          <Logo />
        </Link>
      ) : (
        <Logo />
      )}
      <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
        <div className="h-6 border-l border-gray-300 mx-0.5"></div>
        <UserNav />
      </div>
    </div>
  );
};
export default HomeNav;
