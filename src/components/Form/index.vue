<template>
   <section class="form-panel">
      <a-form ref="formRef" :model="rules" layout="inline" @finish="onFinish">
         <a-form-item 
           :label="item.label" 
           v-for="(item,index) in formData" 
           :key="index" 
           :class="[item.type!=='button'&&row]"
           :rules="item.rules&&item.rules"
           :name="item.prop"
         >
            <template v-if="item.type==='input' || item.type==='textarea' || item.type==='password' || !item.type">
               <a-input 
                  v-model:value="rules[item.prop]" 
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
                v-model:value="rules[item.prop]" 
                :min="item.min?item.min:1" 
                :max="item.max"
                :step="item.step"
                :placeholder="item.placeholder"  
            />
            </template> 
            <template v-if="item.type==='select'">
               <a-select
                  v-model:value="rules[item.prop]"
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
                  v-model:value="rules[item.prop]"
                  :disabled="item.disabled"
               >
                    <a-radio  v-for="(item,index) in item.options" :key="index" :value="item.value">{{item.label}}</a-radio>
               </a-radio-group>
            </template>
            <template v-if="item.type==='checkbox'">
               <a-checkbox-group 
                 v-model:value="rules[item.prop]" 
                 :options="item.options"
                 :disabled="item.disabled" 
                 />
            </template>
            <template v-if="item.type==='date'">
                <a-date-picker 
                   v-model:value="rules[item.prop]"
                   :disabled="item.disabled"
                   :picker="item.picker"
                   :placeholder="item.placeholder"
                   @panelChange="item.change"
                 />
            </template>
            <template v-if="item.type==='range'">
                <a-range-picker
                   v-model:value="rules[item.prop]"
                   :disabled="item.disabled"
                   :picker="item.picker"
                   :placeholder="item.placeholder"
                   @panelChange="item.change"
                 />
            </template>
            <template v-if="item.type==='cascader'">
                <a-cascader
                   v-model:value="rules[item.prop]" 
                   :options="item.options"
                   :disabled="item.disabled" 
                   :placeholder="item.placeholder"
                 />
            </template>
            <template v-if="item.type==='switch'">
               <a-switch 
                  v-model:checked="rules[item.prop]"
                  :disabled="item.disabled"
                />
            </template>
            <template v-if="item.type==='tree'">
               <a-tree-select
                  v-model:value="rules[item.prop]"
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
                     list:rules[item.prop],
                     accept:item.accept,
                     disabled:item.disabled,
                     data:item.data,
                     id:item.id,
                     onChange:(value)=>{item.onChange(value)},
                     onDelete:(value)=>{item.onDelete&&item.onDelete(value)}
               }" />
            </template>
            <template v-if="item.type==='editor'">
               <Editor 
                  :editorData="rules[item.prop]"
               />  
            </template>
            <template v-if="item.type==='button'">
               <section class="form-btns">
                     <a-button 
                        v-for="subItem in item.list" 
                        :key="subItem.label" 
                        :class="subItem.class?subItem.class:'primary'"
                        @click="subItem.click(searchData)" 
                        :html-type="subItem.submit&&'submit'"
                        >
                     {{subItem.label}}
                     </a-button>
               </section>
            </template>
         </a-form-item>
      </a-form>
     
   </section>
</template>

<script>
import { ref, reactive, toRaw ,watch, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Upload from '@/components/Upload/index.vue'
import Editor from '@/components/Editor/index.vue'
export default {
  name: 'Form',
  components: {
    Upload,
    Editor
  },
  props:{
      formData:{
         type:Array,
         default:[]
      },
      row:{
         type:String,
         default:'row1'
      }
  },
  setup(props, context) {
   let rules=ref({}).value

   //遍历把传过来的数组转化对象，为校验提供数据
   props.formData.forEach(item=>{
      rules[item.prop]=item.value
   })

   //监听校验后的数据，再次赋值给数组的value，方便组件取值
   watch( 
      () => {
         return rules
      },
      state => {
        props.formData.forEach(item=>{
           item.value=state[item.prop]
        })
      },
      { 
         deep:true
   })
   

   const onFinish = values => {
      context.emit('handleSubmit',values)
   };


   return{
       onFinish,
       rules
   }
     
  }
}
</script>

<style lang="less">

</style>
