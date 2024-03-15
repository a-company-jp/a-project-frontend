"use client";

import useEditingCareerEvent from "@/hooks/useEditingCareerEvent";
import { useCallback, useMemo, useRef, useState } from "react";
import { Milestone } from "../../../proto/typescript/pb_out/main";
import Modal from "react-modal";
import EditMilestoneForm from "./EditMilestoneForm";
import { disableBodyScroll, clearAllBodyScrollLocks } from "body-scroll-lock";

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

  const modalRef = useRef(null);
  const handleEtidModal = useMemo(() => {
    return {
      open: () => {
        setIsEditModalOpen(true);
        const currentRef = modalRef.current;
        currentRef && disableBodyScroll(currentRef);
      },
      close: (e?: React.MouseEvent<HTMLButtonElement>) => {
        e?.stopPropagation();
        setIsEditModalOpen(false);
        clearAllBodyScrollLocks();
      },
    };
  }, []);

  const onMouseDownSlide = useMemo(
    () => (iEditModalOpen ? undefined : handleMouseDownSlide),
    [iEditModalOpen, handleMouseDownSlide]
  );

  const onMouseDownExpansion = useMemo(
    () => (iEditModalOpen ? undefined : handleMouseDownExpansion),
    [iEditModalOpen, handleMouseDownExpansion]
  );

  return (
    <div
      className={`bg-blue-500 rounded-lg border py-1 px-4 col-start-2 col-end-3 select-none relative text-white ${cursorStyle}`}
      style={{ gridRow: `${gridRow.start}/${gridRow.end}` }}
      onMouseDown={onMouseDownSlide}
      onClick={handleEtidModal.open}
      onKeyDown={(e) => {
        if (e.key === "Enter") handleEtidModal.open();
      }}
      role="button"
      tabIndex={0}
    >
      <div className="flex flex-col gap-1">
        <p className=" text-xs">{`${term.start.year}年${term.start.month}月 ~ ${term.end.year}年${term.end.month}月`}</p>
        <h2 className="text-2xl font-bold">{lifeEvent.title}</h2>
        <p className=" text-sm whitespace-pre-wrap">{lifeEvent.content}</p>
      </div>
      <div
        className={`w-full h-5 absolute bottom-0 ${
          editingState === "grabbing" ? "cursor-grabbing" : "cursor-row-resize"
        }`}
        onMouseDown={onMouseDownExpansion}
      >
        {" "}
      </div>
      <Modal isOpen={iEditModalOpen} ref={modalRef}>
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
