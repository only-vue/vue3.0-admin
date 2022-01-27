<template>
   <div class="menu-panel">
      <a-menu
          id="menu"
          v-model:openKeys="openKeys"
          v-model:selectedKeys="selectedKeys"
          mode="inline"
          @click="handleClick"
        >
          <a-sub-menu  v-for="(item,index) in menuData" :key="index">
            <template #icon>
               <component :is="item.icon" />
            </template>
            <template #title>{{item.name}}</template>
            <a-menu-item v-for="subItem in item.children" :key="subItem.path">{{subItem.name}}</a-menu-item>
          </a-sub-menu>
      </a-menu>
   </div>
</template>

<script>
import { ref, reactive, toRaw, watch  } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'

export default {
  name: 'Menu',
  setup(props, context) {
    const openKeys = ref([0]);
    const router = useRouter();
    const route = useRoute();
    const store = useStore();
    let menuData=reactive([]),
        selectedKeys = ref([store.state.activeKey]);
  
    menuData=[
      {
         name:'菜单一',
         icon:'ProjectOutlined',
         children:[
            {
               name:'列表',
               path:'/table'
            },
            {
               name:'表单',
               path:'/form'
            },
            {
               name:'详情页',
               path:'/detail'
            },
            {
               name:'文本编辑器',
               path:'/editor'
            }
         ]
      },
      {
         name:'菜单二',
         icon:'SettingOutlined',
         children:[
            {
               name:'待开发',
               path:'/login'
            },
            {
               name:'待开发',
               path:'/login'
            }
         ]
      }
    ]
    
   watch(() => route.fullPath, (newValue, oldValue) => {
      if(newValue){
         selectedKeys.value=[newValue];  
      }
   })

    const handleClick = e => {
        selectedKeys.value = [e.key];
        router.push(e.key);
    };

    return{
      selectedKeys,
      openKeys,
      menuData,
      handleClick,
      route,
      store
    }
     
  }
}
</script>

<style lang="less">
@color-theme: #FFBD1F;
@color-write:#fff;
.menu-panel{
  .ant-menu{
    width: 100%!important;
    background: none!important;
    color: @color-write!important;
    border: none!important;
    .ant-menu-submenu-arrow,.ant-menu-submenu-title{
        color: @color-write!important;
    }
    .ant-menu-submenu-title{
      width: 100%!important;
      &:active{
        background: none!important;
      }
    }
    .ant-menu-item{
      width: 100%!important;
      color: @color-write!important;
      &:hover{
         color: @color-theme!important;
      }
      &:active{
        background: none!important;
        color: @color-write!important;
      }
    }
  }
  .ant-menu-submenu-open{
     background: rgba(0, 0, 0, 0.1)!important;
     color: @color-write!important;
     .ant-menu-submenu-title{
       background: #444853!important;
       color: @color-theme!important;
     }
     .ant-menu-submenu-arrow{
        color: @color-theme!important;
     }
     .ant-menu-item-selected{
        background: #37393d !important;
        color: @color-theme!important;
     }
     .ant-menu-item::after{
          border: none!important;
     }
  }

}
</style>
