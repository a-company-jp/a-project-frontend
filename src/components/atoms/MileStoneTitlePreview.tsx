import React from "react";

type Props = {
  title: string;
};

const styles = {
  text: "lg:text-lg font-semibold",
};

const MileStoneTitlePreview = ({ title }: Props) => (
  <h3 className={styles.text}>{title}</h3>
);

export default MileStoneTitlePreview;
