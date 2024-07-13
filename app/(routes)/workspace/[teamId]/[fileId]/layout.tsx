"use client";
import { ActiveTeamContext, FileDataContext } from '@/app/_context/FilesListContext'
import { api } from '@/convex/_generated/api';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { useConvex } from 'convex/react';
import React, { useEffect, useState } from 'react'

const WorkspaceLayout = (    {
    children
}: Readonly<{ children: React.ReactNode }>) => {
    const [fileData_, setFileData_] = useState();
    const [activeTeam_, setActiveTeam_] = useState();


  return (
    <ActiveTeamContext.Provider value={{activeTeam_, setActiveTeam_}}>
    <FileDataContext.Provider value={{fileData_, setFileData_}}>
    <div>
        {children}
    </div>
    </FileDataContext.Provider>
    </ActiveTeamContext.Provider>
  )
}

export default WorkspaceLayout