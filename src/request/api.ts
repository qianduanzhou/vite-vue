interface ApiList {
    [propName: string]: {
        url: string,
        method ?: any,
        headers ?: any
    }
}

const {
    VITE_NORMALURL: normalUrl,
    VITE_BASICURL: basicUrl,
    VITE_EWATERURL: ewaterUrl,
    VITE_EMERCOMMANDURL: emerCommandUrl,
    VITE_IOTURL: iotUrl,
} = import.meta.env

let apiList: ApiList = {
    'test': {
        url: iotUrl + '/facility/getFacilityRealTimeDataByToken',
        method: 'get',
        // headers: {
        //     // 'Content-Type': 'application/json',
        //     // 'Content-Type': 'application/x-www-form-urlencoded',
        //     // 'Content-Type': 'multipart/form-data',
        // }
    }
}

export default apiList;