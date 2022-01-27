<template>
   <div class="header-panel">
      <div class="logo">
          <img src="../../assets/images/icon/logo.png" />
      </div>
      <div class="content">
          <div class="menu-c-icon">
               <MenuFoldOutlined />  
               <!-- <MenuUnfoldOutlined /> -->
          </div>
          <div class="fr-options">
              <a-badge count="5">
                 <BellOutlined /> 
              </a-badge>
              <span class="user-name">管理员</span>
                <a-dropdown>
                  <a class="ant-dropdown-avator" @click.prevent>
                    <img src="../../assets/images/user.png" />
                    <CaretDownOutlined />
                  </a>
                  <template #overlay>
                    <a-menu>
                      <a-menu-item key="0">
                        <a target="_blank" rel="noopener noreferrer" @click="handleOutSys" >
                          退出系统
                        </a>
                      </a-menu-item>
                    </a-menu>
                  </template>
              </a-dropdown>
          </div>
      </div>
   </div>
</template>

<script>
import { ref, reactive, toRaw } from 'vue'
import { useRouter, useRoute } from 'vue-router'
export default {
  name: 'Header',
  setup(props, context) {
    const router = useRouter();

    const handleOutSys=()=>{
        router.push('/login'); 
    }

    return{
      handleOutSys
    }
     
  }
}
</script>

<style lang="less">
.header-panel{
    height: 65px;
    background: #444853;
    display: flex;
    align-items: center;
    .logo{
        width: 200px;
        height: 200px;
        background: #363942;
        justify-content: center;
        display: flex;
        align-items: center;
        img{
            width: 100px;
        }
    }
    .content{
        flex: 1;
        .menu-c-icon{
            margin: 0 0 0 20px;
            float: left;
            .anticon{
                color: #fff;
            }
        }
        .fr-options{
            float: right;
            font-size: 14px;
            color: #fff;
            margin: 0 20px;
            .anticon{
                color: #fff;
                font-size: 20px;
                font-weight: bold;
            }
            .user-name{
               padding: 0 15px;
            }
            .ant-dropdown-avator{
                img{
                    height: 25px;
                    width: 25px;
                    border-radius:100%; 
                    margin: 0 5px 0;
                }
                .anticon{
                    font-size: 12px;
                    vertical-align: -2px;
                }
            }
        }
    }
}
</style>
