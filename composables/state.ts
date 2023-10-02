import * as userType from "~~/types/user";

export const getWindowWidth = (document) =>
  document.documentElement.clientWidth;

export const useToken = () => {
  const token = useCookie("token");
  console.log("获取");

  return token;
};

export const keepUserData = async (
  userState: globalThis.Ref<UserStateType>
) => {
  let { data, refresh } = await getUserData();

  // 获取数据成功
  if (data.value?.code === 1001) {
    userState.value = data.value.data.row;
  }
};

export const useUserState = async (data?: userType.UserStateType) => {
  let userStateDate: userType.UserStateType;

  const userState = useState<userType.UserStateType>(
    "userState",
    () => userStateDate
  );
  if (data) userState.value = data;

  return userState;
};

// 清空用户状态
export const cleanUserState = () => {
  const userState = useState("userState");
  userState.value = "";
  return null;
};
