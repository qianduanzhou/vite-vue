<template>
    <div class="img-container">
        <img :data-src="imgUrl" alt="">
    </div>
</template>

<script lang="ts">
import { onMounted } from 'vue';
import { ImgLazyLoad } from '@/utils'
import imgUrl from "@/assets/logo.png"

export default {
    setup() {
        onMounted(() => {
            new ImgLazyLoad().init();
        })
        return {
            imgUrl
        }
    }
}
</script>

<style lang='scss' scoped>
    .img-container {
        width: 200px;
        height: 200px;
        margin-top: 2000px;
    }
</style>