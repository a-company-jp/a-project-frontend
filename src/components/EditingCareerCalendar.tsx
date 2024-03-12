"use client";

import { useCallback, useState } from "react";
import EditingCareerEvent from "./EditingCareerEvent";
import milestones from "@/sample-data/milestones.json";
import { Milestone } from "../../proto/typescript/pb_out/main";

// とりあえず100年分のカレンダーを表示
const FULL_YEAR = 100;
const START_YEAR = 2022;

type Props = {
  userId: string;
};

const EditingCareerCalendar = ({ userId }: Props) => {
  const array = new Array(FULL_YEAR).fill(0);
  const [lifeEvents, setLifeEvents] = useState<Milestone[]>(
    milestones.filter((m) => m.userId === userId)
  );

  const updateLifeEvent = useCallback(
    (newLifeEvent: Milestone) => {
      setLifeEvents(
        lifeEvents.map((l) =>
          l.milestoneId === newLifeEvent.milestoneId ? newLifeEvent : l
        )
      );
    },
    [lifeEvents]
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
          className="border-y-[0.5px] col-start-2 col-end-4"
          style={{
            gridRow: `${index * 12 + 1} / span 12`,
          }}
          key={`year-${index}`}
        >
          {" "}
        </div>
      ))}
      {lifeEvents.map((lifeEvent, index) => {
        return (
          <EditingCareerEvent
            lifeEvent={lifeEvent}
            updateLifeEvent={updateLifeEvent}
            key={`lifeEvent-${index}`}
          />
        );
      })}
    </div>
  );
};

export default EditingCareerCalendar;
