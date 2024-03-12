import React from "react";
import Line from "../atoms/Line";
import TimeLineItemPreview from "../molecules/TimeLineItemPreview";

type MileStone = {
  userId: string;
  milestoneId: string;
  title: string;
  content: string;
  imageUrl?: string | undefined;
  beginDate: string;
  finishDate: string;
};

function FutureTimeLinePreview({ milestones }: { milestones: MileStone[] }) {
  if (milestones.length === 0) {
    return <div>まだイベントがありません</div>;
  } else if (milestones.length === 1) {
    return (
      <TimeLineItemPreview key={milestones[0].milestoneId} {...milestones[0]} />
    );
  }

  const finalMilestone: MileStone = milestones[-1];
  const milestonesWithoutFinal: MileStone[] = milestones.slice(0, -1);

  return (
    <>
      {milestonesWithoutFinal.length > 0 &&
        milestones.map((milestone) => {
          return (
            <div
              className="flex flex-col items-center"
              key={milestone.milestoneId}
            >
              <TimeLineItemPreview {...milestone} />
              <Line />
            </div>
          );
        })}
      {finalMilestone && (
        <TimeLineItemPreview
          key={finalMilestone.milestoneId}
          {...finalMilestone}
        />
      )}
    </>
  );
}

export default FutureTimeLinePreview;
