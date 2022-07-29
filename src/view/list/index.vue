<template>
  <div
    id="viewDiv"
    v-infinite-scroll="load"
    :infinite-scroll-immediate="false"
    v-loading="firstLoading"
  >
    <div
      class="item"
      v-for="item in list"
      :key="item.id"
      @click="jump"
    >
      {{item.title}}
    </div>
    <div
      class="loading"
      v-loading="loading"
      v-if="list.length < pager.count"
    ></div>
    <div
      class="tip"
      v-else-if="list.length > 0 && list.length >= pager.count"
    >已到底!!!</div>
    <div
      class="tip"
      v-else
    >暂无数据</div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, reactive, toRefs } from "vue";
import { request } from "@/request";
import { CacheBucket } from "@/utils";
import { useRouter } from "vue-router";
let router = useRouter();
let list: any = ref([]);
let firstLoading = ref(false);
let loading = ref(false);
let pager = reactive({
  page: 1,
  limit: 40,
  count: 0
});
//到底加载
function load() {
  let { page, count } = toRefs(pager);
  // page.value ++ //普通请求
  if (list.value.length < count.value) {
    getList();
  }
}

let cacheBucket = new CacheBucket();
//获取列表
async function getList(pageIn?: number) {
  let { page, limit, count } = toRefs(pager);
  if (page.value === 1) {
    firstLoading.value = true;
  } else {
    loading.value = true;
  }
  pageIn && (page.value = pageIn);
  let data = {
    page: page.value,
    limit: limit.value
  };

  //缓存请求
  let option = {
    name: "getList",
    data,
    recordKey: "record"
  }
  cacheBucket.init(option)
  cacheBucket.getList().then(
    (res: any) => {
      let { res: {record, totalCount}, isRequest } = res
      list.value = list.value.concat(record)
      count.value = totalCount
      if(page.value === 1) {
        firstLoading.value = false
      } else {
        loading.value = false
      }
      if(isRequest) {
        pager.page ++
      }
      console.log('getCacheList', cacheBucket.getCacheList())
    }).catch((err: any) => {
      console.log('err', err)
  })
  //普通请求
  // let { err, res } = await request({ name: "getList", data });
  // if (err) {
  //   console.log("err", err);
  //   return;
  // }
  // list.value = list.value.concat(res.record);
  // count.value = res.totalCount;
  // if (page.value === 1) {
  //   firstLoading.value = false;
  // } else {
  //   loading.value = false;
  // }
}
onMounted(() => {
  getList();
});
function jump() {
  router.push({ path: "/request" });
}
</script>

<style lang='scss' scoped>
#viewDiv {
  padding: 10px 10px 50px;
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