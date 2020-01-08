import axios from 'axios'
import store from '@/store/index'

axios.defaults.baseURL = 'http://120.79.162.149:3000'; //


const service = axios.create({
        baseURL: 'http://localhost:3000',
        // baseURL: 'http://u-to-world.com:3000',
        timeout: 3000, // request timeout
        withCredentials: true
    })
    //请求开始拦截 
service.interceptors.request.use(
    config => {
        // 每次发送请求之前判断vuex中是否存在token        
        // 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
        // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断 
        // const token = store.state.userInfo;
        // token && (config.headers.Authorization = token);
        return config;
    },
    error => {
        return Promise.error(error);

    })

//响应拦截器
service.interceptors.response.use(
    response => {
        // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据     
        // 否则的话抛出错误
        if (response.status == 200) {
            return Promise.resolve(response);
        } else {
            return Promise.reject(response);
        }
    },
    // 服务器状态码不是2开头的的情况
    // 这里可以跟你们的后台开发人员协商好统一的错误状态码    
    // 然后根据返回的状态码进行一些操作，例如登录过期提示，错误提示等等
    // 下面列举几个常见的操作，其他需求可自行扩展
    error => {
        console.log(error.response.status)
        if (error.response.status) {
            switch (error.response.status) {
                case 301:
                    router.replace({
                        path: '/login',
                    });
                    break;
                case 501:
                    console.log(error.response.data.message)

                    break;

                default:
                    console.log(error.response.data.message)

            }
            return Promise.reject(error.response);
        }
    }
)
export default service


//     /**
//      * 封装post请求
//      * @param url
//      * @param data
//      * @returns {Promise}
//      */

// export function post(url, data = {}) {
//     return new Promise((resolve, reject) => {
//         axios.post(url, data)
//             .then(response => {
//                 // console.log(response.data)
//                 resolve(response.data);
//             }, err => {
//                 reject(err)
//             })
//     })
// }
// /**
//  * 封装get方法
//  * @param url
//  * @param data
//  * @returns {Promise}
//  */
// export function get(url) {
//     return new Promise((resolve, reject) => {
//         axios.get(url)
//             .then(response => {
//                 resolve(response.data)
//             }, err => {
//                 reject(err)
//             })
//     })
// }