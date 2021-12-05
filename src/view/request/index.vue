<template>
	<div id="viewDiv">
		{{result}}
	</div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { request } from "@/request/request";
const result = ref([]);
onMounted(() => {
  request({ name: "test" }).then(
    (res: any) => {
      console.log("res", res);
      result.value = res[0];
    },
    err => {
      console.log("err", err);
    }
  );
});
</script>

<style lang='scss' scoped>
</style>