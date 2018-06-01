<template>
<div class="right">
  <el-breadcrumb separator="/">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item><a href="/">权限管理</a></el-breadcrumb-item>
  <el-breadcrumb-item>权限列表</el-breadcrumb-item> 
</el-breadcrumb>
<el-table :data="rightList" border style="width: 100%;margin-top:20px">
      <el-table-column prop="index" type='index'>
      </el-table-column>
      <el-table-column prop="authName" label="权限列表" width="180">
      </el-table-column>
      <el-table-column prop="path" label="路径" width="180">
      </el-table-column>
      <el-table-column label="层级" width="180">
        <template slot-scope="scope" >
          <span>{{scope.row.level|getlevel()}}</span>
        </template>
      </el-table-column>
    </el-table>
</div>
</template>
<script>
import {getRights} from '@/api'
 export default {
   data: ()=>({
     rightList:[]
   }),
   created(){
     getRights({type:"list"}).then(res=>{
       this.rightList = res.data
       console.log(res)
     })
   },
  filters:{
    getlevel:(data)=>{
      if(data === '0'){
         return '一级'
      }else if(data == '1'){
        return '二级'
      }
      else if(data == '2'){
        return '三级'
      }
      }
   }
 }
</script>
<style lang="less" scoped>
</style>