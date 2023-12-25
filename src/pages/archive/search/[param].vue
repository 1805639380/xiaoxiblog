<template>
    <NuxtLayout name="default">
        <Banner :height="'40vh'">搜索结果</Banner>
        <div class="search_box">
            <div class="c-search">
                <input type="text" v-model="searchParam" @keydown.enter="handleSearch" ref="search" placeholder="搜索"
                    title="请填写此字段" />
            </div>
        </div>
        <nuxt-layout name="container" :showUserInfo="false">
            <template #containerLeftMain>
                <ArticleWrap :keyword="searchParam" :field="searchField" :currentPage="1" :offset="5"
                    :articleList="articleList" :count="articleCount" />
            </template>
        </nuxt-layout>
    </NuxtLayout>
</template>

<script setup lang='ts'>
import { selectArticle } from '~/api/articleApi';

useHead({
    title: '搜索结果'
})
const route = useRoute()
const param = route.params.param

const articleList = ref([])
const articleCount = ref(0)
const searchParam = ref(param + '')

const searchField = 'title'

async function handleSearch() {
    const { data: responseData } = await selectArticle({
        keyword: searchParam.value + '',
        field: searchField,
        offset: 5,
    }, false)

    if (responseData.value?.code === 1001) {
        articleList.value = responseData.value.data.rows
        articleCount.value = responseData.value.data.count
    }
    console.log(responseData.value);

}

onMounted(async () => {
    await handleSearch()
})

</script>

<style scoped>
.search_box .c-search {
    padding-top: 50px;
    text-align: center;
    color: #fff;
}

.search_box .c-search h2 {
    position: relative;
    bottom: 80px;
    font-size: 35px;
    color: orange;
}

.search_box .c-search input {
    width: 50rem;
    height: 50px;
    border-radius: 22px;
    border: none;
    padding-left: 55px;
    border: 1px solid #ccc;
    font-size: 25px;
    font-family: cursive;
    background: url(assets/img/search.svg) no-repeat #fff;
    background-size: 32px;
    background-position: 10px;
}
</style>