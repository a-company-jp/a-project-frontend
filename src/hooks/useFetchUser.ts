"use client";
import axios from "axios";
import { UserData, UserInfoResponse } from "../../proto/typescript/pb_out/main";
import useApiPBClient from "@/hooks/useApiPBClient";

const protobuf = require("protobufjs");

const useFetchUser = () => {
  const client = useApiPBClient();
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

  const list = async (): Promise<UserData[] | void> => {
    const token = localStorage.getItem("token");

    await axios
      .get(
        `${process.env.BACKEND_DOMAIN}/api/v1/user/info`, // TODO: rename to /users
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((response) => {
        const UsersResponse =
          protobuf.roots.default.lookupType("main.UsersResponse");
        const res = UsersResponse.decode(new Uint8Array(response.data));
        return UsersResponse.toObject(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const create = async (newUser: UserData): Promise<UserData | void> => {
    const token = localStorage.getItem("token");

    const UserCreateRequest = protobuf.roots.default.lookupType(
      "main.UserCreateRequest",
    );
    const payload = { user: newUser };
    const errMsg = UserCreateRequest.verify(payload);
    if (errMsg) throw Error(`UserCreateRequest: ${errMsg}`);

    const user = UserCreateRequest.create(payload);
    const buffer = UserCreateRequest.encode(user).finish();

    await axios
      .post(`${process.env.BACKEND_DOMAIN}/api/v1/user/create`, buffer, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const UserCreateResponse = protobuf.roots.default.lookupType(
          "main.UserCreateResponse",
        );
        const res = UserCreateResponse.decode(new Uint8Array(response.data));
        return res;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const update = async (newUser: UserData): Promise<UserData | void> => {
    const token = localStorage.getItem("token");

    const UserUpdateRequest = protobuf.roots.default.lookupType(
      "main.UserUpdateRequest",
    );
    const payload = { user: newUser };
    const errMsg = UserUpdateRequest.verify(payload);

    if (errMsg) throw Error(`UserUpdateRequest: ${errMsg}`);

    const user = UserUpdateRequest.create(payload);
    const buffer = UserUpdateRequest.encode(user).finish();

    await axios
      .post(`${process.env.BACKEND_DOMAIN}/api/v1/user/update`, buffer, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const UserUpdateResponse = protobuf.roots.default.lookupType(
          "main.UserUpdateResponse",
        );
        const res = UserUpdateResponse.decode(new Uint8Array(response.data));
        return res;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return { get, list, create, update };
};

export default useFetchUser;
