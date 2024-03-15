"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import Tooltip from "../atoms/Tooltip";

interface Props {
  icon: JSX.Element;
  path?: string;
  onClick?: () => void;
  tooltipText: string;
}

const SidebarIcon = (props: Props) => {
  const { icon, path, onClick, tooltipText } = props;
  const pathname = usePathname();
  const router = useRouter();

  const handleClick = () => {
    if (path) {
      router.push(path);
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <Tooltip tooltipText={tooltipText}>
      <div
        className={`h-12 w-12 inline-flex items-center justify-center rounded-lg ${
          path && pathname === path
            ? "text-white bg-blue-600"
            : "text-gray-500 hover:text-blue-600"
        } `}
        onClick={handleClick}
      >
        {icon}
      </div>
    </Tooltip>
  );
};

export default SidebarIcon;
