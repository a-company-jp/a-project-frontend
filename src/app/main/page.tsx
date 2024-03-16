"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase/client";
import { useAuthState } from "react-firebase-hooks/auth";
import MainContent from "@/components/organisms/MainContent";

const Main = () => {
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
    <>
      <MainContent />
    </>
  ) : (
    redirectLogin()
  );
};

export default Main;
