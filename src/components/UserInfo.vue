<template>
  <div class="userInfo">
    <div class="userIns">
      <img :src="transformUpYunPicUrl({ url: props.user.avatar || defaultAvatar, options: { width: 105, quality: 90 } })"
        alt="" />
      <div class="userName">{{ props.user.name || defaultName }}</div>
      <div class="userSignatrue" v-if="props.user.signature">{{ props.user.signature }}</div>
    </div>
    <div class="userData">
      <div class="userArticle">
        <div class="userData-label">文章</div>
        <div class="article-num">
          <nuxt-link :to="{path: '/article/user/' + props.user.id, query: {username: user.name}}">{{ 0 || props.user.article_num }}</nuxt-link>
        </div>
      </div>
      <div class="userLabel">
        <div class="userData-label">标签</div>
        <div class="article-num">
          <nuxt-link to="/">{{ '-' || props.user.labelnum }}</nuxt-link>
        </div>
      </div>
    </div>
    <div class="userContact">
      <a :href="'tencent://message/?uin='+ props.user.qq_no +'&Site=&Menu=yes'" title="qq">
        <el-tooltip content="qq" placement="bottom" effect="light">
          <svg t="1704006606664" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
            p-id="5422" width="25" height="25">
            <path
              d="M544.059897 959.266898h-64.949141c-228.633593 0-415.697442-187.063849-415.697442-415.697442v-64.949141c0-228.633593 187.063849-415.697442 415.697442-415.697442h64.949141c228.633593 0 415.697442 187.063849 415.697442 415.697442v64.949141c-0.001024 228.633593-187.064873 415.697442-415.697442 415.697442z"
              fill="#5EAADE" p-id="5423"></path>
            <path
              d="M729.459925 627.30075c-3.156638-39.628458-24.044923-83.747676-25.624058-105.910698l-22.084182-57.046794c-0.701361-23.73059 6.312253-78.252108-30.510759-146.611164s-110.820228-74.444654-124.497288-75.146016c-13.67706-0.701361-99.247252-1.402723-141.330987 72.944663-42.083735 74.347385-30.744205 148.812517-30.744205 148.812517l-23.523765 57.47785c-0.001024 0.002048-10.961716 26.222727-20.429584 58.135185-9.468891 31.913482-18.937783 82.063385-9.468892 92.233638 9.468891 10.170253 43.836626-46.643096 46.992565-51.902795 0 0 2.455277 27.179036 8.942615 41.382373l0.809893 1.776441 0.330715 0.722863 0.378837 0.826276 0.299999 0.652215 0.444366 0.960404 0.202729 0.435151a281.465052 281.465052 0 0 0 1.917738 4.024893l0.188394 0.386005c0.231398 0.473035 0.467916 0.952537 0.711601 1.442655l0.145391 0.291807c6.886653 13.807094 18.611164 33.823028 37.443487 50.420209l0.017406 0.015358-1.183612 0.387029c-10.666837 3.516022-31.69437 11.209497-40.624698 19.819348-1.717056 1.655623-2.987697 3.345033-3.650151 5.045707-5.376422 13.793783 4.208169 15.430976 20.574976 16.365783 16.365783 0.934807 94.922361 3.039916 125.563457-2.220807 0.407506-0.056314 0.787368-0.113651 1.171255-0.170989 2.710224 0.094197 5.25318 0.14225 7.828627 0.16075l0.151535 0.001024c0.83549 0.005119 1.66279 0.008191 2.474731 0.008191 0.496584 0 1.01467-0.002048 1.541971-0.006144l0.209896-0.001023a222.59267 222.59267 0 0 0 5.462429-0.106484c0.260067 0.037884 0.507847 0.075768 0.778152 0.113651 37.64212 5.260723 116.197674 3.156638 125.563457 2.220807 16.365783-0.934807 25.951397-2.572 20.573952-16.365783-4.301342-11.03646-34.17422-21.619339-45.956069-25.412834a141.388255 141.388255 0 0 0 7.958661-7.645351l0.236517-0.244709a142.494121 142.494121 0 0 0 2.531045-2.702033c42.433903-46.643096 38.927096-76.101301 40.681011-92.935 0 0 35.775577 51.552626 43.488506 53.306542 7.712928 1.753916 10.168205-6.311229 7.011566-45.940711z"
              fill="#FFFFFF" p-id="5424"></path>
          </svg>
        </el-tooltip>
      </a>
      <a :href="props.user.github_url" target="_blank" title="github">
        <el-tooltip content="github" placement="bottom" effect="light">
          <svg t="1704006655074" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
            p-id="6401" width="25" height="25">
            <path
              d="M513.194667 64a446.805333 446.805333 0 0 0-141.226667 870.826667c22.442667 3.968 29.226667-9.216 29.226667-21.205334 0-12.025 0.426667-40.405333 0-77.653333-124.416 26.837333-150.016-58.752-150.016-58.752-19.968-51.626667-49.578667-65.237333-49.578667-65.237333-40.789333-27.562667 2.816-27.178667 2.816-27.178667 44.8 3.2 68.394667 45.994667 68.394667 45.994667 39.978667 68.394667 104.405333 48.384 130.005333 37.205333 3.968-28.8 15.573333-48.810667 28.373333-59.605333-98.773333-11.605333-203.178667-49.578667-203.178666-220.8a172.8 172.8 0 0 1 45.994666-119.978667c-4.394667-11.221333-20.010667-56.825 4.394667-118.4 0 0 37.589333-12.025 122.794667 45.994667a422.826667 422.826667 0 0 1 223.573333 0c85.625-58.026667 123.221333-45.994667 123.221333-45.994667 24.405333 61.568 9.216 106.794667 4.394667 118.4a172.8 172.8 0 0 1 45.994667 119.978667c0 171.605333-104.362667 209.621333-203.946667 220.416 15.957333 13.994667 30.378667 40.789333 30.378667 82.389333v123.605333c0 11.989333 7.168 25.173333 29.994666 20.778667A446.805333 446.805333 0 0 0 513.194667 64z"
              fill="#000000" p-id="6402"></path>
          </svg>
        </el-tooltip>
      </a>
      <a :href="'mailto:' + props.user.user.email" title="email">
        <el-tooltip content="邮箱" placement="bottom" effect="light">
          <svg t="1704006809970" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
            p-id="14968" width="25" height="25">
            <path
              d="M511.959593 0a511.959593 511.959593 0 1 0 511.959593 511.959593A512.040407 512.040407 0 0 0 511.959593 0z m264.344093 666.153579a52.286954 52.286954 0 0 1-52.852656 51.397995H300.306527a52.286954 52.286954 0 0 1-52.852656-51.397995V412.234551l257.717307 136.657249a13.576829 13.576829 0 0 0 12.68787 0L775.818799 412.072922zM512.121222 500.726383L247.938758 357.361534a52.044511 52.044511 0 0 1 52.610212-50.913108h422.90206a52.286954 52.286954 0 0 1 52.852656 50.428221l-264.182464 143.849736z"
              fill="#51A6E6" p-id="14969"></path>
          </svg>
        </el-tooltip>
      </a>
      <a :href="props.user.bilibili_url" target="_blank" title="bilibili">
        <el-tooltip content="bilibili" placement="bottom" effect="light">
          <svg t="1704006743761" class="icon" viewBox="0 0 1081 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
            p-id="11137" width="25" height="25">
            <path
              d="M431.071105 412.459812l-216.193848 41.422742 18.506193 81.15917 214.118388-41.422741z m116.744678 215.199357c-52.837776 113.328815-100.227468 27.802529-100.227468 27.802529l-35.412552 22.873309s69.744135 95.125293 136.202124 22.873309c78.478367 72.468178 138.364063-23.435413 138.364063-23.435413l-32.169645-20.711371c0-0.562104-56.210401 80.640305-106.799761-29.445602m106.799761-134.040186l214.680492 41.422741 17.857612-81.029454-215.761461-41.509219z m426.247791-159.421344a182.510847 182.510847 0 0 0-135.29411-180.219191s-102.908272-0.562104-236.51607-1.686312l97.243993-93.784892s15.349763-19.32773-10.809692-40.947115-27.845768-11.9339-36.969148-6.269621c-7.955934 5.664279-124.527657 119.944347-144.979595 140.439524-52.881015 0-108.096924-0.562104-161.453566-0.562104h18.765626S331.362502 13.582162 322.239122 7.355779s-10.20435-15.349763-36.925909 6.226383-10.809692 40.947115-10.809693 40.947115l99.492409 96.768367c-108.096924 0-201.276473 0.562104-244.472003 2.248416A177.278956 177.278956 0 0 0 0.283243 334.240878s1.902506 301.330986 0 453.70441c15.349763 152.373424 132.48359 176.803329 132.48359 176.803329s46.611394 1.124208 81.288887 1.124208a59.842457 59.842457 0 0 0 59.712741 57.421086c52.881015 0 59.669502-57.421086 59.669502-57.421086s389.451598-1.686312 421.837437-1.686312a59.626263 59.626263 0 0 0 63.128604 59.712741c52.881015-1.124208 56.858982-63.085365 56.858982-63.085365a698.99795 698.99795 0 0 1 72.208745 0c126.213969-23.305697 133.607798-171.13905 133.607798-171.13905s-2.248416-304.184744-0.562104-455.390722m-108.57255 482.112281a42.590188 42.590188 0 0 1-42.071323 43.23877H162.515107a42.590188 42.590188 0 0 1-42.071323-43.23877V307.519318a42.590188 42.590188 0 0 1 42.071323-43.238769H929.91679a42.590188 42.590188 0 0 1 42.071323 43.238769z"
              fill="#01A1D6" p-id="11138"></path>
          </svg>
        </el-tooltip>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { UserStateType } from "~/types/user";

const props = withDefaults(
  defineProps<{
    user?: UserStateType;
  }>(),
  {
    user: () =>
      <UserStateType>{
        id: 0,
        name: "您还未登录",
        signature: "",
        sex: "男",
        avatar:
          "https://tse4-mm.cn.bing.net/th/id/OIP-C.X-VG5gTN2ak8rGRij3oCogAAAA?w=163&h=180&c=7&r=0&o=5&dpr=1.12&pid=1.7",
        article_num: 0,
        qq_no: "",
        github_url: "",
        bilibili_url: "",
        user: {}
      },
  }
);

const defaultAvatar = ref(
  "https://tse4-mm.cn.bing.net/th/id/OIP-C.X-VG5gTN2ak8rGRij3oCogAAAA?w=163&h=180&c=7&r=0&o=5&dpr=1.12&pid=1.7"
);
const defaultName = ref("您还未登陆");
</script>

<style scoped>
.userStick {
  position: fixed;
  top: 5.5rem;
}

.userInfo {
  position: sticky;
  top: 80.05px;
  width: 15.625rem;
  border-radius: 11px;
  padding: 20px 20px 0;
  box-shadow: 0 1px 20px -8px var(--shadow);
  transition: box-shadow 0.5s;
  font-size: var(--fontSize);
  background-color: var(--defaultColor);
  font-family: tsxmm;
}

.userInfo:hover {
  box-shadow: 0 0 20px var(--shadow);
}

.userInfo div {
  margin: 5px auto;
}

.userInfo .userName {
  margin-top: 10px;
}

.userInfo .userIns {
  display: flex;
  flex-direction: column;
  text-align: center;
}

.userInfo .userIns .userSignatrue {
  font-weight: lighter;
  font-size: 1rem;
  font-family: system-ui;
}

.userInfo .userIns img {
  display: block;
  margin: 0 auto;
  width: 7.5rem;
  height: 7.5rem;
  object-fit: cover;
  border-radius: 50%;
  border: 4px solid #80e1f0;
  transition: transform .2s linear;
}

.userInfo .userIns img:hover {
  transform: scale(1.1) rotate(360deg);
}

.userData div {
  text-align: center;
  display: inline-block;
  width: 6.25rem;
}

.userInfo .article-num {
  font-family: '钉钉进步体 Regular';
}

.userData {
  display: flex;
  flex-wrap: wrap;
  border-bottom: 1px dotted #ccc;
}

.userContact {
  display: flex;
}

.userContact a {
  display: inline-block;
  flex: 1;
  text-align: center;
  line-height: 50px;
}

.userContact a:hover {
  color: orange;
}

.userContact a span {
  font-size: 25px;
}

@media screen and (max-width: 768px) {
  .userData {
    display: none;
  }

  .userContact {
    display: none;
  }

  .userInfo {
    position: static;
    width: 100%;
    box-shadow: none;
  }

  .userInfo:hover {
    box-shadow: none;
  }
}
</style>
