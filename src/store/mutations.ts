import types from './mutation-types';
export default {
    [types.SET_TOKEN](state: any, val: string) {//设置token
        state.token = val;
    },
}