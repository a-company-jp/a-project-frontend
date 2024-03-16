import { useCallback, useEffect, useMemo, useState } from "react";
import { Milestone } from "../../proto/typescript/pb_out/main";

const START_YEAR = 2022;

type Props = {
  lifeEvent: Milestone;
  updateLifeEvent: (newLifeEvent: Milestone) => void;
  fetchUpdateMilestone: (milestoneId: string) => void;
};

const useEditingCareerEvent = ({ lifeEvent, updateLifeEvent, fetchUpdateMilestone }: Props) => {
  const [gridRow, setGridRow] = useState<{ start: number; end: number }>({
    start: 0,
    end: 0,
  });
  const [editingState, setEditingState] = useState<
    "grabbing" | "sliding" | "none"
  >("none");
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const term = useMemo(
    () => ({
      start: {
        year: parseInt(lifeEvent.beginDate.split("-")[0]),
        month: parseInt(lifeEvent.beginDate.split("-")[1]),
      },
      end: {
        year: parseInt(lifeEvent.finishDate.split("-")[0]),
        month: parseInt(lifeEvent.finishDate.split("-")[1]),
      },
    }),
    [lifeEvent],
  );

  useEffect(() => {
    const newGridRowStart =
      term.start.month + (term.start.year - START_YEAR) * 12;
    const newGridRowEnd =
      term.end.month + (term.end.year - START_YEAR) * 12 + 1;
    setGridRow({ start: newGridRowStart, end: newGridRowEnd });
  }, [term]);

  const gridRowToDateString = (inputGridRow: {
    start: number;
    end: number;
  }) => {
    const startMonth = inputGridRow.start % 12;
    const startYear = Math.floor(inputGridRow.start / 12 + START_YEAR);
    const endMonth = (inputGridRow.end - 1) % 12;
    const endYear = Math.floor((inputGridRow.end - 1) / 12 + START_YEAR);
    const newTerm = {
      begin: {
        year: startMonth === 0 ? startYear - 1 : startYear,
        month: startMonth === 0 ? 12 : startMonth,
      },
      end: {
        year: endMonth === 0 ? endYear - 1 : endYear,
        month: endMonth === 0 ? 12 : endMonth,
      },
    };
    return {
      begin: `${newTerm.begin.year}-${newTerm.begin.month}-01`,
      end: `${newTerm.end.year}-${newTerm.end.month}-01`,
    };
  };

  const onClickMilestone = useCallback(
    (callback: () => void) => {
      editingState !== "none" && !isDragging && callback();
    },
    [editingState, isDragging],
  );

  const handleMouseDownSlide = (
    downEvent: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    setEditingState("grabbing");
    const draggingFrom = downEvent.clientY;
    const intervalId = setInterval(() => {
      setIsDragging(true);
    }, 500);

    const handleMouseMove = (moveEvent: MouseEvent) => {
      setIsDragging(true);
      const differenceClientY = moveEvent.clientY - draggingFrom;
      const differenceGridRow = Math.floor(differenceClientY / 10);
      const newGridStart = gridRow.start + differenceGridRow;
      const newGridEnd = gridRow.end + differenceGridRow;
      const gridHeight = gridRow.end - gridRow.start + 1;
      const newGridRow = {
        start: newGridStart > 0 ? newGridStart : 1,
        end: newGridStart > 0 ? newGridEnd : gridHeight,
      };
      const dnewDateString = gridRowToDateString(newGridRow);
      updateLifeEvent({
        ...lifeEvent,
        beginDate: dnewDateString.begin,
        finishDate: dnewDateString.end,
      });
    };

    const handleMouseUp = () => {
      setEditingState("none");
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      clearInterval(intervalId);
      setIsDragging(false);
      fetchUpdateMilestone(lifeEvent.milestoneId);
    };
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseDownExpansion = (
    downEvent: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    downEvent.stopPropagation();
    setEditingState("sliding");
    const draggingFrom = downEvent.clientY;
    const intervalId = setInterval(() => {
      setIsDragging(true);
    }, 500);

    const handleMouseMove = (moveEvent: MouseEvent) => {
      setIsDragging(true);
      const differenceClientY = moveEvent.clientY - draggingFrom;
      const differenceGridRow = Math.floor(differenceClientY / 10) + 1;
      const currentGridStart = gridRow.start;
      const newGridEnd = gridRow.end + differenceGridRow;
      const newGridRow = {
        start: currentGridStart,
        end: newGridEnd,
      };
      const dnewDateString = gridRowToDateString(newGridRow);
      updateLifeEvent({
        ...lifeEvent,
        beginDate: dnewDateString.begin,
        finishDate: dnewDateString.end,
      });
    };

    const handleMouseUp = () => {
      setEditingState("none");
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      clearInterval(intervalId);
      setIsDragging(false);
      fetchUpdateMilestone(lifeEvent.milestoneId);
    };
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return {
    gridRow,
    term,
    editingState,
    isDragging,
    handleMouseDownSlide,
    handleMouseDownExpansion,
    onClickMilestone,
  };
};

export default useEditingCareerEvent;
