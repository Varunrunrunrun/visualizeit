"use client";
import { FileDataContext } from '@/app/_context/FilesListContext'
import React, { useState } from 'react'

const WorkspaceLayout = (    {
    children
}: Readonly<{ children: React.ReactNode }>) => {
    const [fileData_, setFileData_] = useState();
  return (
    <FileDataContext.Provider value={{fileData_, setFileData_}}>
    <div>
        {children}
    </div>
    </FileDataContext.Provider>
  )
}

export default WorkspaceLayout