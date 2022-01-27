<template>
   <section class="detail-panel">
       <a-descriptions :title="title" :layout="layout" :bordered="bordered">
         <a-descriptions-item 
            :label="item.label" 
            :span="item.span" 
            v-for="(item,index) in dataSource" :key="index">
            {{item.value}}
         </a-descriptions-item>
      </a-descriptions>
   </section>
</template>

<script>
import { ref, reactive, toRaw ,watch, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

export default {
  name: 'Descriptions',
  props:{
      detailData:{
         type:Array,
         default:[] 
      },
      title:{
         type:String,
         default:'' 
      },
      layout:{
         type:String,
         default:'horizontal' 
      },
      bordered:{
         type:Boolean,
         default:false 
      }
  },
  setup(props, context) {
   let dataSource=ref(props.detailData).value;

   watch(() => props.detailData, (newValue, oldValue) => {
      if(newValue){
          dataSource.value=newValue;  
      }
   })


   return{
      dataSource
   }
     
  }
}
</script>

<style lang="less">

</style>
