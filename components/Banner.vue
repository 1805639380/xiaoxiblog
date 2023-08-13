<template>
  <div id="bgcBox">
    <div class="middleInfo">
      <p>
        <slot></slot>
      </p>
    </div>
    <div class="banner_war1" v-if="showWar"></div>
    <div class="banner_war2" v-if="showWar"></div>
  </div>
</template>
  
<script setup lang='ts'>
const props = withDefaults(defineProps<{
  height?: string,
  showWar?: boolean,
  background?: string
}>(), {
  height: "80vh",
  showWar: false,
  background: "https://img-baofun.zhhainiao.com/fs/7c0eebecbe887fc488b77f9d14b00ef6.jpg"
})

const background = `url(${props.background})`

</script>
  
<style scoped>
.banner_war1,
.banner_war2 {
  width: auto;
  _filter: alpha(opacity=80);
  position: absolute;
  bottom: 0;
  width: 400%;
  left: -236px;
  z-index: 4;
  opacity: 1;
  transition-duration: .4s, .4s;
  animation-duration: 120s;
  animation-fill-mode: backwards;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

.banner_war1 {
  height: 65px;
  background-image: url("~/assets/img/wave1.png");
  animation-name: move1;
}

.banner_war2 {
  height: 80px;
  background-image: url("~/assets/img/wave2.png");
  animation-name: move2;
}

@keyframes move1 {

  0%,
  100% {
    background-position: 0 0;
  }

  50% {
    background-position: 50% 0;
  }
}

@keyframes move2 {

  0%,
  100% {
    background-position: 0 0;
  }

  50% {
    background-position: -100% 0;
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
  width: fit-content;
  transform: translateX(-50%) translateY(-50%);
}

#bgcBox .middleInfo p {
  font-size: 5.3125rem;
  color: #fff;
  font-weight: 900;
  text-shadow: 0 0 15px;
  animation: textChange 3s linear infinite;
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
  background: v-bind(background) no-repeat;
  background-size: cover;
  background-attachment: fixed;
}

#bgcBox::before {
  content: "";
  display: block;
  float: left;
  width: 100%;
  height: 100%;
  background-image: url(https://cdn.jsdelivr.net/gh/moezx/cdn@3.1.9/img/Sakura/images/grid.png);
}

@media screen and (max-width:320px) {
  #app #bgcBox {
    height: 280px;
  }
}

@media screen and (max-width: 768px) {
  #bgcBox {
    height: 338px;
    background-size: 100% 90vw;
    background-image: url(assets/img/mhome.jpg);
  }
}
</style>