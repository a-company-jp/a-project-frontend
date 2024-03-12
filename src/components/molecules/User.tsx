import React from "react";
import { UserData } from "../../../proto/typescript/pb_out/main"; 
import UserIcon from "../atoms/UserIcon"; 
import Tag from "../atoms/Tag"; 

interface Props {
  user: UserData;
  hovered: boolean;
}

/**
 * User Component
 * 一覧に表示するユーザー
 */
const User = (props: Props) => {
  const { user, hovered } = props;
  const iconSize = 96;

  return (
    <div
      className={`p-4 my-4 outline outline-2  rounded ${
        hovered ? "outline-4 outline-blue-200" : "outline-gray-200"
      }`}
    >
      <div className="flex flex-row items-center">
        <div className="mb-2 mr-4">
          <UserIcon iconImageHash={user.iconImageHash} size={iconSize} />
        </div>
        <div>
          <div className="text-2xl font-semibold">{user.username}</div>
          <div className="flex flex-row items-center">
            {user.tag.map((tag) => {
              return <Tag name={tag.tagName} key={tag.tagId} />;
            })}
          </div>
        </div>
      </div>
      <div className="mt-2 relative px-4 py-4 flex items-center rounded bg-gray-100 before:content-[''] before:absolute before:top-[-40%] before:left-10 before:border-[12px] before:border-transparent before:border-b-gray-100">
        <div className="mr-2 material-symbols-outlined">chat</div>
        <div>{user.statusMessage}</div>
      </div>
    </div>
  );
};

export default User;
