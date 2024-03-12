import React from "react";
import { login } from "@/lib/firebase/auth";
import LoginButton from "@/components/atoms/LoginButton";

const Login = () => {
  return (
    <div className="flex items-center justify-center h-screen flex-col">
      <h1 className="font-bold sm:text-6xl font-serif mb-5 text-4xl">Career Canvas</h1>
      <p className="font-bold sm:text-2xl font-sans mb-7 text-lg">
        キャリアプランを設計するためのサービス
      </p>
      <LoginButton onClick={login} />
    </div>
  );
};

export default Login;
