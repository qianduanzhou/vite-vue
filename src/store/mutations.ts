import types from './mutation-types';

interface State {
    token: String
}

export default {
    [types.SET_TOKEN](state: State, val: string) {//设置token
        state.token = val;
    },
}