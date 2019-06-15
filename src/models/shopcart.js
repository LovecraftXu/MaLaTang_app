import axios from '../http';

export default {
    namespace:"shopcart",
    state:{
        sList:[],
        list:[],
        obj:{},
    },
    effects:{
        

        *saveShopCart(action,{call, put}){
            let orderId = window.localStorage.getItem("orderId");
            console.log("购物车",orderId);
            for(var i=0; i<action.shopcarts.length; i++){
                yield call(axios.post,"/shopcart/saveOrUpdate", {
                    shopMenuId:action.shopcarts[i].menuId,
                    shopNumber:action.shopcarts[i].shopNumber,
                    shopOrderId:orderId
                })
            }
            console.log("购物车添加请求完成");
        },


        *addShopCart(action,{call, put}){
            yield put({
                type:"addsList",
                payload:{
                    menuId:action.menu.menuId,
                    menuName:action.menu.menuName,
                    shopNumber:1,
                }
            })
        },
        *subShopCart(action,{call, put}){
            yield put({
                type:"subsList",
                payload:{
                    menuId:action.menu.menuId,
                    menuName:action.menu.menuName,
                }
            })
        },
        *clearShopCart(action,{call, put}){
            yield put({
                type:"clearsList",
            })
        }, 
       
    },
    reducers:{
        
        addsList(state,action){
            for (let i=0; i<state.sList.length; i++) {
                if(action.payload.menuId  ===  state.sList[i].menuId){
                    state.sList[i].shopNumber++;
                    return {...state};
                } 
            }
            state.sList.push(action.payload);
            return {...state};
            
        },
        subsList(state,action){
            for (let i=0; i<state.sList.length; i++) {
                if(action.payload.menuId === state.sList[i].menuId){
                    if(state.sList[i].shopNumber > 1){
                        state.sList[i].shopNumber--;
                        return {...state};
                    } else {
                        state.sList.splice(i,1);
                        return {...state};
                    }
                }
            }
        },
        clearsList(state,action){
            return {
                ...state,
                sList:[]
            }
        },
       
    }
}