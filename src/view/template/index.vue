<template>
    <div ref="root" v-pin:[direction]="pinPadding">This is a root element</div>

    <!-- v-for -->
    <!-- <div
        v-for="(item, i) in list"
        :ref="el => { if (el) divs[i] = el }"
    >
        {{ item }}
    </div> -->


</template>

<script lang='tsx'>
import {
  defineComponent,
  onMounted,
  ref,
  h,
  onBeforeUpdate,
  reactive,
  watchEffect
} from "vue";
export default defineComponent({
    data() {
        return {
            direction: 'left',
            pinPadding: 50
        }
    },
    directives: {
        pin: {
            mounted(el, binding) {
                el.style.position = 'fixed'
                const s = binding.arg || 'top'
                el.style[s] = binding.value + 'px'
            },
        }
    },
    setup() {
        const root = ref(null);
        onMounted(() => {
            // DOM 元素将在初始渲染后分配给 ref
            console.log('onMounted', root.value) // <div>This is a root element</div>
        })
        //侦听模板引用
        watchEffect(() => {
            // 这个副作用在 DOM 更新之前运行，因此，模板引用还没有持有对元素的引用。
            console.log('watchEffect', root.value) // => null
            },
            {
                flush: 'post' //将在DOM更新后执行watchEffect
            }
        )

        return {
            root
        }

        //渲染函数用法
        // return () =>
        // h('div', {
        //     ref: root
        // }, "This is a root element")

        //jsx用法
        // return () => <div ref={root}>This is a root element</div>

        //v-for用法
        // const list = reactive([1, 2, 3])
        // const divs = ref([])
        // // 确保在每次更新之前重置ref
        // onBeforeUpdate(() => {
        //     divs.value = []
        // })
        // onMounted(() => {
        //     console.log(divs.value)
        // })
        // return {
        //     list,
        //     divs
        // }
    }
});
</script>

<style lang='scss' scoped>
</style>