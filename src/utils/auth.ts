/**
 * 获取本地token
 * @returns
 */
export const getToken = () => {
  const refreshToken = useCookie("refreshToken");
  const token = useCookie("token");

  return {
    refreshToken: refreshToken.value,
    token: token.value,
  };
};

/**
 * 设置本地token
 * @param token
 * @param refreshToken
 */
export const setToken = (token: string, refreshToken: string) => {
  const currentTime = new Date().getTime();
  //  设置过期时间为 3个小时
  const expires = new Date(currentTime + 60 * 1000 * 60 * 3);
  //  设置过期时间为 7天
  const refreshTokenExpires = new Date(currentTime + 60 * 1000 * 60 * 24 * 7);

  const cookieToken = useCookie("token", { expires });
  const cookieRefreshToken = useCookie("refreshToken", {
    expires: refreshTokenExpires,
  });
  cookieToken.value = token;
  cookieRefreshToken.value = refreshToken;
};
