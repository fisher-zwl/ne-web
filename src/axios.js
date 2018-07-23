import axios from 'axios'
axios.interceptors.request.use(function (config) {    // 这里的config包含每次请求的内容
  if(config.url.indexOf('/ws/district/v1') == -1 ){ //腾讯地区api
    if(config.url.indexOf('http') == -1){
      config.url = '/admin/v1' + config.url
    }
  }
  config.timeout = 1000*20
  return config
}, function (err) {
});
axios.interceptors.response.use(function (response) {
   if(response.data.code==-1002){
     window.location.href='#/login'
     return
   }else {
     return Object.assign(response.data, {httpStatus: response.status})

   }

}, function (error) {

  // 对响应错误做点什么
  return Promise.reject(error);
});
