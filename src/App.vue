<template>
    <a-locale-provider :locale="locale">
      <section id="app">
        <router-view />
       </section>
    </a-locale-provider>
</template>

<script>
import { ref, reactive,toRaw} from 'vue'
import { useStore } from 'vuex'
import zhCN from "ant-design-vue/lib/locale-provider/zh_CN"
import moment from 'moment'
moment.locale('zh-cn');
export default {
  name: "app",
  data(){
    return{
      locale:zhCN 
    }
  },
  created() {
      const store = useStore() 
      store.dispatch('getStorage','store').then(res=>{
          let state=store.state || {};
              state={
                ...state,
                menuList:res.menuList,
                activeKey:res.activeKey
              }
          if(res)    
          this.$store.replaceState(state)
      })
      //在页面刷新时将vuex里的信息保存到sessionStorage里
      window.addEventListener("beforeunload",()=>{
          store.commit('setStorage',{
            name:'store',
            val:this.$store.state
          })
      })
  },
  setup() {
    const store = useStore()
    const state = toRaw(store.state)
    return {
          
    }
	}
};
</script>

<style>
#app {
	width: 100%;
	height: 100%;
}
</style>
