import instance from './axios';
import {Toast} from 'cube-ui';
import Vue from 'Vue';
Vue.use(Toast)

const toast = Toast.$create({
    time: 0,
    txt: 'loading...'
})

//封装post请求
const post = (url, params, header = {'Content-Type': 'application/json;charset=utf-8'}) => {

    //show loading
    toast.show()
    //header如果不传则使用默认的header
    console.log(header)
    var promise = new Promise( (resolve, reject) => {
        instance({
            url: url,
            method: 'post',
            data: params,
            // headers: header,     //自定义header
        }).then(function(res) {
            toast.hide()
            console.log(res)
            resolve(res)
        }).catch((err) => {
            toast.hide()
            reject(err)
        })
    }) 
    return promise
}

//封装get请求
const get = (url) => {
    toast.show()
    var promise = new Promise( (resolve, reject) => {
        instance.get(url).then((res) => {
            toast.hide()
            console.log('get-res:', res)
            resolve(res)
        }).catch((err) => {
            console.log(err)
            toast.hide()
            reject(err)
        })
    })
    return promise
}

export default {
    usermodel: {
        userLogin: function (data, header) {
            return post('/account/or/phone/to/login', data, header)
        },
        getDate: function () {
            return get('/gdylyl/test/whether/service/works')
        }
    },
}