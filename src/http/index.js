import axios from 'axios'
import qs from 'qs'
import {message} from 'antd'

// axios.defaults.baseURL = 'http://127.0.0.1:10000';
axios.defaults.baseURL = 'http://wangdoudou.cn:10000';
//axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// axios.defaults.transformRequest = [function(data){
//   return qs.stringify(data);
// }]
// 需求->post请求默认发json，需要在发送时将json转化为查询字符串
// 请求拦截器，在请求发送之前进行拦截，作用是改变一些配置信息，参数...
axios.interceptors.request.use(function(config){
  if(config.method==="post"){
    config.data = qs.stringify(config.data)
  }
  // 返回配置信息
  return config;
})
// 需求->在返回数据后axios自动又封装了一层，所以将数据取到外层
// 在响应刚刚回来后，处理response
axios.interceptors.response.use(function(response){
  let {data} = response;
  response.status =data.status;
  response.statusText = data.message;
  response.data = data.data;
  return response;
},function(error){
  message.error('服务器异常');
  Promise.reject(error)
})

export default axios;