"use client";
import Logo from "@/app/_components/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { api } from "@/convex/_generated/api";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useMutation } from "convex/react";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

export interface Member {
  email: string;
  role?: string;
}
const CreateTeam = () => {
  const [teamName, setTeamName] = useState("");
  const [members, setMembers] = useState<Member[]>([]);
  const createTeam = useMutation(api.teams.createTeam);
  const { user }: any = useKindeBrowserClient();
  const router = useRouter();
  const createNewTeam = () => {
    console.log(members);
    if (user && user?.email) {
      createTeam({
        teamName: teamName,
        createdBy: user?.email,
        members: members,
      }).then((resp) => {
        console.log(resp);
        if (resp) {
          router.push("/dashboard");
          toast("Team created successfully!");
        }
      });
    }
  };

  const addMemberFn = () => {
    setMembers([...members, { email: "", role: "member" }]);
  };

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
    setMembers(members.filter((_, i) => i !== index));
  };

  return (
    <div className="md:p-16 p-4">
      <Logo className=" md:text-5xl text-3xl" />
      <div className="flex flex-col items-center md:mt-8 mt-16">
        <h2 className="font-bold md:text-[40px] text-[22px] text-center">
          What should we call your team?
        </h2>
        <h2 className=" text-gray-500 text-center md:text-base text-[14px]">
          You can always come back and change it!
        </h2>
        <div className="mt-7 md:w-[40%] w-[80%] min-w-[300px]">
          <Input
            placeholder="Team Name"
            className="mt-3"
            onChange={(e) => setTeamName(e.target.value)}
          />
        </div>
        <div className="flex justify-between items-center mt-7 md:w-[40%] w-[80%] min-w-[300px]">
          <span>Add Members (Add the email ID)</span>
          <Button onClick={addMemberFn}>Add</Button>
        </div>
        {members &&
          members.map((item, index) => (
            <div
              className="relative mt-4 flex gap-2 items-start md:w-[40%] w-[80%] min-w-[300px] border-[1px] p-4 shadow-md rounded-sm"
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
        <Button
          className="bg-blue-400 md:mt-9 mt-6  w-[30%] min-w-[300px] hover:bg-blue-600"
          disabled={!(teamName && teamName?.length > 0)}
          onClick={() => createNewTeam()}
        >
          Create Team
        </Button>
      </div>
    </div>
  );
};

export default CreateTeam;
