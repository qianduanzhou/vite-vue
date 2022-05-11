<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import HelloWorld from "./components/HelloWorld.vue";
import { ref, onMounted } from "vue";
let tab = ref("vueApp");
/** router方式 */
import { useRouter } from "vue-router";
const router = useRouter();
function tabChange() {
  router.replace(`/${tab.value}`);
}
onMounted(() => {
  router.replace(`/${tab.value}`);
});

/** 手动方式 */
// import { loadMicroApp } from "qiankun";
// function tabChange() {
//   if (tab.value === "vueApp") {
//     loadMicroApp({
//       name: "vueApp",
//       entry: "//localhost:8080",
//       container: "#container"
//     });
//   }
// }
// onMounted(() => {
//   loadMicroApp({
//     name: "vueApp",
//     entry: "//localhost:8080",
//     container: "#container"
//   });
// });
</script>

<template>
  <el-tabs
    type="border-card"
    v-model="tab"
    @tab-click="tabChange"
  >
    <el-tab-pane
      name="vueApp"
      label="vueApp"
    ></el-tab-pane>
    <el-tab-pane
      name="reactApp"
      label="reactApp"
    ></el-tab-pane>
  </el-tabs>
  <main>
    <!-- router方式 -->
    <router-view></router-view>

    <!-- 手动方式 -->
    <!-- <div id="container"></div> -->
  </main>
</template>

<style lang="scss">
html,
body,
#app {
  width: 100%;
  height: 100%;
  font-size: 16px;
  .el-tabs__content {
    display: none;
  }
  main {
    height: calc(100% - 45px);
  }
}
</style>
