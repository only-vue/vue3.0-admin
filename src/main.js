import { createApp } from 'vue'
import App from './App.vue'


import router from "@/router"
import store from '@/store'

import less from 'less'
import { apiAxios } from './utils/http.js'

import '@/assets/css/base.less'

import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import * as Icons from '@ant-design/icons-vue'


const app= createApp(App)
app.config.productionTip = false

app.config.globalProperties.$http = apiAxios

app.use(router).use(store).use(Antd).use(less).mount('#app')

//加载所有ant 自带的图标
const icons=Icons;
for(let i in Icons){
    app.component(i,icons[i]);
}