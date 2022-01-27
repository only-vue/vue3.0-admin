<template>
   <section class="search-panel">
      <a-form :model="searchData" layout="inline">
         <a-form-item :label="item.label" v-for="(item,index) in searchData" :key="index">
            <template v-if="item.type==='input' || item.type==='textarea' || item.type==='password' || !item.type">
               <a-input 
                  v-model:value="item.value" 
                  :type="item.type?item.type:'input'"
                  :maxlength="item.maxlength"
                  :addonAfter="item.addonAfter"
                  :suffix="item.suffix"
                  :allowClear="true"
                  :disabled="item.disabled"
                  @change="item.input"
                  :placeholder="item.placeholder" 
               />
            </template>
            <template v-if="item.type==='inputNumber'">
               <a-input-number 
                v-model:value="item.value" 
                :min="item.min?item.min:1" 
                :max="item.max"
                :step="item.step"
                :placeholder="item.placeholder"  
            />
            </template> 
            <template v-if="item.type==='select'">
               <a-select
                  v-model:value="item.value"
                  @change="item.change"
                  :allowClear="true"
                  :disabled="item.disabled"
                  :mode="item.mode"
                  :maxTagCount="item.maxTagCount"
                  :showSearch="item.showSearch"
                  :labelInValue="item.labelInValue"
                  :placeholder="item.placeholder" 
               >
                  <a-select-option :value="item.value" v-for="(item,index) in item.options" :key="index">{{item.label}}</a-select-option>
               </a-select>
            </template>
            <template v-if="item.type==='radio'">
               <a-radio-group 
                  v-model:value="item.value"
                  :disabled="item.disabled"
               >
                    <a-radio  v-for="(item,index) in item.options" :key="index" :value="item.value">{{item.label}}</a-radio>
               </a-radio-group>
            </template>
            <template v-if="item.type==='checkbox'">
               <a-checkbox-group 
                 v-model:value="item.value" 
                 :options="item.options"
                 :disabled="item.disabled" 
                 />
            </template>
            <template v-if="item.type==='date'">
                <a-date-picker 
                   v-model:value="item.value"
                   :disabled="item.disabled"
                   :picker="item.picker"
                   :placeholder="item.placeholder"
                   @panelChange="item.change"
                 />
            </template>
            <template v-if="item.type==='range'">
                <a-range-picker
                   v-model:value="item.value"
                   :disabled="item.disabled"
                   :picker="item.picker"
                   :placeholder="item.placeholder"
                   @panelChange="item.change"
                 />
            </template>
            <template v-if="item.type==='cascader'">
                <a-cascader
                   v-model:value="item.value" 
                   :options="item.options"
                   :disabled="item.disabled" 
                 />
            </template>
            <template v-if="item.type==='switch'">
               <a-switch 
                  v-model:checked="item.value"
                  :disabled="item.disabled"
                />
            </template>
            <template v-if="item.type==='tree'">
               <a-tree-select
                  v-model:value="item.value"
                  :placeholder="item.placeholder"
                  :tree-checkable="item.checkable"
                  :tree-default-expand-all="item.expand"
                  :multiple="item.multiple"
                  :searchValue="item.searchValue"
                  :height="item.height?height:300"
                  :tree-data="item.treeData"
                  @select="item.select&&item.select"
                  @change="item.change&&item.change"
               />
            </template>
            <template v-if="item.type==='upload'">
               <Upload :uploadData="{ 
                     limit:item.limit,
                     list:item.value,
                     accept:item.accept,
                     disabled:item.disabled,
                     data:item.data,
                     id:item.id,
                     onChange:(value)=>{item.onChange(value)},
                     onDelete:(value)=>{item.onDelete&&item.onDelete(value)}
               }" />
            </template>
            <template v-if="item.type==='button'">
               <a-button 
                  v-for="subItem in item.list" 
                  :key="subItem.label" 
                  :class="subItem.class?subItem.class:'primary'"
                  @click="subItem.click(searchData)" 
                  >
               {{subItem.label}}
               </a-button>
            </template>
         </a-form-item>
      </a-form>
     
   </section>
</template>

<script>
import { ref, reactive, toRaw ,watch, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Upload from '@/components/Upload/index.vue'
export default {
  name: 'Search',
  components: {
    Upload
  },
  props:{
      searchData:{
         type:Array,
         default:[]
      }
  },
  setup(props, context) {
  
   return{
       
   }
     
  }
}
</script>

<style lang="less">

</style>
