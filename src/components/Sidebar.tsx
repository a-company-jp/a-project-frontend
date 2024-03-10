import React from "react";
import UserIcon from "./UserIcon";
import SidebarIcon from "./SidebarIcon";

const Sidebar = () => {
  return (
    <div className="w-24 h-screen outline outline-2 items-center flex flex-col justify-between outline-gray-200 ">
      <div className="my-4 flex flex-col gap-y-4">
        <SidebarIcon
          icon={
            <span className="material-symbols-outlined material-icons text-3xl">
              home
            </span>
          }
          path="/main"
        />
        <SidebarIcon
          icon={
            <span className="material-symbols-outlined material-icons text-3xl">
              settings
            </span>
          }
          path="/setting"
        />
      </div>
      <div className="my-4">
        <UserIcon
          iconImageHash="https://storage.googleapis.com/dev-open-hacku-bucket/dev-person-images/person6.jpg"
          size={48}
        />
      </div>
    </div>
  );
};

export default Sidebar;
