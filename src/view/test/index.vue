<template>
	<div id="foo">
		1111
	</div>
</template>

<script setup lang="ts">
import {onMounted} from 'vue';

/**
 * CSS Modules
 * 任何以 .module.css 为后缀名的 CSS 文件都被认为是一个 CSS modules 文件。导入这样的文件会返回一个相应的模块对象：
 * CSS modules 行为可以通过 css.modules 选项 进行配置。
 */
import classes from "./css/example.module.css";
console.log("classes", classes);
onMounted(() => {
	document.getElementById('foo').className = classes.red;
})
</script>

<style lang='scss' scoped>
</style>