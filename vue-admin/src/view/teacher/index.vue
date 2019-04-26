<template>
  <div class="data-table">
    <div class="nav">
      <el-button type="primary" v-if="hasPer('teacher:add')"  icon="el-icon-plus" @click="dialogVisible = true" size="mini">新加用户</el-button>
    </div>
    <el-table  v-loading="tabLoading" :data="tableData" stripe style="width: 100%;min-height:520px;">
      <el-table-column prop="name" label="姓名"></el-table-column>
       <el-table-column prop="phone" label="电话"></el-table-column>
         <el-table-column prop="xxmc" label="学校名"></el-table-column>
         <el-table-column prop="createTime" label="创建时间" :formatter="formatDateA"></el-table-column>
  <el-table-column fixed="right" label="操作" width="180"   v-if="hasPer('teacher:edit') || hasPer('teacher:delete')" >
        <template slot-scope="scope">
          <el-button
            @click="editOne(scope.row)"
            type="primary"
            icon="el-icon-edit-outline"
            size="mini"
            v-if="hasPer('teacher:edit')" 
          :disabled="scope.row.isSuper==1"
          >编辑</el-button>
          <el-button type="danger"  :disabled="scope.row.isSuper==1"  @click="deleteOne(scope.row)"  v-if="hasPer('teacher:delete')"  icon="el-icon-delete" size="mini">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="page">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
    <!-- 添加数据弹窗 -->
    <el-dialog
      :title="add?'新加用户':'编辑用户'"
      :visible.sync="dialogVisible"
      width="40%"
      @closed="handleClosed"
    >

      <el-form ref="ruleForm" :model="formData" :rules="rules" label-width="80px">
         <el-form-item label="用户名" prop="username">
          <el-input type="text" disabled v-model="formData.username" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="原始密码" prop="password">
          <el-input type="text" disabled v-model="formData.password" placeholder="请输入密码"></el-input>
        </el-form-item>
         <el-form-item label="新密码" prop="passwordN" >
          <el-input type="text"  v-model="formData.passwordN" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button v-if="add" type="primary" size="mini" @click="submitForm('ruleForm')">提交</el-button>
          <el-button v-else type="primary" size="mini" @click="editForm('ruleForm')">提交</el-button>
         
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
import {
  getTeacherListA,
  createTeacher,
  editTeacher,
  getTeacher,
  deleteTeacher
} from "@/api/userRole";
export default {
  name: "v-user",
  data() {
    return {
      add: true, //判断是否是添加
      dialogVisible: false, //弹窗
      tableData: [],
      total: 0,
      limit: 10,
      offset: 1,
      roleList: [], //角色列表
      formData: {
        username:'',
        password: "",
        passwordN:"",
        
      
      },
      
      rules: {
        passwordN: [
          { required: true, message: "不能为空", trigger: "blur" },
          {pattern:/^[a-zA-Z0-9_]{6,10}$/,message:'6-10位字母，数字', trigger: "blur" }],
      }
    };
  },
  created() {
    this.getList({ limit: this.limit, offset: this.offset });
  },
    computed:{
    ...mapGetters(['tabLoading'])
  },
  methods: {
    // 性别转换
    sexFun(row, column) {
      let sex = row[column.prototype] || 1;
      if (sex == 1) {
        return "男";
      }
      return "女";
    },
    // 新加数据
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 新加用户
          createTeacher(this.formData).then(res => {
            this.$message({
              type: res.code == 1 ? "success" : "error",
              message: res.message,
            });
             this.dialogVisible = false;
            this.getList({ limit: this.limit, offset: this.offset });
            this.resetForm(formName);
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 跟新用户信息
    editForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 新加用户
          editTeacher(this.formData.id, this.formData).then(res => {
            this.$message({
              type: res.code == 1 ? "success" : "error",
              message: res.message,
            });
            this.dialogVisible = false;
            this.getList({ limit: this.limit, offset: this.offset });
            this.resetForm(formName);
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    // 根据id 获取用户
    getById(data) {
     
      getTeacher(data).then(res => {
        this.formData = res.data;
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 弹窗关闭
    handleClosed() {
      this.dialogVisible = false;
       this.add = true;
      this.resetForm("ruleForm");
    },
    // 获取用户列表
    getList(data) {
      getTeacherListA(data)
        .then(res => {
          this.tableData = res.data.rows;
          this.total = res.data.count;
        })
        .catch(err => {});
    },
    // 根据id删除 用户
    deleteOne(data) {
      this.$msgbox({
        title: "删除操作",
        message: "确定要删除吗?",
        callback: e => {
          if (e == "confirm") {
            deleteTeacher(data.id).then(res => {
              this.$message({
                type: res.code == 1 ? "success" : "error",
                message: res.message,
                onClose:()=>{
                   this.getList({ limit: this.limit, offset: this.offset });
                }
              });
            });
          }
        }
      });
    },
    editOne(row) {
      this.dialogVisible = true;
      this.add = false;
      this.getById(row.id);
    },
    //分页
    handleSizeChange(val) {
      this.limit = val;
    },
    handleCurrentChange(val) {
      this.offset = val;
    }
  },
  watch: {
    limit(res) {
      this.getList({ limit: res, offset: this.offset });
    },
    offset(res) {
      this.getList({ limit: this.limit, offset: res });
    }
  }
};
</script>

<style lang="scss">

</style>
