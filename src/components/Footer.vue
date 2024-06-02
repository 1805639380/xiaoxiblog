<template>
  <div id="footer">
    <span v-for="item in props.list" v-html="item"></span>
  </div>
</template>

<script setup lang="ts">
interface footerProps {
  list: string[];
}
const props = defineProps<footerProps>();
</script>

<style scoped>
#footer {
  padding: 15px;
  text-align: center;
  /* background-color: rgba(250, 248, 248,.5); */
}

#footer span,
#footer > a {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  color: #848484;
  font-size: 12px;
}

.ypy {
  height: 25px;
  margin-right: 8px;
  margin-left: 5px;
}
.beianlink:hover {
  color: var(--baseColor);
}
</style>
