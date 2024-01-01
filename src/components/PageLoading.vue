<template>
  <div ref="loadingEl" class="loading animate__animated animate__fadeInLeftBig">
    <div class="loading_content">
      <div class="loaders">
        <div class="loader"></div>
        <div class="loader"></div>
        <div class="loader"></div>
      </div>
      <div class="loading_text">{{ loadingText }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
const loadingText = ref("加载中……若是首次加载较慢，请耐心等待~");
useHead({
  title: "加载中~",
});
const props = defineProps<{
  isComplete: boolean;
  completeHandle: Function;
}>();

const loadingEl = ref<HTMLDivElement>(null);

const animationComplete = () => {
  setTimeout(() => {
    loadingEl.value.classList.add("complete");
    loadingEl.value.addEventListener("animationend", (e) => {
      props.completeHandle();
    });
  }, 1500);
};

onMounted(() => {
  animationComplete();
});
</script>

<style scoped>
:global(body) {
  overflow: hidden;
}
.loaders {
  display: flex;
  align-items: center;
  justify-content: center;
}

.loader {
  width: 48px;
  height: 48px;
  margin-bottom: 50px;
  margin-right: 50px;
  position: relative;
}

.loader:after {
  content: '';
  width: 100%;
  height: 100%;
  background: #f08080;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 4px;
  animation: jump7456 0.5s linear infinite;
}

.loader:nth-child(2) {
  width: 38px;
  height: 38px;
}

.loader:nth-child(2):before {
  width: 38px;
  top: 50px;
}

.loader:nth-child(1) {
  width: 28px;
  height: 28px;
}

.loader:nth-child(1):before {
  width: 28px;
  top: 40px;
}

@keyframes jump7456 {
  15% {
    border-bottom-right-radius: 3px;
  }

  25% {
    transform: translateY(9px) rotate(22.5deg);
  }

  50% {
    transform: translateY(18px) scale(1, .9) rotate(45deg);
    border-bottom-right-radius: 40px;
  }

  75% {
    transform: translateY(9px) rotate(67.5deg);
  }

  100% {
    transform: translateY(0) rotate(90deg);
  }
}

.loading {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  width: 100%;
  background-color: #E8E8E8;
}

.complete {
  animation: leave 1s forwards cubic-bezier(0.83, 0, 0.17, 1);
}

@keyframes leave {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(100%);
  }
}

.loading_content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.loading_text {
  font-size: 18px;
  color: #ff8383;
  font-family: tsxmm;
}
</style>
