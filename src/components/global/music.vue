<template>
  <div class="musicBox">
    <div id="aplayer" autoplay ref="aplyaerEl"></div>
  </div>
</template>

<script setup>
import "aplayer/dist/APlayer.min.css";
import APlayer from "aplayer";
import { getMusic } from "~/api/music";

const aplyaerEl = ref(null);

const { data: musicData } = await getMusic({
  id: "815325950",
  type: "playlist",
  server: "tencent",
});

onMounted(() => {
  const options = {
    container: aplyaerEl.value,
    fixed: true,
    audio: musicData.value || [],
  };

  const ap = new APlayer(options);

  watch(musicData, (newVal) => {
    ap.list.add(newVal);
  });
});
</script>

<style>

</style>
