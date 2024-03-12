"use client";
import React from "react";
import Image from "next/image";

// TODO: implement this in utils
const generateImageUri = (imageUrl: string) => {
  return imageUrl;
  throw new Error("Not implemented");
};

type Props = {
  imageUrl?: string | undefined | null;
};

const MileStoneImagePreview = ({ imageUrl }: Props): JSX.Element => {
  // props handling
  // TODO: modify alternative image
  const imgUrl = imageUrl
    ? generateImageUri(imageUrl)
    : "/milestone-sample.png";

  // states
  // TODO: implement custom hook
  const [windowWidth, setWindowWidth] = React.useState<number>(0);
  React.useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // UI
  return (
    <>
      <Image
        src={imgUrl}
        className="relative md:right-3 left-3"
        alt="Milestone Image"
        width={164}
        height={164}
      />
    </>
  );
};

export default MileStoneImagePreview;
