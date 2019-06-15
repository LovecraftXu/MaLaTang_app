import axios from '../http';

export default {
    namespace:"seat",
    state:{
        list:[],
    },
    effects:{
        *getSeat(action,{call, put}){
            let result = yield call(axios.get,"/seat/findAll");
            yield put({
                type:"reloadSeat",
                payload:result.data
            })
        },
        *chooseSeat(action,{call, put}){
            // alert(action.id)
            yield call(axios.get,"/seat/chooseSeat",{ params:{id:action.id} })
        }
        
    },
    reducers:{
        reloadSeat(state,action){
            return {
                ...state,
                list:action.payload
            }
        }
    }
}