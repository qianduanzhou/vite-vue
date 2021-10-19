<template>
    <div class="index">
        <child ref="child" title="setUp"></child>
    </div>
</template>

<script>
import child from './component/child.vue'
import { provide, ref, readonly } from 'vue'
export default {
    components: {
        child
    },
    setup() {
        provide('a', readonly(ref(1)))//setup中使用provide,响应式用ref或者reactive，使用readonly可以防止在inject中被修改
    },
    mounted() {
        console.log(this.$refs.child.title)
    },
};
</script>

<style lang='scss' scoped>
    
</style>