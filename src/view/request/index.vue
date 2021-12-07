<template>
	<div id="viewDiv" v-infinite-scroll="load" :infinite-scroll-immediate="false" v-loading="firstLoading">
    <div class="item" v-for="item in list" :key="item.id">
      {{item.title}}
    </div>
    <div class="loading" v-loading="loading" v-if="list.length < searchContent.count"></div>
    <div class="tip" v-else-if="list.length > 0 && list.length >= searchContent.count">已到底!!!</div>
    <div class="tip" v-else>暂无数据</div>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref, reactive, toRefs } from "vue";
  import { request } from "@/request";
  let list = ref([]);
  let firstLoading = ref(false)
  let loading = ref(false)
  let searchContent = reactive({
    page: 1,
    limit: 20,
    count: 0
  })
  //到底加载
  function load() {
    let {page, count} = searchContent
    searchContent.page ++
    if(list.value.length < count) {
      this.getList()
    }
  } 
  //获取列表
  function getList(pageIn: number) {
    let {page, limit} = toRefs(searchContent)
    if(page.value === 1) {
      firstLoading.value = true
    } else {
      loading.value = true
    }
    pageIn && (page.value = pageIn)
    let data = {
      page: page.value,
      limit: limit.value
    }
    request({ name: "getList", data }).then(
      (res: any) => {
        list.value = list.value.concat(res.record)
        searchContent.count = res.totalCount
        if(page.value === 1) {
          firstLoading.value = false
        } else {
          // loading.value = false
        }
      },
      err => {
        console.log("err", err)
      }
    );
  }
  onMounted(() => {
    getList()
  });
</script>

<style lang='scss' scoped>
  #viewDiv{
    padding: 10px;
    height: 100%;
    overflow: auto;
    .item {
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
      margin-bottom: 10px;
      &:last-child {
        margin-bottom: 0;
      }
    }
    .loading {
      margin: 0 auto;
    }
    .tip {
      width: 100%;
      text-align: center;
      padding: 10px;
    }
  }
</style>