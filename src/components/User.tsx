import React from "react";
import { UserData } from "../../proto/typescript/pb_out/main";
import UserIcon from "./UserIcon";
import Tag from "./Tag";

interface Props {
  user: UserData;
}

/**
 * User Component
 * 一覧に表示するユーザー
 */
const User = (props: Props) => {
  const { user } = props;
  return (
    <div className="p-4 my-4">
      <div className="flex flex-row items-center">
        <div className="mb-2 mr-4">
          <UserIcon iconImageHash={user.iconImageHash} size={96} />
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
      <div className="mt-2 relative">
        <div className="px-4 py-4 flex items-center rounded bg-gray-100 before:content-[''] before:absolute before:top-[-40%] before:left-10 before:border-[12px] before:border-transparent before:border-b-gray-100">
          <div className="mr-2 material-symbols-outlined">chat</div>
          <div>{user.statusMessage}</div>
        </div>
      </div>
    </div>
  );
};

export default User;
