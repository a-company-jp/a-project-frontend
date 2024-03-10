"use client";

import React from "react";
import { usePathname } from "next/navigation";

interface Props {
  icon: JSX.Element; // iconのElement
  path: string; // ボタンを押した時に遷移する先のパス
}

const SidebarIcon = (props: Props) => {
  const { icon, path } = props;
  const pathname = usePathname();

  // NOTE: onClickで遷移する関数かく

  return (
    <div
      className={`h-12 w-12 inline-flex items-center justify-center rounded-lg ${
        pathname === path
          ? "text-white bg-blue-600"
          : "text-gray-500 hover:text-blue-600"
      } `}
    >
      {icon}
    </div>
  );
};

export default SidebarIcon;
