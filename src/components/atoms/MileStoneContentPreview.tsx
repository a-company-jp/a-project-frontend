import React from "react";
import { useState } from "react";
import MileStoneTitle from "./MileStoneTitle";
import MileStoneDescription from "./MileStoneDescription";
import DetailModal from "./DetailModal";
import MileStoneDescriptionPreview from "./MileStoneDescriptionPreview";
import MileStoneTitlePreview from "./MileStoneTitlePreview";

type Props = {
  title: string;
  description: string;
};

const MileStoneContentPreview = ({ title, description }: Props) => {
  // styles (IMO: No strict typing needed.)
  const styles = {
    sizing: "w-11/12 h-full",
    boxing: "ml-5 p-4 break-words",
    text: "whitespace-pre-line",
    color: "bg-gray-300",
    border: "rounded-lg",
  };

  // State
  // TODO: implement custom hook
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const openModal = () => setIsModalOpen(true);

  // UI
  return (
    <div
      className={`${styles.sizing} ${styles.boxing} ${styles.text} ${styles.color} ${styles.border}`}
    >
      <MileStoneTitlePreview title={title} />

      <MileStoneDescriptionPreview
        modal={
          <DetailModal
            setIsModalOpen={setIsModalOpen}
            description={description}
            title={title}
          />
        }
        isModalOpen={isModalOpen}
        openModal={openModal}
        description={description}
      />
    </div>
  );
};

export default MileStoneContentPreview;
