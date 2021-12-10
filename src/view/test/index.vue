<template>
	<div id="foo">
		1111
	</div>
	<img src="" id="hero-img">
</template>

<script setup lang="ts">
import {onMounted} from 'vue';

/**
 * CSS Modules
 * 任何以 .module.css 为后缀名的 CSS 文件都被认为是一个 CSS modules 文件。导入这样的文件会返回一个相应的模块对象：
 * CSS modules 行为可以通过 css.modules 选项 进行配置。
 */
import classes from "./css/example.module.css";
onMounted(() => {
	let dom: any = document.getElementById('foo')
	dom.className = classes.red;
})
/**
 * URL 导入
 * 导入一个静态资源会返回解析后的 URL：
 */
import imgUrl from "@/assets/logo.png"
onMounted(() => {
	let dom: any = document.getElementById('hero-img')
	dom.src = imgUrl
})
/**
 * Glob 导入
 * Vite 支持使用特殊的 import.meta.glob 函数从文件系统导入多个模块：
 * 你可以遍历 modules 对象的 key 值来访问相应的模块：
 * 匹配到的文件将通过动态导入默认懒加载，并会在构建时分离为独立的 chunk。
 */
const modules = import.meta.glob('./dir/*.ts');
for (const path in modules) {
	modules[path]().then((mod) => {
		console.log(path, mod)
	})
}
/**
 * globEager直接引入所有的模块
 */
const modules2 = import.meta.globEager('./dir/*.js')
</script>

<style lang='scss' scoped>
</style>