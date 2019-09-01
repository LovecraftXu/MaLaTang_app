/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-12 15:43:31
 * @LastEditTime: 2019-08-30 16:41:25
 * @LastEditors: Please set LastEditors
 */
import React from 'react';
import {connect} from 'dva';

import { Button, Icon, Card, Meta, Row, Col } from 'antd';

import styles from './MenuDetailPage.css'

import Footer from './Footer';



class MenuDetailPage extends React.Component {

    
    componentDidMount(){
        console.log(this.props.location.obj)
    }

    toAdd = (menu) => {
        this.props.dispatch({
            type:"shopcart/addShopCart",
            menu:menu
        })
        this.goBack();
    }

    goBack = () => {
        this.props.history.goBack();
    }

    render(){
        let menu = this.props.location.obj;
        
        if(!menu){
            menu = {
                menuId: 2,
                menuName: "这是个默认的菜屏",
                menuPrice: 1,
                menuSales: 210,
                menuSum: 655,
                menuType: "蔬菜",
                photo: "http://134.175.154.93:8888/group1/M00/00/02/rBAACVzwyfqANAbTAAZiV9Fhzd0226.png",
                status: "正常"
            }
        }

        const { Meta } = Card;

        let boxTitle1,boxTitle2;

        if(menu.menuSum<50){
            boxTitle1 = (
                <p>热销中，库存不足50件</p>
            )
        }

        if(menu.menuSales>100){
            boxTitle2 = (
                <p>已销售100件以上,加入你的购物车吧</p>
            )
        }

        return (

        <div className={styles.menu_detail}>
            <div className={styles.header}>
                菜品详情
            </div>
             <div className={styles.outer}>
               <Card
                    // style={{ width: 300 }}
                    cover={
                    <img
                        alt="图片迷路了"
                        src={menu.photo}
                    />
                    }
                    actions={[
                    <Icon type="left-circle" key="back" style={{ fontSize: '20px' }} onClick={this.goBack.bind(this)} />,
                    <Icon type="hourglass" key="zhuan" spin style={{ fontSize: '20px' }}/>,
                    <Icon type="shopping-cart" key="add" style={{ fontSize: '20px' }} onClick={this.toAdd.bind(this,menu)}/>
                    ]}
                >
                    <Meta
                    
                    title={
                        (
                            <div style={{textAlign: 'center'}}>
                                <p>加入购物车请点击购物车按钮 (๑•ั็ω•็ั๑)</p>
                                {boxTitle1}
                                {boxTitle2}
                            </div>
                        )
                    }
                    description={
                        (
                        <div className={styles.desc} >
                            <Row style={{marginTop:10, marginBottom:10 }}>
                                <span>
                                    <Col span={4} >菜品:</Col>    
                                    <Col span={8} >{menu.menuName}</Col>    
                                </span> 
                                <span>
                                    <Col span={4} >类别:</Col>    
                                    <Col span={8} >{menu.menuType}</Col>    
                                </span> 
                            </Row>
                            <Row style={{marginBottom:10}}>
                                <span>
                                    <Col span={4} >销售额:</Col>    
                                    <Col span={8} >{menu.menuSales} 件</Col>    
                                </span> 
                                <span>
                                    <Col span={4} >库存:</Col>    
                                    <Col span={8} >{menu.menuSum} 件</Col>    
                                </span> 
                            </Row>
                            <Row style={{marginBottom:10}}>
                                <span>
                                    <Col span={4} >单价:</Col>    
                                    <Col span={8} >{menu.menuPrice} 元</Col>    
                                </span> 
                                
                            </Row>
                        </div>
                        )
                    }
                    />
                </Card>,
            </div>
            
            <Footer propHistory={this.props.history}/>
        </div>
        )
    }
}

export default connect(state=>state)(MenuDetailPage);