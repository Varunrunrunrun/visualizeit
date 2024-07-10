"use client"
import { api } from '@/convex/_generated/api';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { useConvex } from 'convex/react';
import { Sidebar } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import SideNav from './_components/SideNav';
import { FileListContext } from '@/app/_context/FilesListContext';
import LeftDrawer from './_components/LeftDrawer';
import Loader from './_components/Loader';

const DashboardLayout = (
    {
        children
    }: Readonly<{ children: React.ReactNode }>
) => {
    const convex = useConvex();
    const { user }: any = useKindeBrowserClient();
    const [fileList_, setFileList_] = useState();
    const [loading,setLoading] = useState(true);
    const router = useRouter();
    useEffect(() => {
        user && checkTeam();
    }, [user]);
    useEffect(() => {
        if(fileList_){
            setLoading(false);
        }
        else{
            setLoading(true);
        }
    },[fileList_]);

    const checkTeam = async () => {
        const result = await convex.query(api.teams.getTeam,
            { email: user?.email });

        if (!result?.length) {
            router.push('teams/create')
        }
    }
    return (
        <div>
            {loading && <Loader />}
            <FileListContext.Provider value={{fileList_,setFileList_}}>
            <div className='lg:hidden flex w-full bg-slate-100 mb-2'>
                <LeftDrawer />
            </div>
            <div className='lg:grid grid-cols-4 flex'>
            <div className='lg:flex hidden'>
                <SideNav />
            </div>

            <div className='col-span-4 lg:ml-72 w-full lg:w-auto'>
                {children}
            </div>
            </div>
            </FileListContext.Provider>
        </div>
    )
}

export default DashboardLayout