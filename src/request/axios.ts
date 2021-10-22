import axios from 'axios';
import store from '@/store/index';

let { VITE_NORMALURL: normalUrl, MODE } = import.meta.env

let baseURL = MODE == 'dev' ? '/local' : String(normalUrl)//或者可以使用import.meta.env.PROD(boolean)
const instance = axios.create({
    baseURL,//基础url
    timeout: 30000,//请求超时时间
})

// request拦截器
instance.interceptors.request.use(config => {
    let token = store.state.token
    if(token) {
        if(config.params) {
            config.params.token = token
        } else {
            config.params = {
                token
            }
        }
    }
    return config
}, err => {
    Promise.reject(err)
})

// response 拦截器
instance.interceptors.response.use(
    response => {
        const res: any = response.data
        let result: any;
        if(res.success == true) {
            result = res.data
        } else {
            result = res
        }
        return result
    },
    error => {
        console.log('err' + error) // for debug
        return Promise.reject(error)
    }
)

export {instance}