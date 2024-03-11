import { useEffect, useMemo, useState } from "react";

const START_YEAR = 2025;

type Props = {
  lifeEvent: mockEvent,
  updateLifeEvent: (newLifeEvent: mockEvent) => void,
}

const useEditingCareerEvent = ({ lifeEvent, updateLifeEvent }: Props) => {
  const [gridRow, setGridRow] = useState<{ start: number; end: number }>({
    start: 0,
    end: 0,
  });
  const [editingState, setEditingState] = useState<"grabbing" | "sliding" | "none">("none");

  useEffect(() => {
    const newGridRowStart = lifeEvent.term.start.month + (lifeEvent.term.start.year - START_YEAR) * 12;
    const newGridRowEnd = lifeEvent.term.end.month + (lifeEvent.term.end.year - START_YEAR) * 12 + 1;
    setGridRow({ start: newGridRowStart, end: newGridRowEnd });
  }, [lifeEvent]);

  const term = useMemo(() => lifeEvent.term, [lifeEvent]);

  const gridRowToTerm = (inputGridRow: { start: number; end: number }) => {
    const startMonth = inputGridRow.start % 12;
    const startYear = Math.floor(inputGridRow.start / 12 + START_YEAR);
    const endMonth = (inputGridRow.end - 1) % 12;
    const endYear = Math.floor((inputGridRow.end - 1) / 12 + START_YEAR);
    const newTerm = {
      start: {
        year: startMonth === 0 ? startYear - 1 : startYear,
        month: startMonth === 0 ? 12 : startMonth,
      },
      end: {
        year: endMonth === 0 ? endYear - 1 : endYear,
        month: endMonth === 0 ? 12 : endMonth,
      },
    } as mockTerm;
    return newTerm;
  }

  const handleMouseDownSlide = (
    downEvent: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    setEditingState("grabbing");
    const draggingFrom = downEvent.clientY;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const differenceClientY = moveEvent.clientY - draggingFrom;
      const differenceGridRow = Math.floor(differenceClientY / 10);
      const newGridStart = gridRow.start + differenceGridRow;
      const newGridEnd = gridRow.end + differenceGridRow;
      const gridHeight = gridRow.end - gridRow.start + 1;
      const newGridRow = {
        start: newGridStart > 0 ? newGridStart : 1,
        end: newGridStart > 0 ? newGridEnd : gridHeight,
      };
      updateLifeEvent({
        id: lifeEvent.id,
        term: gridRowToTerm(newGridRow),
      });
    };

    const handleMouseUp = () => {
      setEditingState("none");
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseDownExpansion = (downEvent: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    downEvent.stopPropagation();
    setEditingState("sliding");
    const draggingFrom = downEvent.clientY;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const differenceClientY = moveEvent.clientY - draggingFrom;
      const differenceGridRow = Math.floor(differenceClientY / 10) + 1;
      const currentGridStart = gridRow.start;
      const newGridEnd = gridRow.end + differenceGridRow;
      const newGridRow = {
        start: currentGridStart,
        end: newGridEnd,
      };
      updateLifeEvent({
        id: lifeEvent.id,
        term: gridRowToTerm(newGridRow),
      })
    };

    const handleMouseUp = () => {
      setEditingState("none");
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return { gridRow, term, editingState, handleMouseDownSlide, handleMouseDownExpansion };
};

export default useEditingCareerEvent;
