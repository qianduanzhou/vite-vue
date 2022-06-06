<template>
  <div id="reactApp"></div>
</template>

<script lang="ts">
import { onMounted } from "vue";
import { registerMicroApps, start } from "qiankun";
let qiankunStarted = false;
export default {
  setup() {
    onMounted(() => {
      if (!qiankunStarted) {
        qiankunStarted = true;
        start();
      }
    });
  }
};
</script>

<style lang='scss' scoped>
#vueApp {
  width: 100%;
  height: 100%;
}
</style>