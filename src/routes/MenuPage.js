import React from 'react';
import {connect} from 'dva';
import styles from './MenuPage.css';
import { Button, Tabs, Radio, Icon } from 'antd';

import Footer from './Footer';

const { TabPane } = Tabs;

class MenuPage extends React.Component {
    
    componentDidMount(){
        this.reloadMenu();
        this.reloadMenuType();
    }

    reloadMenu(){
        this.props.dispatch({
            type:"menu/getMenu"
        });
    }
    reloadMenuType(){
        this.props.dispatch({
            type:"menu/getMenuType"
        });
    }

    findFoodByType = (activeKey) => {
        if(activeKey !== "全部"){
            // console.log(activeKey);
            this.props.dispatch({
                type:"menu/getMenuByType",
                foodType:activeKey
            })
        }
    }

    toAdd = (menu) => {
        this.props.dispatch({
            type:"shopcart/addShopCart",
            menu:menu
        })
    }

    toSub = (menu) => {
        this.props.dispatch({
            type:"shopcart/subShopCart",
            menu:menu
        })
    }

    toClear = () => {
        this.props.dispatch({
            type:"shopcart/clearShopCart",
        })
    }

    shopCartZero = (record) => {
        if(record.length === 0){
            return (<p><img className={styles.clearimg} src={require('../images/clear1.png')}  alt="图片迷路了"></img></p>)
        }
    }

    toPay = (shopcarts) => {
        // 这里的执行需要先执行完添加完之后再进行跳转
        this.props.dispatch({
            type:"shopcart/saveShopCart",
            shopcarts:shopcarts
        })
        setTimeout(function(){
            console.log("执行等待");
            window.location.href = '/#/order';
        }, 1000);  
    }

    render(){
        let list = this.props.menu.list;
        let mType = this.props.menu.mType;
        let mList = this.props.menu.mList;
        let sList = this.props.shopcart.sList;
        return (
            <div className="menu">
                
                {/* {JSON.stringify(this.props.menu.list)} */}
                {/* {JSON.stringify(this.props.menu.mType)} */}
                {/* {JSON.stringify(this.props.menu.mList)} */}
                <div className={styles.food}>
                    <div className={styles.nav}>
                        <Radio.Group value="left" style={{ marginBottom: 8 }}>
                        </Radio.Group>
                        <Tabs defaultActiveKey="全部" tabPosition="left" style={{ height: 430 }} onChange={this.findFoodByType.bind(this)} >
                            <TabPane tab="全部" key="全部" className={styles.my_tp}>
                                <p>全部菜单已放入您的菜谱</p>
                                {
                                    list.map((item) => (
                                        <div className={styles.my_menu} key={item.menuId}>
                                            <img className={styles.menu_photo} src={item.photo} alt="图片迷路了"></img>
                                            <ul>
                                                <li><p>名称：{item.menuName}</p></li>
                                                <li>
                                                    <span>价格：{item.menuPrice}</span>
                                                    <Icon type="plus-circle" className={styles.add} onClick={this.toAdd.bind(this,item)}/>
                                                </li>
                                            </ul>
                                        </div>
                                    ))
                                }
                                
                            </TabPane>
                            {
                                mType.map((item) => (
                                    <TabPane tab={item} key={item} className={styles.my_tp} >
                                        <p>{item}类型的菜单已放入您的菜谱</p>
                                        {
                                            mList.map((item) => (
                                                <div className={styles.my_menu} key={item.menuId}>
                                                    <img className={styles.menu_photo} src={item.photo} alt="图片迷路了"></img>
                                                    <ul>
                                                        <li><p>名称：{item.menuName}</p></li>
                                                        <li>
                                                            <span>价格：{item.menuPrice}</span>
                                                            <Icon type="plus-circle" className={styles.add} onClick={this.toAdd.bind(this,item)}/>
                                                        </li>
                                                    </ul>
                                                </div>
                                            ))
                                        }
                                    </TabPane>
                                ))
                            }
                        </Tabs>
                    </div>
                </div>
                <div className={styles.header}> 
                    <p className={styles.first_p}>
                        <span>我的购物车</span>
                        <Icon type="delete" className={styles.clear} onClick={this.toClear.bind(this)}/>
                    </p>
                    <div className={styles.card} >
                        {/* {JSON.stringify(sList)} */}
                        {this.shopCartZero(sList)}
                        {
                            sList.map((item) => (
                                <p key={item.menuId}>
                                    <span>菜品：{item.menuName}</span> 
                                    <span>数量：
                                    <Icon type="plus-circle" className={styles.my_icon} onClick={this.toAdd.bind(this,item)}></Icon>  
                                    &nbsp;{item.shopNumber}&nbsp;  
                                    <Icon type="minus-circle" className={styles.my_icon} onClick={this.toSub.bind(this,item)}></Icon></span>
                                </p>
                            ))
                        }
                    </div>
                    <Button type="primary" block onClick={this.toPay.bind(this,sList)}>去结算</Button>
                </div>
                <Footer />
            </div>
        )
    }
}

export default connect(state=>state)(MenuPage);