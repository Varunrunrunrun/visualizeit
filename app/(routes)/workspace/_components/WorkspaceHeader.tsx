import Logo from "@/app/_components/Logo";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Link, LogOut, MoreHorizontal, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const WorkspaceHeader = ({onSave,fileName,userRole}:any) => {
    const router = useRouter();
  return (
    <div>
      <div className="p-3 border-b flex justify-between items-center bg-slate-100">
        <div className="flex md:gap-16 gap-8 items-center">
          <Logo className="text-2xl" />
          <h2 className="text-[18px] font-bold">{fileName}</h2>
        </div>
        <div className="md:flex items-center gap-4 hidden">
          <Button
            className={`h-8 text-[12px]
        gap-2 bg-green-500 hover:bg-green-600 ${userRole ? ' cursor-not-allowed' :'cursor-pointer'}`}
            onClick={onSave}
            disabled={userRole}
          > 
            <Save className="h-4 w-4" /> Save{" "}
          </Button>
          <Button
            className="h-8 text-[12px]
        gap-2 bg-blue-600 hover:bg-blue-700"
          >
            Share <Link className="h-4 w-4" />{" "}
          </Button>
          <Button
            className="h-8 text-[12px]
        gap-2 bg-red-500 hover:bg-red-600"
            onClick={() => {router.push('/dashboard')}}
          > 
            <LogOut className="h-4 w-4" /> Leave{" "}
          </Button>
        </div>
        <div className="md:hidden flex">
<Popover>
    <PopoverTrigger>
        <MoreHorizontal/>
    </PopoverTrigger>
    <PopoverContent className="w-fit h-fit mr-4 p-2">
        <div className="flex flex-col gap-2">
        <Button
            className="h-8 text-[12px]
        gap-2 bg-green-500 hover:bg-green-600 min-w-[120px]"
            onClick={onSave}
          > 
            <Save className="h-4 w-4" /> Save{" "}
          </Button>
          <Button
            className="h-8 text-[12px]
        gap-2 bg-blue-600 hover:bg-blue-700 min-w-[120px]"
          >
            Share <Link className="h-4 w-4" />{" "}
          </Button>
          <Button
            className="h-8 text-[12px]
        gap-2 bg-red-500 hover:bg-red-600 min-w-[120px]"
            onClick={() => {router.push('/dashboard')}}
          > 
            <LogOut className="h-4 w-4" /> Leave{" "}
          </Button>
        </div>
    </PopoverContent>
</Popover>
        </div>
      </div>
    </div>
  );
};

export default WorkspaceHeader;
