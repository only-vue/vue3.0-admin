import axios from 'axios';
import qs from 'qs';
import router from '../router/index';
import store from '../store/index';

axios.defaults.timeout = 240000; //请求超时时间

axios.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// 响应拦截----------------------------------------------------------------
axios.interceptors.response.use(function (res) {
    let status = res.data.code ? res.data.code : res.status,
        message = res.data.message;
    switch (status) {
        case 200:
        case 201:
            return res;
            break;    
        case 401: //token过期 回登录
            MessageBox({
                title: '提示',
                dangerouslyUseHTMLString: true,
                message: message ? message : '用户已过期，请重新登录',
                callback: (action) => {
                    if(action==='confirm')
                    router.push('/login');
                }
            });
            break;
        default: //默认异常提示
        if (store.state.stopMessageBox) {
            store.state.stopMessageBox=false;
            MessageBox({
                title: '提示',
                dangerouslyUseHTMLString: true,
                message: message?message:'系统异常，请稍后再试',
                callback: () => {
                    store.state.stopMessageBox=true;
                }
             });
        }
        return res;
        break;
    }

}, (error) => {
   
   // return Promise.reject()
})



/**
 * 封装请求
 * @param url 
 * @param data
 * @param method 
 * @param loading
 * @returns {Promise}
 */

export function apiAxios(url, params = {}, method = 'post', loading = true) {
    let config = {
        method: method,
        url: ''  + url,
        params: method === 'GET' || method === 'DELETE' ? params : null,
        data: method === 'POST'  || method === 'PUT' ? params : null
    }
    if(params.download){
        config.responseType='blob'; 
    } 
    if(loading){
        store.dispatch("showLoading");
    }
    return new Promise((resolve, reject) => {
        axios(config)
            .then((res) => {
                if (loading) {
                    store.dispatch("hideLoading");
                }
                if(res.status==200){
                    resolve(res.data);
                }
            }).catch((response) => {
                if (loading) {
                    store.dispatch("hideLoading");
                }
                reject(response);
            })
    })
}