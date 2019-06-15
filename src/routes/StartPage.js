import React from 'react';
import {connect} from 'dva';
import { Carousel,Button,Card } from 'antd';
import styles from './StartPage.css';

import Footer from './Footer';

class StartPage extends React.Component{

    toAddOrder = (custId) => {
        this.props.dispatch({
            type:"order/saveOrder",
            orderCustId:custId
        });
        window.location.href = '/#/seat';
    }

    timeHandler(){
        let now = new Date();
        let hour = now.getHours();
        if(hour < 6){
            return (<span>凌晨好！</span>)
        } 
        else if (hour < 9){
            return (<span>早上好！</span>)
        } 
        else if (hour < 12){
            return (<span>上午好！</span>)
        } 
        else if (hour < 14){
            return (<span>中午好！</span>)
        } 
        else if (hour < 17){
            return (<span>下午好！</span>)
        } 
        else if (hour < 19){
            return (<span>傍晚好！</span>)
        } 
        else if (hour < 22){
            return (<span>晚上好！</span>)
        } 
        else {
            return (<span>夜里好！</span>)
        } 
        }

    render(){
        var realname = window.localStorage.getItem("realname");
        var type = window.localStorage.getItem("type");
        var custId = window.localStorage.getItem("custId");
        return (
            <div className="start">
                <div className={styles.header}>
                    <span>欢迎您</span>
                    <span>{realname}</span>
                </div>
                <Carousel autoplay className={styles.carousel}>
                    <div className={styles.lunbo_one}>
                        <h3>{type}九折优惠</h3>
                    </div>
                    <div className={styles.lunbo_two}>
                        <h3>世界上有两件东西能震撼人们的心灵：</h3>                  
                    </div>
                    <div className={styles.lunbo_three}>
                        <h3>一件是我们心中崇高的道德标准；</h3>             
                    </div>
                    <div className={styles.lunbo_four}>
                        <h3>另一件是我们头顶上灿烂的星空。</h3>
                    </div>
                </Carousel>
                <div className={styles.welcome}>
                     <span>{this.timeHandler()} {realname}</span>
                </div>

                <div> 
                    <Card className={styles.card} title="晶晶麻辣烫" >
                    <p>源于品质 高于生活 倾于热爱 精于服务 微于网络</p>
                    </Card>
                </div>
               
                <Button type="primary" block>
                    <div className={styles.btn_div} onClick={this.toAddOrder.bind(this,custId)}>
                        <span>开始点餐</span>&nbsp;
                        <span>order Now</span>
                    </div>
                </Button>
                <span className={styles.renqi}>人气热卖 精品美食</span>
                <div className={styles.top}>
                    <a href="#/menu"><img  src={require('../images/r1.png')} alt="图片迷路了" /></a>
                    <a href="#/menu"><img  src={require('../images/r2.png')} alt="图片迷路了" /></a>
                </div>
                
                <Footer />
            </div>
        )
    }
}

export default connect(state=>state)(StartPage);