
import '../assets/css/loading.less'

const actions = {
      //得到缓存
      getStorage(state,val){
         const str = sessionStorage.getItem(val);
          if (str) {
              try {
                  const obj = JSON.parse(str);
                  return obj;
              } catch (e) {
                  return str;
              }
          } else {
              return null;
          }
      },
      //开启loading
      showLoading() {
            let Loading = {};
            Loading.installed = false;
            //防止loading重复加载
            if (Loading.installed) return;
            // 如果页面有loading则不继续执行
            if (document.querySelector('#vue-loading')) return;
            // 1、创建构造器，定义loading模板
            let tpl = document.createElement('div'),
                loader = document.createElement('div'),
                txt  = document.createElement('div')
            tpl.setAttribute('id','vue-loading');
            loader.setAttribute('class','loader');
            txt.setAttribute('class','txt');
            txt.innerHTML = '加载中...';
            tpl.appendChild(loader);
            tpl.appendChild(txt);
            // 2、把创建的实例添加到body中
            document.body.appendChild(tpl);
            // 阻止遮罩滑动
            document.querySelector('#vue-loading').addEventListener('touchmove', function(e) {
                e.stopPropagation();
                e.preventDefault();

            })
            Loading.installed = true;
        },
        //关闭loading
        hideLoading() {
            let tpl = document.querySelector('#vue-loading');
            if(tpl){
                document.body.removeChild(tpl);
            }
        }

}
export default actions

