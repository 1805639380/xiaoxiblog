<template>
  <div class="article">
    <div class="articleWrap">
      <div class="articleItems">
        <ArticleItem v-for="(item, index) in articleList" :articleData="item" :key="index"
          :isRowReverse="index % 2 == 0" />
      </div>
    </div>
    <div class="getMore">
      <div v-show="loading" ref="lottieLoadingDom" id="lottie_loading" class="lottie_loading"></div>
      <button v-show="!loading" type="button" @click="getMoreArticle">MoreArticle</button>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { ElMessage } from 'element-plus';
import { ArticleData, ArticleType } from '~~/types/article';
import lottie from 'lottie-web';
import animationData from '@/assets/lottie/animation_ll7j9mp7.json'

const lottieLoadingDom = ref(null)
const loading = ref(false)

onMounted(() => {
  lottie.loadAnimation({
    container: lottieLoadingDom.value!,
    renderer: 'svg',
    loop: true,
    autoplay: true,
    animationData
  })
})

const props = defineProps<{
  articleList: Array<ArticleType>,
  currentPage: number,
  count: number,
  offset: number
}>()

let currentPage = ref<number>(props.currentPage)
let articleList = reactive<Array<ArticleType>>(props.articleList)

// 加载文章
async function getMoreArticle() {
  // 超过页数
  if (Math.ceil(props.count / props.offset) <= currentPage.value) {
    ElMessage({ message: "后面没有内容了。", type: "warning" })
    return
  }
  loading.value = true
  currentPage.value++
  let { data: article_res } = await selectArticle({ page: currentPage.value, offset: props.offset })
  loading.value = false
  if (!article_res.value) {
    ElMessage({ message: "服务器繁忙，请稍后再试！", type: 'error' })
    return
  }

  articleList.push(...article_res.value.data.rows)
}

</script>

<style scoped>
.getMore {
  display: flex;
  text-align: center;
  justify-content: center;
}

.getMore .lottie_loading {
  width: 100px;
  /* height: 41px; */
}

.getMore button {
  outline: none;
  padding: 10px 20px;
  border-radius: 22px;
  border: 2px solid #444;
  background: none;
  font-size: 16px;
  transition: all 0.5s;
}

.getMore button:hover {
  border: 2px solid #2abce9;
  color: #2abce9;
  cursor: pointer;
}
</style>