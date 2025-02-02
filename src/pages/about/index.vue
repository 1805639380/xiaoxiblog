<template>
  <nuxt-layout name="default">
    <Banner :height="'50vh'" :background="background">关于</Banner>
    <nuxt-layout name="container" :showUserInfo="false">
      <template #containerLeftMain>
        <div class="about-box">
          <div class="title">
            <span>【关于我】</span>
          </div>
          <div class="content">
            <ul>
              <li>
                <div class="tag">昵称：</div>
                <div class="ins">Hoiolo</div>
              </li>
              <li>
                <div class="tag">性别：</div>
                <div class="ins">男</div>
              </li>
              <li>
                <div class="tag">年龄：</div>
                <div class="ins">{{ AGE }}</div>
              </li>
              <li>
                <div class="tag">职业：</div>
                <div class="ins">在校学生</div>
              </li>
              <li>
                <div class="tag">爱好：</div>
                <div class="ins">编程，看电影，听音乐</div>
              </li>
              <li class="skill">
                <div class="tag">技能：</div>
                <div class="ins">
                  <div class="progress">
                    <span>Java</span>
                    <el-progress :percentage="60" color="#f56c6c" />
                    <span>JavaScript</span>
                    <el-progress :percentage="85" color="#e6a23c" />
                    <span>HTML + CSS</span>
                    <el-progress :percentage="88" color="#67c23a" />
                    <span>Node.js</span>
                    <el-progress :percentage="76" color="yellow" />
                    <span>Python</span>
                    <el-progress :percentage="58" color="#409eff" />
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="about-box">
          <div class="title">
            <span>【关于博客】</span>
          </div>
          <div class="content">
            <ul>
              <li>目前正在制作中...</li>
            </ul>
          </div>
        </div>
      </template>
    </nuxt-layout>
  </nuxt-layout>
</template>
  
<script setup lang='ts'>

const background: string = 'https://cloud.hoiolo.cn/image/c841301f2c45f25bf3dedff2583aaa53.jpg!v1'

const BIRTH: number = 2002
const date: Date = new Date()
const AGE: number = date.getFullYear() - BIRTH


useHead({
  title: "关于"
})

</script>
  
<style scoped>
.container {
  flex-direction: column;
  align-items: center;
}

.about-box {
  width: 100%;
  margin-bottom: var(--mtop);
  font-family: tsxmm;
}

.about-box .title {
  text-align: center;
  font-size: 25px;
  color: #848484;
  margin-bottom: 50px;
  font-weight: bold;
}

.about-box .content {
  border: 1px dotted #ccc;
  padding: 10px;
  color: #848484;
  font-size: 14px;
  border-radius: var(--radius);
}

.about-box .content ul {
  list-style: disc;
  padding-left: 40px;
}

.about-box .content li {
  display: flex;
  flex-wrap: wrap;
  margin: 20px 0;
}

.about-box .content .skill {
  display: block;
}

.about-box .content .skill .ins {
  padding-left: 50px;
  font-size: 14px;
  font-family: '钉钉进步体 Regular';
}

.el-progress {
  margin: 15px 0;
}

@media screen and (max-width:768px) {
  .about-box {
    flex: 1;
  }

  .about-box .content {
    border: none;
  }
}
</style>