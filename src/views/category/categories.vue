<template>
  <div class="category">
    <el-row>
      <el-col :span="24">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>商品列表</el-breadcrumb-item>
          <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <el-button type="success" plain @click="addsubmit">添加分类</el-button>
    <tree-grid :treeStructure="true" :columns="columns" :data-source="dataSource" @deleteCate="deleteCategory" @editCate="editCategory">
    </tree-grid>

   <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>

    <el-dialog title="添加分类" :visible.sync="dialogFormVisible">
      <el-form :model="addform" :rules="rules" ref="addCateForm">
        <el-form-item label="分类名称" :label-width="formLabelWidth" prop='cat_name'>
          <el-input v-model="addform.cat_name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="父级分类" :label-width="formLabelWidth">
          <el-cascader :options="options" :props='props' v-model="selectedOptions" @change="handleChange">
          </el-cascader>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCateSubmit('addCateForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import TreeGrid from "@/components/TreeGrid/TreeGrid";
import { getCategories, setCategories } from "@/api";
export default {
  data: () => ({
    options: [],
    props: {
      value: "cat_id",
      label: "cat_name"
    },
    selectedOptions: [],
    formLabelWidth: "120px",
    dialogFormVisible: false,
    addform: {
      cat_name: "",
      cat_pid: "",
      cat_level: ""
    },
    rules: {
      cat_name: [{ required: true, message: "请输入分类名称", trigger: "blur" }]
    },
    total: 10,
    pagenum: 1,
    pagesize: 10,
    dataSource: [],
    columns: [
      {
        text: "分类名称",
        dataIndex: "cat_name",
        width: ""
      },
      {
        text: "是否有效",
        dataIndex: "cat_deleted",
        width: ""
      },
      {
        text: "排序",
        dataIndex: "cat_level",
        width: ""
      }
    ]
  }),
  methods: {
    addsubmit() {
      this.dialogFormVisible = true;
      getCategories({
        type: "2"
      }).then(res => {
        if (res.meta.status == 200) {
          this.options = res.data;
        }
      });
    },
   addCateSubmit (formName) {
      this.$refs[formName].validate(valide => {
        if (valide) {
          if (this.selectedOptions.length === 0) {
            this.addform.cat_pid = 0
            this.addform.cat_level = 0
          } else if (this.selectedOptions.length === 1) {
            this.addform.cat_pid = this.selectedOptions[this.selectedOptions.length - 1]
            this.addform.cat_level = 1
          } else {
            this.addform.cat_pid = this.selectedOptions[this.selectedOptions.length - 1]
            this.addform.cat_level = 2
          }
          setCategories(this.addform).then(res => {
            if (res.meta.status === 201) {
              this.dialogFormVisible = false
              this.initList()
              this.$message({
                type: 'success',
                message: res.meta.msg
              })
            }
          })
        }
      })
    },
    handleChange(value) {
      console.log(value);
    },
    handleSizeChange(val) {
      console.log(val);
      this.pagesize = val;
      this.initList();
    },
    handleCurrentChange(val) {
      this.pagenum = val;
      this.initList();
    },
    deleteCategory(cid) {
      console.log(cid);
    },
    editCategory(cid) {
      console.log(cid);
    },
    initList() {
      getCategories({
        type: "3",
        pagesize: this.pagesize,
        pagenum: this.pagenum
      }).then(res => {
        if (res.meta.status == 200) {
          this.dataSource = res.data;
          this.total =res.data.length;
        }
      });
    }
  },
  created() {
    this.initList();
  },
  components: {
    TreeGrid
  }
};
</script>
<style lang="less" scoped>
.el-pagination {
  background-color: #d3dce6;
  padding: 10px;
  margin-top: 20px;
}
</style>