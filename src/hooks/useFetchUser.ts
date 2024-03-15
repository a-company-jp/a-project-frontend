"use client";
import axios from "axios";
import {
  UserData,
  UserInfoResponse,
  UserInfosResponse,
} from "../../proto/typescript/pb_out/main";
import useApiPBClient from "@/hooks/useApiPBClient";

const protobuf = require("protobufjs");

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
      return UserInfoResponse.fromBinary(resp.data);
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
      return UserInfoResponse.fromBinary(resp.data);
    });
  };

  const list = async (): Promise<UserInfosResponse> => {
    return await client.get("/api/v1/user/info/").then((resp) => {
      if (resp.unauthorized) {
        throw new Error("unauthorized");
      }
      if (resp.error) {
        throw new Error(resp.error);
      }
      return UserInfosResponse.fromBinary(resp.data);
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

  //   const icon = async (userId: string, file: File) => {
  //     return await client.put(
  //         `/user/${userId}/icon`,
  //         ).then((resp) => {
  //         if (resp.unauthorized) {
  //             throw new Error("unauthorized");
  //           }
  //           if (resp.error) {
  //             throw new Error(resp.error);
  //           }
  //           return UserInfoResponse.fromBinary(resp.data)
  //     })
  //   }

  return { me, get, list, create };
};

export default useFetchUser;
