<template>
  <div id="notice">
    <span class="iconfont">&#xe614;</span>
    <p>朋友，感谢你的到来~</p>
  </div>
</template>

<script setup lang='ts'>

</script>

<style scoped>
#notice {
  display: flex;
  align-items: center;
  border: 1px dotted #444;
  border-radius: 22px;
  margin-bottom: var(--mtop);
  padding-left: 25px;
  box-sizing: border-box;
  line-height: 50px;
  /* box-shadow: 0 0 10px #ccc; */
  font-size: 18px;
  background-color: var(--defaultColor);
}

#notice span {
  font-size: 25px;
  color: #444;
}

#notice p {
  margin-left: 15px;
}
</style>