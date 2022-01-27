<template>
  <div class="hello">
    <img alt="Vue logo" src="../assets/logo.png">
    <div @click="goHome">跳转首页</div>
  </div>
</template>

<script>
import {defineComponent, getCurrentInstance} from 'vue';
import { useRouter } from "vue-router";
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  setup(props, context) {
    const {proxy} = getCurrentInstance()
    const router = useRouter();
    const goHome=()=>{
       router.push({
         path:'/login',
         query:{
           id:1
         }
       })
    }
    return{
       goHome
    }
     
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
