import _ from 'lodash'
import router from '@/router/index';
import store from '@/store/index';
const mutations = {
    //设置全局tabnav
    setTabNav:(state,obj)=>{
        let menuList=state.menuList,
            length=menuList.length;
        if(length<1){  
           menuList.push(obj);
           state.activeKey=obj.fullPath;
           return false;
        }
        let pathArray=menuList.map(item=>{return item.fullPath});
        //判断当前路由是否存在
        if(!pathArray.includes(obj.fullPath)){
          menuList.push(obj);
        }
        state.activeKey=obj.fullPath;
    },
    //移除当前tabnav
    removeTabNav(state,path){
        let menuList=state.menuList,
            key=_.findIndex(menuList, ['fullPath',path]),
            fullPath='';
        menuList.splice(key,1);
        switch(key){
          case 0:
            fullPath=menuList[0].fullPath;
          break;
          default:
          if(state.activeKey==path){
             fullPath=menuList[key-1].fullPath;
          }
          break;
        }
        state.activeKey=fullPath;
        router.push(fullPath);
    },
    //存入缓存
    setStorage(state,obj={}){
      try {
          const jsonStr = JSON.stringify(obj.val);
          sessionStorage.setItem(obj.name, jsonStr);
      } catch (e) {
          sessionStorage.setItem(obj.name, obj.val);
      }
    },
    //移除缓存
    removeStorage(state,val){
      sessionStorage.removeItem(val);  
   }
  }
  export default mutations