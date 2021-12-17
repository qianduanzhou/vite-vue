<template>
	
</template>

<script lang="ts">
import {request} from '@/request'
export default {
  setup() {
    request({name: 'getFacility'}).then(res => {
        console.log('getFacility', res)
    }).catch(err => {
        console.log('err', err)
    })
  },
};
</script>

<style lang='scss' scoped>
</style>