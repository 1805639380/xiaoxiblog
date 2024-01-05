<template>
  <div id="notice">
    <span class="iconfont">&#xe614;</span>
    <p>朋友，感谢你的到来~</p>
    <div class="loader"></div>
  </div>
</template>

<script setup lang='ts'>

</script>

<style scoped>
#notice {
  display: flex;
  align-items: center;
  border-radius: 10px;
  margin-bottom: var(--content-margin);
  padding-left: 25px;
  box-sizing: border-box;
  line-height: 50px;
  box-shadow: 0 1px 30px -4px var(--shadow);
  font-size: 18px;
  background-color: var(--defaultColor);
  transition: all .25s;
}

#notice:hover {
  box-shadow: 0 1px 20px 10px var(--shadow);
}

#notice span {
  font-size: 25px;
  color: #444;
}

#notice p {
  margin-left: 15px;
  font-family: tsxmm;
}
.loader {
  --loader-color: #909090;
  width: 4px;
  height: 20px;
  border-radius: 4px;
  display: block;
  background-color: var(--loader-color);
  margin-left: auto;
  margin-right: 30px;
  position: relative;
  color: #f2f2f2;
  animation: animloader 0.3s 0.3s linear infinite alternate;
}

.loader::after,
.loader::before {
  content: '';
  width: 4px;
  height: 20px;
  border-radius: 4px;
  background: var(--loader-color);
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 10px;
  animation: animloader 0.3s 0.45s linear infinite alternate;
}

.loader::before {
  left: -10px;
  animation-delay: 0s;
}

@keyframes animloader {
  0% {
    height: 15px;
  }

  100% {
    height: 5px;
  }
}
</style>