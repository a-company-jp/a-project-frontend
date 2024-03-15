"use client";

import EditingCareerCalendar from "@/components/organisms/EditingCareerCalendar";
import Sidebar from "@/components/organisms/Sidebar";
import { useParams } from "next/navigation";
import React from "react";

const CareerEdit = () => {
  const params = useParams();
  const userId = Array.isArray(params.userId) ? null : params.userId;

  return (
    <div className="h-screen w-screen flex">
      <Sidebar />
        <div className="w-full p-4 overflow-scroll">
          {userId && <EditingCareerCalendar userId={userId} />}
          {!userId && <p>問題が発生しました。</p>}
        </div>
    </div>
  );
};

export default CareerEdit;
