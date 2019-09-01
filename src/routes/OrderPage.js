/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-13 18:52:10
 * @LastEditTime: 2019-09-01 13:51:21
 * @LastEditors: Please set LastEditors
 */
import React from 'react';
import {connect} from 'dva';
import { Modal, Button, Card, Row, Col } from 'antd';
import styles from './OrderPage.css';

import QRCode  from 'qrcode.react';

import Footer from './Footer';



class OrderPage extends React.Component{

    componentDidMount(){
        let orderId = window.localStorage.getItem("orderId");
        if(orderId){
            this.getShopCart(orderId); 
            this.loadOrder(orderId);
        }
        this.loadAllOrder(orderId);
        console.log(this.props)
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
        // let cost = JSON.stringify(price);
        Modal.info({
          title: '支付通道',
          content: (
            <div>
                <QRCode
                    value={"扫码成功，已支付"+price+"元"}
                    size={200} 
                    fgColor="#000000"  
                />
                <p>请支付{price}元!</p>
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
        let hasOrNotHasOrder;

        if( order.orderId == null){
            hasOrNotHasOrder = (
                <Card title="当前订单" bordered={true} className={styles.my_panel}>
                    <p>购物车信息：</p>
                    <p>空空如也</p>
                    <p>快去点餐吧</p>
                    {/* <Button type="gost"></Button> */}
                    {/* "这是购物车--" {  JSON.stringify(shopcartList)} */}
                    {/* "这是订单--" {  JSON.stringify(order)} */}                    
                    
                    {/* {JSON.stringify(list)} */}
                </Card>
            )   
        } else {
            hasOrNotHasOrder = (
                <Card title="当前订单" bordered={true} className={styles.my_panel}>
                    <p>购物车信息：</p>
                    {
                        shopcartList.map((item) => (
                            
                            <Row key={item.shopId} className={styles.pflex} >
                                <span>
                                    <Col span={3} >菜品:</Col>    
                                    <Col span={7} >{item.shopMenuName}</Col>    
                                </span> 
                                <span>                             
                                    <Col span={3} >数量:</Col>    
                                    <Col span={4} >{item.shopNumber} </Col>    
                                </span> 
                                <span>
                                    <Col span={3} >价格:</Col>    
                                    <Col span={4} >{item.shopPrice}</Col>    
                                </span>
                            </Row>
                        ))
                        
                    }
                    {/* "这是购物车--" {  JSON.stringify(shopcartList)} */}
                    {/* "这是订单--" {  JSON.stringify(order)} */}                    
                    <div key={order.orderId}>
                        <p>排队状态： {order.orderType} </p>
                        <p>订单总价： {order.orderAllprice} 元 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <Button onClick={this.info.bind(this,order.orderAllprice)}>支付</Button></p>
                        <p>下单时间： {this.timestampToTime(order.orderDate)} </p>    
                    </div>
                    {/* {JSON.stringify(list)} */}
                </Card>
            )
        }

        let path = 'order';
          
        return (
            <div className={styles.order}>
               <div className={styles.header}>
                    我的订单
                </div>
                    {hasOrNotHasOrder}
                
                    {
                        
                        list.map((item) => (
                            <Card title="历史订单" bordered={true} className={styles.my_panel} key={item.orderId} >
                                <div >
                                    <p>排队状态： {item.orderType} </p>
                                    <p>订单总价： {item.orderAllprice} 元  已支付</p>
                                    <p>下单时间： {this.timestampToTime(item.orderDate)} </p>    
                                    <p>订单用桌： {item.seat.seatPosition} </p>
                                    <p>下单人：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{item.customer.custRealname} </p>
                                </div>
                            </Card>
                        ))
                    }
                    

                <Footer fahterName={path} propHistory={this.props.history}/>
            </div>
        )
    }
}

export default connect(state=>state)(OrderPage);