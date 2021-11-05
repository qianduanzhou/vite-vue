<template>
    <div>
        <Child></Child>
        {{a}}
    </div>
</template>

<script lang='ts'>
import {ref} from 'vue'
import Child from './child/index.vue'
export default {
    components: {
        Child
    },
    setup() {
        console.log('setup')
        let a = ref(0)
        setTimeout(() => {
            a.value ++
        }, 5000);
        return {
            a
        }
    },
    beforeCreate() {
        console.log('beforeCreate')
    },
    created() {
        console.log('created')
    },

    beforeMount() {
        console.log('beforeMount')
    },
    mounted() {
        console.log('mounted')
    },

    beforeUpdate() {
        console.log('beforeUpdate')
    },
    updated() {
        console.log('updated')
    },

    beforeUnmount() {
        console.log('beforeUnmount')
    },
    unmounted() {
        console.log('unmounted')
    },

    errorCaptured(err, instance, info) {//错误对象、发生错误的组件实例以及一个包含错误来源信息的字符串。
        console.log('errorCaptured', err, instance, info)
        return false;//此钩子可以返回 false 以阻止该错误继续向上传播。
    },

    renderTracked(event) {//跟踪虚拟 DOM 重新渲染时调用。,跟踪了组件以及该操作的目标对象和键。首次更新渲染调用
        console.log('renderTracked', event)
    },
    renderTriggered(event) {//和renderTracked类似，更新时调用
        console.log('renderTriggered', event)
    },

    activated() {
        console.log('activated')
    },
    deactivated() {
        console.log('deactivated')
    }
};
</script>

<style lang='scss' scoped>
</style>