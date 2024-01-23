const lifecycle = process.env.npm_lifecycle_event;
import viteCompression from "vite-plugin-compression";
import IconsResolver from "unplugin-icons/resolver";
import Components from "unplugin-vue-components/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  hooks: {
    "build:manifest": (manifest) => {
      // 找到应用程序入口的CSS列表
      const css = manifest["node_modules/nuxt/dist/app/entry.js"]?.css;
      if (css) {
        // 从数组的末尾开始，向前遍历
        for (let i = css.length - 1; i >= 0; i--) {
          // 如果以'entry'开头，从列表中删除它
          if (css[i].startsWith("entry")) css.splice(i, 1);
        }
      }
    },
  },
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
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("node_modules")) {
              // 让每个插件都打包成独立的文件
              return id
                .toString()
                .split("node_modules/")[1]
                .split("/")[0]
                .toString();
            }
          },
        },
      },
    },
    plugins: [
      viteCompression({
        verbose: true,
        threshold: 10240,
      }),
      Components({
        dts: true,
        resolvers: [IconsResolver({})],
      }),
    ],
    esbuild: {
      drop:
        process.env.NODE_ENV !== "development" ? ["console", "debugger"] : [],
    },
  },
  components: {
    dirs: ["~/composables", "~/components"],
    global: true,
  },
  routeRules: {},
  app: {
    head: {
      htmlAttrs: {
        lang: "zh-CN",
      },
      titleTemplate: `web技术交流分享网 - %s`,
      meta: [
        { name: "baidu-site-verification", content: "codeva-slR3BYfrFS" },
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
  experimental: {
    writeEarlyHints: true,
    asyncContext: true,
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
