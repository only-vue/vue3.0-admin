<template>
  <div id="app">
     <router-view />
  </div>
</template>

<script>
import { ref, reactive,toRaw} from 'vue'
import { useStore } from 'vuex'
export default {
  name: "app",
  created() {
      const store = useStore() 
      store.dispatch('getStorage','store').then(res=>{
          if(res)
          this.$store.replaceState(res)
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
