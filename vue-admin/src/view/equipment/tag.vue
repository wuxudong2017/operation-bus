<template>
  <div class="data-table">
    <div class="nav">
      <el-button type="primary" v-if="hasPer('tag:add')"  icon="el-icon-plus" @click="showCreate" size="mini">新加标签</el-button>
    </div>
    <el-table :data="tableData" v-loading="tabLoading" stripe style="width: 100%;min-height:520px;">
      <el-table-column prop="name" label="标签名称"></el-table-column>
         <el-table-column prop="createTime" label="创建时间" :formatter="formatDateA"></el-table-column>
  <el-table-column fixed="right" label="操作" width="180"   v-if="hasPer('tag:edit') || hasPer('tag:delete')" >
        <template slot-scope="scope">
          <el-button
            @click="editOne(scope.row)"
            type="primary"
            icon="el-icon-edit-outline"
            size="mini"
            v-if="hasPer('tag:edit')" 
          :disabled="scope.row.isSuper==1"
          >编辑</el-button>
          <el-button type="danger"  :disabled="scope.row.isSuper==1"  @click="deleteOne(scope.row)"  v-if="hasPer('tag:delete')"  icon="el-icon-delete" size="mini">删除</el-button>
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
      :title="add?'新加故障标签':'编辑故障标签'"
      :visible.sync="dialogVisible"
      width="40%"
      @closed="handleClosed"
      :close-on-click-modal="false"
    >
     
      <el-form ref="ruleForm" :model="formData" :rules="rules" label-width="80px">
         <el-form-item label="标签名" prop="name">
          <el-input type="text"  v-model="formData.name" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button v-if="add" type="primary" size="mini" @click="submitForm('ruleForm')">提交</el-button>
          <el-button v-else type="primary" size="mini" @click="editForm('ruleForm')">提交</el-button>
          <el-button size="mini" @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import {mapGetters} from  'vuex'
import {
  getTagListA,
  createTag,
  editTag,
  getTag,
  deleteTag
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
        name:''
      },
      rules: {
        name: [{ required: true, message: "不能为空", trigger: "blur" }],
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
    // 新加数据
    showCreate(){
      this.dialogVisible = true;
      //this.formData.name = ""
    },
    // 新加数据
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 新加故障标签
          createTag(this.formData).then(res => {
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
    // 跟新故障标签信息
    editForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 新加故障标签
          editTag(this.formData.id, this.formData).then(res => {
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

    // 根据id 获取故障标签
    getById(data) {
      
      getTag(data).then(res => {
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
    // 获取故障标签列表
    getList(data) {
      getTagListA(data)
        .then(res => {
          this.tableData = res.data.rows;
          if(this.tableData.length<1){
            this.offset = this.offset-1>1?this.offset-1:1
          }
          this.total = res.data.count;
        })
        .catch(err => {});
    },
    // 根据id删除 故障标签
    deleteOne(data) {
      this.$msgbox({
        title: "删除操作",
        message: "确定要删除吗?",
        callback: e => {
          if (e == "confirm") {
            deleteTag(data.id).then(res => {
              this.$message({
                type: res.code == 1 ? "success" : "error",
                message: res.message,
              });
                this.getList({ limit: this.limit, offset: this.offset });
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
