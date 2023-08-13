<template>
  <nuxt-layout name="default">
    <Banner :height="'50vh'">归档</Banner>
    <nuxt-layout name="container" :showUserInfo="false">
      <template #containerLeftMain>
        <el-empty v-if="!artilceData" description="内容为空" />
        <el-timeline v-else>
          <template v-for="parent_item in artilceData">
            <el-timeline-item type="primary" :hollow="true" size="large" :timestamp="parent_item.time" placement="top">
              <template v-for="item in parent_item.item">
                <nuxt-link :to="'/archive/' + item.article_id">
                  <el-card shadow="hover">
                    <h4>{{ item.article_title }}</h4>
                    <div class="article_info">
                      <div class="read_num">
                        <el-icon>
                          <View />
                        </el-icon>
                        <div class="num">
                          {{ item.article_watch }}
                        </div>
                      </div>
                      <div class="comment_num">
                        <el-icon>
                          <Comment />
                        </el-icon>
                        <div class="num">
                          {{ item.comment_num }}
                        </div>
                      </div>
                    </div>
                  </el-card>
                </nuxt-link>
              </template>
            </el-timeline-item>
          </template>
        </el-timeline>
      </template>
    </nuxt-layout>
  </nuxt-layout>
</template>
  
<script setup lang='ts'>
import { toReactive } from '@vueuse/core';
import { ElTimeline, ElTimelineItem, ElCard, ElIcon } from 'element-plus'
import { View, Comment } from '@element-plus/icons'
import articleType from '~~/types/article';

useHead({
  title: "归档"
})

let { data, refresh: refreshArticleTimeLine } = await getArticleTimeline<response<
  Array<{
    item: articleType[],
    time: string
  }>
>>()

onActivated(() => {
  console.log("活跃");

})

// await refreshArticleTimeLine()

let artilceData = toReactive(data.value?.data)

</script>
  
<style scoped>
:deep(.el-card) {
  margin: 15px 0;
}

:deep(.el-card__body) {
  overflow: hidden;
}

:deep(.el-timeline) {
  font-family: var(--font-article);
}

h4 {
  float: left;
  width: fit-content;
}

.article_info {
  float: right;
  width: fit-content;
}

.article_info>div {
  display: inline-flex;
  align-items: center;
  margin: 0 5px;
  vertical-align: middle;
}

.article_info>div .num {
  margin-left: 5px;
  width: 30px;
}
</style>