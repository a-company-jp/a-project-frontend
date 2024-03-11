"use client";

import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase/client";
import { useAuthState } from "react-firebase-hooks/auth";
import { login } from "@/lib/firebase/auth";
import LoginButton from "@/components/atoms/LoginButton";

const Home = () => {
  const router = useRouter();
  const [user, isLoading] = useAuthState(auth);
  const redirectMain = () => {
    router.push("/main");
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

  return user ? redirectMain() : <LoginButton onClick={login} />;
};

export default Home;
