import React from 'react';
import {connect} from 'dva';
import { Collapse,Modal, Button } from 'antd';
import styles from './OrderPage.css';

import Footer from './Footer';
const Panel = Collapse.Panel;


class OrderPage extends React.Component{

    componentDidMount(){
        let orderId = window.localStorage.getItem("orderId");
        this.getShopCart(orderId); 
        this.loadOrder(orderId);
        this.loadAllOrder(orderId);
    }


    getShopCart = (orderId) =>{
        this.props.dispatch({
            type:"order/getShopCart",
            orderId:orderId
        })
    }
    
    callback =(key) => {
        console.log(key);
    }

    loadOrder = (id) => {
        this.props.dispatch({
            type:"order/loadCurOrder",
            id:id
        })
    }

    loadAllOrder = (id) => {
        console.log("我在这里",id);
        this.props.dispatch({
            type:"order/getAllOrder",
            id:id
        })
    }

    info = (price) => {
        Modal.info({
          title: '支付通道',
          content: (
            <div>
              <p>请去柜台扫码支付{price}元!</p>
            </div>
          ),
          onOk() {
          },
        });
      }

    //时间戳转日期  没有时间默认为1970-01-1 8:0:0
    timestampToTime(timestamp) {
        let date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000    
        let Y = date.getFullYear() + '-';      
        let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';      
        let D = date.getDate() + ' ';     
        let h = date.getHours() + ':';
        let m = date.getMinutes() + ':';
        let s = date.getSeconds();
         return Y+M+D+h+m+s;
        }

    render(){
        
        let shopcartList = this.props.order.shopcart;
        let order = this.props.order.obj;
        let list = this.props.order.list;
        // let orderId = window.localStorage.getItem("orderId");
          
        return (
            <div className="order">
               <div className={styles.header}>
                    我的订单
                </div>
                <Collapse defaultActiveKey={['1']} onChange={this.callback}>
                    <Panel header="当前订单" key="1" className={styles.my_panel}>
                    {
                        shopcartList.map((item) => (
                            <p key={item.menuId} className={styles.pflex}>
                                    <span>菜品：{item.shopMenuName} </span>  
                                    <span>数量：{item.shopNumber} </span>
                                    <span>价格：{item.shopPrice} </span>
                            </p>
                        ))
                        
                    }
                    {/* "这是购物车--" {  JSON.stringify(shopcartList)} */}
                    {/* "这是订单--" {  JSON.stringify(order)} */}
                    
                    <div >
                        <p>排队状态： {order.orderType} </p>
                        <p>订单总价： {order.orderAllprice} 元 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <Button onClick={this.info.bind(this,order.orderAllprice)}>支付</Button></p>
                        <p>下单时间： {this.timestampToTime(order.orderDate)} </p>    
                    </div>
                    {/* {JSON.stringify(list)} */}
                    </Panel>
                    {
                        
                        list.map((item) => (
                            <Panel header="历史订单" key={item.orderId} className={styles.my_panel}>
                            <div >
                                <p>排队状态： {item.orderType} </p>
                                <p>订单总价： {item.orderAllprice} 元  已支付</p>
                                <p>下单时间： {this.timestampToTime(item.orderDate)} </p>    
                                <p>订单用桌： {item.seat.seatPosition} </p>
                                <p>下单人： {item.customer.custRealname} </p>
                            </div>
                            </Panel>
                        ))
                    }
                    
                </Collapse>
                <Footer />
            </div>
        )
    }
}

export default connect(state=>state)(OrderPage);