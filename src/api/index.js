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
//获取用户列表
export const getUserInfo = params=>{
  return axios.get('users', params).then(res => res.data)
}
//修改用户状态
export const userStateChange = params=>{
  return axios.put(`users/${params.uId}/state/${params.type}`).then(res=>res.data)
}
//添加用户
export const addUser = params=>{
  return axios.post('users',params).then(res=>res.data)
}
//编辑用户信息
export const editUser = params => {
  return axios.put(`users/${params.id}`,params).then(res=>res.data)
}
//删除用户
export const deleteUser = params=>{
  return axios.delete(`users/${params.id}`).then(res=>res.data)
}
//获取角色列表
export const getRole = params => {  
  return axios.get('roles').then(res=>res.data)
}
//分配角色
export const setRole = params =>{
  return axios.put(`users/${params.id}/role`,params).then(res=>res.data)
}
//获取权限列表
export const getRights = params => {
  return axios.get(`rights/${params.type}`,params).then(res => res.data)
}
//删除角色制指定权限
export const deleteRight = params => {
  return axios.delete(`roles/${params.roleId}/rights/${params.rightId}`, params).then(res => res.data)
}
//授权提交
export const giveRight  = params => {
  return axios.post(`roles/${params.roleId}/rights`, params).then(res => res.data)
}
//获取菜单权限
export const getMenus =() => {
  return axios.get('menus').then(res => res.data)
}
//获取菜单权限
export const getCategories = params => {
  return axios.get('categories', params).then(res => res.data)
}
//设置分类
export const setCategories = params => {
  return axios.post('categories', params).then(res => res.data)
}


