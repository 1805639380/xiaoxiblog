import { defineNuxtPlugin } from '#app'
import UndrawUi from 'undraw-ui'
import 'undraw-ui/dist/style.css'

export default defineNuxtPlugin((nuxtApp) => {
  const app = nuxtApp.vueApp
  app.use(UndrawUi)
})