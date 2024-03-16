"use client";
import {
  UserData,
  UserInfoResponse,
  UserInfosResponse,
} from "../../proto/typescript/pb_out/main";
import useApiPBClient from "@/hooks/useApiPBClient";

const useFetchUser = () => {
  const client = useApiPBClient();

  const me = async (): Promise<UserInfoResponse> => {
    return await client.get(`/api/v1/user/info/me`).then((resp) => {
      if (resp.unauthorized) {
        throw new Error("unauthorized");
      }
      if (resp.error) {
        throw new Error(resp.error);
      }
      const encoder = new TextEncoder(); // テキストをUTF-8にエンコードするためのエンコーダー
      const uint8Array = encoder.encode(resp.data); // 文字列をUint8Arrayにエンコード
      return UserInfoResponse.fromBinary(uint8Array);
    });
  };

  const get = async (userId: string): Promise<UserInfoResponse> => {
    return await client.get(`/api/v1/user/info/${userId}`).then((resp) => {
      if (resp.unauthorized) {
        throw new Error("unauthorized");
      }
      if (resp.error) {
        throw new Error(resp.error);
      }
      const encoder = new TextEncoder(); // テキストをUTF-8にエンコードするためのエンコーダー
      const uint8Array = encoder.encode(resp.data); // 文字列をUint8Arrayにエンコード
      return UserInfoResponse.fromBinary(uint8Array);
    });
  };

  const list = async (): Promise<UserInfosResponse> => {
    return await client.get("/api/v1/user/infos").then((resp) => {
      if (resp.unauthorized) {
        throw new Error("unauthorized");
      }
      if (resp.error) {
        throw new Error(resp.error);
      }
      const encoder = new TextEncoder(); // テキストをUTF-8にエンコードするためのエンコーダー
      const uint8Array = encoder.encode(resp.data); // 文字列をUint8Arrayにエンコード
      console.log(UserInfosResponse.fromBinary(uint8Array))
      return UserInfosResponse.fromBinary(uint8Array);
    });
  };

  const create = async (newUser: UserData): Promise<UserInfoResponse> => {
    return await client.put(`/user/${newUser.userId}`, newUser).then((resp) => {
      if (resp.unauthorized) {
        throw new Error("unauthorized");
      }
      if (resp.error) {
        throw new Error(resp.error);
      }
      return UserInfoResponse.fromBinary(resp.data);
    });
  };

  const iconUpload = async (userId: string, file: File) => {
    return await client.imageUpload(userId, file);
  };

  return { me, get, list, create };
};

export default useFetchUser;
