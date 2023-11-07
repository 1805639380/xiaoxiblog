<template>
  <div id="footer">
    <span>苏程室 - suchengshi.top @ All Suluo rights Reserved</span>
    <span>赣ICP备2020014038号-1 </span>
    <img id="" src="~assets/img/beian.png" alt="公安" />
    <a target="_blank" rel="noopener" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=36072202000182"
      style="display:inline-block;text-decoration:none;">
      <p style="float:left;height:20px;line-height:20px;margin: 0px 0px 0px 5px;">赣公网安备 36072202000182号</p>
    </a>
    <span>网站主要用于技术分享，若涉及个人权益请联系我们进行删除。</span>
  </div>
</template>

<script setup lang='ts'>

</script>

<style scoped>
#footer {
  padding: 15px;
  text-align: center;
  /* background-color: rgba(250, 248, 248,.5); */
}

#footer span,
#footer a {
  display: block;
  padding: 5px;
  color: #848484;
  font-size: 12px;
}

#footer img {
  position: relative;
  bottom: 5px;
  left: 5px;
}
</style>