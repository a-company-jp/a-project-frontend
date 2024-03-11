"use client";

import useEditingCareerEvent from "@/hooks/useEditingCareerEvent";
import { useMemo } from "react";
import { Milestone } from "../../proto/typescript/pb_out/main";

type Props = {
  lifeEvent: Milestone;
  updateLifeEvent: (newLifeEvent: Milestone) => void;
};

const EditingCareerEvent = ({ lifeEvent, updateLifeEvent }: Props) => {
  const {
    gridRow,
    term,
    editingState,
    handleMouseDownSlide,
    handleMouseDownExpansion,
  } = useEditingCareerEvent({ lifeEvent, updateLifeEvent });

  const cursorStyle = useMemo(() => {
    switch (editingState) {
      case "grabbing":
        return "cursor-grabbing";
      case "sliding":
        return "cursor-row-resize";
      case "none":
        return "cursor-grab";
      default:
        return "";
    }
  }, [editingState]);

  return (
    <div
      className={`bg-pink-500 col-start-2 col-end-3 select-none relative ${cursorStyle}`}
      style={{ gridRow: `${gridRow.start}/${gridRow.end}` }}
      onMouseDown={handleMouseDownSlide}
    >
      <p>{`${term.start.year}年${term.start.month}月 ~ ${term.end.year}年${term.end.month}月`}</p>
      <div
        className={`w-full h-5 absolute bottom-0 ${
          editingState === "grabbing" ? "cursor-grabbing" : "cursor-row-resize"
        }`}
        onMouseDown={handleMouseDownExpansion}
      >
        {" "}
      </div>
    </div>
  );
};

export default EditingCareerEvent;
