import { createRouter, createWebHistory,createWebHashHistory } from "vue-router";
import store from '@/store/index';
const routes = [
        // {
        //     path:"/",
        //     name:"HelloWorld",
        //     component:()=>import("@/components/HelloWorld.vue")
        // },
        {
            path:"/",
            redirect: "/login"
        },
        {
            path:"/login",
            name:"login",
            component:()=>import("@/views/login/index.vue")
        },
        {
            path:"/",
            name:"layout",
            component:()=>import("@/views/layout.vue"),
            children: [
                {
                    path:"/form",
                    name:"表单",
                    component:()=>import("@/views/form/index.vue")
                },
                {
                    path:"/table",
                    name:"列表",
                    component:()=>import("@/views/table/index.vue")
                },
                {
                    path:"/detail",
                    name:"详情页",
                    component:()=>import("@/views/detail/index.vue")
                },
                {
                    path:"/editor",
                    name:"文本编辑器",
                    component:()=>import("@/views/editor/index.vue")
                }
            ]
        }
    ]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
    if(to.path!='/login'){
       const params={
        name:to.name,
        fullPath:to.fullPath,
        path:to.path,
        query:to.query
      }
      store.commit('setTabNav',params);
    }
    next();
})
export default router;