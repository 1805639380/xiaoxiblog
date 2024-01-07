<template>
  <div class="container" id="containerLayout">
    <div class="container-left">
      <slot name="containerLeftTop"></slot>
      <slot name="containerLeftMain"></slot>
    </div>
    <div class="container-right">
      <slot name="containerRight">
        <UserInfo :user="props.user" v-if="props.showUserInfo"></UserInfo>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { UserStateType } from "~/types/user";

const props = withDefaults(
  defineProps<{
    user?: UserStateType;
    showUserInfo?: boolean;
  }>(),
  {
    showUserInfo: true,
  }
);
</script>

<style scoped>
.container-left {
  width: var(--dBoxWidth);
}

.container-right {
  display: flex;
  flex-direction: column;
  margin-left: 25px;
  width: 15.625rem;
}

@media screen and (max-width: 960px) {
  .container-right {
    display: none;
  }
}
</style>
