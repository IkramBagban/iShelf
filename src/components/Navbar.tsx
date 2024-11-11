"use client"
import React from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Sun, LogOut, User } from "lucide-react";
import { useRouter } from "next/navigation";

const Navbar = () => {

  const router = useRouter()
  return (
    <div className="w-full flex justify-between items-center p-4 border-b bg-white shadow-sm">
      <div className="flex items-center space-x-4">
        <div className="text-lg font-bold">iShelf</div>
      </div>

      <div className="flex items-center space-x-4">
        <Button variant="outline" onClick={()=> router.push('/create-article')}>Add</Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer">
              <AvatarFallback>IB</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" /> Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Sun className="mr-2 h-4 w-4" /> Switch Theme
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" /> Log Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Navbar;
