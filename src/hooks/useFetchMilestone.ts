"use client";
import axios from "axios";
import {
  Milestone,
  MilestoneCreateRequest,
  MilestoneCreateResponse,
} from "../../proto/typescript/pb_out/main";

import useApiPBClient from "@/hooks/useApiPBClient";

const protobuf = require("protobufjs");

const useFetchMilestone = () => {
  const client = useApiPBClient();

  const create = (
    newMilestoen: MilestoneCreateRequest,
  ): Promise<MilestoneCreateResponse> => {
    client.post("/milestone", newMilestoen).then((resp) => {
      if (resp.unauthorized) {
        throw new Error("unauthorized");
      }
      if (resp.error) {
        throw new Error(resp.error);
      }
      return MilestoneCreateResponse.fromBinary(resp.data);
    });
  };

  const update = async (newMilestoen: MilestoneCreateRequest) => {
    return await client
      .put(`/milestone/${newMilestoen.milestone?.milestoneId}`, newMilestoen)
      .then((resp) => {
        if (resp.unauthorized) {
          throw new Error("unauthorized");
        }
        if (resp.error) {
          throw new Error(resp.error);
        }
        return MilestoneUpdateResponse.fromBinary(resp.data);
      });
  };

  const _delete = async (
    milestoneId: string,
  ): Promise<MilestoneDeleteResponse> => {
    return await client.delete(`/milestone/${milestoneId}`).then((resp) => {
      if (resp.unauthorized) {
        throw new Error("unauthorized");
      }
      if (resp.error) {
        throw new Error(resp.error);
      }
      return MilestoneDeleteResponse.fromBinary(resp.data);
    });
  };

  return { create, update, _delete };
};

export default useFetchMilestone;
