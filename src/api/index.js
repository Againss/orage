import axios from 'axios'

const baseURL ='http://localhost:8888/api/private/v1/';
axios.defaults.baseURL = baseURL;

//设置拦截器
axios.interceptors.request.use(function (config) {
  let token = localStorage.getItem("mytoken")
  if(token){
    config.headers['Authorization'] = token

  }
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});


export const checkUser = params=>{
  return axios.post("login",params)
}