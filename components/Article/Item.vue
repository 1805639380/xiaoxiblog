<template>
  <div class="articleItem" :class="{ rowReverse: props.isRowReverse }">
    <div class="content">
      <div class="releaseTime">
        <span class="iconfont">&#xe62b;</span>
        <span class="showtime">{{ props.articleData?.publish_date }}</span>
      </div>
      <div class="articleTitle">
        <p>
          <nuxt-link :to="'/archive/' + props.articleData?.article_id">{{ props.articleData?.article_title }}
          </nuxt-link>
        </p>
      </div>
      <div class="see">
        <p><span class="iconfont">&#xe668;</span><span class="num">{{ props.articleData?.article_watch }}</span></p>
        <p><span class="iconfont">&#xe67b;</span><span class="num">{{ props.articleData?.comment_num }}</span></p>
        <p><span class="iconfont">&#xe66b;</span> <span class="type">{{ props.articleData?.article_type }}</span></p>
      </div>
      <div class="summary">
        <p>
          {{ props.articleData?.article_snippet }}
        </p>
      </div>
    </div>
    <div class="bgi">
      <nuxt-link :to="'/archive/' + props.articleData?.article_id">
        <div class="imgBg">
          <img :src="props.articleData?.article_pic" :alt="props.articleData?.article_title">
        </div>
      </nuxt-link>
    </div>
  </div>
</template>

<script setup lang='ts'>
import articleType from '~~/types/article';


const props = withDefaults(defineProps<{
  isRowReverse?: boolean,
  articleData: articleType
}>(), {
  isRowReverse: false
})


</script>

<style scoped>
.rowReverse {
  flex-direction: row-reverse;
}

.articleItem {
  margin: 25px 0;
  display: flex;
  border-radius: 11px;
  overflow: hidden;
  box-shadow: 0 1px 30px -4px var(--shadow);
  transition: box-shadow .5s;
  background-color: var(--defaultColor);
}

@media screen and (max-width:768px) {
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
  padding: 10px;
}

.articleItem .content,
.articleItem .bgi {
  flex: 1;
}

.articleTitle p {
  display: inline-block;
  margin: 0 auto;
  padding: 1.5625rem;
  font-size: 25px;
}

.articleTitle p::after {
  content: "";
  text-align: center;
  margin: 0 auto;
  display: block;
  width: 0px;
  height: 4px;
  background-color: #2abce9;
  transition: 1s all cubic-bezier(.46, 1, .23, 1);
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
  width: 100%;
  height: 100%;
  /* background-image: url(@/assets/img/sw.jpg); */
  background-size: cover;
  transition: transform .5s;
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
  font-size: 18px;
  overflow: hidden;
}

.releaseTime {
  font-family: serif;
  font-size: 16px;
}

.releaseTime .iconfont {
  margin-right: 5px;
}
</style>