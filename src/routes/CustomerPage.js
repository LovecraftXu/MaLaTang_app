/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-14 15:04:52
 * @LastEditTime: 2019-09-01 13:48:56
 * @LastEditors: Please set LastEditors
 */
import React from 'react';
import {connect} from 'dva';
import { Button, Modal} from 'antd';
import styles from './CustomerPage.css';
import CustomerForm from './CustomerForm';

import Footer from './Footer';

class SeatPage extends React.Component {

    componentDidMount(){
        let custId = window.localStorage.getItem("custId");
        this.reloadCustomer(custId);
    }

    reloadCustomer(custId){
        this.props.dispatch({
            type:"customer/getCustomer",
            id:custId
        })
    }

    outLogin = () => {
        window.localStorage.removeItem("orderId");
        // window.location.href = '/';
        this.props.history.push({ pathname : '/'});
    }

    toTransfame(staify){
       switch(staify) {
        case 1 :
            return (<span>☆</span>);
        case 2 :
            return (<span>☆☆</span>);
        case 3 :
            return (<span>☆☆☆</span>);
        case 4 :
            return (<span>☆☆☆☆</span>);
        case 5 :
            return (<span>☆☆☆☆☆</span>);
        default :
            return (<span>满意度爆表</span>);
       }  
    }

    toEdit = (record) => {
        this.props.dispatch({
            type:"customer/openModal",
        })
    }

    //点击取消
    handleCancel = e => {
        this.props.dispatch({
            type:"customer/closeModal",
        });
    };

    //提交
    handleOk = e => {
        e.preventDefault();
        
        this.form.validateFields((err, values) => {
          if (!err) {
            e.disabled=true; 
            this.props.dispatch({
                type:"customer/saveData", 
                customer:values,
            });
            this.props.dispatch({
                type:"customer/closeModal",
            });
            this.reloadCustomer(values.custId);
          } 
        });    
    }

    //ref函数
    FormRefs = (form) =>{
        this.form = form;
    }

    render(){
        let customer = this.props.customer.obj;
        let visible = this.props.customer.visible;
        return (
            <div className={styles.customer}>
                <div className={styles.header}>
                    我的信息
                </div>
                <div className={styles.outer}>
                    <div className={styles.photo}> 
                        <img  src={customer.photo} alt="图片迷路了" />
                    </div>
                    <div className={styles.msg}>
                        <p>我的昵称：{customer.custRealname}</p>
                        <p>我是：{customer.custType}</p>
                        <p>我对店家的满意度：{this.toTransfame(customer.custSatisfy)}</p>
                    </div>
                    <Modal
                        title="修改"
                        visible={visible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        >
                        <CustomerForm initData={customer} ref={this.FormRefs} />
                    </Modal>
                    <Button type="primary" block className={styles.btn} onClick={this.toEdit.bind()}>修改信息</Button>
                    <Button type="danger" block className={styles.btn} onClick={this.outLogin.bind()}>退出登录</Button>
                </div>
                <Footer propHistory={this.props.history}/>
            </div>
        )
    }
}

export default connect(state=>state)(SeatPage);