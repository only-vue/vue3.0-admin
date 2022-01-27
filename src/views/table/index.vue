<template>
	<div>
	   <Search :searchData="useData.searchData" />
	   <Table 
	     :tableData="useData.tableData" 
		 :columns="useData.columns"
		 :pagination="useData.pagination"
		>
		   <template v-slot:name="{data}" >
		    	{{data.name}}
			</template>
	   </Table>	   
	</div>
</template>
<script>
import { ref, reactive, toRaw, watch, getCurrentInstance , onMounted  } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import Search from "@/components/Search/index.vue"
import Table from "@/components/Table/index.vue"
export default {
	name: 'TextTable',
	components: {
		Search,
        Table
    },
	setup() {
		const store = useStore()
		
		const useData=reactive({
			searchData:[
                {
                    prop: 'name',
                    label: '姓名',
					placeholder: '请输入姓名'
				},
				{
                    prop: 'sex',
					label: '性别',
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
                    type: "button",
                    list: [{
                        label: '搜索',
                        class: 'primary',
                        click: (row) => {
                         
                        }
                    },{
                        label: '重置',
                        class: 'danger',
                        click: (row) => {
                           
                        }
                    }]
                }
			],
			tableData:[
				{
					key: '1',
					name: '胡彦斌',
					age: 32,
					address: '西湖区湖底公园1号',
				},
				{
					key: '2',
					name: '胡彦祖',
					age: 42,
					address: '西湖区湖底公园1号',
				}
			],
			columns:[
				{
					dataIndex: 'name',
					title: 'name',
					key: 'name',
					fixed:true,
					slot:'name'
				},
				{
					title: 'Age',
					dataIndex: 'age',
					key: 'age'
				},
				{
					title: 'Address',
					dataIndex: 'address',
					key: 'address',
				},
				{
					title: 'Tags',
					key: 'tags',
					dataIndex: 'tags',
					// slots: {
					// customRender: 'tags',
					// },
				},
				{
					title: '操作',
					key: 'action',
					dataIndex: 'action',
					width:'150px',
					options:[
						{
							title:'删除',
							click:(column,key)=>{
								store.commit('confirm',{
									content:'确认删除？',
									callback:()=>{
									   useData.tableData.splice(key,1);
									   store.commit('message',{
										   content:'删除成功!'
									   });
									}
								})
								
							}
						}
					]
				}
			],
			pagination: {
                total: 500,
                page: 1,
				pageSize: 10,
				click:(page, pageSize)=>{
				}
            }
		})
		
		//初始化，请求数据
		const app = getCurrentInstance().appContext.config.globalProperties;
		const getLoad = () =>{
            app.$http('/test',{}).then((res) => {
				
			})   
		}

		onMounted(() => { 
            getLoad();
		})

	

		//删除表格
		const onDelete = (key) =>{
           useData.tableData.splice(key,1);
		}

		return{
			useData,
			onDelete,
			getLoad
		}
		
	}
}
</script>

<style lang="less" scoped>

</style>