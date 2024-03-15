import Image from "next/image";
import React from "react";

interface Props {
  iconUrl: string;
  size: number;
}

/**
 * UserIcon
 * ユーザーのアイコン
 */
const UserIcon = (props: Props) => {
  const { iconUrl, size } = props;

  return (
    <div>
      <Image
        src={iconUrl}
        alt=""
        width={size}
        height={size}
        className="rounded-full object-cover"
      />
    </div>
  );
};

export default UserIcon;
