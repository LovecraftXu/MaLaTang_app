/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-12 15:43:31
 * @LastEditTime: 2019-08-31 14:33:34
 * @LastEditors: Please set LastEditors
 */
import React from 'react';
import {connect} from 'dva';
import styles from './MenuPage.css';
import { Button, Tabs, Radio, Icon, Card, Drawer } from 'antd';


import Footer from './Footer';

const { TabPane } = Tabs;

class MenuPage extends React.Component {

    state = { visible: false };
    
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

    toAdd = (menu,e) => {
        this.props.dispatch({
            type:"shopcart/addShopCart",
            menu:menu
        })
        // event.stopPropagation();
        e.stopPropagation();    //阻止默认事件
        // console.log("事件对象",e);  
        
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
        let vm = this;
        // 这里的执行需要先执行完添加完之后再进行跳转
        this.props.dispatch({
            type:"shopcart/saveShopCart",
            shopcarts:shopcarts
        })
        setTimeout(function(){
            console.log("执行等待");
            vm.props.history.push({ pathname : '/order'});
        }, 1000); 
    }

    showDrawer = () => {
        this.setState({
          visible: true,
        });
      };
    
    onClose = () => {
    this.setState({
        visible: false,
    });
    };

    menuDetail = (menu) => {
        // console.log(this.props)
        this.props.history.push({ pathname : '/menuDetailPage' , obj : menu });
    }

    render(){
        let list = this.props.menu.list;
        let mType = this.props.menu.mType;
        let mList = this.props.menu.mList;
        let sList = this.props.shopcart.sList;
        this.flag = this.props.menu.flag;
        return (
            <div className={styles.menu}>
                
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
                                        <Card.Grid className={styles.my_menu} key={item.menuId} onClick={this.menuDetail.bind(this,item)}>
                                            <img className={styles.menu_photo} src={item.photo} alt="图片迷路了"></img>
                                            <ul>
                                                <li><p>名称：{item.menuName}</p></li>
                                                <li>
                                                    <span>价格：{item.menuPrice}</span>
                                                    <Icon type="plus-circle" className={styles.add} onClick={this.toAdd.bind(this,item)}/>
                                                </li>
                                            </ul>
                                        </Card.Grid>
                                    ))
                                }
                                
                            </TabPane>
                            {
                                mType.map((item) => (
                                    <TabPane tab={item} key={item} className={styles.my_tp} >
                                        <p>{item}类型的菜单已放入您的菜谱</p>
                                        {
                                            mList.map((item) => (
                                                <Card.Grid className={styles.my_menu} key={item.menuId} onClick={this.menuDetail.bind(this,item)}>
                                                    <img className={styles.menu_photo} src={item.photo} alt="图片迷路了"></img>
                                                    <ul>
                                                        <li><p>名称：{item.menuName}</p></li>
                                                        <li>
                                                            <span>价格：{item.menuPrice}</span>
                                                            <Icon type="plus-circle" className={styles.add} onClick={this.toAdd.bind(this,item)}/>
                                                        </li>
                                                    </ul>
                                                </Card.Grid>
                                            ))
                                        }
                                    </TabPane>
                                ))
                            }
                        </Tabs>
                    </div>
                </div>
                <div className={styles.header}> 
                {/* <Icon type="shopping-cart" className={styles.shopBtn} onClick={this.showDrawer}/> */}
                    
                    <Drawer
                    title="购物车"
                    placement="bottom"
                    closable={false}
                    onClose={this.onClose}
                    visible={this.state.visible}
                    >
                    <div className={styles.drawer}>
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
                    </Drawer>
                    
                    <p className={styles.first_p}>
                        <span>我的购物车</span>
                        <Icon type="shopping-cart" className={styles.shopBtn}  onClick={this.showDrawer}/>
                        <Icon type="delete" className={styles.clear} onClick={this.toClear.bind(this)}/>
                    </p>
                    <div className={styles.card} >
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
                <Footer propHistory={this.props.history}/>
            </div>
        )
    }
}

export default connect(state=>state)(MenuPage);