<template>
    <nuxt-layout name="default">
        <div class="login">
            <form action="#" class="form-wrapper" @submit.prevent="submitForm">
                <div class="logo">
                    <img src="~assets/img/logo.svg" alt="" />
                    <span class="logo-text">Su chamber</span>
                </div>
                <div class="form-item">
                    <label for="username">账号:</label>
                    <input type="text" id="usernmae" name="username" autocomplete="off" v-model="username">
                </div>
                <div class="form-item">
                    <label for="userpassword">密码:</label>
                    <input type="password" id="userpassword" name="password" autocomplete="off" v-model="password">
                </div>
                <p>
                    <input type="checkbox" @change="isChecked" :checked="isKnowUser" id="check">
                    <label for="check">记住我</label>
                    <router-link class="forget" to="/forget">忘记密码</router-link>
                </p>
                <div class="form-item" v-loading="isLoading">
                    <input type="submit" id="smt" value="Login" @mousedown="changeBtnColor" @mouseup="hfBtnColor"
                        :class="{ mousedownClick: isBtnClick }" @click.prevent="submitForm">
                </div>
                <p class="tips">还没有账号?点击 <router-link to="/register">注册</router-link>
                </p>
            </form>
        </div>
    </nuxt-layout>
</template>
  
<script setup lang='ts'>
import md5 from "js-md5";
import { login } from "~/api/userApi";

useHead({
    title: "登录"
})
const isLoading = ref(false)
const router = useRouter()
const isBtnClick = ref<boolean>(false)
const username = ref<string>("")
const password = ref<string>("")
const isKnowUser = ref<boolean>(false)
const jm = ref<string>("xqyyds")

function isChecked(): void {
    isKnowUser.value = !isKnowUser.value;
}

function changeBtnColor(): void {
    isBtnClick.value = true
}

function hfBtnColor(): void {
    isBtnClick.value = false
}

async function submitForm() {
    // 未输入用户名
    if (username.value.length < 1) {
        useMessage({
            message: "用户名不能为空！",
            type: 'error'
        })
        return
    }

    // 未输入密码
    if (password.value.length < 1) {
        useMessage({
            message: "密码不能为空！",
            type: 'error'
        })
        return
    }

    // 勾选确认密码后
    if (isKnowUser.value) {
        // 将用户名和密码加密储存起来
        localStorage.setItem(md5("uname"), username.value + jm.value);
    } else {
        localStorage.clear();
    }
    isLoading.value = true

    login({
        account: username.value,
        password: password.value,
    })
        .then((res) => {
            if (!res || res.error.value) {
                return
            }
            let resDataRef = res.data
            if (resDataRef.value.code !== 1001) {
                // 登录失败
                useMessage({
                    message: resDataRef.value.message,
                    type: "error",
                });
                return;
            } else {
                // 登录成功
                // token 存入 本地储存
                // localStorage.setItem("token", res.data.token);
                // useState('token', () => res.data.token)
                let currentTime = new Date().getTime()
                //  设置过期时间为 3个小时
                let expires = new Date(currentTime + 60 * 1000 * 60 * 3)
                //  设置过期时间为 7天
                const refreshTokenExpires = new Date(currentTime + 60 * 1000 * 60 * 24 * 7)
                const token = useCookie("token", { expires })
                const refreshToken = useCookie("refreshToken", { expires: refreshTokenExpires })

                token.value = resDataRef.value?.data.access_token
                refreshToken.value = resDataRef.value?.data.refresh_token

                useMessage({
                    message: "登陆成功",
                    type: "success",
                });

                
                setTimeout(async () => {
                    // 重新获取用户数据，并且存入state
                    const userState = await useUserState()
                    await keepUserData(userState)
                    router.push("/");
                    // 登录成功 dispath 异步用户数据
                    // this.$store.dispatch("getUser");
                }, 1500);
            }
        })
        .catch((err) => {
            useMessage({
                message: err,
                type: "error",
            });
        })
        .finally(() => {
            isLoading.value = false
        })
}

onMounted(() => {
    let uname = localStorage.getItem(md5("uname"));
    // let pwd = localStorage.getItem(md5("upwd"));
    // 成功获取到用户名和密码则填入表单
    if (uname != null) {
        username.value = uname.split(jm.value)[0];
        // this.password = pwd.split(this.jm)[0];
        // 记住密码勾选
        isKnowUser.value = true;
    }
})

</script>
  
<style scoped>
.forget {
    float: right;
    color: #7043fe;
    font-size: 14px;
}
.login::before,
.login::after {
    content: "";
    position: absolute;
    bottom: 10px;
    width: 500px;
    height: 400px;
    background-repeat: no-repeat;
    background-position: center;
}

.login::before {
    left: 0;
    background-image: url("@/assets/img/wrapleft.svg");
}

.login::after {
    right: 0;
    background-image: url("@/assets/img/wrapright.svg");
}

.login {
    position: relative;
    display: flex;
    /* width: 1200px; */
    height: 600px;
    padding-top: 85.05px;
    min-height: calc(100vh - 140.8px);
    margin: 0 auto;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    /* box-shadow: 0 0 15px var(--shadowColor); */
    border-radius: var(--radius);
    background-color: #fff;
    box-sizing: content-box;
}
:deep(.el-loading-mask .circular) {
    width: 20px;
    margin-right: 80px;
}
.logo {
  padding: 25px 0;
  font-size: 0;
  color: #7043fe;
}

.logo .logo-text {
  font-size: 30px;
  font-weight: 700;
  vertical-align: middle;
}
.logo img {
    vertical-align: middle;
    transform: rotate(60deg);
}

.form-item label,
input {
    display: block;
    width: 200px;
    margin: 10px auto;
    text-align: left;
    border: none;
    font-size: 16px;
    color: #555;
}

label {
    color: #666;
}

.form-item input[type="text"],
input[type="password"] {
    height: 30px;
    background-color: #f0ecfd;
    padding-left: 10px;
    border-radius: 10px;
}

.form-wrapper {
    position: relative;
    z-index: 1;
    text-align: center;
    width: 400px;
    height: 400px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 15px var(--shadowColor);
}

#smt {
    padding: 10px 0;
    text-align: center;
    background-color: #7043fe;
    font-size: 16px;
    color: #fff;
    border: none;
    margin-top: 10px;
    border-radius: 15px;
    cursor: pointer;
}

.mousedownClick {
    background-color: #6f43fe9a !important;
}

p {
    width: 200px;
    text-align: left;
    margin: 0 auto;
    color: #666;
}

p label {
    user-select: none;
}

input[type="checkbox"] {
    display: inline;
    width: auto;
    vertical-align: middle;
    text-align: left;
    zoom: 1.2;
    margin: 0 5px;
}

.tips {
    margin-top: 15px;
    font-size: 14px;
}

.tips a {
    color: #7043fe;
}

@media screen and (max-width: 768px) {
    .login {
        width: 100%;
        height: 100%;
        border-radius: 0;
        background-color: transparent;
    }

    .login::before,
    .login::after {
        content: none;
        background: none;
    }
}

@media screen and (max-width: 425px) {
    .login .form-wrapper {
        width: 90%;
        font-size: 2rem;
    }
}
</style>