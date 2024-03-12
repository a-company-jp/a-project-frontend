"use client";

import CareerPreview from "@/components/organisms/CareerPreview";
import Sidebar from "@/components/organisms/Sidebar";
import UserList from "@/components/organisms/UserList";
import UserSearchForm from "@/components/molecules/UserSearchForm";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase/client";
import { useAuthState } from "react-firebase-hooks/auth";
import { UserInfoResponse } from "../../../proto/typescript/pb_out/main";

const Main = () => {
  const router = useRouter();
  const [hoveredUserInfo, setHoveredUserInfo] =
    useState<UserInfoResponse | null>(null);
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
          <UserList
            setHoveredUserInfo={setHoveredUserInfo}
            hoveredUserInfo={hoveredUserInfo}
          />
        </div>
        <div className="col-span-2">
          <CareerPreview userInfo={hoveredUserInfo} />
        </div>
      </div>
    </div>
  ) : (
    redirectLogin()
  );
};

export default Main;
