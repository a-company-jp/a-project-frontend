"use client";

import useEditingCareerEvent from "@/hooks/useEditingCareerEvent";
import { useMemo, useState } from "react";
import { Milestone } from "../../../proto/typescript/pb_out/main";
import Modal from "react-modal";
import EditMilestoneForm from "./EditMilestoneForm";

type Props = {
  lifeEvent: Milestone;
  updateLifeEvent: (newLifeEvent: Milestone) => void;
};

const EditingCareerEvent = ({ lifeEvent, updateLifeEvent }: Props) => {
  const [iEditModalOpen, setIsEditModalOpen] = useState(false);
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

  const handleEtidModal = useMemo(
    () => ({
      open: () => {
        setIsEditModalOpen(true);
      },
      close: (e?: React.MouseEvent<HTMLButtonElement>) => {
        e?.stopPropagation();
        setIsEditModalOpen(false);
      },
    }),
    []
  );

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
      <Modal isOpen={iEditModalOpen}>
        <div className="relative">
          <button
            type="button"
            onClick={handleEtidModal.close}
            className="border-[1.5px] p-3 rounded-full h-14 w-14 flex justify-center items-center absolute right-0 hover:opacity-50"
            title="変更を破棄してモーダルを閉じる"
            aria-label="変更を破棄してモーダルを閉じる"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
          <EditMilestoneForm
            lifeEvent={lifeEvent}
            handleSaveChange={updateLifeEvent}
            closeModal={handleEtidModal.close}
          />
        </div>
      </Modal>
    </div>
  );
};

export default EditingCareerEvent;
