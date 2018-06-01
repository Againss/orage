<template>
  <div class="login">
    <el-form ref="form" :model="form" class="container" :rules="rules">
      <el-form-item>
        <img src="../assets/Again.jpg" alt="" class="avatar">
      </el-form-item>
      <el-form-item prop='username'>
        <el-input v-model="form.username" placeholder="账户" prefix-icon="iconfont icon-user-girl"></el-input>
      </el-form-item>
      <el-form-item prop='password'>
        <el-input v-model="form.password" placeholder="密码" prefix-icon="iconfont icon-key" type="password" @keydown.native.enter="submitForm('form')"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="login-btn" @click="submitForm('form')">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { checkUser } from "@/api";
export default {
  data: () => ({
    form: {
      username: "",
      password: ""
    },
    rules: {
      username: [{ required: true, message: "请输入账户名", trigger: "blur" }],
      password: [{ required: true, message: "请输入密码", trigger: "blur" }]
    }
  }),
  components: {},
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          checkUser(this.form).then(res => {
            if (res.data.meta.status === 200) {
              localStorage.setItem("mytoken",res.data.data.token)
              console.log(res.data.data)
              this.$store.commit('setUsername',res.data.data.username)
              this.$router.push({
                name: "user"
              });
            } else {
              this.$message({
                message: res.data.meta.msg,
                type: "warning"
              });
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.login {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #2f4050;
  .container {
    position: absolute;
    left: 0;
    right: 0;
    width: 400px;
    padding: 0px 40px 15px 40px;
    margin: 200px auto;
    background: white;
    .avatar {
      position: relative;
      left: 50%;
      width: 120px;
      height: 120px;
      margin-left: -60px;
      margin-top: -60px;
      box-sizing: border-box;
      border-radius: 50%;
      border: 10px solid #fff;
      box-shadow: 0 1px 5px #ccc;
      overflow: hidden;
    }
    .login-btn {
      width: 100%;
    }
  }
}
</style>