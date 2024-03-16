"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import EditingCareerEvent from "./EditingCareerEvent";
import { Milestone } from "../../../proto/typescript/pb_out/main";
import EditMilestoneForm from "./EditMilestoneForm";
import useFetchUser from "@/hooks/useFetchUser";
import useFetchMilestone from "@/hooks/useFetchMilestone";

// とりあえず100年分のカレンダーを表示
const FULL_YEAR = 100;
const START_YEAR = 2022;

type Props = {
  userId: string;
};

const EditingCareerCalendar = ({ userId }: Props) => {
  const { me } = useFetchUser();
  const { create, update, del } = useFetchMilestone();
  const [lifeEvents, setLifeEvents] = useState<Milestone[]>([]);

  useEffect(() => {
    async () => {
      const { milestones } = await me();
      setLifeEvents(milestones);
    };
  }, [me]);

  const array = new Array(FULL_YEAR).fill(0);
  const [openModalMilestoneId, setOpenModalMilestoneId] = useState<
    string | null
  >(null);
  const openingModalMilestone = useMemo(
    () => lifeEvents.find((l) => l.milestoneId === openModalMilestoneId),
    [openModalMilestoneId, lifeEvents],
  );
  const handleEtidModal = useMemo(() => {
    return {
      open: (milestoneId: string) => {
        setOpenModalMilestoneId(milestoneId);
      },
      close: (e?: React.MouseEvent<HTMLButtonElement>) => {
        e?.stopPropagation();
        setOpenModalMilestoneId(null);
      },
    };
  }, []);

  const updateLifeEventWithSlider = useCallback(
    async (newLifeEvent: Milestone) => {
      setLifeEvents(
        lifeEvents.map((l) =>
          l.milestoneId === newLifeEvent.milestoneId ? newLifeEvent : l,
        ),
      );
    },
    [lifeEvents],
  );

  const fetchUpdateMilestone = useCallback(
    (milestoneId: string) => {
      update({
        milestone: lifeEvents.find((l) => l.milestoneId === milestoneId),
      });
    },
    [lifeEvents, update],
  );

  const updateLifeEvent = useCallback(
    async (newLifeEvent: Milestone) => {
      if (newLifeEvent.milestoneId === "") {
        const createdMilestone = await create({ milestone: newLifeEvent });
        const validated = createdMilestone.milestone;
        const removedNoIdMilestone = lifeEvents.filter(
          (l) => l.milestoneId !== "",
        );
        setLifeEvents(
          validated
            ? [...removedNoIdMilestone, validated]
            : removedNoIdMilestone,
        );
        return;
      }
      setLifeEvents(
        lifeEvents.map((l) =>
          l.milestoneId === newLifeEvent.milestoneId ? newLifeEvent : l,
        ),
      );
      update({ milestone: newLifeEvent });
    },
    [lifeEvents, create, update],
  );

  const deleteLifeEvent = useCallback(
    (lifeEventId: string) => {
      setLifeEvents(lifeEvents.filter((l) => l.milestoneId !== lifeEventId));
    },
    [lifeEvents],
  );

  const addNewLifeEvent = useCallback(
    (newLifeEvent: Milestone) => {
      setLifeEvents([...lifeEvents, newLifeEvent]);
    },
    [lifeEvents],
  );

  const handleClickCalender = useCallback(
    (calendarIndex: number) => {
      if (openModalMilestoneId !== null) {
        return;
      }
      const newLifeEventBeginYear = calendarIndex + START_YEAR;
      const newMilestoneId = ""; //仮置き
      setOpenModalMilestoneId(newMilestoneId);
      addNewLifeEvent({
        userId: userId,
        milestoneId: newMilestoneId,
        title: "",
        content: "",
        imageUrl: "",
        beginDate: `${newLifeEventBeginYear}-01-01`,
        finishDate: `${newLifeEventBeginYear}-12-01`,
      });
    },
    [userId, openModalMilestoneId, addNewLifeEvent],
  );

  return (
    <div
      className="grid"
      style={{ gridAutoRows: "10px", gridAutoColumns: "100px auto 20px" }}
    >
      {array.map((_, index) => (
        <div
          className="border-r-2 col-start-1 col-end-2"
          style={{
            gridRow: `${index * 12 + 1} / span 12`,
          }}
          key={`year-${index}`}
        >
          <p className="text-right mr-5">{START_YEAR + index}</p>
        </div>
      ))}
      {array.map((_, index) => (
        <div
          className="border-y-[0.5px] col-start-2 col-end-4 cursor-default"
          style={{
            gridRow: `${index * 12 + 1} / span 12`,
          }}
          key={`year-${index}`}
          onClick={() => {
            handleClickCalender(index);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleClickCalender(index);
          }}
          role="button"
          tabIndex={0}
        >
          {" "}
        </div>
      ))}
      {lifeEvents.map((lifeEvent, index) => {
        return (
          <EditingCareerEvent
            lifeEvent={lifeEvent}
            openModalMilestoneId={openModalMilestoneId}
            updateLifeEvent={updateLifeEventWithSlider}
            fetchUpdateMilestone={fetchUpdateMilestone}
            handleEtidModal={handleEtidModal}
            key={`lifeEvent-${index}`}
          />
        );
      })}
      {openingModalMilestone && (
        <div className="fixed top-8 right-8 w-1/2 bg-white text-black p-5 shadow-2xl rounded-lg border z-50">
          <div className="relative">
            <div className="flex absolute right-0 gap-4">
              {openModalMilestoneId && (
                <button
                  type="button"
                  onClick={() => {
                    handleEtidModal.close();
                    del(openModalMilestoneId);
                  }}
                  className="border-[1.5px] p-3 rounded-full h-14 w-14 flex justify-center items-center hover:opacity-50"
                  title="マイルストーンを削除する"
                  aria-label="マイルストーンを削除する"
                >
                  <span className="material-symbols-outlined text-red-500">
                    delete
                  </span>
                </button>
              )}
              <button
                type="button"
                onClick={() => {
                  handleEtidModal.close();
                  deleteLifeEvent("");
                }}
                className="border-[1.5px] p-3 rounded-full h-14 w-14 flex justify-center items-center hover:opacity-50"
                title="変更を破棄してモーダルを閉じる"
                aria-label="変更を破棄してモーダルを閉じる"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <EditMilestoneForm
              lifeEvent={openingModalMilestone}
              handleSaveChange={updateLifeEvent}
              deleteLifeEvent={deleteLifeEvent}
              closeModal={handleEtidModal.close}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default EditingCareerCalendar;
