<template>
	<div class="setUp">
		{{title}}-{{a}}
	</div>
</template>

<script>
import { h, toRefs, inject, defineComponent } from "vue";
export default defineComponent({
  props: {
    title: {
      type: String,
      default: "setUp"
    }
  },
  //setup中this和其他选项完全不同
  setup(props, context) {
    //props是响应式对象不能使用解构,context是普通js对象，可以解耦
    const { title } = toRefs(props); //要想解构可以使用toRefs
    console.log("title", props.title, title);
    /**
     * context包含一些有用的值，相当于vue2的$attrs,$emit...
     * attrs 和 slots 是有状态的对象，它们总是会随组件本身的更新而更新。避免使用解构
     */
    const { attrs, slots, emit, expose } = context;

    const a = inject("a"); //setup中使用inject
    return {
      //return出去的将可以在html里面使用
      title,
      a
    };

    // expose({//使用返回渲染函数的方式会导致无法返回其他东西，这时使用expose可以返回其他东西(通过父组件$refs去范围)
    //     title
    // })
    // //也可以返回一个渲染函数
    // return () => h('p', {}, props.title)
  }
});
</script>

<style lang='scss' scoped>
.setUp {
}
</style>