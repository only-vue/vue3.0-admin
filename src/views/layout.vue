<template>
	<div class="content-layout">
        <a-layout>
            <a-layout-header>
                <Header  />
            </a-layout-header>
            <a-layout>
                <a-layout-sider>
                    <Menu  />
                </a-layout-sider>
                <a-layout-content class="layout-tabs">
                    <template v-if="store.state.menuList&&store.state.menuList.length">
                        <a-tabs v-model:activeKey="store.state.activeKey" hide-add type="editable-card" @edit="onRomove" @change="onChange">
                            <a-tab-pane v-for="pane in store.state.menuList" :key="pane.fullPath" :tab="pane.name">
                            </a-tab-pane>
                        </a-tabs>
                    </template>
                    <router-view :key="route.fullPath" />
                </a-layout-content>
            </a-layout>
        </a-layout>
	</div>
</template>
<script>
import { ref, reactive, toRaw } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Header from "@/components/Header";
import Menu from "@/components/Menu";
import { useStore } from 'vuex'
export default {
    name: 'Layout',
    components: {
        Header,
        Menu
    },
	setup() {
		const router = useRouter()
        const route = useRoute()
        const store = useStore()
        const onRomove = key => { 
           store.commit('removeTabNav',key);
        };
         
        const onChange = key => {
           router.push(key);
        }; 
     
        
		return {
           route,
           onRomove,
           onChange,
           store
		}
	}
}
</script>

<style lang="less" scoped>
 .layout-tabs{
     padding: 10px 15px;
 }

</style>