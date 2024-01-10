<template>
  <NuxtLayout name="default">
    <Title>标签</Title>
    <Banner :height="'50vh'"><span>标签</span></Banner>
    <NuxtLayout name="container">
      <template #containerLeftMain>
        <div class="tags">
          <el-skeleton :loading="pending" :rows="5" animated>
            <template #default>
              <div class="tags_list">
                <div class="tags_item" v-for="item in tags" :key="item.id">
                  <NuxtLink
                    class="tag_link"
                    :to="{
                      path:`/article/tags/${item.id}`,
                      query: { tagName: item.tagName },
                    }"
                  >
                    <el-badge
                      :value="item.byNum || ''"
                      class="badge_item"
                      type="primary"
                    >
                      <el-tag :type="getRandomTagType()">{{
                        item.tagName
                      }}</el-tag>
                    </el-badge>
                  </NuxtLink>
                </div>
              </div>
            </template>
          </el-skeleton>
        </div>
      </template>
    </NuxtLayout>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { getTags } from "~/api/tagsApi";

const pagination = ref({
  page: 1,
  offset: 100,
});
const { data: getTagsResponse, pending } = await getTags({
  page: pagination.value.page,
  offset: pagination.value.offset,
});
const tags = ref(getTagsResponse?.value?.data?.rows || []);

watch(getTagsResponse, (value) => {
  tags.value = value?.data?.rows || [];
});

const tagType = ["info", "success", "warning", "danger"];
const getRandomTagType = (): any => {
  return tagType[Math.floor(Math.random() * tagType.length)];
};
</script>

<style scoped>
.tags_list {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 20px;
}
:deep(.el-tag) {
  display: block;
  padding: 15px;
  height: auto;
  font-size: 1rem;
}
@media screen and (max-width: 768px) {
  :deep(.el-tag) {
    font-size: 2rem;
  }
}
</style>
