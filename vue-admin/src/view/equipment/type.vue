<template>
  <div class="data-table">
    <div class="nav">
      <el-button
        type="primary"
        v-if="hasPer('equipment:add')"
        icon="el-icon-plus"
        @click="showCreate"
        size="mini"
      >新加设备</el-button>
    </div>
    <el-table  v-loading="tabLoading"  :data="tableData" stripe style="width: 100%;min-height:520px;">
      <el-table-column type="index" label="ID"></el-table-column>
      <el-table-column prop="name" label="设备名称"></el-table-column>
      <el-table-column prop="type" label="设备类型"></el-table-column>
      <el-table-column prop="brand" label="设备品牌"></el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="180"
        v-if="hasPer('equipment:edit') || hasPer('equipment:delete')"
      >
        <template slot-scope="scope">
          <el-button
            @click="editOne(scope.row)"
            type="primary"
            icon="el-icon-edit-outline"
            size="mini"
            v-if="hasPer('equipment:edit')"
            :disabled="scope.row.isSuper==1"
          >编辑</el-button>
          <el-button
            type="danger"
            :disabled="scope.row.isSuper==1"
            @click="deleteOne(scope.row)"
            v-if="hasPer('equipment:delete')"
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
      :title="add?'新加设备':'编辑设备'"
      :visible.sync="dialogVisible"
      width="40%"
      @closed="handleClosed"
    >
      <el-form ref="ruleForm" :model="formData" :rules="rules" label-width="100px">
          <el-form-item label="设备名称" prop="name">
          <el-input v-model="formData.name" placeholder="设备名称"></el-input>
        </el-form-item>
        <el-form-item label="设备类型" prop="type">
          <el-input v-model="formData.type" placeholder="请输入设备类型名"></el-input>
        </el-form-item>
        <el-form-item label="设备品牌" prop="brand">
          <el-input v-model="formData.brand" placeholder="设备品牌"></el-input>
        </el-form-item>
        <el-form-item label="设备图片">
          <el-input v-model="formData.awatar" type="hidden" style="display:none"></el-input>
          <el-upload
            class="avatar-uploader"
            :action="service.api+'/api/admin/upload'"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <template v-if="add">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-if="!imageUrl" class="el-icon-plus avatar-uploader-icon"></i>
            </template> 
           <img v-else :src="formData.awatar" class="avatar"> 
            
           
          </el-upload>
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
import {mapGetters} from 'vuex'
import service from "@/utils/service";
import {
  getEquipmentList,
  createEquipment,
  editEquipment,
  getEquipment,
  deleteEquipment
} from "@/api/order";
import { setTimeout } from 'timers';
export default {
  name: "v-user",
  data() {
    return {
      add: true, //判断是否是添加
      dialogVisible: false, //弹窗
      dialogTag: false,
      tableData: [],
      total: 0,
      limit: 10,
      offset: 1,
      roleList: [], //角色列表
      service: service,
      imageUrl: "",
      formData: {
        type: "",
        name: "", // 设备姓名(中文)
        brand: "", //年龄
        awatar: "",
        typeId:''
      },
      rules: {
        type: [{ required: true, message: "不能为空", trigger: "blur" }],
        name: [{ required: true, message: "不能为空", trigger: "blur" }],
        brand: [{ required: true, message: "不能为空", trigger: "blur" }],
        typeId: [{ required: true, message: "不能为空", trigger: "blur" }],
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
    // 图片上传成功
    handleAvatarSuccess(res, file) {
        this.formData.awatar = res.data;
        this.imageUrl =  URL.createObjectURL(file.raw)
    },
    // 上传之前验证
    beforeAvatarUpload(file) {
      const isImg =/image\/.*/.test(file.type) 
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isImg) {
        this.$message.error('必须为图片!');
      }
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 2MB!");
      }
      return isLt2M&&isImg;
    },
    // 新加数据
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 新加设备
          createEquipment(this.formData).then(res => {
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
    // 跟新设备信息
    editForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 新加设备
          editEquipment(this.formData.id, this.formData).then(res => {
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

    // 根据id 获取设备
    getById(data) {
      getEquipment(data).then(res => {
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
      this.imageUrl = null
      this.resetForm("ruleForm");
    },
    // 获取设备列表
    getList(data) {
      getEquipmentList(data)
        .then(res => {
          this.tableData = res.data.rows;
          this.total = res.data.count;
        })
        .catch(err => {});
    },
    // 根据id删除 设备
    deleteOne(data) {
      this.$msgbox({
        title: "删除操作",
        message: "确定要删除吗?",
        callback: e => {
          if (e == "confirm") {
            deleteEquipment(data.id).then(res => {
              this.$message({
                type: res.code == 1 ? "success" : "error",
                message: res.message,
                onClose: () => {
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
    // 新加设备类型
    showCreate() {
      this.dialogVisible = true;
      this.add = true;
      this.formData.type = "";
      this.formData.name = ""; // 设备姓名(中文)
      this.formData.brand = ""; //年龄
      this.formData.awatar = "";
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
.avatar-uploader {
  .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }
}
</style>
