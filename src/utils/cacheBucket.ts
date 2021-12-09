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



//缓存桶类
class CacheBucket {
    constructor() {}
    public cacheList: Array<any> = [];//缓存的数据列表
    public copyRes: any = null;//缓存的返回结果
    public defalutCount: number = 20;//默认一次返回数量
    public requestOption: RequestOption = {name: '', data: {limit: 0}};//请求和返回相关参数
    //初始化
    public init(requestOption: RequestOption, defalutCount: number) {
        let { limit } = requestOption.data
        if(defalutCount > limit) {
            throw new SyntaxError(`defalutCount不能大于limit`);
        }
        this.defalutCount = defalutCount !== undefined ? defalutCount : requestOption ? limit / 2 : this.defalutCount
        this.requestOption = requestOption || {}
    }

    //获取列表
    public getList() {
        return new Promise((resolve: any, reject: any) => {
            if(this.cacheList.length > this.defalutCount) {
                this.requestList(resolve, reject, false, false)
            } else if(this.cacheList.length === this.defalutCount) {
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
                this.copyRes[recordKey] = this.cacheList.splice(0, this.defalutCount)
            } else {
                this.copyRes = this.cacheList.splice(0, this.defalutCount)
            }
            let result = {
                res: this.copyRes,
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
                        this.cacheList = this.cacheList.concat(data)
                    }
                }).catch((err: any) => {
                    reject(err)
            })
        }
    }

    //处理请求结果
    private handleResult(resolve: any, res: any) {
        this.copyRes = deepClone(res)
        let { recordKey } = this.requestOption
        if(recordKey) {
            this.copyRes[recordKey] = this.handleRecord(res[recordKey])
        } else {
            this.copyRes = this.handleRecord(res)
        }
        let result = {
            res: this.copyRes,
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
        this.cacheList = this.cacheList.concat(data)
        record = this.cacheList.splice(0, this.defalutCount)
        return record
    }
    /**
     * 获取缓存数据
     */
    public getCacheList() {
        return this.cacheList
    }
}

export default CacheBucket