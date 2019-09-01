/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-14 17:05:31
 * @LastEditTime: 2019-08-28 20:43:08
 * @LastEditors: Please set LastEditors
 */
import React from 'react';
import { Form, Input, Upload, message, Button, Icon, Select } from 'antd';
import {connect} from 'dva'


const { Option } = Select;

class CustomerForm extends React.Component {

  render() {
    
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
    getFieldDecorator("custId");
    getFieldDecorator("photo");
    return (
        <div  className="customer_form">
        
        <Form className="form">
        <Form.Item label="顾客姓名">
          {getFieldDecorator("custRealname" , {
            rules: [{ required: true, message: 'Please input your name!' }],
          })( <Input placeholder="Name" /> )}
        </Form.Item>
        <Form.Item label="账户名">
          {getFieldDecorator("custUsername" , {
            rules: [{ required: true, message: 'Please input your username!' }],
          })( <Input placeholder="Username" /> )}
        </Form.Item>
        <Form.Item label="密码">
          {getFieldDecorator('custPassword', {
            rules: [{ required: true, message: 'Please input your password!' }],
          })( <Input type="password" placeholder="Password" /> )}
        </Form.Item>
        
        {/* <Form.Item label="顾客类型">
          {getFieldDecorator('custType', {
            rules: [{ required: true, message: 'Please select your custType!' }],
          })( <Select placeholder="Select a option and change input text above" >
                <Option  value="老顾客">老顾客</Option>             
                <Option  value="新顾客">新顾客</Option>             
             </Select> )}
        </Form.Item> */}
        <Form.Item label="满意度">
          {getFieldDecorator('custSatisfy', {
            rules: [{ required: true, message: 'Please select your Satisfy!' }],
          })( <Select placeholder="Select a option and change input text above" >
                <Option  value="5">☆☆☆☆☆</Option>             
                <Option  value="4">☆☆☆☆</Option>             
                <Option  value="3">☆☆☆</Option>             
                <Option  value="2">☆☆</Option>             
                <Option  value="1">☆</Option>             
             </Select> )}
        </Form.Item>
        
        <Form.Item label="头像">
          <Upload {...props}>
            <Button>
              <Icon type="upload" /> 
            </Button>
          </Upload>
        </Form.Item>
      </Form>
        </div>
    );
  }
}

const mapPropsToFields = (props) => {
  
    let obj = {};
    for(let key in props.initData){ 
        let val = props.initData[key]; 
        obj[key] = Form.createFormField({value: val})
          
    }
    return obj;
}


let mapStateToProps = (state) =>{
  return state;
}


export default Form.create({
    mapPropsToFields
})(connect(mapStateToProps)(CustomerForm));