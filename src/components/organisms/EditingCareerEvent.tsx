"use client";

import useEditingCareerEvent from "@/hooks/useEditingCareerEvent";
import { useMemo, useState } from "react";
import { Milestone } from "../../../proto/typescript/pb_out/main";
import Modal from "react-modal";

type Props = {
  lifeEvent: Milestone;
  updateLifeEvent: (newLifeEvent: Milestone) => void;
};

const EditingCareerEvent = ({ lifeEvent, updateLifeEvent }: Props) => {
  const {
    gridRow,
    term,
    editingState,
    isEditModalOpen,
    handleMouseDownSlide,
    handleMouseDownExpansion,
    handleEtidModal,
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
      onClick={handleEtidModal.open}
      onKeyDown={(e) => {
        if (e.key === "Enter") handleEtidModal.open();
      }}
      role="button"
      tabIndex={0}
    >
      <p>{`${term.start.year}年${term.start.month}月 ~ ${term.end.year}年${term.end.month}月`}</p>
      <p>{lifeEvent.title}</p>
      <p>{lifeEvent.content}</p>
      <div
        className={`w-full h-5 absolute bottom-0 ${
          editingState === "grabbing" ? "cursor-grabbing" : "cursor-row-resize"
        }`}
        onMouseDown={handleMouseDownExpansion}
      >
        {" "}
      </div>
      <Modal isOpen={isEditModalOpen}>
        <button type="button" onClick={handleEtidModal.close}>
          とじる
        </button>
        <p>{`${term.start.year}年${term.start.month}月 ~ ${term.end.year}年${term.end.month}月`}</p>
        <p>{lifeEvent.title}</p>
        <p>{lifeEvent.content}</p>
      </Modal>
    </div>
  );
};

export default EditingCareerEvent;
