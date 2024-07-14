import type { ResponseData } from "~/types/common";
import type { User } from "~/types/user";

type LoginType = {
  account: string;
  password: string;
};
type LoginResType = {
  access_token: string;
  refresh_token: string;
}
/**
 * 登录
 * @param datas
 * @returns
 */
export const login = function (datas: LoginType) {
  return useRequest<LoginResType>({
    url: "/login",
    method: "post",
    data: datas,
  });
};

type RegisterType = {
  account: string;
  password: string;
  email: string;
  email_code: string;
};

// 注册
export const register = function (datas: RegisterType) {
  return useRequest<ResponseData<any>>({
    url: "/user",
    method: "post",
    data: datas,
  });
};

// 发送验证码
export const sendCode = function (datas: { email: string }) {
  return useRequest<ResponseData<any>>({
    url: "/email/send",
    method: "post",
    data: datas,
  });
};

// 获取用户数据
export const getUserData = function () {
  return useRequest<ResponseData<any>>({
    url: "/user",
    method: "get",
  });
};

type UpdataProfile = {
  name?: string;
  signature?: string;
  sex?: string;
  avatar?: string;
};

// 更新用户数据
export const updateUserData = function (data: UpdataProfile) {
  return useRequest({
    url: `/user/profile`,
    method: "PATCH",
    data,
  });
};

/**
 * 根据用户账号用户用户信息
 * @param account 用户名
 * @returns
 */
export const getUserByAccount = (account: string) => {
  return useRequest<ResponseData<User>>(
    {
      url: `/user/${account}`,
      method: "get",
    },
    false
  );
};

/**
 * 修改密码
 * @param data
 * @returns
 */
export const updateUserPassword = (data: {
  oldPassword: string;
  newPassword: string;
  checkCode: string;
  username: string;
}) => {
  return useRequest<ResponseData<any>>({
    url: `/user/password`,
    method: "PATCH",
    data,
  });
};
