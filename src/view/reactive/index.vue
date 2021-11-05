<template>
	<p>{{state.count}}</p>
	<p>{{num}}</p>
	<p>{{nested.num}}</p>
	<p>{{count}}</p>
	<!-- <p>{{refCount}}</p> -->
</template>

<script lang='tsx'>
import {
  defineComponent,
  onMounted,
  ref,
  h,
  onBeforeUpdate,
  reactive,
  watchEffect,
  toRefs,
  readonly
} from "vue";
export default defineComponent({
  setup(props) {
    // 响应式状态
    const state = reactive({
      //reactive 相当于 Vue 2.x 中的 Vue.observable() API,该 API 返回一个响应式的对象状态。
      count: 0
    });
    let num = ref(0); //ref会返回一个可变的响应式对象,使用改值需要加.value，html会自动浅层次解包内部值，除非是嵌套的情况，否则可以不使用.value

    //如果将新的 ref 赋值给现有 ref 的 property，将会替换旧的 ref：
    let otherNum = ref(2);
    num = otherNum;

    //Ref 解包仅发生在被响应式 Object 嵌套的时候。当从 Array 或原生集合类型如 Map访问 ref 时，不会进行解包：
    let arr = reactive([ref(1)]);
    let r = reactive({ a: ref(1) });

    //默认reactive使用解构会导致解构的值失去响应式，使用toRefs可以避免
    let { count } = state;
    // let { count: refCount } = toRefs(state);

    setInterval(() => {
      state.count++;
      num.value++;
      count++;
      // refCount.value++;
    }, 1000);

    //readonly可以防止响应式对象修改
    let readonlyObj = readonly(reactive({ a: 1 }));
    // readonlyObj.a++;
    // console.log("readonlyObj", readonlyObj.a);
    return {
      state,
      num,
      // nested: {num},//需要通过nested.num.value访问
      nested: reactive({ num }), //可以通过reactive直接访问
      count,
      // refCount
    };
  }
});
</script>

<style lang='scss' scoped>
</style>