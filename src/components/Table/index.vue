<template>
   <section class="table-panel">
      <a-table 
        :dataSource="dataSource" 
        :columns="columns" 
        :scroll="{ x: 1300 }"
        :pagination="false" >
         <template #bodyCell="{ column, text, record, index }">
               <template v-if="column.slot">
                  <slot :name="column.slot" :data="record" />
               </template>
               <template v-if="column.dataIndex === 'action'&&column.options">
                  <a v-for="item in column.options" :key="item.title" @click="item.click&&item.click(record,index)">{{item.title}}</a>
               </template>
         </template>
      </a-table>  
      <template v-if="pagination">
          <a-pagination 
            v-model:current="pagination.current" 
            show-quick-jumper 
            :total="pagination.total" 
            v-model:pageSize="pagination.pageSize"
            @change="pagination.click&&pagination.click" />
      </template>
   </section>
</template>

<script>
import { ref, reactive, toRaw ,watch, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

export default {
  name: 'Table',
  props:{
      tableData:{
         type:Array,
         default:[] 
      },
      columns:{
         type:Array,
         default:[] 
      },
      rowKey:{
         type:String,
         default:'id' 
      },
      rowSelection:{
         type:Object
      },
      pagination:{
         type:Object,
         default:{
             current:1,
             total:0,
             pageSize:10,
             onChange:()=>{}
         }
      }
  },
  setup(props, context) {
   let dataSource=ref(props.tableData).value;

   watch(() => props.dataSource, (newValue, oldValue) => {
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
