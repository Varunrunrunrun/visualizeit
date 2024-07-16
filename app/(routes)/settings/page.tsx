"use client";
import React, { useEffect, useState } from "react";
import Logo from "../../_components/Logo";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useConvex, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Input } from '../../../components/ui/input'
import { Label } from '../../../components/ui/label';

const Settings = () => {
  const { user } = useKindeBrowserClient();

  useEffect(() => {
    user && user.email && getUser();
  }, [user]);

  const [userDetail, setUserDetail] = useState<any>();

  const convex = useConvex();
  const updateUser = useMutation(api.user.updateUser);
  const generateUrl = useMutation(api.user.generateUploadUrl);

  const getUser = async () => {
    if (user && user.email) {
      const result = await convex.query(api.user.getUser, {
        email: user?.email,
      });
      console.log(result);
      setUserDetail(result);
    }
  };
  const [imageBase64, setImageBase64] = useState<string>("");

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      if (reader.result && typeof reader.result === "string") {
        setImageBase64(reader.result);
      }
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    // Assuming you have a function to call your Convex API
    await updateUser({
      id: userDetail[0]._id,
      image: imageBase64,
    }).then((resp) => {
      console.log(resp);
    });
  };

  return (
    <div className="bg-slate-100 min-h-screen text-black p-6 sm:p-10 lg:p-16">
      <div className="max-w-5xl mx-auto">
        <div className="flex gap-8 items-baseline">
          <Logo className="md:text-4xl text-3xl md:mb-8 mb-4" />
          <h1 className="text-3xl lg:text-5xl font-bold mb-6 text-blue-400 flex gap-4">
            <span>Settings</span>
          </h1>
        </div>
        <div>
          {/* <input type="file" onChange={handleImageUpload} />
        <button onClick={handleSubmit}>Submit</button>
        {userDetail && userDetail[0]?._id}
        <img src={userDetail && userDetail[0]?.image} alt="" />
        </div> */}
        </div>
        <div>
        <Label htmlFor="teamId">First Name</Label>
                    <Input placeholder='Enter Team ID (XXX-XXXX-XXX)'
                        className='mt-1'
                        // onChange={(e) => setTeamId(e.target.value)}
                        name='teamiId'
                    />
        </div>
      </div>
    </div>
  );
};

export default Settings;
