<template>
	<section>
      <Form 
	    :formData="useData.formData"
		@handleSubmit="handleSubmit" 
	  />
	</section>
</template>
<script>
import { ref, reactive, toRaw, watch, getCurrentInstance } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import Form from "@/components/Form/index.vue"
export default {
	name: 'TextForm',
	components: {
		Form
    },
	setup() {
		// data
		const { proxy, ctx } = getCurrentInstance();
		const store = useStore()
		const router = useRouter()
		const route = useRoute()
		
		const useData=reactive({
			formData:[
                {
                    prop: 'name',
                    label: 'input',
					placeholder: '请输入姓名',
					rules:[{ required: true, message: '请输入姓名' }]
				},
				{
                    prop: 'sex',
					label: 'select',
					type:'select',
					value:1,
					options:[ 
                       {
						   label:'男',
						   value:1
					   },
					   {
						   label:'女',
						   value:2
					   }
					],
					showSearch:true,
					placeholder: '请选择性别'
				},
				{
                    prop: 'lan',
					label: 'radio',
					type:'radio',
					value:1,
					options:[ 
                       {
						   label:'CN',
						   value:1
					   },
					   {
						   label:'EN',
						   value:2
					   },
					   {
						   label:'FR',
						   value:3
					   },
					   {
						   label:'DE',
						   value:4
					   },
					   {
						   label:'JP',
						   value:5
					   }
					],
					showSearch:true,
					placeholder: '请选择性别'
				},
				{
                    prop: 'like',
					label: 'checkbox',
					type:'checkbox',
					value:[2,3],
					options:[ 
                       {
						   label:'足球',
						   value:1
					   },
					   {
						   label:'篮球',
						   value:2
					   },
					   {
						   label:'羽毛球',
						   value:3
					   },
					   {
						   label:'乒乓球',
						   value:4
					   }
					],
					showSearch:true,
					placeholder: '请选择性别'
				},
				{
                    prop: 'money',
					label: 'inputNumber',
					value:100,
					max:1000,
					type:'inputNumber',
					placeholder: '请输入金额'
				},
				{
                    prop: 'birthday',
					label: 'date',
					type:'date',
					placeholder: '请选择生日',
					rules:[{ required: true, message: '请选择生日' }]
				},
				{
                    prop: 'date',
					label: 'range',
					type:'range',
					placeholder: ['开始日期','结束日期']
				},
				{
                    prop: 'address',
					label: 'cascader',
					type:'cascader',
					options:[
						{
							value: 'zhejiang',
							label: '浙江',
							children: [
								{
								value: 'hangzhou',
								label: '杭州',
								children: [
									{
									value: 'xihu',
									label: '西湖',
									},
								],
								},
							],
							},
							{
							value: 'jiangsu',
							label: '江苏',
							children: [
								{
								value: 'nanjing',
								label: '南京',
								children: [
									{
									value: 'zhonghuamen',
									label: '中华门',
									},
								],
								},
							]
						}
					],
					placeholder: '请选择地址'
				},
				{
                    prop: 'switch',
					label: 'switch',
					type:'switch',
					value:true
				},
				{
                    prop: 'class',
					label: 'tree',
					type:'tree',
				    treeData:[
						{
							title: 'Node1',
							value: '0-0',
							key: '0-0',
							children: [
							{
								title: 'Child Node1',
								value: '0-0-0',
								key: '0-0-0',
							},
							],
						},
						{
							title: 'Node2',
							value: '0-1',
							key: '0-1',
							children: [
							{
								title: 'Child Node3',
								value: '0-1-0',
								key: '0-1-0',
								disabled: true,
							},
							{
								title: 'Child Node4',
								value: '0-1-1',
								key: '0-1-1',
							},
							{
								title: 'Child Node5',
								value: '0-1-2',
								key: '0-1-2',
							},
							],
						}
					],
					checkable:true,
					placeholder: '请选择下拉树内容'
				},
				{
                    prop: 'mainImgs',
                    type: 'upload',
                    label: 'upload',
					value:[
						{
							uid: '-1',
							name: 'image.png',
							status: 'done',
							url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
						},
						{
							uid: '-2',
							name: 'image.png',
							status: 'done',
							url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
						},
						{
							uid: '-3',
							name: 'image.png',
							status: 'done',
							url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
						}
					]
				},
				{
                    prop: 'textEditor',
                    type: 'editor',
                    label: 'editor',
					value:''
                },
				{
                    type: "button",
                    list: [{
                        label: '保存',
						class: 'primary',
						submit:true,
                        click: (row) => {
                         
                        }
                    },{
                        label: '返回',
                        class: 'danger',
                        click: (row) => {
                           
                        }
                    }]
				}
			]
		})

        //提交表单数据
		const handleSubmit = values => {
            console.log(values)
		};

		return {
			useData,
			handleSubmit
		}
	}
}
</script>

<style lang="less" scoped>

</style>