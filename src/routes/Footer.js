import React from 'react';
import { Menu, Icon } from 'antd';
import styles from './Footer.css'

class Footer extends React.Component {
  state = {
    current: 'home',
  };

  handleClick = e => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
    if(e.key === "order"){
      window.location.href = '/#/order';
    }
    if(e.key === "home"){
      window.location.href = '/#/start';
    }
    if(e.key === "user"){
      window.location.href = '/#/customer'; 
    }
  };

  render() {
    return (
      <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal" className={styles.nav}>
        

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

export default Footer;