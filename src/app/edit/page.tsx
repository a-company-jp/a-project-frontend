'use client'

import Sidebar from "@/components/organisms/Sidebar"; 

const Edit = () => {
  return (
    <div className="h-screen w-screen flex">
      <Sidebar />
      <div className="w-full grid grid-cols-5">キャリア編集</div>
    </div>
  );
};

export default Edit;
