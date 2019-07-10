<template>
  <div class="data-table">
    <div class="nav">
      <el-button
        type="primary"
        v-if="hasPer('file:add')"
        icon="el-icon-plus"
        @click="showCreate"
        size="mini"
      >新加文档</el-button>
    </div>
    <el-table :data="tableData" v-loading="tabLoading" stripe style="width: 100%;min-height:520px;">
      <el-table-column prop="name" label="文档名称"></el-table-column>
         <el-table-column prop="description" label="描述" ></el-table-column>
      <el-table-column prop="createTime" label="创建时间" :formatter="formatDateA"></el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="180"
        v-if="hasPer('file:edit') || hasPer('file:delete')"
      >
        <template slot-scope="scope">
          <el-button
            @click="editOne(scope.row)"
            type="primary"
            icon="el-icon-edit-outline"
            size="mini"
            v-if="hasPer('file:edit')"
            :disabled="scope.row.isSuper==1"
          >编辑</el-button>
          <el-button
            type="danger"
            :disabled="scope.row.isSuper==1"
            @click="deleteOne(scope.row)"
            v-if="hasPer('file:delete')"
            icon="el-icon-delete"
            size="mini"
          >删除</el-button>
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
      :title="add?'新加文档':'编辑文档'"
      :visible.sync="dialogVisible"
      width="40%"
      @closed="handleClosed"
      :close-on-click-modal="false"
    >
      <el-form ref="ruleForm" :model="formData" :rules="rules" label-width="80px">
        <el-form-item label="文档名称" prop="name">
          <el-input type="text" v-model="formData.name" placeholder="文档名称"></el-input>
        </el-form-item>
        <el-form-item label="文档描述" prop="description">
          <el-input
            type="textarea"
            resize="none"
            rows="4"
            v-model="formData.description"
            placeholder="文档简介"
          ></el-input>
        </el-form-item>
        <el-form-item label="文档类型" prop="type">
          <el-select v-model="formData.type">
            <el-option
              v-for="(item,index) in typeList"
              :key="index"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上传文件" prop="url" v-if="fileUpload">
          <el-upload
            :action="service.api+'/api/admin/uploadFile'"
            :file-list="fileList"
            :before-upload="beforeUpload"
            :on-success="uploadSuccess"
          >
            <el-button  size="mini"  type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传word,ppt,pdf文件</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="文档状态">
          <el-radio v-model="formData.status" :label="1">使用</el-radio>
          <el-radio v-model="formData.status" :label="0">禁用</el-radio>
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
import { mapGetters } from "vuex";
import service from "@/utils/service";
import {
  getFileList,
  createFile,
  editFile,
  getFile,
  deleteFile
} from "@/api/order";
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
      service,
      fileUpload: true,
      fileList: [],
      typeList: [
        {
          name: "设备资料",
          value: 1
        },
        {
          name: "操作说明",
          value: 2
        }
      ], //角色列表
      formData: {
        name: "",
        description: "",
        type: 1,
        status: 1,
        url: ""
      },
      rules: {
        name: [{ required: true, message: "不能为空", trigger: "blur" }],
        type: [{ required: true, message: "不能为空", trigger: "blur" }],
        url:[{ required: true, message: "不能为空", trigger: "blur" }],
      }
    };
  },
  created() {
    this.getList({ limit: this.limit, offset: this.offset });
  },
  computed: {
    ...mapGetters(["tabLoading"])
  },
  methods: {
    // 文件上传前
    beforeUpload(file) {
      let regType = /(word|pdf|powerpoint|presentation)/g.test(file.type);
      if (!regType) {
        this.$notify({
          title: "警告",
          type: "warning",
          message: "请上传pdf,word,ppt格式文件"
        });
      }
      return regType;
    },
    // 上传文件成功
    uploadSuccess(res, file, list) {
      this.formData.url = res.data;
    },
    // 新加数据
    showCreate() {
      this.dialogVisible = true;
      //this.formData.name = ""
    },
    // 新加数据
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 新加故障文档
          createFile(this.formData).then(res => {
            this.$message({
              type: res.code == 1 ? "success" : "error",
              message: res.message
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
    // 跟新故障文档信息
    editForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 新加故障文档
          editFile(this.formData.id, this.formData).then(res => {
            this.$message({
              type: res.code == 1 ? "success" : "error",
              message: res.message
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

    // 根据id 获取故障文档
    getById(data) {
      this.fileUpload = false;
      getFile(data).then(res => {
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
      this.fileList = [];
      this.fileUpload = true;
      this.formData.name = "";
      this.formData.description = "";
      this.formData.type = 1;
      this.formData.status = 1;
      this.formData.url = "";
      this.formData.id = null;
      this.resetForm("ruleForm");
    },
    // 获取故障文档列表
    getList(data) {
      getFileList(data)
        .then(res => {
          this.tableData = res.data.rows;
          if (this.tableData.length < 1) {
            this.offset = this.offset - 1 > 1 ? this.offset - 1 : 1;
          }
          this.total = res.data.count;
        })
        .catch(err => {});
    },
    // 根据id删除 故障文档
    deleteOne(data) {
      this.$msgbox({
        title: "删除操作",
        message: "确定要删除吗?",
        callback: e => {
          if (e == "confirm") {
            deleteFile(data.id).then(res => {
              this.$message({
                type: res.code == 1 ? "success" : "error",
                message: res.message
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
