<template>
  <div class="loading">
    <div class="loading_content">
      <!-- <div class="loading_animation" ref="lottieAnimationRef"></div> -->
      <div class="sk-chase">
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
      </div>
      <div class="loading_text">{{ loadingText }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Lottie from "lottie-web";
import loadingData from "@/assets/lottie/loading.json";

const loadingText = ref("首次加载较慢，请耐心等待~");
useHead({
  title: "加载中~",
});
const lottieAnimationRef = ref(null);
onMounted(() => {
  //   Lottie.loadAnimation({
  //     container: lottieAnimationRef.value,
  //     renderer: "svg",
  //     animationData: loadingData,
  //     autoplay: true,
  //     loop: true,
  //   });
});
</script>

<style scoped>
.loading {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  background-color: #fff;
}
.loading_content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.loading_animation {
  width: 100%;
  height: 40%;
}
.loading_text {
  font-size: 18px;
  color: #ff8383;
}
.sk-chase {
  width: 80px;
  height: 80px;
  position: relative;
  margin-bottom: 50px;
  animation: sk-chase 2.5s infinite linear both;
}

.sk-chase-dot {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  animation: sk-chase-dot 2s infinite ease-in-out both;
}

.sk-chase-dot:before {
  content: "";
  display: block;
  width: 25%;
  height: 25%;
  background-color: red;
  background-image: linear-gradient(135deg, #fff3b0 10%, #ca26ff 100%);
  border-radius: 100%;
  animation: sk-chase-dot-before 2s infinite ease-in-out both;
}

.sk-chase-dot:nth-child(1) {
  animation-delay: -1.1s;
}
.sk-chase-dot:nth-child(2) {
  animation-delay: -1s;
}
.sk-chase-dot:nth-child(3) {
  animation-delay: -0.9s;
}
.sk-chase-dot:nth-child(4) {
  animation-delay: -0.8s;
}
.sk-chase-dot:nth-child(5) {
  animation-delay: -0.7s;
}
.sk-chase-dot:nth-child(6) {
  animation-delay: -0.6s;
}
.sk-chase-dot:nth-child(1):before {
  animation-delay: -1.1s;
}
.sk-chase-dot:nth-child(2):before {
  animation-delay: -1s;
}
.sk-chase-dot:nth-child(3):before {
  animation-delay: -0.9s;
}
.sk-chase-dot:nth-child(4):before {
  animation-delay: -0.8s;
}
.sk-chase-dot:nth-child(5):before {
  animation-delay: -0.7s;
}
.sk-chase-dot:nth-child(6):before {
  animation-delay: -0.6s;
}

@keyframes sk-chase {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes sk-chase-dot {
  80%,
  100% {
    transform: rotate(360deg);
  }
}

@keyframes sk-chase-dot-before {
  50% {
    transform: scale(0.4);
  }
  100%,
  0% {
    transform: scale(1);
  }
}
</style>
