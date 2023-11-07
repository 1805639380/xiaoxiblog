<template>
  <nuxt-layout name="default" :user="userState">
    <Banner :height="'50vh'">账户</Banner>
    <nuxt-layout name="account" :active="1" :title="'编辑文章'">
      <template #account-wrap>
        <el-form
          :model="editForm"
          label-width="50px"
          :rules="rules"
          ref="ruleFormRef"
        >
          <el-form-item label="标题:" prop="title">
            <el-input
              type="text"
              name=""
              id="text"
              v-model="editForm.title"
            ></el-input>
          </el-form-item>
          <el-form-item label="类型:" prop="type">
            <client-only>
              <el-select
                v-model="editForm.type"
                class="m-2"
                placeholder="请选择文章类型"
                size="large"
              >
                <el-option
                  v-for="item in typeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </client-only>
          </el-form-item>
          <el-form-item label="图片:" prop="imageUrl">
            <el-upload
              class="avatar-uploader"
              name="file"
              :action="uploadUrl"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
              :with-credentials="true"
              :headers="uploadHeaders"
            >
              <img
                v-if="editForm.imageUrl"
                :src="editForm.imageUrl"
                class="avatar"
              />
              <el-icon v-else class="avatar-uploader-icon">
                <Plus />
              </el-icon>
            </el-upload>
          </el-form-item>
          <el-form-item label="摘要:" prop="snippet">
            <el-input
              type="text"
              name=""
              id="snippet"
              v-model="editForm.snippet"
            ></el-input>
          </el-form-item>
          <el-form-item label="内容:" prop="content">
            <client-only>
              <MdEditor v-model="editForm.content" :sanitize="sanitize" />
            </client-only>
          </el-form-item>
          <el-form-item class="article-btn-wrap">
            <div class="article-my-btn">
              <el-button
                type="primary"
                size="default"
                @click="submitForm(ruleFormRef)"
                >发布</el-button
              >
            </div>
          </el-form-item>
        </el-form>
      </template>
    </nuxt-layout>
  </nuxt-layout>
</template>

<script setup lang="ts">
import type { FormInstance } from "element-plus";
import { Plus } from "@element-plus/icons";
import type { UploadProps } from "element-plus";
import sanitizeHtml from "sanitize-html";
import MdEditor from "md-editor-v3";
import "md-editor-v3/lib/style.css";
import { addArticle } from "~/api/articleApi";

useHead({
  title: "文章编辑",
});
const router = useRouter();
const ruleFormRef = ref<FormInstance>();

const sanitize = (html: string) => {
  return sanitizeHtml(html);
};

const uploadUrl = ref("");
uploadUrl.value = useRuntimeConfig().public.requestBaseUrl + "/image";
const uploadHeaders = ref<any>({});
const token = useCookie("token");
uploadHeaders.value["authorization"] = "Bearer " + token.value;

let [err, userState] = await useCatch(useUserState());

const editForm = reactive<{
  title: string;
  snippet: string;
  content: string;
  type: string;
  imageUrl: string;
}>({
  title: "",
  type: "",
  snippet: "",
  content: "##### 这里填写内容",
  imageUrl: "",
});

const typeOptions = [
  {
    value: "前端",
    label: "前端",
  },
  {
    value: "后端",
    label: "后端",
  },
  {
    value: "其他",
    label: "其他",
  },
];

// 图片上传前校验
const beforeAvatarUpload: UploadProps["beforeUpload"] = (rawFile) => {
  if (rawFile.size / 1024 > 200) {
    useMessage({
      message: "图片文件不能超过200kb!",
      type: "error",
    });
    return false;
  }
  return true;
};

// 图片添加成功hook
const handleAvatarSuccess: UploadProps["onSuccess"] = (
  response,
  uploadFile
) => {
  if (response.code === 1001) {
    editForm.imageUrl = response.data.imageUrl;
  }
  // editForm.imageUrl = URL.createObjectURL(uploadFile.raw!)
};

/**
 * el-form 表单空值校验
 * @param rule
 * @param value
 * @param callback
 */
function nullCheck(rule: any, value: any, callback: any) {
  if ((value ?? "") === "") {
    callback(new Error("不能为空"));
  } else {
    callback();
  }
}

/**
 * 表单规则校验
 */
const rules = reactive({
  title: [
    {
      validator: nullCheck,
      trigger: "blur",
    },
  ],
  snippet: [
    {
      validator: nullCheck,
      trigger: "blur",
    },
  ],
  content: [
    {
      validator: nullCheck,
    },
  ],
  type: [
    {
      validator: nullCheck,
      trigger: "blur",
    },
  ],
  imageUrl: [
    {
      validator: nullCheck,
    },
  ],
});

/**
 * 提交发布文章
 */
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  const userState = await useUserState();
  formEl.validate(async (valid) => {
    if (valid) {
      const { data } = await addArticle({
        author_id: userState.value.id,
        title: editForm.title,
        content: editForm.content,
        type: editForm.type,
        description: editForm.snippet,
        pic: editForm.imageUrl,
      });
      if (data.value.code === 1001) {
        useMessage({
          message: "发布成功",
          type: "success",
        });
        setTimeout(() => {
          router.push("/");
        }, 1000);
      }
    } else {
      console.log("error submit!");
      return false;
    }
  });
};
</script>

<style scoped>
:deep(.md) {
  width: 647px;
}

:deep(.md-toolbar-wrapper) {
  overflow: auto;
}

:deep(.md-toolbar-wrapper .md-toolbar) {
  flex-wrap: wrap;
}

.article-btn-wrap :deep(.el-form-item__content) {
  justify-content: end;
}

.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
