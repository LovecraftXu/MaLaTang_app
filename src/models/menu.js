import axios from '../http';

export default {
    namespace:"menu",
    state:{
        list:[],
        mType:[],
        mList:[],
    },
    effects:{
        *getMenu(action,{call, put}){
            let result = yield call(axios.get,"/menu/findAll");
            yield put({
                type:"reloadMenu",
                payload:result.data
            })
        },
        *getMenuType(action,{call, put}){
            let result = yield call(axios.get,"/menu/findAllType");
            yield put({
                type:"reloadMenuType",
                payload:result.data
            })
        },
        *getMenuByType(action,{call, put}){
            let result = yield call(axios.get,"/menu/findAllByType",{ params:{type:action.foodType} });
            yield put({
                type:"findMenuByType",
                payload:result.data
            })
        },
        
        
    },
    reducers:{
        reloadMenu(state,action){
            return {
                ...state,
                list:action.payload
            }
        },
        reloadMenuType(state,action){
            return {
                ...state,
                mType:action.payload
            }
        },
        findMenuByType(state,action){
            return {
                ...state,
                mList:action.payload
            }
        }
    }
}