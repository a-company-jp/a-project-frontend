"use client"
import axios from "axios";
const protobuf = require("protobufjs");

import { Milestone } from "../../proto/typescript/pb_out/main";
import mockMilestones from "@/sample-data/milestones.json";

const useFetchMilestone = () => {
  
  const create = async (newMileStone: Milestone): Promise<Milestone|void> => {
    // マイルストーンを新規作成する関数
    // 新しいマイルストーンをサーバーに送信する (milestoneIdは空文字で送信)
    // サーバー側で付与されたmilestoneID または milestone 丸ごとを返す
    const token = localStorage.getItem("token");

    const MilestoneCreateRequest = protobuf.roots.default.lookupType("main.MilestoneCreateRequest");
    
    const payload = { milestone: newMileStone };

    const errMsg = MilestoneCreateRequest.verify(payload);
    if (errMsg) throw Error(`MilestoneCreateRequest: ${errMsg}`);

    const milestone = MilestoneCreateRequest.create(payload);
    const buffer = MilestoneCreateRequest.encode(milestone).finish();

    await axios.post(
      `${process.env.BACKEND_DOMAIN}/api/v1/milestone/create`,
      buffer,
      {
          headers: {
              Authorization: `token ${token}`,
          },
      }
    )
    .then((response) => {
      const MilestoneCreateResponse = protobuf.roots.default.lookupType("main.MilestoneCreateResponse");
      const res = MilestoneCreateResponse.decode(new Uint8Array(response.data));
      return MilestoneCreateResponse.toObject(res);
    })
    .catch((error) => {
      console.log(error);
    })
  }
  
  const update = async (newMileStone: Milestone): Promise<Milestone | void> => {
    // マイルストーンを更新する関数
    // 更新したいマイルストーンをサーバーに送信
    // 更新されたマイルストーン または ステータス または void を返す
    const token = localStorage.getItem("token");

    const MilestoneUpdateRequest = protobuf.roots.default.lookupType("main.MilestoneUpdateRequest");
    const payload = { milestone: newMileStone };
    const errMsg = MilestoneUpdateRequest.verify(payload);
    if (errMsg) throw Error(`MilestoneUpdateRequest: ${errMsg}`);

    const milestone = MilestoneUpdateRequest.create(payload);
    const buffer = MilestoneUpdateRequest.encode(milestone).finish();
    await axios.post(
      `${process.env.BACKEND_DOMAIN}/api/v1/milestone/update`,
      buffer,
      {
          headers: {
              Authorization: `token ${token}`,
          },
      }
    )
    .then((response) => {
      const MilestoneCreateResponse = protobuf.roots.default.lookupType("main.MilestoneCreateResponse");
      const res = MilestoneCreateResponse.decode(new Uint8Array(response.data));
      return res
    })
    .catch((error) => {
      console.log(error);
    })
}
  
  // because delete is a reserved word, we use _delete
  const _delete = async (milestoneId: string): Promise<string | void> => {
    // マイルストーンを削除する関数
    // 指定されたmilestoneIdのマイルストーンを削除する
    // ステータス または void を返す
    const token = localStorage.getItem("token");

    await axios.delete(
      `${process.env.BACKEND_DOMAIN}/api/v1/milestone/delete${milestoneId}`,
      {
          headers: {
              Authorization: `token ${token}`,
          },
      }
    )
    .then((response) => {
      const MilestoneDeleteResponse = protobuf.roots.default.lookupType("main.MilestoneDeleteResponse");
      const res = MilestoneDeleteResponse.decode(new Uint8Array(response.data));
      return res
    })
    .catch((error) => {
      console.log(error);
    })

  }

  return {create, update, _delete};
}

export default useFetchMilestone;
