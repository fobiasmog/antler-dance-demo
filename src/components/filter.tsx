import { FilterIcon, SearchIcon } from "lucide-react";
import { Button } from "./ui/button";

export default function Filter() {
    return (
        <div className="flex w-full absolute top-[30px] justify-center gap-3 align-center z-[998]">
            <div className="bg-white rounded-full max-w-[300px] h-[40px] flex flex-grow items-center p-2 gap-2">
                <SearchIcon className="stroke-black" />
                <div>
                    <div className="font-semibold text-xs">What are you looking for?</div>
                    <div className="text-xs">Dance mate - Coach</div>
                </div>
            </div>
            <Button  className="rounded-full bg-[#FF6F3C] w-[40px] h-[40px] p-0">
                <FilterIcon className="h-[20px] w-[20px] stroke-white"></FilterIcon>
            </Button>
        </div>
    )
}