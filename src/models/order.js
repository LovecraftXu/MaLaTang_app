import axios from '../http';

export default {
    namespace:"order",
    state:{
        list:[],
        obj:{},
        id:"",
        shopcart:[],
    },
    effects:{
        *loadCurOrder(action,{call, put}){
            console.log("切记！！！副作用函数名和put发送的请求函数名不能起一样，不然自己调用自己好恐怖!",action.id);
            let result = yield call(axios.get,"orderform/findById", { params:{id:action.id} });
            console.log(result.data);
            yield put({
                type:"loadThisOrder",
                payload:result.data
            })
        },
        
        *saveOrder(action,{call, put}){
            // alert(JSON.stringify(action.orderCustId))
            let result = yield call(axios.post,"/orderform/saveOrUpdate",{ orderCustId:action.orderCustId })
            yield put({
                type:"getOrderId",
                payload:result.data,
            })
            console.log("初始订单id",result.data);
            window.localStorage.setItem("orderId",result.data);
            let orderResult = yield call(axios.get,"/orderform/findById",{ params:{id:result.data} })
            yield put({
                type:"getOrder",
                payload:orderResult.data
            })
            console.log("初始订单",orderResult.data);
        },
        
        *updataOrderSeat(action,{call, put}){
            yield put({
                type:"setOrderSeat",
                payload:action.obj
            })
            yield call(axios.post,"/orderform/saveOrUpdate",action.obj);
        },

        *getShopCart(action,{call, put}){ 
            let result = yield call(axios.get,"/orderform/findAllShopCart",{ params:{id:action.orderId} });   
            console.log("订单搜索购物车",result.data);
            yield put({
                type:"reloadShopCart",
                payload:result.data
            })
          
        },
        *getAllOrder(action,{call, put}){
            let result = yield call(axios.get,"/orderform/findAllWithSeatAndCust");  
            let custId = window.localStorage.getItem("custId");
            console.log("顾客",custId)
            console.log("全部", result.data);
            console.log(action.id);
            // 切掉其他人的订单和当前订单
            var newArr = [];
            var flag = 0;
            for(let i=0; i<result.data.length; i++ ){
                
                if(result.data[i].orderCustId+"" === custId){
                    // console.log("等于顾客id",result.data[i]);
                    if(result.data[i].orderId+"" !== action.id ){ 
                        // console.log("类型判断e",typeof result.data[i].orderId);
                        // console.log("类型判断id",typeof action.id);
                        // console.log("非当前订单",result.data[i]);
                        newArr[flag++] = result.data[i];
                    }
                }
            }
            console.log("需要的", newArr);
            yield put({
                type:"reloadAllOrder",
                payload:newArr
            })
          
        },
        
    },
    reducers:{
        loadThisOrder(state,action){
            return {    
                ...state,
                obj:action.payload
            }
        },
        getOrderId(state,action){
            return {
                ...state,
                id:action.payload
            }
        },
        getOrder(state,action){
            return {
                ...state,
                obj:action.payload
            }
        },
        setOrderSeat(state,action){
            console.log("座位添加后订单",action.payload);
            return {
                ...state,
                obj:action.payload
            }
        },
        reloadShopCart(state,action){
            return {
                ...state,
                shopcart:action.payload
            }
        },
        reloadAllOrder(state,action){
            return {
                ...state,
                list:action.payload
            }
        },
    }
}