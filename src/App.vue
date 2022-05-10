<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import HelloWorld from './components/HelloWorld.vue'
import { useRouter } from 'vue-router';
import {ref, onMounted} from 'vue';
const router = useRouter();
let tab = ref('vueApp');
function tabChange() {
  console.log(tab.value);
  router.replace(`/${tab.value}`)
}
onMounted(() => {
  router.replace(`/${tab.value}`)
})
</script>

<template>
  <el-tabs type="border-card" v-model="tab" @tab-click="tabChange">
    <el-tab-pane name="vueApp" label="vueApp"></el-tab-pane>
    <el-tab-pane name="reactApp" label="reactApp"></el-tab-pane>
  </el-tabs>
  <main>
    <router-view></router-view>
  </main>
</template>

<style lang="scss">
  html, body, #app {
    width: 100%;
    height: 100%;
    font-size: 16px;
    .el-tabs__content {
      display: none
    }
    main {
      height: calc(100% - 45px);
    }
  }
</style>
