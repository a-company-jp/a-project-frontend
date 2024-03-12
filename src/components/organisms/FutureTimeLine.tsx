import React from "react";
import TimeLineItem from "../molecules/TimeLineItem";
import Line from "../atoms/Line";

type MileStone = {
  userId: string;
  milestoneId: string;
  title: string;
  content: string;
  imageHash: string;
  beginDate: string;
  finishDate: string;
};

function FutureTimeLine({ milestones }: { milestones: MileStone[] }) {
  if (milestones.length === 0) {
    return <div>まだイベントがありません</div>;
  } else if (milestones.length === 1) {
    return <TimeLineItem key={milestones[0].milestoneId} {...milestones[0]} />;
  }

  const finalMilestone: MileStone = milestones[-1];
  const milestonesWithoutFinal: MileStone[] = milestones.slice(0, -1);

  return (
    <>
      {milestonesWithoutFinal.length > 0 &&
        milestones.map((milestone) => {
          return (
            <>
              <TimeLineItem key={milestone.milestoneId} {...milestone} />
              <Line />
            </>
          );
        })}
      {finalMilestone && (
        <TimeLineItem key={finalMilestone.milestoneId} {...finalMilestone} />
      )}
    </>
  );
}

export default FutureTimeLine;
