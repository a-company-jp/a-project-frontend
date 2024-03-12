import React from "react";
import MileStoneDate from "../atoms/MileStoneDate";
import MileStoneImage from "../atoms/MileStoneImage";
import MileStoneContent from "../atoms/MileStoneContent";
import MileStoneContentPreview from "../atoms/MileStoneContentPreview";
import MileStoneImagePreview from "../atoms/MileStoneImagePreview";
import MileStoneDatePreview from "../atoms/MileStoneDatePreview";

type Props = {
  title: string;
  content: string;
  beginDate: string;
  finishDate: string;
  imageHash: string;
};

const TimeLineItemPreview = ({
  title,
  content,
  beginDate,
  finishDate,
  imageHash,
}: Props) => {
  const styles = {
    sizing: "h-36 w-11/12",
    flex: "flex flex-row items-center",
    color: "bg-gray-300",
  };

  return (
    <>
      <section className={`${styles.sizing} ${styles.flex} ${styles.color}`}>
        <MileStoneDatePreview beginDate={beginDate} finishDate={finishDate} />
        <MileStoneContentPreview title={title} description={content} />
        <MileStoneImagePreview imageHash={imageHash} />
      </section>
    </>
  );
};

export default TimeLineItemPreview;
