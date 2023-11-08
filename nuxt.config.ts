const lifecycle = process.env.npm_lifecycle_event;
import viteCompression from "vite-plugin-compression";
import IconsResolver from "unplugin-icons/resolver";
import Components from "unplugin-vue-components/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  nitro: {
    devProxy: {
      "/proxy": { target: "http://127.0.0.1:3000/api/v1", changeOrigin: true },
    },
  },
  devtools: { enabled: true },
  dir: {
    static: "/public",
  },
  modules: ["@element-plus/nuxt"],
  typescript: {
    shim: false,
    strict: false,
  },
  srcDir: "src",
  vite: {
    build: {},
    plugins: [
      viteCompression(),
      Components({
        dts: true,
        resolvers: [IconsResolver({})],
      }),
    ],
    esbuild: {
      drop: ["console", "debugger"],
    },
  },
  components: {
    dirs: ["~/composables", "~/components"],
    global: true,
  },
  routeRules: {
    "/chat": { ssr: false },
  },
  app: {
    head: {
      htmlAttrs: {
        lang: "zh-CN",
      },
      titleTemplate: `小析のblog - %s`,
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          hid: "description",
          name: "description",
          content:
            "小析のblog,采用nuxt3开发的一款个人博客网站,网站主要分享web技术、技巧等",
        },
        {
          hid: "keywords",
          name: "keywords",
          content:
            "小析,blog,博客,nuxt3,nuxt3博客,个人博客,个人博客网站,个人博客网页,博客页面,小析のblog",
        },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },
  build: {
    analyze: true,
    transpile: lifecycle === "build" ? ["element-plus"] : [],
  },
  runtimeConfig: {
    public: {
      requestBaseUrl: process.env.API_HOST + process.env.API_PREFIX,
      socket_url: process.env.WS_HOST,
    },
  },
});
