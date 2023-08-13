
/**
 * 登录
 * @param datas 
 * @returns 
 */
export const login = function (datas) {
  return useRequest({
    url: "/loginCheck",
    method: "post",
    data: datas
  })
}

// 注册
export const register = function (datas) {
  return useRequest({
    url: "/registerCheck",
    method: "post",
    data: datas
  })
}


// 发送验证码
export const sendCode = function (datas: object) {
  return useRequest({
    url: "/sendCheckCdoe",
    method: "post",
    data: datas
  })
}

// 获取用户数据
export const getUserData = function () {
  return useRequest({
    url: "/user",
    method: "get"
  })
}


// 更新用户数据
export const updateUserData = function (id: number, data) {
  return useRequest({
    url: `/account/${id}`,
    method: "PATCH",
    data,
  })
}
