import { CommonEntity } from "./common";

export type UserStateType = {
  id: number;
  name: string;
  signature?: string;
  sex: "男" | "女" | "保密";
  avatar: string;
  article_num: number;
  labelnum: number;
};

export type User = {
  id: number;
  createTime: string;
  updatedTime: string;
  deleteAt: string | null;
  account: string;
  email: string;
  sign_time: string;
  salt?: string;
  password?: string;
  role: number;
  profile: UserProfile;
};

export interface UserProfile extends CommonEntity {
  name: string;
  signature: string | null;
  avatar: string;
  sex: number;
  article_num: number;
}
