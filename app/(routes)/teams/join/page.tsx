"use client";
import Logo from '@/app/_components/Logo'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label';
import { api } from '@/convex/_generated/api';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { useMutation } from 'convex/react';
import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';

export interface Member {
    email: string;
}
const JoinTeam = () => {
    const [email, setEmail] = useState('');

    const [password, setPassword] = useState('');

    const [teamId, setTeamId] = useState('');
    const joinTeam = useMutation(api.teams.joinTeam);
    const { user }: any = useKindeBrowserClient();
    const router = useRouter();
    const joinTeamFn = () => {
        if(teamId === ""){
            toast.error("Team ID cannot be empty");
            return;
        }
        if(password === ""){
            toast.error("Password cannot be empty");
            return;
        }
        if(user && user?.email){
            joinTeam({
                email: user?.email,
                password: password,
                teamId: teamId
            }).then(resp => {
                console.log(resp);
                if(resp.status === 200){
                    toast.success(resp?.message);
                    router.push('/dashboard');
                }
                else{
                    toast.error(resp.message);
                }
            })
        }
        else{
            toast.error("Some error occurred.",{
                description:"Please try after some time"
            })
        }
    }


    return (
        <div className='md:p-16 p-4'>
            <Logo className=' md:text-5xl text-3xl' />
            <div className='flex flex-col items-center md:mt-8 mt-16'>
                <h2 className='font-bold md:text-[40px] text-[22px] text-center'>Ready to join the Dream Team?</h2>
                <h2 className=' text-gray-500 text-center md:text-base text-[14px]'>Please enter the credentials to proceed!</h2>
                <div className='mt-7 md:w-[40%] w-[80%] min-w-[300px]'>
                <Label htmlFor="teamId">Team ID</Label>
                    <Input placeholder='Enter Team ID (XXX-XXXX-XXX)'
                        className='mt-1'
                        onChange={(e) => setTeamId(e.target.value)}
                        name='teamiId'
                    />
                </div>
                <div className='mt-4 md:w-[40%] w-[80%] min-w-[300px]'>
                <Label htmlFor="password">Password</Label>
                    <Input placeholder='Enter Password'
                        className='mt-1'
                        type='password'
                        name='passowrd'
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                
                <Button className='bg-blue-400 md:mt-9 mt-6  w-[30%] min-w-[300px] hover:bg-blue-600'
                    // disabled={!(teamId && password && email)}
                    onClick={() => joinTeamFn()}
                >Join Team</Button>
            </div>
        </div>
    )
}

export default JoinTeam