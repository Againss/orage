<template>
  <div class="addgoods">
    <el-row>
      <el-col :span="24">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>商品管理</el-breadcrumb-item>
          <el-breadcrumb-item>商品列表</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <el-col :span="24" class="col">
        添加商品
      </el-col>
    </el-row>
    <el-steps :active="active" finish-status="success">
      <el-step title="步骤 1"></el-step>
      <el-step title="步骤 2"></el-step>
      <el-step title="步骤 3"></el-step>
      <el-step title="步骤 4"></el-step>
      <el-step title="步骤 5"></el-step>
    </el-steps>
    <el-tabs v-model="activeName" @tab-click="handleClick" tab-position='left' class='mgt-30'>
      <el-tab-pane label="基本信息" name="first">用户管理</el-tab-pane>
      <el-tab-pane label="商品参数" name="second">配置管理</el-tab-pane>
      <el-tab-pane label="商品属性" name="third">角色管理</el-tab-pane>
      <el-tab-pane label="商品图片" name="fourth">
        <el-upload
  action="http://localhost:8888/api/private/v1/upload "
  :on-preview="handlePreview"
  :on-remove="handleRemove"
  :headers="setheader()"
  :on-success="handlesuccess"
  list-type="picture">
  <el-button size="small" type="primary">点击上传</el-button>
</el-upload>
      </el-tab-pane>
      <el-tab-pane label="商品内容" name="fifth">定时任务补偿</el-tab-pane>
    </el-tabs>
    
  </div>
</template>
<script>
export default {
  data: () => ({
    active: 0,
    activeName: "first"
  }),
  methods: {
    handlesuccess(response, file, fileList){
      console.log(response, file, fileList)
      if(response.meta.status == 200){
         this.$message({
        type:"succese",
        message:"图片上传成功"
      })
      }else{
        this.$message({
        type:"warning",
        message:response.meta.msg
      })
      }
    },
    setheader(){
       let token = localStorage.getItem('mytoken');
       return {
         'Authorization':token
       }
    },
     handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
    handleClick(tab, event) {
      switch (tab.name) {
        case "first":
          this.active= 0;
          break;
        case "second":
          this.active=1;
          break;
        case "third":
          this.active= 2;
          break;
        case "fourth":
          this.active= 3;
          break;
        case "fifth":
          this.active= 4;
          break;
      }
    }
  },
  components: {}
};
</script>
<style lang="less" scoped>
.mgt-30 {
  margin-top: 30px;
}
.col {
  height: 40px;
  line-height: 40px;
  background-color: #fff;
  padding-left: 10px;
  margin-bottom: 10px;
}
</style>