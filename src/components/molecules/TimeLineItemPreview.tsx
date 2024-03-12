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
  imageUrl: string | null;
};

const TimeLineItemPreview = ({
  title,
  content,
  beginDate,
  finishDate,
  imageUrl,
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
        <MileStoneImagePreview imageUrl={imageUrl} />
      </section>
    </>
  );
};

export default TimeLineItemPreview;
