import React from "react";

interface Props {
  name: string;
}

const Tag = (props: Props) => {
  const { name } = props;
  return (
    <div className="mr-2">
      <span className="text-sm bg-orange-400 py-1 px-3 text-white rounded-2xl">
        {name}
      </span>
    </div>
  );
};

export default Tag;
