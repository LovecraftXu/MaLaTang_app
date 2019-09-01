/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-11 19:34:16
 * @LastEditTime: 2019-09-01 13:52:05
 * @LastEditors: Please set LastEditors
 */
import React from 'react';
import { Menu, Icon } from 'antd';
import {connect} from 'dva';
import styles from './Footer.css';

class Footer extends React.Component {

  // state = {
  //   current: 'home',
  // };
  
  handleClick = e => {
    // console.log('click ', e.key);
    // this.setState({
    //   current: e.key,
    // });
    console.log('click ', all);
    console.log('click ', e);   
    all = e.key;
    
    switch (e.key) {
      case "order":
        // window.location.href = '/#/order';
        this.props.propHistory.push({ pathname : '/order' });
        // this.props.history.push({ pathname : '/order' });
        break;
      case "home":
        // window.location.href = '/#/start';
        console.log(this.props);
        // this.props.dispatch('/start')
        this.props.propHistory.push({ pathname : '/start' });
        break;
      case "user":
        // window.location.href = '/#/customer';
        this.props.propHistory.push({ pathname : '/customer' });
        // this.props.history.push({ pathname : '/customer' });
        break;
      default:
          this.props.propHistory.push({ pathname : '/start' });
        // window.location.href = '/#/start';
        // this.props.history.push({ pathname : '/start' });
        break;
    }  
  };

  render() {
    // console.log("查看",this.state.current);
    if(this.props.fahterName === 'order'){
      this.handleClick({key:'order'})
    }
    return (
      <Menu onClick={this.handleClick} selectedKeys={[all]} mode="horizontal" className={styles.nav}>
        <Menu.Item key="order" className={styles.bottom}>
            <Icon type="container" />
            订单
        </Menu.Item>
        <Menu.Item key="home" className={styles.bottom}>
            <Icon type="home" />
            首页
        </Menu.Item>
        <Menu.Item key="user" className={styles.bottom}>
            <Icon type="user" />
            我的
        </Menu.Item>
      </Menu>
    );
  }
}

var all ;

export default connect(state=>state)(Footer);
