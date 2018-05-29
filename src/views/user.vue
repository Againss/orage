<template>
  <div class="home">
    <el-container>
      <el-aside width="auto">
        <el-menu default-active="2" class="el-menu-admin" @open="handleOpen" @close="handleClose" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" :collapse="isCollapse">
          <el-menu-item index='5' class='logo'>
            <div></div>
          </el-menu-item>
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>导航一</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">选项1</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">导航二</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">导航四</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <i class="iconfont icon-menu menu" @click="memu"></i>
          <div class="system-title">电商后台管理系统</div>
          <div>
            <span class="welcome">
              您好，老哥哥
            </span>
            <el-button type="text" @click='logout'>退出</el-button>
          </div>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    memu(){
      this.isCollapse = !this.isCollapse
    },
    logout(){
      this.$confirm('是否退出?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '退出成功!'
          });
          localStorage.removeItem("mytoken");
          this.$router.push({path:'/login'})
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消退出'
          });          
        });
    }
  },
  data: () => ({
     isCollapse: false  
  }),
  components: {}
};
</script>
<style lang="less" scoped>
.home {
  height: 100%;
  .el-aside {
    background-color: #545c64;
  }
  .el-menu-admin:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-container {
    height: 100%;
    .el-header {
      background-color: #b3c0d1;
      color: #333;
      line-height: 60px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .menu {
        font-size: 36px;
        color: #989898;
        cursor: pointer;
        line-height: 60px;
      }
      .system-title {
        color: #fff;
        font-size: 24px;
      }
      .welcome {
        color: #fff;
      }
    }
    .logo {
      width: 100%;
      height: 60px;
      padding: 0;
      background: url(../assets/Again.jpg) center center;
      background-size: cover;
    }
  }
}
</style>