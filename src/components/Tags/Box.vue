<template>
  <div class="tags_box">
    <div class="tags_box_header">
      <div class="tags_box_header_title">
        <span>标签</span>
      </div>
      <div class="tags_box_header_right">
        <NuxtLink class="tag_link" to="/article/tags">更多</NuxtLink>
      </div>
    </div>
    <div class="tags_box_body">
      <div class="tags_box_item" v-for="item in tags" :key="item.id">
        <NuxtLink
          class="tag_link"
          :to="item.byNum > 0 ? `/article/tags/${item.byNum}` : ''"
        >
          <el-badge :value="item.byNum || ''" class="badge_item" type="primary">
            <el-tag :type="getRandomTagType()">{{ item.tagName }}</el-tag>
          </el-badge>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getTags } from "~/api/tagsApi";
import type { TagType } from "~/types/tag";

const { data: getTagsResponse } = await getTags({ page: 1, offset: 15 });

const tags = ref<TagType[]>();
watch(
  getTagsResponse,
  (newVal) => {
    tags.value = newVal?.data?.rows || [];
  },
  { immediate: true }
);
const tagType = ["info", "success", "warning", "danger"];
const getRandomTagType = (): any => {
  return tagType[Math.floor(Math.random() * tagType.length)];
};
</script>

<style scoped>
.tags_box {
  width: 100%;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 1px 20px -8px var(--shadow);
  padding: 10px;
  --body-gap: 15px;
}
.tags_box:hover {
  box-shadow: 0 0 20px var(--shadow);
}
.tags_box_header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  line-height: 40px;
}
.tags_box_header_title {
  display: flex;
  align-items: center;
  font-size: 1.2rem;
}
.tag_link {
  font-size: 1rem;
}
.tag_link:hover {
  color: var(--baseColor);
}
.tags_box_header_title span {
  margin-right: 5px;
}
.tags_box_body {
  display: flex;
  flex-wrap: wrap;
  gap: var(--body-gap);
  padding: 10px 0;
}
</style>
