import { getUserData } from "~/api/userApi";
import { getWebsiteSetting } from "~/api/websiteApi";
import type * as userType from "~/types/user";
import type { WebsiteSetting } from "~/types/websiteSetting";

export const getWindowWidth = (document) =>
  document.documentElement.clientWidth;

export const useToken = () => {
  const token = useCookie("token");

  return token;
};

export const keepUserData = async (
  userState: globalThis.Ref<userType.UserStateType>
) => {
  const response = await getUserData();
  if (response) {
    let data = response?.data;
    // 获取数据成功
    if (data?.value?.code === 1001) {
      userState.value = data.value.data.row;
    }
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

/**
 * 获取网站配置
 * @returns
 */
export const useWebsiteSetting = async () => {
  const stateKey = "websiteSettingState";
  const websiteSettingState = useState<WebsiteSetting>(stateKey);
  if (!websiteSettingState.value) {
    const { data, refresh } = await getWebsiteSetting();

    // 获取数据成功
    if (data.value?.code === 1001) {
      websiteSettingState.value = data.value.data.rows[0];
    }
  }

  return websiteSettingState;
};
