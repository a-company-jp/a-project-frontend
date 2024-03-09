import React from "react";
import { userData } from "../../proto/typescript/pb_out/main";
import UserIcon from "./UserIcon";
import Tag from "./Tag";

interface Props {
  user: userData;
}

/**
 * User Component
 * 一覧に表示するユーザー
 */
const User = (props: Props) => {
  const { user } = props;
  return (
    <div className="py-6">
      <div className="flex flex-row items-center">
        <div className="mr-2">
          <UserIcon iconImageHash={user.iconImageHash} size={54} />
        </div>
        <div className="mr-4">{user.username}</div>
      </div>
      <div className="my-4 flex flex-row items-center">
        {user.tag.map((tag) => {
          return <Tag name={tag.tagName} key={tag.tagId} />;
        })}
      </div>
      <div>{user.statusMessage}</div>
    </div>
  );
};

export default User;
