<template>
<div class="goods">
  <el-row>
      <el-col :span="24">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>商品管理</el-breadcrumb-item>
          <el-breadcrumb-item>商品列表</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <el-button type="success" plain @click="addsubmit">添加商品</el-button>
</div>
</template>
<script>
 export default {
   data: ()=>({
   }),
   methods:{
     addsubmit(){
       this.$router.push({path:'toadd'})
     }
   },
   components: {
   }
 }
</script>
<style lang="less" scoped>
</style>