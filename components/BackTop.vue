<template>
  <div id="backTop">
    <a href="javascript:void(0)" :class="{ isShow: windowScrollTop > 200 }" @click="backTopFun"></a>
  </div>
</template>

<script setup lang="ts">

let windowScrollTop = ref(0)

let isStickTop = ref(true)

let backTopFun = ref(() => { })

onMounted(() => {
  windowScrollTop.value = document.documentElement.scrollTop
  window.addEventListener('scroll', e => {
    //滚动条高度大于10的时候导航栏固定
    windowScrollTop.value = document.documentElement.scrollTop

    windowScrollTop.value > 10 ? isStickTop.value = true : isStickTop.value = false
  })

  backTopFun.value = function () {
    let top = document.documentElement.scrollTop || document.body.scrollTop;
    // 实现滚动效果
    const timeTop = setInterval(() => {

      document.body.scrollTop =
        document.documentElement.scrollTop =
        top -=
        50;
      if (top <= 0) {
        clearInterval(timeTop);
      }
    }, 10);
  }
})


</script>

<style scoped>
.isShow {
  background-position-y: -35vh !important;
  animation: backTop 1.6s linear infinite;
  height: 100vh !important;
}

#backTop a {
  position: fixed;
  right: 1.875rem;
  height: 0vh;
  width: 80px;
  background: url(assets/img/scroll.png) no-repeat center;
  background-position-y: -1050px;
  z-index: 9;
  transition: all .3s linear;
}

@keyframes backTop {

  0%,
  100% {
    transform: translateY(-10px);
    -webkit-transform: translateY(-10px);
    -moz-transform: translateY(-10px);
    -ms-transform: translateY(-10px);
  }

  50% {
    transform: translateY(0);
    -webkit-transform: translateY(0px);
    -moz-transform: translateY(0px);
    -ms-transform: translateY(0px);
  }
}
</style>