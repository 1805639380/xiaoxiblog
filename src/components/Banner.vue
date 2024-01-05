<template>
  <div
    id="bgcBox"
    :style="{
      background: background.includes('http')
        ? `url(${background})`
        : background,
    }"
  >
    <div class="middleInfo">
      <p :class="{ gradationText: props.gradationText }">
        <slot></slot>
      </p>
    </div>
    <svg
      v-if="showWave"
      data-v-6756c784=""
      data-v-ff49af5d=""
      class="waves"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox="0 24 150 28"
      preserveAspectRatio="none"
      shape-rendering="auto"
    >
      <defs data-v-6756c784="">
        <path
          id="gentle-wave"
          d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
          data-v-6756c784=""
        ></path>
      </defs>
      <g class="parallax" data-v-6756c784="">
        <use
          class="use"
          xlink:href="#gentle-wave"
          x="48"
          y="0"
          data-v-6756c784=""
        ></use>
        <use
          class="use"
          xlink:href="#gentle-wave"
          x="48"
          y="3"
          data-v-6756c784=""
        ></use>
        <use
          class="use"
          xlink:href="#gentle-wave"
          x="48"
          y="5"
          data-v-6756c784=""
        ></use>
        <use
          class="use"
          xlink:href="#gentle-wave"
          x="48"
          y="7"
          data-v-6756c784=""
        ></use>
      </g>
    </svg>
    <div class="guidelines" v-if="showGFuide">
      <a href="#main">
        <svg
          t="1704450312483"
          class="icon arrow-down"
          viewBox="0 0 1026 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="11976"
          width="32"
          height="32"
        >
          <path
            d="M857.088 224.256q28.672-28.672 69.12-28.672t69.12 28.672q29.696 28.672 29.696 68.608t-29.696 68.608l-382.976 380.928q-12.288 14.336-30.72 19.968t-38.912 4.608-40.448-8.704-34.304-22.016l-376.832-374.784q-29.696-28.672-29.696-68.608t29.696-68.608q14.336-14.336 32.256-21.504t36.864-7.168 37.376 7.168 32.768 21.504l313.344 309.248z"
            p-id="11977"
            fill="#fff"
          ></path>
        </svg>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    height?: string;
    background?: string;
    gradationText?: boolean;
    showWave?: boolean;
    showGFuide?: boolean;
  }>(),
  {
    height: "80vh",
    background: "linear-gradient(135deg,#FF9D6C 10%,#BB4E75 100%)",
    showWave: false,
    showGFuide: false,
  }
);
</script>

<style scoped>
.guidelines {
  position: absolute;
  left: 50%;
  bottom: 70px;
  z-index: 9;
  transform: translateY(-50%);
}
.arrow-down {
  -webkit-animation: arrow-shake 1.5s ease-out infinite;
  animation: arrow-shake 1.5s ease-out infinite;
  cursor: pointer;
}
@keyframes arrow-shake {
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  30% {
    opacity: 0.5;
    transform: translateY(25px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
.waves {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 12vh;
  min-height: 3.125rem;
  max-height: 9.375rem;
}
.parallax .use:nth-child(1) {
  animation-delay: -2s;
  animation-duration: 7s;
  fill: var(--grey-1-a7);
}
.parallax .use:nth-child(2) {
  animation-delay: -3s;
  animation-duration: 10s;
  fill: var(--grey-1-a5);
}
.parallax .use:nth-child(3) {
  animation-delay: -4s;
  animation-duration: 13s;
  fill: var(--grey-1-a3);
}
.parallax .use:nth-child(4) {
  animation-delay: -5s;
  animation-duration: 20s;
  fill: var(--grey-1);
}

.parallax .use {
  animation: move-forever 25s cubic-bezier(0.55, 0.5, 0.45, 0.5) infinite;
}
@keyframes move-forever {
  0% {
    transform: translate3d(-90px, 0, 0);
  }
  100% {
    transform: translate3d(85px, 0, 0);
  }
}

#bgcBox {
  /* height: 100vh; */
  height: v-bind(height);
  overflow: hidden;
  border-radius: 0 0 20px 20px;
}

#bgcBox .middleInfo {
  position: absolute;
  left: 50%;
  top: 50%;
  /* width: fit-content; */
  width: 100%;
  text-align: center;
  transform: translateX(-50%) translateY(-50%);
}

#bgcBox .middleInfo p {
  font-size: 5rem;
  color: #fff;
  font-weight: 900;
  text-shadow: 0 0 15px;
  animation: textChange 3s linear infinite;
  font-family: tsxmm;
}

#bgcBox .middleInfo .gradationText {
  color: transparent;
  background-clip: text;
  -webkit-background-clip: text;
  background-image: linear-gradient(#accbee, #ace0f9 100%);
  animation: none;
}

@keyframes textChange {
  0%,
  100% {
    text-shadow: 4px 6px 25px rgb(241, 101, 101);
  }

  50% {
    text-shadow: 0 0 10px rgb(241, 101, 101);
  }
}

#bgcBox {
  position: relative;
  /* background: url("assets/img/48.jpg") no-repeat; */
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
}

#bgcBox::before {
  content: "";
  display: block;
  float: left;
  width: 100%;
  height: 100%;
  background-image: url("https://cloud.afblog.xyz/image/grid.png");
}

@media screen and (max-width: 320px) {
  #app #bgcBox {
    height: 280px;
  }
}

@media screen and (max-width: 768px) {
  #bgcBox {
    height: 338px;
    background-size: 100% 90vw;
    background-image: url(assets/img/mhome.jpg) !important;
  }
}
</style>
