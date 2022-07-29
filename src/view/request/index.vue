<template>
	
</template>

<script lang="ts">
import {request} from '@/request'
export default {
  async setup() {
    let { err, res } = await request({name: 'getFacility'});
    if(err) {
      console.log('err', err);
      return;
    }
    console.log('res', res);
  },
};
</script>

<style lang='scss' scoped>
</style>