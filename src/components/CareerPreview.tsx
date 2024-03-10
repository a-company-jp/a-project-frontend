import React from "react";
import { UserData } from "../../proto/typescript/pb_out/main";
import UserIcon from "./UserIcon";

interface Props {
  user: UserData | null;
}

const CareerPreview = (props: Props) => {
  const { user } = props;

  return (
    <div className="pt-4 pr-4 pb-4 h-screen">
      <div
        className={`h-full outline rounded flex justify-center items-center ${
          user ? "outline-4 outline-blue-200" : "outline-2 outline-gray-200"
        }`}
      >
        {
          // NOTE: ナジャさんの作成したコンポーネント置く。
          // 仮にHoverしたユーザーの情報を表示させている。
        }
        {user ? (
          <div className="flex-row items-center">
            <UserIcon iconImageHash={user.iconImageHash} size={128} />
            <div className="text-center">
              <span>{user.firstname + " " + user.lastname}</span>
            </div>
          </div>
        ) : (
          <p>any user not hovered</p>
        )}
      </div>
    </div>
  );
};

export default CareerPreview;
