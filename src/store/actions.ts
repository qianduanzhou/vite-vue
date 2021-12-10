import types from './mutation-types';
export default {
    setToken ({ commit }: any) {
        commit([types.SET_TOKEN])
    }
}