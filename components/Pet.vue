<template>
  <div id="pet"></div>
</template>

<script setup lang="ts">
import animationData from "@/assets/lottie/robot.json";
import lottie from "lottie-web";
onMounted(() => {
  const pet = document.getElementById("pet");
  const petLottie = lottie.loadAnimation({
    container: pet,
    renderer: "svg",
    animationData,
    loop: false,
    autoplay: true,
  });

  pet.addEventListener("click", function () {
    petLottie.playSegments([0, petLottie.totalFrames], true);
  });
});
</script>

<style scoped>
#pet {
  position: fixed;
  bottom: 50px;
  left: 0;
  width: 200px;
  height: 200px;
}
@media screen and (max-width: 1024px) {
  #pet {
    display: none;
  }
}
@media screen and (max-width: 720px) {
  #pet {
    display: none;
  }
}
</style>
