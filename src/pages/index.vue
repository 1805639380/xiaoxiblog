<template>
  <div class="home">
    <nuxt-layout name="default" :user="userData">
      <Banner
        :showWave="true"
        :gradationText="true"
        height="100vh"
        :showGFuide="true"
      >
        <span ref="typedString" class="typedString"></span>
      </Banner>
      <nuxt-layout name="container" :user="userData" :showRight="true">
        <template #containerLeftTop>
          <Notice />
        </template>
        <template #containerLeftMain>
          <div id="main">
            <el-skeleton :loading="pending" :rows="5" animated>
              <template #default>
                <div class="recommend" v-if="artilceData.length > 0">
                  <div class="recommend_tag"></div>
                  <el-carousel height="200px" :interval="5000" arrow="always">
                    <el-carousel-item
                      v-for="item in carouselArtilceData"
                      :key="item.id"
                    >
                      <nuxt-link :to="'/article/' + item.id">
                        <el-image
                          fit="cover"
                          :src="item.pic"
                          :alt="item.title"
                        />
                        <div class="carousel_item_wrap">
                          <div class="carousel_item_title">
                            <h3 text="2xl" justify="center">
                              {{ item.title }}
                            </h3>
                          </div>
                          <div class="carousel_item_text">
                            <p>
                              发布时间：<span>{{ item.publish_date }}</span>
                            </p>
                          </div>
                        </div>
                      </nuxt-link>
                    </el-carousel-item>
                  </el-carousel>
                </div>
                <ArticleWrap
                  :currentPage="1"
                  :offset="5"
                  :articleList="artilceData"
                  :count="articleCount"
                ></ArticleWrap>
              </template>
            </el-skeleton>
          </div>
        </template>
        <template #containerRight>
          <TagsBox />
        </template>
      </nuxt-layout>
    </nuxt-layout>
  </div>
</template>

<script setup lang="ts">
import { dayjs } from "element-plus";
import Typed from "typed.js";
import { selectArticle } from "~/api/articleApi";
import type { ArticleType } from "~/types/article";

const artilceData = ref<Array<ArticleType>>([]);
const articleCount = ref<number>(0);

const carouselArtilceData = computed(() => {
  if (!artilceData.value) return [];
  const d = artilceData.value?.slice(0, 3);
  const n = [];
  d.forEach((item) => {
    let pic = transformUpYunPicUrl({
      url: item.pic,
      options: {
        quality: 80,
        widthAndHeight: "700x200",
      },
    });
    let publish_date = dayjs(item.publish_date).format("YYYY-MM-DD");
    n.push({
      ...item,
      pic,
      publish_date,
    });
  });
  return n;
});

const typedString = ref<Element | null>(null);

const websiteSetting = await useWebsiteSetting();

let options = {
  strings: websiteSetting.value.typed_text.split("\n"),
  typeSpeed: 100,
  backSpeed: 100,
  loop: true,
  smartBackspace: true,
};

onMounted(() => {
  let typed = new Typed(typedString.value, options);
});

useHead({
  title: "首页",
});
const userData = await useUserState();

let { data: articleRes, refresh, pending } = await selectArticle();

watch(articleRes, (newArticleRes) => {
  if (newArticleRes) {
    artilceData.value = newArticleRes.data.rows;
    articleCount.value = newArticleRes.data.count;
  }
});

if (articleRes.value) {
  artilceData.value = articleRes.value.data.rows;
  articleCount.value = articleRes.value.data.count;
}
</script>

<style scoped>
.tags_box {
  margin-top: var(--content-margin);
}
.home {
  /* background-image: url("~/assets/img/IMG_202207165084_rotated.jpg"); */
  background-size: 40%;
  background-attachment: fixed;
  background-position-x: 0;
  background-position-y: bottom;
  background-repeat: no-repeat;
}
.recommend {
  position: relative;
}
.recommend .recommend_tag {
  position: absolute;
  overflow: hidden;
  width: 150px;
  height: 150px;
  top: -10px;
  left: -10px;
  z-index: 9;
  display: flex;
  align-items: center;
  justify-content: center;
}

.recommend .recommend_tag::before {
  content: "推荐";
  position: absolute;
  width: 150%;
  height: 40px;
  background-image: linear-gradient(
    45deg,
    #ff6547 0%,
    #ffb144 51%,
    #ff7053 100%
  );
  transform: rotate(-45deg) translateY(-20px);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.23);
}

.recommend .recommend_tag::after {
  content: "";
  position: absolute;
  width: 10px;
  bottom: 0;
  left: 0;
  height: 10px;
  z-index: -1;
  box-shadow: 140px -140px #cc3f47;
  background-image: linear-gradient(
    45deg,
    #ff512f 0%,
    #f09819 51%,
    #ff512f 100%
  );
}
.el-carousel {
  border-radius: 11px;
}
.el-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.carousel_item_wrap {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: var(--content-margin);
  z-index: 2;
  background: rgba(0, 0, 0, 0.1);
}
.el-carousel__item h3 {
  color: var(--defaultColor);
  text-align: center;
  font-size: 2rem;
  font-family: "tsxmm";
}

.el-carousel__item .carousel_item_text {
  color: var(--defaultColor);
  font-size: 1rem;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
:deep(.el-carousel__indicator .el-carousel__button) {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
:deep(.el-carousel__indicator.is-active .el-carousel__button) {
  width: 24px;
  border-radius: 4px;
  background-color: var(--baseColor);
}
@media screen and (max-width: 768px) {
  .el-carousel__item h3 {
    font-size: 3rem;
  }
  .el-carousel__item .carousel_item_text {
    font-size: 2rem;
  }
}
</style>
