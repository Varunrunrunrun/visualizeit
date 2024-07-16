import React from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import SideNav from "./SideNav";
import { Menu } from "lucide-react";
import Logo from "@/app/_components/Logo";

const LeftDrawer = () => {
  return (
    <div>
      <Drawer direction="left">
        <div className="flex justify-start gap-2 items-center p-4">
          <DrawerTrigger>
            <Menu />
          </DrawerTrigger>
          <Logo className="text-2xl" />
        </div>
        <DrawerContent className="h-screen  w-[300px] rounded-none bg-transparent border-none outline-none">
          <SideNav />
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default LeftDrawer;
