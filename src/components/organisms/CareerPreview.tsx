import React from "react";
import UserIcon from "../atoms/UserIcon";
import { UserInfoResponse } from "../../../proto/typescript/pb_out/main";

interface Props {
  userInfo: UserInfoResponse | null;
}

const CareerPreview = (props: Props) => {
  const { userInfo } = props;

  return (
    <div className="pt-4 pr-4 pb-4 h-screen">
      <div
        className={`h-full outline rounded flex justify-center items-center ${
          userInfo ? "outline-4 outline-blue-200" : "outline-2 outline-gray-200"
        }`}
      >
        {
          // NOTE: ナジャさんの作成したコンポーネント置く。
          // 仮にHoverしたユーザーの情報を表示させている。
        }
        {userInfo ? (
          <div className="flex-row items-center">
            <UserIcon
              iconImageHash={userInfo.userData?.iconImageHash ?? ""}
              size={128}
            />
            <div className="text-center">
              <span>
                {userInfo.userData?.firstname +
                  " " +
                  userInfo.userData?.lastname}
              </span>
            </div>
          </div>
        ) : (
          <p>Hover some user !!</p>
        )}
      </div>
    </div>
  );
};

export default CareerPreview;
