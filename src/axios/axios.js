import axios from 'axios';
import store from '../store/store';
import { BASE_URL } from './interface';
import { Toast } from 'cube-ui';
import Vue from 'Vue';
Vue.use(Toast)

const instance = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json;charset=utf-8"
    }
});

// 请求拦截器
instance.interceptors.request.use(
    config => {
        //如果存在token，添加token到请求头中
        if (store.state.token) {
            config.headers.token = store.state.token;
        }
        return config;
    },
    error => Promise.error(error)
);

//响应拦截器
instance.interceptors.response.use(
    res => {
        console.log('response->res:', res)
        //根据后台返回的状态码而定
        res.data.code === 200 ? responseHandle(res) : errorHandle(res);
        return res
    },
    error => {
        const { response, message } = error;
        console.log('服务器系统状态码错误！', error)
        console.log('Status Code:', response.status)
        console.log('Error Message:', message)
        errorHandleByStatus(response.status, response.data.status, response.data.message)
        return Promise.reject(error);
    }
);

//处理成功函数
function responseHandle(res) {
    //判断是否有返回token
    // 若有返回token（res.headers.authorization），保存token到
    if (res.headers.authorization) {
        console.log('发现新token')
        store.commit('setToken', res.headers.authorization)
    }
}

/** 
 * 请求失败后的错误统一处理 
 * @param {Number} status 请求失败服务器返回的状态码  
 * @param {Number} code 请求失败后台返回的状态码
 * @param {String} message 请求失败后台返回的信息
 * 
 */

//错误处理---------服务器状态码为2xx，后台状态码不为200的情景
function errorHandle(res) {
    let code = res.data.code
    let message = res.data.message
    let msg = ''
    console.log('后台状态码异常:', code, '->', message)
    //后台返回的状态码判断
    switch (code) {
        case 200:
            msg = '调用成功';
            break;
        case 20002:
            msg = message;
            break;
        default:
            msg = message;
    }
    if (msg) {
        Toast.$create({
            time: 2000,
            txt: msg,
            type: 'error'
        }).show()
    }
}

//错误处理---------服务器状态码错误     双重判断，后台需要
function errorHandleByStatus(status, code, message) {
    // 服务器状态码判断--------status
    if (status == 400) {
        // 后台状态码判断--------code
        switch (code) {
            case 400:
                Toast.$create({
                    time: 2000,
                    txt: message,
                    type: 'error'
                }).show()
                break;
            default:
                Toast.$create({
                    time: 2000,
                    txt: '出错，待完善' + message,
                    type: 'error'
                }).show()
        }
    } else if (status == 401) {
        switch (code) {
            case 401:
                Toast.$create({
                    time: 2000,
                    txt: '登录超时，请重新登录',
                    type: 'error'
                }).show()
                // toLogin()
                break;
            default:
                Toast.$create({
                    time: 2000,
                    txt: '出错，待完善' + message,
                    type: 'error'
                }).show()
        }
    }
    else {
        Toast.$create({
            time: 2000,
            txt: '出错，待完善' + message,
            type: 'error'
        }).show()
    }
}

export default instance