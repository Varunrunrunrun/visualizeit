"use client";

import React from "react";
import Logo from "./_components/Logo";
export default function Loading() {
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-90 z-50">
        <div className="flex items-end gap-4 h-fit">
          <Logo className="text-8xl text-white -mb-[12px] -mr-[18px]" />
          <div className="loader-css"></div>
        </div>
      </div>
    </>
  );
}
