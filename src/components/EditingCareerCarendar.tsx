"use client"

import { useCallback, useState } from "react";
import EditingCareerEvent from "./EditingCareerEvent";

const mockData: mockEvent = {
  id: "76310870",
  term: {
    start: {
      year: 2025,
      month: 4,
    },
    end: {
      year: 2026,
      month: 3,
    },
  },
};

// とりあえず100年分のカレンダーを表示
const FULL_YEAR = 100;
const START_YEAR = 2022;

const EditingCareerCalendar = () => {
  const array = new Array(FULL_YEAR).fill(0);
  const [lifeEvents, setLifeEvents] = useState<mockEvent[]>([mockData]);

  const updateLifeEvent = useCallback(
    (newLifeEvent: mockEvent) => {
      setLifeEvents(
        lifeEvents.map((l) => (l.id === newLifeEvent.id ? newLifeEvent : l))
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
