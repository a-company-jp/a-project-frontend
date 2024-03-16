"use client";
import {
  MilestoneCreateRequest,
  MilestoneCreateResponse,
  MilestoneUpdateRequest,
} from "../../proto/typescript/pb_out/main";

import useApiPBClient from "@/hooks/useApiPBClient";

const useFetchMilestone = () => {
  const client = useApiPBClient();

  const create = async (
    req: MilestoneCreateRequest,
  ): Promise<MilestoneCreateResponse> => {
    return await client.post("/api/v1/milestone", req).then((resp) => {
      if (resp.unauthorized) {
        throw new Error("unauthorized");
      }
      if (resp.error) {
        throw new Error(resp.error);
      }
      return MilestoneCreateResponse.fromBinary(resp.data);
    });
  };

  const update = async (req: MilestoneUpdateRequest): Promise<boolean> => {
    return await client
      .put(`/api/v1/milestone/${req.milestone?.milestoneId}`, req)
      .then((resp) => {
        if (resp.unauthorized) {
          throw new Error("unauthorized");
        }
        if (resp.error) {
          throw new Error(resp.error);
        }
        return true;
      });
  };

  const del = async (milestoneId: string): Promise<boolean> => {
    return await client.del(`/api/v1/milestone/${milestoneId}`).then((resp) => {
      if (resp.unauthorized) {
        throw new Error("unauthorized");
      }
      if (resp.error) {
        throw new Error(resp.error);
      }
      return true;
    });
  };

  return { create, update, del };
};

export default useFetchMilestone;
