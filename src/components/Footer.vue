<template>
  <div id="footer">
    <span>小析のblog-afblog.xyz @ All Hololo rights Reserved</span>
    <span>赣ICP备2020014038号-1 </span>
    <span>网站主要用于技术分享，若涉及个人权益请联系我们进行删除。</span>
    <span
      >本网站由<a
        href="https://www.upyun.com/?utm_source=lianmeng&utm_medium=referral"
        target="_blank"
        ><img class="ypy" src="~assets/img/ypy.png" alt="" /></a
      >提供CDN加速/云储存服务</span
    >
  </div>
</template>

<script setup lang="ts"></script>

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
</style>
