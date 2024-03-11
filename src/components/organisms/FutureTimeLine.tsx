import React from 'react'
import TimeLineItem from '../molecules/TimeLineItem'
import Line from '../atoms/Line'

type MileStone =  {
  userId: string;
  milestoneId: string;
  title: string;
  content: string;
  imageHash: string;
  beginDate: string;
  finishDate: string;
}

function FutureTimeLine({ milestones }: { milestones: MileStone[] }) {
  if (milestones.length === 0) {
    return <div>まだイベントがありません</div>
  }

  const finalMilestone: MileStone | undefined = milestones && milestones.length > 0 ? milestones.pop() : undefined;


  return (
    <>
        {milestones.length > 0 && milestones.map((milestone) => {
          return (
            <>
              <TimeLineItem key={milestone.milestoneId} {...milestone} />
              <Line />
            </>

          )
        })}
        {finalMilestone && <TimeLineItem key={finalMilestone.milestoneId} {...finalMilestone} />}
    </>
  )
}

export default FutureTimeLine
