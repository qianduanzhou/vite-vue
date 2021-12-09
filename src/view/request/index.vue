<template>
	
</template>

<script lang="ts">
import {request} from '@/request'
import {CacheBucket} from '@/utils'
export default {
  setup() {
    request({name: 'getFacility'}).then(res => {
        console.log('getFacility', res)
    }).catch(err => {
        console.log('err', err)
    })
    console.log('CacheBucket', new CacheBucket().getCacheList())
  },
};
</script>

<style lang='scss' scoped>
</style>