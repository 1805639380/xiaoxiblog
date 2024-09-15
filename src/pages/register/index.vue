<template>
  <nuxt-layout name="default">
    <div class="register">
      <form action="#" class="form-wrapper">
        <div class="logo">
          <img src="~assets/img/logo.svg" alt="" />
          <span class="logo-text">Su chamber</span>
        </div>
        <div class="form-item">
          <label for="username">账号:</label>
          <input
            type="text"
            id="usernmae"
            name="username"
            autocomplete="off"
            v-model="username"
          />
        </div>
        <div class="form-item">
          <label for="userpassword">密码:</label>
          <input
            type="password"
            id="userpassword"
            name="password"
            autocomplete="off"
            v-model="password"
          />
        </div>
        <div class="form-item">
          <label for="confirmPwd">确认密码:</label>
          <input
            type="password"
            id="confirmPwd"
            name="confirmPwd"
            autocomplete="off"
            v-model="confirmPassword"
          />
        </div>
        <div class="form-item">
          <label for="email">邮箱:</label>
          <input
            type="email"
            id="email"
            name="email"
            autocomplete="off"
            v-model="email"
          />
        </div>
        <div class="form-item">
          <label for="checkCode">验证码:</label>
          <div class="check">
            <input
              type="text"
              id="checkCode"
              name="checkCode"
              autocomplete="off"
              v-model="checkCode"
            />
            <button @click.prevent="sendCheckCode">{{ sendBtn }}</button>
          </div>
        </div>
        <div class="form-item" v-loading="isLoading">
          <input
            type="submit"
            id="smt"
            value="Sign up"
            @mousedown="changeBtnColor"
            @mouseup="hfBtnColor"
            :class="{ mousedownClick: isBtnClick }"
            @click.prevent="submitForm"
          />
        </div>
        <p class="tips">
          已有账号?点击 <router-link to="/login">登录</router-link>
        </p>
      </form>
    </div>
  </nuxt-layout>
</template>

<script setup lang="ts">
import { register, sendCode } from "~/api/userApi";

useHead({
  title: "注册",
});

const router = useRouter();
const isLoading = ref(false);
const username = ref<string>("");
const password = ref<string>("");
const confirmPassword = ref<string>("");
const email = ref<string>("");
const isBtnClick = ref<boolean>(false);
const sendBtn = ref<string>("发送验证码");
const canSend = ref<boolean>(true);
const checkCode = ref<string>("");
const serverCode = ref<string>("");

function timepiece(time: number) {
  function timeP() {
    sendBtn.value = time-- + "s";
  }
  let setInter = setInterval(() => {
    timeP.call(timeP);
    // 倒计时完成清除定时器
    if (time < 0) {
      canSend.value = true;
      sendBtn.value = "重新发送";
      clearInterval(setInter);
    }
  }, 1000);
  return setInter;
}

// 发送验证码
function sendCheckCode(this: any): void {
  if (email.value.trim() === "") {
    useMessage({
      message: "请填写邮箱",
      type: "error",
    });
    return;
  }

  if (canSend.value && email.value.trim() != "") {
    // 点击后不能再次点击发送
    canSend.value = false;

    // 定义倒计时
    let time = 60;
    let setInter = null;

    sendCode({
      email: email.value,
    })
      .then(({ data: res }) => {
        setInter = timepiece(time);
        useMessage({
          message: res.value.data.message,
          type: "success",
        });
      })
      .catch((err) => {
        useMessage({
          message: err,
          type: "error",
        });
        clearInterval(setInter);
        sendBtn.value = "重新发送";
        canSend.value = true;
      });
  }
}

// 提交按钮按下修改背景色
function changeBtnColor(): void {
  isBtnClick.value = true;
}
// 提交按钮弹起恢复背景色
function hfBtnColor(): void {
  isBtnClick.value = false;
}

// 提交表单
function submitForm(): void {
  function check(re, el) {
    return re.test(el);
  }

  let usernameRe = /^\w{8,15}$/;
  let passwordRe = /^\w{6,16}$/;
  let emailRe = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  // 用户名不符合要求
  if (!check(usernameRe, username.value)) {
    useMessage({
      message: "用户名需在8-15位！",
      type: "error",
    });
    return;
  }
  // 密码不符合要求
  if (!check(passwordRe, password.value)) {
    useMessage({
      message: "密码需在6-16位！",
      type: "error",
    });
    return;
  }
  // 输入的密码与确认的密码 不匹配
  if (password.value !== confirmPassword.value) {
    useMessage({
      message: "两次输入的密码不一致！",
      type: "error",
    });
    return;
  }
  // 邮箱格式不正确
  if (!check(emailRe, email.value)) {
    useMessage({
      message: "邮箱格式不正确！",
      type: "error",
    });
    return;
  }
  isLoading.value = true;
  // 调用注册请求
  register({
    account: username.value,
    password: password.value,
    email: email.value,
    email_code: checkCode.value,
  })
    .then(({ data: res }) => {
      if (res.value?.code === 1001) {
        // 注册成功
        useMessage({
          message: res.value.message,
          type: "success",
        });
        router.push("/login");
      } else {
        // 注册失败
        useMessage({
          message: res.value.message,
          type: "error",
        });
        return;
      }
    })
    .finally(() => {
      isLoading.value = false;
    });
}
</script>

<style scoped>
.mousedownClick {
  background-color: #6f43fe9a !important;
}

@media screen and (max-width: 768px) {
  #app .register {
    width: 100%;
    height: 100%;
    border-radius: 0;
    background-color: transparent;
  }

  #app .register::before,
  #app .register::after {
    content: none;
  }
}

@media screen and (max-width: 425px) {
  .register .form-wrapper {
    width: 90%;
    box-shadow: none;
  }
}

.register::before,
.register::after {
  content: "";
  position: absolute;
  bottom: 10px;
  /* width: 30%; */
  width: 500px;
  height: 400px;
  background-repeat: no-repeat;
  background-position: center;
}

.register::before {
  left: 0;
  background-image: url("@/assets/img/wrapleft.svg");
}

.register::after {
  right: 0;
  background-image: url("@/assets/img/wrapright.svg");
}
:deep(.el-loading-mask .circular) {
  width: 20px;
  margin-right: 80px;
}
.register {
  position: relative;
  display: flex;
  /* width: 1200px; */
  height: 600px;
  min-height: calc(100vh - 140.8px);
  padding-top: 85.05px;
  box-sizing: content-box;
  margin: 0 auto;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* box-shadow: 0 0 15px var(--shadowColor); */
  border-radius: var(--radius);
  background-color: #fff;
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
input[type="password"],
input[type="email"] {
  height: 30px;
  background-color: #f0ecfd;
  padding-left: 10px;
  border-radius: 10px;
}

.form-wrapper {
  position: relative;
  z-index: 1;
  text-align: center;
  box-shadow: 0 0 15px var(--shadowColor);
  width: 400px;
  border-radius: 10px;
  background-color: #fff;
  padding-bottom: 25px;
}

#smt {
  padding: 10px 0;
  text-align: center;
  background-color: #7043fe;
  font-size: 16px;
  color: #fff;
  border: none;
  margin-top: 20px;
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
  color: blue;
}

.check {
  display: flex;
  justify-content: center;
}

.check input {
  width: 110px;
  margin: 0;
  margin-right: 10px;
}

.check button {
  width: 79px;
  background: none;
  outline: none;
  border: 1px solid #ccc;
  border-radius: var(--radius);
  cursor: pointer;
}
</style>
