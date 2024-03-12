import React from "react";
import { UserInfoResponse } from "../../../proto/typescript/pb_out/main";
import FutureTimeLinePreview from "./FutureTimeLinePreview";

interface Props {
  userInfo: UserInfoResponse | null;
}

const CareerPreview = (props: Props) => {
  const { userInfo } = props;

  return (
    <div className="pt-4 pr-4 pb-4 h-screen">
      <div
        className={`h-full outline rounded flex flex-col justify-center items-center ${
          userInfo ? "outline-4 outline-blue-200" : "outline-2 outline-gray-200"
        }`}
      >
        {userInfo ? (
          <div className="py-10 px-2 h-full overflow-scroll">
            <FutureTimeLinePreview milestones={userInfo.milestones} />
          </div>
        ) : (
          <p>Hover some user !!</p>
        )}
      </div>
    </div>
  );
};

export default CareerPreview;
