import axios from "axios";
const protobuf = require("protobufjs");

const useImageUploder = () => {
  const upload = async (image: File): Promise<string | void> => {
    const token = localStorage.getItem("token");

    const ImageUploadRequest = protobuf.roots.default.lookupType(
      "main.ImageUploadRequest",
    );
    const payload = { image: image };
    const errMsg = ImageUploadRequest.verify(payload);
    if (errMsg) throw Error(`ImageUploadRequest: ${errMsg}`);

    const imageUpload = ImageUploadRequest.create(payload);
    const buffer = ImageUploadRequest.encode(imageUpload).finish();
    await axios
      .post(`${process.env.BACKEND_DOMAIN}/api/v1/image/upload`, buffer, {
        headers: {
          Authorization: `token ${token}`,
        },
      })
      .then((response) => {
        const ImageUploadResponse = protobuf.roots.default.lookupType(
          "main.ImageUploadResponse",
        );
        const res = ImageUploadResponse.decode(new Uint8Array(response.data));
        return res;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return { upload };
};

export default useImageUploder;
