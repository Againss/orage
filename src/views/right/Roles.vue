<template>
  <div class="roles">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>
        <a href="/">权限管理</a>
      </el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-button>添加角色</el-button>
    <el-table :data="roleList" border style="width: 100%;margin-top:20px">
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-row v-for="firstchildren in scope.row.children" :key="firstchildren.id">
            <el-col :span="3">
              <el-tag closable @close="handleCloseFirst(scope.row,firstchildren.id)">
                {{firstchildren.authName}}
              </el-tag>
              <i class="el-icon-arrow-right"></i>
            </el-col>
            <el-col :span="21">
              <el-row v-for="secondchildren in firstchildren.children" :key="secondchildren.id">
                <el-col :span="4">
                  <el-tag closable @close="handleCloseSeccond(scope.row,secondchildren.id)" :type="'info'">
                    {{secondchildren.authName}}
                  </el-tag>
                  <i class="el-icon-arrow-right"></i>
                </el-col>
                <el-col :span="20">
                  <el-tag v-for="thirdchildren in secondchildren.children" :key="thirdchildren.id" closable @close="handleCloseThird(scope.row,thirdchildren.id)" :type="'success'">
                    {{thirdchildren.authName}}
                  </el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column prop="index" type='index'>
      </el-table-column>
      <el-table-column prop="roleName" label="角色名称" width="180">
      </el-table-column>
      <el-table-column prop="roleDesc" label="描述" width="180">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)" icon="el-icon-edit"></el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)" icon="el-icon-delete"></el-button>
          <el-button size="mini" @click="handlegroup(scope.$index, scope.row)" itype="success" icon="el-icon-check"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="设置权限" :visible.sync="roledialogFormVisible">
      <div class="treebox">
        <el-tree :data="rightList" ref="tree" show-checkbox node-key="id" :default-expand-all='true' :default-checked-keys="selectedrights" :props="defaultProps">
        </el-tree>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="roledialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="grantBtn">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>
<script>
import { getRole, deleteRight, getRights ,giveRight} from "@/api";
export default {
  data: () => ({
    roleList: [],
    roledialogFormVisible: false,
    rightList: [],
    currentRole: {},
    selectedrights: [],
    defaultProps: {
      children: "children",
      label: "authName"
    }
  }),
  created() {
   this.initList();
  },
  methods: {
    initList(){
       getRole().then(res => {
      this.roleList = res.data;
    });
    },
    handlegroup(index, row) {
      this.currentRole = row;
      this.roledialogFormVisible = true;
      getRights({ type: "tree" }).then(res => {
        this.rightList = res.data;
        console.log(res);
      });
      this.selectedrights.length = 0;
      this.currentRole.children.forEach(first => {
        if (first.children && first.children.length !== 0) {
          first.children.forEach(second => {
            if (second.children && second.children.length !== 0) {
              first.children.forEach(third => {
                if (third.children && third.children.length !== 0) {
                  this.selectedrights.push(third.id)
                }
              });
            }
          });
        }
      });
    },
    handleCloseFirst(row, rightId) {
      let params = {
        roleId: row.id,
        rightId
      };
      deleteRight(params).then(res => {
        row.children = res.data;
      });
    },
    handleCloseSeccond(row, rightId) {
      let params = {
        roleId: row.id,
        rightId
      };
      deleteRight(params).then(res => {
        row.children = res.data;
      });
    },
    handleCloseThird(row, rightId) {
      let params = {
        roleId: row.id,
        rightId
      };
      deleteRight(params).then(res => {
        row.children = res.data;
      });
    },
    grantBtn(){
      let rids = this.$refs.tree.getCheckedKeys().join(',');
      giveRight({roleId:this.currentRole.id,rids}).then(res=>{
        if(res.meta.status == 200){
          this.$message({
            type:'succese',
            message:res.meta.msg
          })
        }else {
          this.$message({
            type:'warning',
            message:res.meta.msg
          })
        }
        this.initList();
      this.roledialogFormVisible = false
      })
      
    }
  }
};
</script>
<style lang="less" scoped>
.el-tag {
  margin: 5px;
}
.treebox {
  height: 300px;
  overflow: auto;
}
</style>