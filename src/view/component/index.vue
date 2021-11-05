<template>
    <div class="index">
        <!-- <AsyncComp></AsyncComp> -->
        <suspense>
            <template #default>
                <AsyncComp></AsyncComp>
            </template>
            <template #fallback>
                <div>
                    Loading(suspense)...
                </div>
            </template>
        </suspense>
    </div>
</template>

<script>
import { defineAsyncComponent } from "vue";
import LoadingComponent from "./component/LoadingComponent.vue";
import ErrorComponent from "./component/fail.vue";
// const AsyncComp = defineAsyncComponent(() => import('./component/index.vue'))
// const AsyncComp = defineAsyncComponent(() => new Promise((resolve, reject) => {
//     resolve(import('./component/index.vue'))
//     // reject('加载失败')
// }))

const AsyncComp = defineAsyncComponent({
    loader: () =>
        new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(import("./component/index.vue"));
        }, 2000);
        // reject('加载失败')
        }), // 工厂函数
    loadingComponent: LoadingComponent, // 加载异步组件时要使用的组件
    errorComponent: ErrorComponent, // 加载失败时要使用的组件
    delay: 200,
    suspensible: false,
    timeout: 6000
});
export default {
    components: {
        AsyncComp
    },
    setup() {},
    mounted() {}
};
</script>

<style lang='scss' scoped>
</style>