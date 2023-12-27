<template>
  <div ref="observeRef">
    <el-skeleton :loading="skeletonLoading" animated style="width: 100%" class="articleItem"
      :class="{ rowReverse: props.isRowReverse }">
      <template #template>
        <div class="content">
          <div class="releaseTime">
            <el-skeleton-item variant="p" style="width: 50%;height: 20px;" />
          </div>
          <div class="articleTitle">
            <el-skeleton-item variant="p" style="width: 60%;margin: 1.5625rem 0;height: 21px;" />
          </div>
          <div class="see">
            <el-skeleton-item v-for="i in 3" variant="text" style="flex: 1;margin: 0 10px;height: 20px;" />
          </div>
          <div class="summary">
            <el-skeleton-item variant="p" style="width: 100%" />
            <el-skeleton-item variant="p" style="width: 80%" />
            <el-skeleton-item variant="p" style="width: 100%" />
            <el-skeleton-item variant="p" style="width: 50%" />
          </div>
        </div>
        <div class="bgi">
          <el-skeleton-item variant="image" style="width:100%; height: 100%;" />
        </div>
      </template>
      <template #default>
        <div class="articleItem" :class="{ rowReverse: props.isRowReverse }">
          <div class="content">
            <div class="releaseTime">
              <span class="iconfont">&#xe62b;</span>
              <span class="showtime">发布于{{
                new Date(props.articleData?.publish_date).toLocaleDateString()
              }}</span>
            </div>
            <div class="articleTitle">
              <p>
                <nuxt-link :to="'/archive/' + props.articleData?.id">{{ props.articleData?.title }}
                </nuxt-link>
              </p>
            </div>
            <div class="see">
              <p>
                <span class="iconfont">&#xe668;</span><span class="num">{{ props.articleData?.watch_num }}</span>
              </p>
              <p>
                <span class="iconfont">&#xe67b;</span><span class="num">{{ props.articleData?.comment_num }}</span>
              </p>
              <p>
                <span class="iconfont">&#xe66b;</span>
                <span class="type">{{ props.articleData?.type }}</span>
              </p>
            </div>
            <div class="summary">
              <p>
                {{ props.articleData?.description }}
              </p>
            </div>
          </div>
          <div class="bgi">
            <nuxt-link :to="'/archive/' + props.articleData?.id">
              <div class="imgBg">
                <img ref="imgRef"
                  :data-src="transformUpYunPicUrl({ url: props.articleData?.pic, options: { quality: 80, widthAndHeight: '380x273' } })"
                  :alt="props.articleData?.title" />
                <div class="img_loading img_loading_hidden"></div>
              </div>
            </nuxt-link>
          </div>
        </div>
      </template>
    </el-skeleton>
  </div>
</template>

<script setup lang="ts">
import type { ArticleType } from "~/types/article";

const props = withDefaults(
  defineProps<{
    isRowReverse?: boolean;
    articleData: ArticleType;
  }>(),
  {
    isRowReverse: false,
  }
);

const skeletonLoading = ref(true)
const imgRef = ref<HTMLImageElement>(null)
const observeRef = ref<HTMLDivElement>(null)

onMounted(() => {
  // 监听触发函数
  const observeCallback = (imgSrc: string) => {
    const image = new Image()
    image.src = imgSrc
    image.onload = () => {
      skeletonLoading.value = false
      nextTick(() => {
        imgRef.value.src = imgSrc
      })
    }
  }
  const observeEl = observeRef.value
  imageSkeletonLazyLoad(observeEl, imgRef.value, observeCallback)

});
</script>

<style scoped>
.img_loading_hidden {
  display: none;
}

.img_loading {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  background-color: yellow;
  transition: all 0.25s;
}

.rowReverse {
  flex-direction: row-reverse;
}

.articleItem {
  margin: 25px 0;
  display: flex;
  border-radius: 11px;
  overflow: hidden;
  box-shadow: 0 1px 30px -4px var(--shadow);
  transition: box-shadow 0.5s;
  background-color: var(--defaultColor);
}

@media screen and (max-width: 768px) {
  .articleItem {
    flex-direction: column;
    height: 350px;
  }

  .summary {
    height: 35px !important;
  }
}

.articleItem:hover {
  box-shadow: 0 1px 20px 10px var(--shadow);
}

.articleItem .bgi:hover .imgBg {
  transform: scale(1.2);
}

.articleItem .content {
  padding: 20px;
}

@media screen and (max-width: 720px) {
  .articleItem .content {
    padding: 10px;
  }
}

.articleItem .content,
.articleItem .bgi {
  flex: 1;
}

.articleTitle p {
  display: inline-block;
  margin: 0 auto;
  padding: 1.5625rem 0;
  font-size: 18px;
  color: #504e4e;
}

.articleTitle p::after {
  content: "";
  text-align: center;
  margin: 0 auto;
  display: block;
  width: 0px;
  height: 4px;
  background-color: #2abce9;
  transition: 1s all cubic-bezier(0.46, 1, 0.23, 1);
}

.articleTitle p:hover::after {
  /* width: 10.9375rem; */
  width: 100%;
}

.see {
  display: flex;
  padding: 1.5625rem;
  padding-top: 0;
  border-bottom: 1px dotted #ccc;
  font-family: "Merriweather Sans", Helvetica, Tahoma, Arial, "PingFang SC",
    "Hiragino Sans GB", "Microsoft Yahei", "WenQuanYi Micro Hei", sans-serif;
  font-weight: 400;
}

.see p {
  flex: 1;
  font-size: 15px;
}

.see p span {
  margin-left: 5px;
}

.bgi {
  overflow: hidden;
}

.bgi .imgBg {
  position: relative;
  width: 100%;
  height: 100%;
  /* background-image: url(@/assets/img/sw.jpg); */
  background-size: cover;
  transition: transform 0.5s;
  background-color: var(--theme-color);
}

.bgi .imgBg img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.summary {
  padding: 10px;
  height: 100px;
  font-family: system-ui;
}

.summary p {
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  font-weight: lighter;
  font-size: 15px;
  overflow: hidden;
  color: rgba(0, 0, 0, 0.66);
}

.releaseTime {
  display: flex;
  align-items: center;
  font-family: "Merriweather Sans", Helvetica, Tahoma, Arial, "PingFang SC",
    "Hiragino Sans GB", "Microsoft Yahei", "WenQuanYi Micro Hei", sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: #888;
}

.releaseTime .iconfont {
  margin-right: 5px;
}
</style>
