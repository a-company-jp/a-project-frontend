"use client";
import React from "react";
import userInfos from "@/constants/json/user-info.json";
import FutureTimeLine from "@/components/organisms/FutureTimeLine";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase/client";
import Sidebar from "@/components/organisms/Sidebar";

const FutureTimeLinePage = () => {
  const router = useRouter();
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
    <div className="flex w-screen">
      <Sidebar />
      <div className="h-screen w-full overflow-scroll">
        <main className="flex flex-col items-center justify-between md:p-24">
          <FutureTimeLine milestones={userInfos[0].milestones} />
        </main>
      </div>
    </div>
  ) : (
    redirectLogin()
  );
};

export default FutureTimeLinePage;
