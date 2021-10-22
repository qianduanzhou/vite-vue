import {createRouter, createWebHashHistory} from "vue-router";

const routes = [
    {
        path: '/composables',
        component: () => import("@/view/composables/index.vue")
    },
    {
        path: '/setUp',
        component: () => import("@/view/setUp/index.vue")
    },
    {
        path: '/template',
        component: () => import("@/view/template/index.vue")
    },
    {
        path: '/reactive',
        component: () => import("@/view/reactive/index.vue")
    },
    {
        path: '/map',
        component: () => import("@/view/map/index.vue")
    },
    {
        path: '/request',
        component: () => import("@/view/request/index.vue")
    },
    {
        path: '/test',
        component: () => import("@/view/test/index.vue")
    },
]

export default createRouter({
    history: createWebHashHistory(),
    routes
});