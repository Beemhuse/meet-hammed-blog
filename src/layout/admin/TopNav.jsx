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
      <div className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Search ..."
          className="border rounded-xl p-3"
        />
        {/* <Input type="search" placeholder="Search..." className="w-64" /> */}
        <button className="relative">
          <FaBell className="h-5 w-5" />
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-orange-500 text-[10px] text-white">
            3
          </span>
        </button>
        {/* <Avatar>
          <AvatarImage src="/placeholder.svg" />
          <AvatarFallback>OM</AvatarFallback>
        </Avatar> */}
      </div>
    </header>
  );
}
