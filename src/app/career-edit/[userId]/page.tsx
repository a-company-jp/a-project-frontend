"use client";

import EditingCareerCalendar from "@/components/organisms/EditingCareerCalendar";
import { useParams } from "next/navigation";
import React from "react";

const CareerEdit = () => {
  const params = useParams();
  const userId = Array.isArray(params.userId) ? null : params.userId;

  return (
    <div className="p-5">
      {userId && <EditingCareerCalendar userId={userId} />}
      {!userId && <p>問題が発生しました。</p>}
    </div>
  );
};

export default CareerEdit;
