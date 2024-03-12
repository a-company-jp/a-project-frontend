import React from "react";

type Props = {
  title: string;
};

const styles = {
  text: "md:text-3xl text-lg",
};

const MileStoneTitle = ({ title }: Props) => (
  <h3 className={styles.text}>{title}</h3>
);

export default MileStoneTitle;
