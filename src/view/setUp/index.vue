<template>
	<div class="index">
		<child
		 ref="childRef"
		 title="setUp"
		></child>
	</div>
</template>

<script lang="ts">
import child from "./component/child.vue";
import { provide, ref, readonly, onMounted, defineComponent } from "vue";
export default defineComponent({
  components: {
    child
  },
  setup() {
    const childRef: any = ref(null);
    provide("a", readonly(ref(1))); //setup中使用provide,响应式用ref或者reactive，使用readonly可以防止在inject中被修改
    onMounted(() => {
      // DOM 元素将在初始渲染后分配给 ref
      console.log('onMounted', childRef.value.title)
    })
    return {
      childRef
    }
  },
});
</script>

<style lang='scss' scoped>
</style>