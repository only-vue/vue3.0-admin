<template>
	<section>
	    <Descriptions 
			:detailData="useData.detailData" 
			title="标题内容1" 
			:bordered="true"
        />
		 <Descriptions 
			:detailData="useData.detailData" 
			title="标题内容2"
			:bordered="true" 
        />
	</section>
</template>
<script>
import { ref, reactive, toRaw, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import Descriptions from "@/components/Descriptions/index.vue"
export default {
	name: 'Detail',
	components: {
		Descriptions
    },
	setup() {
		const store = useStore()
		const router = useRouter()
		const route = useRoute()

		const useData=reactive({
			detailData:[
				{
				  label:'UserName',
				  value:'only'	
				},
				{
				  label:'Telephone',
				  value:'1810000000'	
				},
				{
				  label:'Live',
				  value:'Hangzhou, Zhejiang'	
				},
				{
				  label:'Address',
				  value:'No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China',
				  span:3	
				},
				{
				  label:'Remark',
				  value:'empty',
				  span:3	
				}
			]
		})

		return {
			useData
		}
	}
}
</script>

<style lang="less" scoped>

</style>