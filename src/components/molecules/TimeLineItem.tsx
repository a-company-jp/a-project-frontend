import React from "react";
import MileStoneDate from "../atoms/MileStoneDate";
import MileStoneContent from "../atoms/MileStoneContent";

type Props = {
  title: string;
  content: string;
  beginDate: string;
  finishDate: string;
};

const TimeLineItem = ({ title, content, beginDate, finishDate }: Props) => {
  const styles = {
    sizing: "md:h-52 h-28  md:w-4/5 w-11/12",
    flex: "flex flex-row items-center",
    color: "bg-gray-300",
  };

  return (
    <>
      <section className={`${styles.sizing} ${styles.flex} ${styles.color}`}>
        <MileStoneDate beginDate={beginDate} finishDate={finishDate} />
        <MileStoneContent title={title} description={content} />
      </section>
    </>
  );
};

export default TimeLineItem;
