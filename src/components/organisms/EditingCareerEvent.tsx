"use client";

import useEditingCareerEvent from "@/hooks/useEditingCareerEvent";
import { useMemo } from "react";
import { Milestone } from "../../../proto/typescript/pb_out/main";

type Props = {
  lifeEvent: Milestone;
  openModalMilestoneId: string | null;
  updateLifeEvent: (newLifeEvent: Milestone) => void;
  fetchUpdateMilestone: (milestoneId: string) => void;
  handleEtidModal: {
    open: (milestoneId: string) => void;
    close: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  };
};

const EditingCareerEvent = ({
  lifeEvent,
  openModalMilestoneId,
  updateLifeEvent,
  fetchUpdateMilestone,
  handleEtidModal,
}: Props) => {
  const {
    gridRow,
    term,
    editingState,
    isDragging,
    onClickMilestone,
    handleMouseDownSlide,
    handleMouseDownExpansion,
  } = useEditingCareerEvent({
    lifeEvent,
    updateLifeEvent,
    fetchUpdateMilestone,
  });
  const isModalOpen = useMemo(
    () => openModalMilestoneId === lifeEvent.milestoneId,
    [openModalMilestoneId, lifeEvent]
  );
  const inactiveMilestone = useMemo(
    () => openModalMilestoneId !== null && !isModalOpen,
    [openModalMilestoneId, isModalOpen]
  );

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

  const onMouseDownSlide = useMemo(
    () => (isModalOpen || inactiveMilestone ? undefined : handleMouseDownSlide),
    [isModalOpen, inactiveMilestone, handleMouseDownSlide]
  );

  const onMouseDownExpansion = useMemo(
    () => (isModalOpen ? undefined : handleMouseDownExpansion),
    [isModalOpen, handleMouseDownExpansion]
  );

  return (
    <div
      className={`bg-blue-500 rounded-lg border py-1 px-4 col-start-2 col-end-3 select-none relative text-white ${cursorStyle} ${
        (isDragging || isModalOpen) && style.milestone.hold
      } ${isModalOpen} ${inactiveMilestone && "opacity-50"}`}
      style={{ gridRow: `${gridRow.start}/${gridRow.end}` }}
      onMouseDown={onMouseDownSlide}
      onMouseUp={() => {
        onClickMilestone(() => {
          handleEtidModal.open(lifeEvent.milestoneId);
        });
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter") handleEtidModal.open(lifeEvent.milestoneId);
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
    </div>
  );
};

export default EditingCareerEvent;

const style = {
  milestone: {
    hold: "translate-x-[-1rem] drop-shadow-2xl z-40",
  },
};
