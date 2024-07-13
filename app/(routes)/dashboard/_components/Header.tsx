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
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export interface HeaderType {
  searchFn: (value: string) => void; // Updated type definition
}

// utils/colorUtils.js
export const colors = [
  "bg-red-500",
  "bg-blue-500",
  "bg-green-500",
  "bg-yellow-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-indigo-500",
];

export const isDarkColor = (color: any) => {
  const darkColors = [
    "bg-red-500",
    "bg-blue-500",
    "bg-purple-500",
    "bg-indigo-500",
  ];
  return darkColors.includes(color);
};

export const getRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};

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
    if (activeTeam_.createdBy === user?.email) {
      setMembers([...members, { email: "", role: "member"}]);
    } else {
      toast("Only Admin can add members");
    }
  };

  useEffect(() => {
    activeTeam_ && setMembers(activeTeam_?.members);
  }, [activeTeam_]);
  console.log(members);

  const updateMemberEmail = (e: any, index: number) => {
    const updatedMembers = [...members];
    updatedMembers[index] = {
      ...updatedMembers[index],
      email: e.target.value,
    };
    setMembers(updatedMembers);
  };
  const updateMemberRole = (e: any, index: number) => {
    const updatedMembers = [...members];
    updatedMembers[index] = {
      ...updatedMembers[index],
      role: e,
    };
    setMembers(updatedMembers);
  };

  const removeMember = (index: number) => {
    if (activeTeam_.createdBy === user?.email) {
      setMembers(members.filter((_, i) => i !== index));
    } else {
      toast("Only Admin can remove members");
    }
  };
  const addMembersApi = useMutation(api.teams.addMembers);
  const addFormFn = () => {
    console.log("activeTeam_", activeTeam_);
    console.log("members", members);
    addMembersApi({
      teamId: activeTeam_.teamId,
      members: members,
    })
      .then((resp) => {
        window.location.reload();
      })
      .catch((err) => console.error("Mutation error:", err));
  };

  //avatar color
  const [bgColor, setBgColor] = useState("");
  const [textColor, setTextColor] = useState("");

  useEffect(() => {
    const randomColor = getRandomColor();
    setBgColor(randomColor);
    setTextColor(isDarkColor(randomColor) ? "text-white" : "text-black");
  }, []);
  return (
    <div className="flex flex-col p-2 sm:p-0 sm:flex-row justify-between  w-full gap-2 items-center">
      {user && user.given_name && <div className="w-full text-left">Welcome <span className="font-bold capitalize">{user?.given_name} {user?.family_name}</span></div>}
      <div className="flex gap-2 sm:flex-row flex-col w-full sm:w-fit justify-end">
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
        {user?.picture.includes("lh3.googleusercontent.com") ? (
          <div>
            <Image
              src={user?.picture}
              alt="user"
              width={30}
              height={30}
              className="rounded-full"
            />
          </div>
        ) : (
          <div>
            {user && user?.email && (
              <div
                className={`w-[30px] h-[30px] rounded-full flex items-center justify-center ${bgColor} ${textColor}`}
              >
                {user?.email.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
        )}
        <Dialog>
          <DialogTrigger>
            <div
              className=" text-sm h-8 flex gap-2 justify-center items-center text-white hover:bg-blue-700 bg-blue-400 rounded-md px-2 py-2"
              onClick={() => {
                setMembers(activeTeam_?.members);
              }}
            >
              <Users className="h-4 w-4" /> Members
            </div>
          </DialogTrigger>
          <DialogContent className="min-w-[300px] md:w-2/5 w-[90%] max-h-[90%] md:p-4 p-2 rounded-sm">
            <DialogHeader className="w-fit ">
              <DialogTitle className="text-left w-full">Members</DialogTitle>
            </DialogHeader>
            <div className="flex w-full  items-center  min-w-[300px] md:px-4">
              <h2>
                <strong>Team Admin: </strong>
                {activeTeam_?.createdBy}
              </h2>
            </div>
            <div className="flex w-full justify-between items-center  min-w-[300px] md:px-4">
              <span className="text-sm md:text-lg">Add Members (Add the email ID)</span>
              <Button onClick={addMemberFn}>Add</Button>
            </div>
            <div className="max-h-[300px] overflow-auto  overflow-x-hidden md:px-4 pb-2">
            {members &&
          members.map((item, index) => (
            <div
              className="relative mt-4 flex gap-2 items-start w-full min-w-[300px] border-[1px] p-4 shadow-md rounded-sm"
              key={index}
            >
              <div className="w-full">
                <div className="my-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    placeholder="Email ID"
                    className="mt-1"
                    onChange={(e) => updateMemberEmail(e, index)}
                    value={item?.email}
                    name="email"
                  />
                </div>
                <div className="my-2">
                  <Label htmlFor="role">Role</Label>
                  <Select value={item.role} name="role" onValueChange={(e) => updateMemberRole(e, index)}>
                    <SelectTrigger className="w-full mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="member">Member</SelectItem>
                      <SelectItem value="co-admin">Co-Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Trash2
                className="text-red-400 hover:text-red-500 absolute top-2 right-2"
                onClick={() => {
                  removeMember(index);
                }}
              />
            </div>
          ))}
            </div>
            <div className="w-full flex justify-center">
              <Button
                className="bg-blue-400  mt-6  w-[30%] min-w-[300px] hover:bg-blue-600"
                onClick={() => addFormFn()}
                disabled={activeTeam_?.createdBy !== user?.email}
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
    </div>
  );
};

export default Header;
