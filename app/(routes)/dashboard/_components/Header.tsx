"use client";
import { ActiveTeamContext } from "@/app/_context/FilesListContext";
import { Button } from "@/components/ui/button";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
  Dialog,
  DialogClose,
  DialogTitle,
  DialogContent,
} from "@/components/ui/dialog";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { Search, Send, Trash2, Users } from "lucide-react";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { Member } from "../../teams/create/page";
import { Input } from "@/components/ui/input";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";

export interface HeaderType {
  searchFn: (value: string) => void; // Updated type definition
}

const Header = ({ searchFn }: HeaderType) => {
  const route = useRouter();
  const { user }: any = useKindeBrowserClient();
  const { activeTeam_, setActiveTeam_ } = useContext(ActiveTeamContext);
  console.log(activeTeam_);
  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    searchFn(event.target.value); // Pass input value to parent function
  };

  const [members, setMembers] = useState<Member[]>([]);
  const addMemberFn = () => {
    setMembers([...members,{email:''}]);
};

useEffect(() => {
activeTeam_ && setMembers(activeTeam_?.members);
},[activeTeam_])
console.log(members);


const updateMember = (e:any,index:number) => {
  const updatedMembers = [...members];
  updatedMembers[index] = {
      ...updatedMembers[index],
      email: e.target.value
  };
  setMembers(updatedMembers);
}

const removeMember = (index: number) => {
  setMembers(members.filter((_, i) => i !== index));
}
const addMembersApi=useMutation(api.teams.addMembers)
const addFormFn = () => {
  console.log('activeTeam_', activeTeam_);
  console.log('members', members);
    addMembersApi({
      teamId: activeTeam_.teamId,
      members: members,
    })
    .then(resp => {
      window.location.reload();
    })
    .catch(err => console.error('Mutation error:', err));
}
  return (
    <div className="flex flex-col sm:flex-row justify-end w-full gap-2 items-center">
      <div className="flex gap-2 items-center border rounded-md p-1 w-full sm:w-auto">
        <Search className="h-4 w-4" />
        <input
          type="text"
          placeholder="Search"
          onChange={handleChange}
          className="border-none outline-none"
        />
      </div>
      <div className="flex gap-2 items-center w-full sm:w-auto justify-end">
        <div>
          {user && user.picture && (
            <Image
              src={user?.picture}
              alt="user"
              width={30}
              height={30}
              className="rounded-full"
            />
          )}
        </div>
        <Dialog>
          <DialogTrigger>
            <div className=" text-sm h-8 flex gap-2 justify-center items-center text-white hover:bg-blue-700 bg-blue-400 rounded-md px-2 py-2" onClick={() => {setMembers(activeTeam_?.members)}}>
              <Users className="h-4 w-4" />  Members
            </div>
          </DialogTrigger>
          <DialogContent className="min-w-[300px] md:w-2/5 w-[90%] max-h-[80%] p-4">
            <DialogHeader className="w-fit ">
              <DialogTitle className="text-left w-full">Members</DialogTitle>
            </DialogHeader>
              <div className="flex w-full justify-between items-center  min-w-[300px] px-4">
                <span>Add Members (Add the email ID)</span>
                <Button onClick={addMemberFn}>Add</Button>
              </div>
              <div className="max-h-[300px] overflow-auto  overflow-x-hidden px-4 pb-2">

              {members &&
                members.map((item, index) => (
                  <div
                    className="mt-2 flex gap-2 items-center w-full min-w-[300px]"
                    key={index}
                  >
                    <Input placeholder='Email ID'
                                className='mt-3'
                                onChange={(e) => updateMember(e,index)}
                                value={item?.email}
                            />
                    <Trash2
                      className="text-red-400 mt-2 hover:text-red-500"
                      onClick={() => {
                        removeMember(index);
                      }}
                    />
                  </div>
                ))}
              </div>
              <div className="w-full flex justify-center">
              <Button
                className="bg-blue-400  md:mt-9 mt-6  w-[30%] min-w-[300px] hover:bg-blue-600"
                onClick={() => addFormFn()}
              >
                Add Members
              </Button>
              </div>
            <DialogFooter>
              <DialogClose asChild />
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Header;
