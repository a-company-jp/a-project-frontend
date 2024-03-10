"use client";

import CareerPreview from "@/components/CareerPreview";
import Sidebar from "@/components/Sidebar";
import UserList from "@/components/UserList";
import UserSearchForm from "@/components/UserSearchForm";
import { useState } from "react";
import { UserData } from "../../../proto/typescript/pb_out/main";

const Main = () => {
  const [hoveredUser, setHoveredUser] = useState<UserData | null>(null);

  return (
    <div className="h-screen w-screen">
      <div className="grid grid-cols-10">
        <div className="col-span-1">
          <Sidebar />
        </div>
        <div className="col-span-9">
          <div className="grid grid-cols-5">
            <div className="col-span-3">
              <div className="p-4 h-screen overflow-scroll hidden-scrollbar">
                <div className="h-max">
                  <UserSearchForm />
                </div>
                <div className="py-4 items-center">
                  <UserList setHoveredUser={setHoveredUser} />
                </div>
              </div>
            </div>
            <div className="col-span-2">
              <div className="pt-4 h-screen">
                <CareerPreview user={hoveredUser} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
