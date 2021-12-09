import {toRefs} from 'vue';
import { request, DataIn } from "@/request";
import { deepClone } from "@/utils"

interface Data extends DataIn {
    limit: number
}
interface RequestOption {
    name: string,
    data: Data,
    recordKey ?: string
}

let cacheList: Array<any> = [];//缓存的数据列表
let copyRes: any = null;//缓存的返回结果

//缓存桶类
class CacheBucket {
    public requestOption: RequestOption;//请求和返回相关参数
    public defalutCount: number;//默认一次返回数量

    constructor(requestOption: RequestOption, defalutCount: number) {
        this.defalutCount = defalutCount || requestOption ? requestOption.data.limit / 2 : 20
        this.requestOption = requestOption || {}
    }

    //初始化
    static init() {
        cacheList = []
        copyRes = null
    }

    //获取列表
    public getList() {
        return new Promise((resolve: any, reject: any) => {
            if(cacheList.length > this.defalutCount) {
                this.requestList(resolve, reject, false, false)
            } else if(cacheList.length === this.defalutCount) {
                this.requestList(resolve, reject, false)
            } else {
                this.requestList(resolve, reject)
            }
        })
    }
    
    /**
     * 请求列表
     * @param resolve 
     * @param reject 
     * @param isHandle 是否使用handleResult方法
     * @param isRequest 是否请求接口
     */
    private requestList(resolve: any, reject: any, isHandle: boolean = true, isRequest: boolean = true) {
        let {name, data, recordKey} = this.requestOption

        if(!isHandle) {
            if(recordKey) {
                copyRes[recordKey] = cacheList.splice(0, this.defalutCount)
            } else {
                copyRes = cacheList.splice(0, this.defalutCount)
            }
            let result = {
                res: copyRes,
                isRequest: isRequest ? true : false
            }
            resolve(result)
        }
        if(isRequest) {
            request({ name, data }).then(
                (res: any) => {
                    if(isHandle) {
                        this.handleResult(resolve, res);
                    } else {
                        let data = recordKey ? res[recordKey] : res
                        cacheList = cacheList.concat(data)
                    }
                }).catch((err: any) => {
                    reject(err)
            })
        }
    }

    //处理请求结果
    private handleResult(resolve: any, res: any) {
        copyRes = deepClone(res)
        let { recordKey } = this.requestOption
        if(recordKey) {
            copyRes[recordKey] = this.handleRecord(res[recordKey])
        } else {
            copyRes = this.handleRecord(res)
        }
        let result = {
            res: copyRes,
            isRequest: true
        }
        resolve(result)
    }
    /**
     * 处理列表
     * @param data 列表
     * @returns 
     */
    private handleRecord(data: any) {
        let record: Array<any> = [];
        cacheList = cacheList.concat(data)
        record = cacheList.splice(0, this.defalutCount)
        return record
    }
}

export default CacheBucket