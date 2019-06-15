import React from 'react';
import { Form, Icon, Input, Button, Checkbox, message } from 'antd';

import styles from './IndexPage.css';
import axios from '../http';

class Login extends React.Component {
    

    handleSubmit = e => {
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
                    window.localStorage.setItem("custId",result.data.custId);
                    window.localStorage.setItem("realname",result.data.custRealname);
                    window.localStorage.setItem("type",result.data.custType);
                    window.location.href = '/#/start';  
                } else {
                    message.success(result.statusText);
                }
            })
          }
        });
    };

    render(){
        const { getFieldDecorator } = this.props.form;
        return(
            <div className="login">
             <Form onSubmit={this.handleSubmit}>
                <Form.Item>
                {getFieldDecorator('custUsername', {
                    rules: [{ required: true, message: 'Please input your username!' }],
                })(
                    <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="Username"
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
                    placeholder="Password"
                    />,
                )}
                </Form.Item>
                <Button type="primary" block htmlType="submit" className="login-form-button">
                    登录
                </Button>
                <Form.Item>
                {getFieldDecorator('remember', {
                    valuePropName: 'checked',
                    initialValue: true,
                })(<Checkbox className={styles.autoL}>自动登录</Checkbox>)}
                <a href="" className={styles.register}>立即注册!</a>
                </Form.Item>
            </Form>
            </div>
        )
    }
}

export default Form.create()(Login);
