import Image from "next/image";
import React from "react";

interface Props {
  iconImageHash: string;
  size: number;
}

const UserIcon = (props: Props) => {
  const { iconImageHash, size } = props;

  return (
    <div>
      <Image
        src={iconImageHash}
        alt=""
        width={size}
        height={size}
        className="rounded-full object-cover"
      />
    </div>
  );
};

export default UserIcon;
