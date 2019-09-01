/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-17 09:49:09
 * @LastEditTime: 2019-09-01 15:42:08
 * @LastEditors: Please set LastEditors
 */
import React from 'react';
import { Form, Icon, Input, Button, Upload, message } from 'antd';

import styles from './Register.css';
import axios from '../http';

class Login extends React.Component {
    

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            axios.post(
                "/customer/register",
                values
            ).then((result)=>{
                if(result.status === 200){
                    message.success(result.statusText);
                    // window.location.href = '/';  
                    this.props.history.push({ pathname : '/'});
                } else {
                    message.success(result.statusText);
                }
            })
          }
        });
    };

    render(){
        const props = {
            name: 'file',
            action: 'http://134.175.154.93:8099/manager/file/upload',
            onChange:(info) => {
              if (info.file.status !== 'uploading') {
                console.log(info.file.response.data);
                // 上传附件服务器返回的数据
                let data = info.file.response.data;
                let url = "http://134.175.154.93:8888/"+data.groupname+"/"+data.id;
                //将url设置到表单中
                this.props.form.setFieldsValue({
                  photo:url
                })
              }
              if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
              } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
              }
            },
          };

        const { getFieldDecorator } = this.props.form;
        console.log('外',this.props);
        return(
            <div className={styles.register}>
            
            <div className={styles.content}> 
                <p className={styles.title}>注册</p>
                <Form onSubmit={this.handleSubmit}>
                    {/* <Form.Item className={styles.photo}>
                        <Upload {...props}>
                            <Button block>
                            <Icon type="upload" /> 
                            </Button>
                        </Upload>
                    </Form.Item> */}
                    <Form.Item>
                    {getFieldDecorator('custRealname', {
                        rules: [{ required: true, message: 'Please input your Realname!' }],
                    })(
                        <Input
                        prefix={<Icon type="solution" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="Realname"
                        />,
                    )}
                    </Form.Item>
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
                    <Button type="primary" block htmlType="submit" className="register-form-button">
                        注册
                    </Button>
                    <Button type="gost" block onClick={()=>this.props.history.goBack()} className="register-form-button">
                        返回
                    </Button>
                </Form>
            </div>
             
            </div>
        )
    }
}

export default Form.create()(Login);
