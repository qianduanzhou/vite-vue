import { createRouter, createWebHistory } from "vue-router";

const routes = [
	//vue微应用
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
	//react微应用
	{
		path: '/reactApp',
		name: 'reactApp-home',
		component: () => import("@/view/reactApp/index.vue")
	},
	{
		path: '/reactApp/list',
		name: 'reactApp-list',
		component: () => import("@/view/reactApp/index.vue")
	},
	{
		path: '/reactApp/collection',
		name: 'reactApp-collection',
		component: () => import("@/view/reactApp/index.vue")
	},
	{
		path: '/reactApp/detail/:id',
		name: 'reactApp-detail',
		component: () => import("@/view/reactApp/index.vue")
	},
]

export default createRouter({
	history: createWebHistory(),
	routes
});