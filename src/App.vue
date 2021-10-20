<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import HelloWorld from './components/HelloWorld.vue'
import {request} from '@/request/request'

console.log('import.meta.env', import.meta.env)

request({name: 'test', data: {
  
}}).then(res => {
  console.log('res', res)
}, err => {
  console.log('err', err)

})
</script>

<template>
  <router-view></router-view>
</template>

<style>
</style>
