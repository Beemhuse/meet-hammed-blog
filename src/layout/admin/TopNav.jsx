// import { Input } from "@/components/custom/form/Inputs";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaBell } from "react-icons/fa";

export function Header() {
  return (
    <header className="flex h-16 bg-white  px-20 w-full items-center justify-between border-b ">
      <div className="flex flex-1 items-center space-x-4">
        <div>
          <h1 className="text-sm font-semibold">Good Morning</h1>
          <p className="text-lg font-bold">Dashboard</p>
        </div>
      </div>
   
    </header>
  );
}
