<template>
  <div class="userlist">
    <el-row>
      <el-col :span="24">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>用户列表</el-breadcrumb-item>
          <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <el-input placeholder="请输入内容" v-model="query" class="input-with-select search-input" @keydown.native.enter='search'>
      <el-button slot="append" icon="el-icon-search" @click='search'></el-button>
    </el-input>
    <el-button type="success" plain @click="dialogFormVisible = true">添加用户</el-button>
    <el-table :data="userList" border style="width: 100%;margin-top:20px">
      <el-table-column prop="index" type='index'>
      </el-table-column>
      <el-table-column prop="username" label="用户名" width="180">
      </el-table-column>
      <el-table-column prop="mobile" label="电话" width="180">
      </el-table-column>
      <el-table-column prop="email" label="邮箱">
      </el-table-column>
      <el-table-column label="用户状态">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.mg_state" @change='changeState(scope.row)'>
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)" icon="el-icon-edit"></el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)" icon="el-icon-delete"></el-button>
          <el-button size="mini" @click="handlegroup(scope.$index, scope.row)" itype="success" icon="el-icon-check"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row>
      <el-col :span="24">
        <div class="block">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagenum" :page-sizes="[1, 2, 3, 4]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </div>
      </el-col>
    </el-row>

    <!-- Form -->

    <el-dialog title="修改用户信息" :visible.sync="editdialogFormVisible">
      <el-form :model="editform" :rules="rules" :ref='form'>
        <el-form-item label="用户名" :label-width="formLabelWidth" prop='username'>
          <el-input v-model="editform.username" auto-complete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth" prop='mobile'>
          <el-input v-model="editform.mobile" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth" prop='email'>
          <el-input v-model="editform.email" auto-complete="off"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editdialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="edituser">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" :ref='form'>
        <el-form-item label="用户名" :label-width="formLabelWidth" prop='username'>
          <el-input v-model="form.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth" prop='password'>
          <el-input v-model="form.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth" prop='mobile'>
          <el-input v-model="form.mobile" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth" prop='email'>
          <el-input v-model="form.email" auto-complete="off"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="adduser">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="设置权限" :visible.sync="roledialogFormVisible">
      <el-form :model="roleform">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="roleform.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="设置权限" :label-width="formLabelWidth">
          <template>
            <el-select v-model="roleform.rid" placeholder="请选择">
              <el-option v-for="item in ridList" :key="item.id" :label="item.roleName" :value="item.id">
              </el-option>
            </el-select>
          </template>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="roledialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="setrole">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>
<script>
import {
  getUserInfo,
  userStateChange,
  editUser,
  addUser,
  deleteUser,
  setRole,
  getRole
} from "@/api";
export default {
  data: () => ({
    query: "",
    userList: [],
    total: 1,
    pagenum: 1,
    pagesize: 3,
    dialogFormVisible: false,
    editdialogFormVisible: false,
    roledialogFormVisible: false,
    roleform: {
      username:'',
      id: "",
      rid: ""
    },
    value: "",
    ridList: [],
    form: {
      username: "",
      password: "",
      email: "",
      mobile: ""
    },
    editform: {
      username: "",
      email: "",
      mobile: ""
    },
    editdata: {},
    formLabelWidth: "120px",
    rules: {
      username: [
        { required: true, message: "请输入用户名称", trigger: "blur" }
      ],
      password: [
        { required: true, message: "请输入用户密码", trigger: "blur" }
      ],
      email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
      mobile: [{ required: true, message: "请输入手机", trigger: "blur" }]
    }
  }),
  created() {
    this.initList();
  },
  mounted() {
    getRole().then(res => {
      this.ridList = res.data;
    });
  },
  methods: {
    handlegroup(index,row) {
      this.roledialogFormVisible = true;
      this.roleform.id = row.id;
      this.roleform.username = row.username;

    },
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          deleteUser({ id: row.id }).then(res => {
            this.initList();
            console.log(res);
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handleEdit(index, row) {
      this.editdialogFormVisible = true;
      this.editdata = {
        id: row.id,
        username: row.username,
        email: row.email,
        mobile: row.mobile
      };
      this.editform = this.editdata;
    },
    edituser() {
      editUser(this.editform).then(res => {
        this.editdialogFormVisible = false;
        if (res.meta.status == 200) {
          this.$message({
            message: res.meta.msg,
            type: "success"
          });
          this.initList();
        } else {
          this.$message({
            message: res.meta.msg,
            type: "warning"
          });
        }
      });
    },
    handleSizeChange(val) {
      this.pagesize = val;
      this.initList();
    },
    handleCurrentChange(val) {
      this.pagenum = val;
      this.initList();
    },
    initList() {
      getUserInfo({
        params: {
          query: this.query,
          pagenum: this.pagenum,
          pagesize: this.pagesize
        }
      }).then(res => {
        this.userList = res.data.users;
        this.total = res.data.total;
      });
    },
    search() {
      this.initList();
    },
    changeState(row) {
      userStateChange({ uId: row.id, type: row.mg_state }).then(res => {
        if (res.meta.status == 200) {
          this.$message({
            message: res.meta.msg,
            type: "success"
          });
        } else {
          this.$message({
            message: res.meta.msg,
            type: "warning"
          });
        }
      });
    },
    adduser() {
      addUser(this.form).then(res => {
        this.dialogFormVisible = false;
        this.initList();
      });
    },
    setrole() {
      if(!this.roleform.rid){
        this.$message({
            type:'warning',
            message:'角色不能为空'
          })
      }else{
        setRole(this.roleform).then(data => {
        console.log(data);
        if(data.meta.status ==200){
          this.$message({
            type:'success',
            message:data.meta.msg
          })
        }else{
          this.$message({
            type:'warning',
            message:data.meta.msg
          })
        }
      });
      this.roledialogFormVisible = false;
    }
      }
      
  }
};
</script>
<style lang="less" scoped>
.userlist {
  .search-input {
    width: 300px;
  }
}
.el-pagination {
  background-color: #d3dce6;
  padding: 10px;
  margin-top: 20px;
}
</style>