import React from "react";
import { Button } from "@/components/ui/button";


const Navbar = () => {
  return (
    <div className="w-full flex justify-between items-center p-4 border-b bg-white shadow-sm">
      <div className="flex items-center space-x-4">
        <div className="text-lg font-bold">iShelf</div>
      </div>
      {/* <div className="flex space-x-4">
        <Button variant="outline">Home</Button>
        <Button variant="outline">Categories</Button>
        <Button variant="outline">Add Resource</Button>
      </div> */}
    </div>
  );
};


export default Navbar