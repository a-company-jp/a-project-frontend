"use client";

import React, { Dispatch, SetStateAction } from "react";
import User from "./User";
import { UserData } from "../../proto/typescript/pb_out/main";
import users from "@/constants/json/user-data.json"; // テストデータ読み込み

interface Props {
  setHoveredUser: Dispatch<SetStateAction<null | UserData>>;
  hoveredUser: null | UserData;
}

/**
 * UserList Component
 * ユーザー一覧
 */
const UserList = (props: Props) => {
  const { setHoveredUser, hoveredUser } = props;

  return (
    <div className="w-full py-4 items-center">
      {users.map((user) => {
        return (
          <div key={user.userId} className="flex flex-row items-center">
            <div className="w-11/12" onMouseEnter={() => setHoveredUser(user)}>
              <User
                user={user}
                hovered={
                  hoveredUser ? hoveredUser.userId === user.userId : false
                }
              />
            </div>
            {hoveredUser && hoveredUser.userId === user.userId ? (
              <div className="w-1/12">
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: "96px", color: "#bfdbfe" }}
                >
                  arrow_right
                </span>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default UserList;
