import { createRouter, createWebHistory } from "vue-router";

const routes = [
	{
		path: '/vueApp',
		name: 'vueApp-home',
		component: () => import("@/view/vueApp/index.vue")
	},
	{
		path: '/vueApp/about',
		name: 'vueApp-about',
		component: () => import("@/view/vueApp/index.vue")
	},
]

export default createRouter({
	history: createWebHistory(),
	routes
});