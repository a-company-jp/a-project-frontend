import axios from "axios";

const useImageUploader = () => {
  const upload = async (image: File): Promise<string | null> => {
    const token = localStorage.getItem("token");
    return "";
  };

  return { upload };
};

export default useImageUploader;
