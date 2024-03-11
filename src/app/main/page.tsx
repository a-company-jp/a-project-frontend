"use client";

import CareerPreview from "@/components/organisms/CareerPreview";
import Sidebar from "@/components/organisms/Sidebar";
import UserList from "@/components/organisms/UserList";
import UserSearchForm from "@/components/molecules/UserSearchForm";
import { useState } from "react";
import { UserData } from "../../../proto/typescript/pb_out/main";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase/client";
import { useAuthState } from "react-firebase-hooks/auth";

const Main = () => {
  const router = useRouter();
  const [hoveredUser, setHoveredUser] = useState<UserData | null>(null);
  const [user, isLoading] = useAuthState(auth);
  const redirectLogin = () => {
    router.push("/login");
  };

  if (isLoading)
    return (
      <div
        className="flex justify-center items-center h-screen"
        aria-label="Loading..."
      >
        <div className="animate-spin h-10 w-10 border-4 border-gray-500 rounded-full border-t-transparent"></div>
      </div>
    );

  return user ? (
    <div className="h-screen w-screen flex">
      <Sidebar />
      <div className="w-full grid grid-cols-5">
        <div className="col-span-3 p-4 h-screen overflow-scroll hidden-scrollbar">
          <UserSearchForm />
          <UserList setHoveredUser={setHoveredUser} hoveredUser={hoveredUser} />
        </div>
        <div className="col-span-2">
          <CareerPreview user={hoveredUser} />
        </div>
      </div>
    </div>
  ) : (
    redirectLogin()
  );
};

export default Main;
