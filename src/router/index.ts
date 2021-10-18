import {createRouter, createWebHashHistory} from "vue-router";
const routes = [
    {
        path: '/',
        redirect: '/setUp',
    },
    {
        path: '/setUp',
        component: () => import("@/view/setUp/index.vue")
    }
]

export default createRouter({
    history: createWebHashHistory(),
    routes
});