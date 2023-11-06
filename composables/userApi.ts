import { ResponseData } from "~/types/common";

type LoginType = {
  account: string;
  password: string;
};

/**
 * 登录
 * @param datas
 * @returns
 */
export const login = function (datas: LoginType) {
  return useRequest<{
    access_token: string;
  }>({
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
  return useRequest({
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
