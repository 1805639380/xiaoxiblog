import * as userType from '~~/types/user'

export const getWindowWidth = (document) => document.documentElement.clientWidth

export const useToken = () => {
  const token = useCookie('token')
  console.log("获取");

  return token
}

export const useUserState = async () => {
  let userStateDate: userType.userStateType

  const userState = useState<userType.userStateType>("userState", () => userStateDate)

  let { data } = await getUserData()

  // 获取数据成功
  if (data.value?.code === 0) {
    userState.value = data.value.result[0]
  }

  return userState
}

// 清空用户状态
export const cleanUserState = () => {
  const userState = useState("userState")
  userState.value = ""
  return null
}




