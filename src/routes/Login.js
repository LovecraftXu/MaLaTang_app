/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-10 20:08:27
 * @LastEditTime: 2019-08-31 12:51:31
 * @LastEditors: Please set LastEditors
 */
import React from 'react';
import { Form, Icon, Input, Button, Checkbox, message } from 'antd';
import {connect} from 'dva';
import styles from './IndexPage.css';
import axios from '../http';

// import { get, set } from '../services/localStorage'

class Login extends React.Component {

    handleSubmit = e => {
        console.log("测试1",this.props.history)
        e.preventDefault();  
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
            axios.post(
                "/customer/login",
                values
            ).then((result)=>{
                if(result.status === 200){
                    message.success(result.statusText);
                    //自动登录
                    if(values.rememberValue === true){
                        window.localStorage.setItem("rememberValue",values.rememberValue);
                        window.localStorage.setItem("username",values.custUsername);
                        window.localStorage.setItem("password",values.custPassword);
                    } else {
                        window.localStorage.setItem("rememberValue",values.rememberValue);
                        window.localStorage.removeItem("username");
                        window.localStorage.removeItem("password");
                    }
                    // window.localStorage.setItem("custId",result.data.custId);
                    // window.localStorage.setItem("realname",result.data.custRealname);
                    // window.localStorage.setItem("type",result.data.custType);
                    // window.location.href = '/#/start';  
                    // this.props.history.push({ pathname : '/start'});
                    console.log('调试',this.props.history)     
                } else {
                    message.success(result.statusText);
                }
            })
          }
        });
    };

    //游客登录
    toLogin(){
        let realName = "游客"+(new Date()).getTime();
        let usernameAndPassWord = 'yk'+(new Date()).getTime();
        console.log(realName,usernameAndPassWord);
        axios.post(
            "/customer/register",
            {
                "custRealname": realName,
                "custUsername": usernameAndPassWord,
                "custPassword": usernameAndPassWord
            }
        ).then((result)=>{
            if(result.status === 200){
                axios.post(
                    "/customer/login",
                    {
                        "custUsername": usernameAndPassWord,
                        "custPassword": usernameAndPassWord
                    }
                ).then((result)=>{
                    if(result.status === 200){
                        window.localStorage.setItem("custId",result.data.custId);
                        window.localStorage.setItem("realname",result.data.custRealname);
                        window.localStorage.setItem("type",result.data.custType);   
                        window.location.href = '/#/start';  
                        this.props.history.push({ pathname : '/start'});
                    } 
                })                
            } else {
                console.log("错误");
            }
        })
    }

    goRegister = () =>{
        this.props.history.push({ pathname : '/register'});
    }

    render(){
        const { getFieldDecorator } = this.props.form;
        console.log("sdhiwa ",this.props)
        // let flag = 
        return(
            <div className="login">
             <Form onSubmit={this.handleSubmit}>
                
                <Form.Item>
                {getFieldDecorator('custUsername', {
                    rules: [{ required: true, message: 'Please input your username!' }],
                })(
                    <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="请输入用户名"
                    />,
                )}
                </Form.Item>
                <Form.Item>
                {getFieldDecorator('custPassword', {
                    rules: [{ required: true, message: 'Please input your Password!' }],
                })(
                    <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="请输入密码"
                    />,
                )}
                </Form.Item>
                <Button type="primary" block htmlType="submit" className={styles.fontSize}>
                    登录
                </Button>
                <Form.Item>
                    <div className={styles.bottomOuter}>
                        {getFieldDecorator('rememberValue', {
                            valuePropName: 'checked',
                            initialValue: true,
                        })(<Checkbox className={styles.autoL}>记住密码</Checkbox>)}
                        <a onClick={this.goRegister.bind(this)} className={styles.register}>立即注册!</a>
                    </div>
                </Form.Item>
                <Button block type="gost" className={ styles.fontSize } onClick={this.toLogin.bind(this)}>
                    游客登录
                </Button>
                
            </Form>
            </div>
        )
    }
}

const mapPropsToFields = (props) => {
    let obj = {};
    obj['custUsername'] = Form.createFormField({value: window.localStorage.getItem("username")})
    obj['custPassword'] = Form.createFormField({value: window.localStorage.getItem("password")})
    return obj;
}


export default Form.create({
    mapPropsToFields
})(connect(state=>state)(Login));