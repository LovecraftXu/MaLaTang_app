
export default {
    namespace:"start",
    state:{
        loading:false,
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