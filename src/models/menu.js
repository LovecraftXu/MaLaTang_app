/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-12 15:49:44
 * @LastEditTime: 2019-08-28 18:00:50
 * @LastEditors: Please set LastEditors
 */
import axios from '../http';

export default {
    namespace:"menu",
    state:{
        list:[],
        mType:[],
        mList:[],
        flag:false
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