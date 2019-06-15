import axios from '../http';

export default {
    namespace:"customer",
    state:{
        obj:{},
        visible:false,
    },
    effects:{
        *getCustomer(action,{ call,put }){
            console.log("我的id",action.id)
            let result = yield call(axios.get,"/customer/findById",{ params:{id:action.id} });
            console.log("我的",result.data)
            yield put ({
                type:"reloadCustomer",
                payload:result.data
            })
        },
        *openModal(action,{ call,put }){
            yield put ({
                type:"openM"
            })
        },
        *closeModal(action,{ call,put }){
            yield put ({
                type:"closeM"
            })
        },
        *saveData(action,{ call,put }){
            console.log("我的id",action.customer)
            yield call(axios.post,"/customer/saveOrUpdate",action.customer);
        },
        
    },
    reducers:{
        reloadCustomer(state,action){
            return {
                ...state,
                obj:action.payload
            }
        },
        openM(state,action){
            return {
                ...state,
                visible:true
            }
        },
        closeM(state,action){
            return {
                ...state,
                visible:false
            };
        }
            

        
    }
}