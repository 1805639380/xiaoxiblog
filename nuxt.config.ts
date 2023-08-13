import { defineNuxtConfig } from 'nuxt'

const lifecycle = process.env.npm_lifecycle_event;

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  typescript: {
    shim: false,
  },
  components: true,
  vite: {

  },
  autoImports: {
    dirs: ['composables/**', 'types/**'],
    global: true
  },
  app: {
    head: {
      titleTemplate: `小析のblog - %s`,
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: '小析のblog,采用nuxt3开发的一款个人博客网站,网站主要分享web技术、技巧等' },
        { hid: 'keywords', name: 'keywords', content: '小析,blog,博客,nuxt3,nuxt3博客,个人博客,个人博客网站,个人博客网页,博客页面,小析のblog' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },
  build: {
    cache: true,
    parallel: true, //开启多线程构建项目
    transpile: lifecycle === "build" ? ["element-plus"] : [],
  },
  runtimeConfig: {
    public: {
      requestBaseUrl: "http://localhost:3000",
      socket_url: "http://localhost:3000"
    }
  }
})
