import Logo from "@/app/_components/Logo";
import React from "react";

const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50">
      <div className="flex items-end gap-4 h-fit">
      <Logo className="text-8xl text-white -mb-[12px] -mr-[18px]" />
      <div className="loader-css"></div>
      </div>
    </div>
  );
};

export default Loader;

