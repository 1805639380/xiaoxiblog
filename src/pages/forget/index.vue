<template>
  <div class="forget">
    <div class="forget_box">
      <el-steps :active="stepActive" finish-status="success">
        <el-step title="验证账号" />
        <el-step title="验证邮箱" />
        <el-step title="重置密码" />
      </el-steps>
      <div class="forms">
        <el-tabs v-model="activeTab" class="demo-tabs">
          <!-- 验证账号 -->
          <el-tab-pane label="" name="first">
            <el-form
              ref="ruleFormRef"
              :model="ruleForm"
              status-icon
              :rules="rules"
              labelPosition="top"
              class="demo-ruleForm"
            >
              <el-form-item label="账号" prop="account">
                <el-input
                  placeholder="请输入需要找回密码的账号"
                  v-model="ruleForm.account"
                />
              </el-form-item>
              <el-form-item>
                <el-button
                  class="nextStep"
                  type="primary"
                  @click="nextStep(ruleFormRef)"
                  >下一步</el-button
                >
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="" name="second">
            <!-- 验证邮箱 -->
            <el-form
              ref="ruleEmailFormRef"
              :model="ruleForm"
              status-icon
              :rules="rules"
              labelPosition="top"
              class="demo-ruleForm"
            >
              <el-form-item
                :label="`请使用邮箱 ${ruleForm.email} 接收验证码并填入下框`"
                prop="emailCode"
              >
                <el-row
                  style="width: 100%; margin: 0"
                  :gutter="10"
                  justify="space-between"
                >
                  <el-col :span="20">
                    <el-input
                      placeholder="请输入邮箱验证码"
                      v-model="ruleForm.emailCode"
                    />
                  </el-col>
                  <el-col :span="4" style="padding-right: 0">
                    <el-button @click="sendEmailCode" style="width: 100%">{{
                      sendCodeBtnStr
                    }}</el-button>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item>
                <el-button
                  class="prevStep"
                  type="primary"
                  @click="stepActive -= 1"
                  >上一步</el-button
                >
                <el-button
                  class="nextStep"
                  type="primary"
                  @click="nextStep(ruleEmailFormRef)"
                  >下一步</el-button
                >
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="" name="third">
            <!-- 重置密码 -->
            <el-form
              ref="ruleResetPwdFormRef"
              :model="ruleForm"
              status-icon
              :rules="rules"
              labelPosition="top"
              class="demo-ruleForm"
            >
              <el-form-item label="旧密码" prop="oldPassword">
                <el-input
                  placeholder="请输入旧密码"
                  v-model="ruleForm.oldPassword"
                />
              </el-form-item>
              <el-form-item label="新密码" prop="newPassword">
                <el-input
                  placeholder="请输入新密码"
                  v-model="ruleForm.newPassword"
                />
                <p class="tips">密码须在6-16位</p>
              </el-form-item>
              <el-form-item>
                <el-button
                  class="prevStep"
                  type="primary"
                  @click="stepActive -= 1"
                  >上一步</el-button
                >
                <el-button
                  class="nextStep"
                  type="primary"
                  @click="nextStep(ruleResetPwdFormRef)"
                  >修改密码</el-button
                >
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="" name="fourth">
            <el-result
              icon="success"
              title="修改密码成功！"
              sub-title="请点击下方按钮返回登录页面"
            >
              <template #extra>
                <el-button type="primary">
                  <NuxtLink to="/login">登陆页面</NuxtLink>
                </el-button>
              </template>
            </el-result>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules } from "element-plus";
import { checkEmailCode } from "~/api/common";
import { getUserByAccount, sendCode, updateUserPassword } from "~/api/userApi";

useHead({
  title: "忘记密码",
});
const stepActive = ref(0);

const activeTab = computed(() => {
  switch (stepActive.value) {
    case 0:
      return "first";
    case 1:
      return "second";
    case 2:
      return "third";
    case 3:
      return "fourth";
  }
});

const sendCodeBtnStr = ref("发送验证码");

const ruleFormRef = ref<FormInstance>();
const ruleEmailFormRef = ref<FormInstance>();
const ruleResetPwdFormRef = ref<FormInstance>();

const ruleForm = reactive({
  account: "",
  email: "",
  emailCode: "",
  oldPassword: "",
  newPassword: "",
});

const checkStatus = {
  account: false,
  emailCode: false,
  oldPassword: false,
  newPassword: false,
};

const validateAccount = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("账号不能为空！"));
  } else {
    getUserByAccount(value).then(({ data }) => {
      if (data.value && data.value.code === 1001) {
        ruleForm.email = data.value.data.row.email;
        callback();
        checkStatus.account = true;
        return;
      }
      callback(new Error("账号不存在！"));
    });
  }
};

const validateEmailCode = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("验证码不能为空！"));
  } else {
    checkEmailCode({ email: ruleForm.email, checkCode: value }).then(
      ({ data }) => {
        if (data.value && data.value.code === 1001) {
          callback();
          checkStatus.emailCode = true;
          return;
        }
        callback(new Error("验证码错误！"));
      }
    );
  }
};

const validatePassword = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("密码不能为空！"));
  } else {
    checkStatus.oldPassword = true;
    callback();
  }
};

const validateNewPassword = (rule: any, value: any, callback: any) => {
  let passwordRe = /^\w{6,16}$/;
  if (value === "") {
    callback(new Error("密码不能为空！"));
  } else if (value === ruleForm.oldPassword) {
    callback(new Error("新密码不能与旧密码相同！"));
  } else if (!passwordRe.test(value)) {
    callback(new Error("密码格式不正确！"));
  } else {
    checkStatus.newPassword = true;
    callback();
  }
};

const rules = reactive<FormRules<typeof ruleForm>>({
  account: [{ validator: validateAccount, trigger: "blur" }],
  emailCode: [{ validator: validateEmailCode, trigger: "blur" }],
  oldPassword: [{ validator: validatePassword, trigger: "blur" }],
  newPassword: [{ validator: validateNewPassword, trigger: "blur" }],
});

const canclickSendCodeBtn = ref(true);
const sendEmailCode = () => {
  if (canclickSendCodeBtn.value === false) {
    return;
  }
  canclickSendCodeBtn.value = false;
  // 倒计时时间
  let countdown = 60;
  const timer = setInterval(() => {
    countdown--;
    if (countdown <= 0) {
      sendCodeBtnStr.value = "重新发送";
      canclickSendCodeBtn.value = true;
      clearInterval(timer);
      return;
    }
    sendCodeBtnStr.value = countdown + "s";
  }, 1000);
  sendCode({
    email: ruleForm.email,
  }).then(({ data }) => {
    if (data.value && data.value.code === 1001) {
      useMessage({
        type: "success",
        message: "验证码已发送，请注意查收！",
      });
    }
  });
};

const nextStep = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  let isPass = false;
  if (stepActive.value === 0 && checkStatus.account) {
    sendEmailCode();
    isPass = true;
  } else if (stepActive.value === 1 && checkStatus.emailCode) {
    isPass = true;
  } else if (
    stepActive.value === 2 &&
    checkStatus.oldPassword &&
    checkStatus.newPassword
  ) {
    const { data } = await updateUserPassword({
      oldPassword: ruleForm.oldPassword,
      newPassword: ruleForm.newPassword,
      checkCode: ruleForm.emailCode,
      username: ruleForm.account,
    });
    if (data.value && data.value.code === 1001) {
      useMessage({
        type: "success",
        message: "修改密码成功！",
      });
      isPass = true;
    }
  }
  if (isPass) {
    stepActive.value += 1;
  } else {
    return false;
  }
};
</script>

<style scoped>
.forget_box {
  width: var(--dBoxWidth);
  margin: 50px auto;
}
.nextStep {
  margin-left: auto;
}
:deep(.el-step:last-of-type) {
  flex-basis: auto !important;
  flex-shrink: 0;
  flex-grow: 0;
}
.tips {
  font-size: 14px;
  color: #a5a5a5;
}
</style>
