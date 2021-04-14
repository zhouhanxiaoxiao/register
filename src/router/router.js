import Vue from 'vue'
import VueRouter from 'vue-router'
import register from "@/components/register";
import editPwd from "@/components/editPwd";

Vue.use(VueRouter)

/*配置路由*/
const routes = [
    {path: '', component: register, meta: {index: 0}},
    {path: '/',  component: register, meta: {index: 1}},
    {path: '/register',  component: register, meta: {index: 2}},
    {path: '/editPassword',  component: editPwd, meta: {index: 3}},
]
/*实例化路由*/
const router = new VueRouter({
    routes: routes, // （简写）相当于 routes: routes
});

/*导出路由模块*/
export default router