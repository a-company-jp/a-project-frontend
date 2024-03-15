/* eslint-disable */

export const protobufPackage = "";

export interface UserData {
  userId: string;
  username: string;
  firstname: string;
  lastname: string;
  firstnameKana: string;
  lastnameKana: string;
  statusMessage: string;
  tag: Tag[];
  /** GCS内のファイル名 */
  iconUrl?: string | undefined;
}

export interface Tag {
  tagId: string;
  tagName: string;
}

export interface Milestone {
  userId: string;
  milestoneId: string;
  title: string;
  content: string;
  /** GCS内のファイル名 */
  imageUrl?:
    | string
    | undefined;
  /** RFC3339 */
  beginDate: string;
  /** RFC3339 */
  finishDate: string;
}

export interface UserInfoUpdateRequest {
  userData: UserData | undefined;
}

export interface UserInfoResponse {
  userData: UserData | undefined;
  milestones: Milestone[];
}

export interface UserInfosResponse {
  userInfoResponses: UserInfoResponse[];
}

export interface MilestoneCreateRequest {
  /** milestone_id should be empty. */
  milestone: Milestone | undefined;
}

export interface MilestoneCreateResponse {
  milestone: Milestone | undefined;
}

export interface MilestoneUpdateRequest {
  /** user_id and milestone_id should be valid. */
  milestone: Milestone | undefined;
}

export const _PACKAGE_NAME = "";
