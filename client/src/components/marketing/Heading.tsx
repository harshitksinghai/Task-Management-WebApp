import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

export const Heading = () => {
    return (
        <div className="max-w-3xl space-y-4">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
                Your Ideas, Plans, & Priorities. Unified. Welcome to <span className="underline">WorkNow</span>
            </h1>
            <h3 className="text-base sm:text-xl md:text-2xl font-medium">
                WorkNow is the connected workspace where <br /> better, faster work happens.
            </h3>
            <Link to={"/register"}>
            <Button>
                Get WorkNow free
                <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
            </Link>
        </div>
    );
};
