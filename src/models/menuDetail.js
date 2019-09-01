/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-12 15:49:44
 * @LastEditTime: 2019-08-29 18:27:20
 * @LastEditors: Please set LastEditors
 */
import axios from '../http';

export default {
    namespace:"menuDetail",
    state:{
        obj:{}
    },
    effects:{
        *getMenuById(action,{call, put}){
            let result = yield call(axios.get,"/menu/findById",{ id:action.id });
            yield put({
                type:"reloadMenu",
                payload:result.data
            })
        },   
        
    },
    reducers:{
        reloadMenu(state,action){
            return {
                ...state,
                obj:action.payload
            }
        },
    }
}