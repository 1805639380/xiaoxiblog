<template>
  <div id="backTop">
    <div
      class="back"
      :class="{
        isShow: windowScrollTop > 200,
        backTopFadeOut: !isFirstScroll && windowScrollTop < 200,
      }"
      @click="backTopFun"
    >
      <img src="~assets/img/scroll.png" alt="" />
    </div>
  </div>
</template>

<script setup lang="ts">
let windowScrollTop = ref(0);

let isStickTop = ref(true);
const isFirstScroll = ref(true);

let backTopFun = ref(() => {});

const backTopDown = (e) => {
  //滚动条高度大于10的时候导航栏固定
  windowScrollTop.value = document.documentElement.scrollTop;

  windowScrollTop.value > 10
    ? (isStickTop.value = true)
    : (isStickTop.value = false);

  if (isFirstScroll.value && windowScrollTop.value > 200) {
    isFirstScroll.value = false;
  }
};

onMounted(() => {
  windowScrollTop.value = document.documentElement.scrollTop;

  window.addEventListener("scroll", backTopDown);

  const clientWidth = document.documentElement.clientWidth;

  if (clientWidth <= 768) {
    window.removeEventListener("scroll", backTopDown);
  }

  backTopFun.value = function () {
    let top = document.documentElement.scrollTop || document.body.scrollTop;
    let speed = Math.ceil(top / 10); // 每次滚动多少 （步长值）
    // 实现滚动效果
    const timeTop = setInterval(() => {
      document.documentElement.scrollTop = top -= speed;
      if (top <= 0) {
        clearInterval(timeTop);
      }
    });
  };
});

onUnmounted(() => {
  window.removeEventListener("scroll", backTopDown);
});
</script>

<style scoped>
#backTop .back {
  position: fixed;
  right: 1.875rem;
  z-index: 9;
  transform: translate3d(0, -1050px, 0);
  cursor: pointer;
}

#backTop .isShow {
  transform: translate3d(0, 0, 0);
  animation: backTopFadeIn 0.3s linear forwards,
    upAndDownAnimate 1.6s 0.3s linear infinite;
}

#backTop .backTopFadeOut {
  animation: backTopFadeOut 0.3s linear forwards;
}

@keyframes upAndDownAnimate {
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
@keyframes backTopFadeIn {
  0% {
    transform: translateY(-1050px);
  }

  100% {
    transform: translateY(0);
  }
}
@keyframes backTopFadeOut {
  0% {
    transform: translateY(0);
  }

  100% {
    transform: translateY(-1050px);
  }
}
@media screen and (max-width: 768px) {
  #backTop {
    display: none;
  }
}
</style>
