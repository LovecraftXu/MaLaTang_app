/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-10 17:02:34
 * @LastEditTime: 2019-08-29 18:00:32
 * @LastEditors: Please set LastEditors
 */

export default {
    namespace:"start",
    state:{
        loading:false,
        visible:false,
        list:[],
    },
    effects:{
        
    },
    reducers:{
        reloadUser(state,action){
            return {
                ...state,
                list:action.payload
            }
        }
    }
}