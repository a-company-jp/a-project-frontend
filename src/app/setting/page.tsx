"use client";

import Sidebar from "@/components/organisms/Sidebar";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase/client";
import { useAuthState } from "react-firebase-hooks/auth";

const Setting = () => {
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
    <div className="h-screen w-screen flex">
      <Sidebar />
      <div className="w-full grid grid-cols-5">プロフィール設定</div>
    </div>
  ) : (
    redirectLogin()
  );
};

export default Setting;
