<template>
  <div class="data-table">
    <div class="nav">
      <div style="margin-bottom:20px;">
        <el-row :gutter="20">
          <el-col :span="4">
            <el-select size="mini" v-model="search.schoolId" filterable placeholder="查询学校">
              <el-option
                v-for="(item,index) in schoolList"
                :key="index"
                :label="item.xxmc"
                :value="item.xxJbxxId"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="4">
            <el-select v-model="search.equipmentId" placeholder="设备类型" size="mini">
              <el-option
                v-for="(item,index) in equipList"
                :label="item.type"
                :value="item.id"
                :key="index"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="8">
            <el-date-picker
              type="daterange"
              v-model="search.timeRange"
              :picker-options="pickerOptions"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              align="right"
              size="mini"
              value-format="timestamp"
            ></el-date-picker>
          </el-col>

          <el-col :span="4">
            <el-select v-model="search.deviceStatus" placeholder="设备状态" size="mini">
              <el-option label="正常" :value="1"></el-option>
              <el-option label="故障" :value="0"></el-option>
            </el-select>
          </el-col>
          <el-button type="primary" @click="searchFn" size="mini">查询</el-button>
          <el-button type="success" @click="resetFn" size="mini">重置</el-button>
        </el-row>
      </div>
      <div>
        <el-button
          type="primary"
          v-if="hasPer('device:add')"
          icon="el-icon-plus"
          @click="showCreate"
          size="mini"
        >新加设备</el-button>
        <el-button
          type="danger"
          v-if="hasPer('device:delete')"
          icon="el-icon-delete"
          @click="deleteMany"
          size="mini"
        >批量删除</el-button>
        <el-button
          type="success"
          v-if="hasPer('device:creatQR')"
          icon="el-icon-s-ticket"
          @click="createQRcode"
          size="mini"
        >生成二维码</el-button>
      </div>
    </div>
    <el-table
      v-loading="tabLoading"
      ref="multipleTable"
      :data="tableData"
      stripe
      style="width: 100%;min-height:520px;"
      @selection-change="handleSelectChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="deviceId" label="设备编号"></el-table-column>
      <el-table-column prop="type" label="设备类型"></el-table-column>
      <el-table-column label="状态" width="80">
        <template slot-scope="scope">
          <i
            v-if="scope.row.deviceStatus==0"
            class="el-icon-warning"
            style="color:#e6a23c;font-size:24px;"
          ></i>
          <i v-else class="el-icon-success" style="color:#67C23A;font-size:24px;"></i>
        </template>
      </el-table-column>
      <el-table-column prop="position" label="安装位置"></el-table-column>
      <el-table-column prop="numG" label="故障次数"></el-table-column>
      <el-table-column prop="createTime" :formatter="formatDateA" label="导入时间"></el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="180"
        v-if="hasPer('device:edit') || hasPer('device:delete')"
      >
        <template slot-scope="scope">
          <el-button
            @click="editOne(scope.row)"
            type="primary"
            icon="el-icon-edit-outline"
            size="mini"
            v-if="hasPer('device:edit')"
            :disabled="scope.row.isSuper==1"
          >编辑</el-button>
          <el-button
            type="danger"
            :disabled="scope.row.isSuper==1"
            @click="deleteOne(scope.row)"
            v-if="hasPer('device:delete')"
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
        :page-sizes="[20, 30, 50,100]"
        :page-size="20"
        layout="total, sizes, prev, pager, next, jumper"
        :current-page.sync="offset"
        :total="total"
      ></el-pagination>
    </div>
    <!-- 添加数据弹窗 -->
    <el-dialog
      :title="add?'新加设备':'编辑设备'"
      :visible.sync="dialogVisible"
      width="80%"
      @closed="handleClosed"
      :close-on-click-modal="false"
    >
      <el-form ref="ruleForm" :rules="rules" :model="formData" label-width="120px">
        <el-form-item label="设备位置" prop="schoolId">
          <el-select v-model="formData.schoolId" filterable placeholder="查询学校">
            <el-option
              v-for="(item,index) in schoolList"
              :key="index"
              :label="item.xxmc"
              :value="item.xxJbxxId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-row :gutter="20">
          <template v-for="(item,index) in allTypes">
            <el-col :span="8" :key="index" border>
              <el-card class="box-card">
                <el-form-item  :title="item.type">
                  <div slot="label" style="overflow:hidden;white-space: nowrap;text-overflow: ellipsis;">
                    {{item.type}}
                  </div>
                  <el-input-number
                    size="mini"
                    :min="0"
                    :max="200"
                    placeholder="输入0-200整数"
                    v-model="item.number"
                  ></el-input-number>
                </el-form-item>
                <el-form-item label="备注">
                  <el-input
                    v-model="item.remarks"
                    type="textarea"
                    resize="none"
                    :autosize="{ minRows: 2, maxRows: 4 }"
                    :minlength="5"
                    clearable
                    :maxlength="50"
                    show-word-limit
                  ></el-input>
                </el-form-item>
                <el-form-item label="完成安装">
                  <el-radio v-model="item.anStatus" :label="1" checked>是</el-radio>
                  <el-radio v-model="item.anStatus" :label="0">否</el-radio>
                </el-form-item>
              </el-card>
            </el-col>
          </template>
        </el-row>
        <el-form-item>
          <el-button v-if="add" type="primary" size="mini" @click="submitForm('ruleForm')">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 生成二维码弹窗 -->
    <!-- showQRcode -->
    <el-dialog
      title="生成二维码"
      :visible.sync="showQRcode"
      width="1120px"
      :close-on-click-modal="false"
      @closed="handleClosedQR"
    >
      <div style="margin-bottom:20px;">
        <el-button size="mini" @click="printFun">打印二维码</el-button>
      </div>
      <el-row id="QRbox" ref="QRbox">
        <template v-for="(item,index) in query">
          <el-col :span="6" :key="index">
            <el-card shadow class="card" :body-style="{padding:0}">
              <div class="QRcode">
                <div class="QRcodeIcon">
                  <div :id="'QR'+item.deviceId" class="QRcodeImg"></div>
                </div>
                <div class="text">
                  <img src="@/assets/QR-logo.png" class="logo2" alt />
                  <p>请爱护设备,发生故障请联系学校管理员扫码报修</p>
                  <span class="sn">
                    <span style>设备编码:</span>
                    <strong>{{item.deviceId}}</strong>
                  </span>
                </div>
              </div>
            </el-card>
          </el-col>
        </template>
      </el-row>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import service from "@/utils/service";
import QRCode from "qrcodejs2";

import {
  getDeviceList,
  createDevice,
  editDevice,
  getDevice,
  deleteDevice,
  getAllType,
  deleteDeviceS,
  getEquipmentAll
} from "@/api/order";
import { getSchoolList } from "@/api/userRole";
export default {
  name: "v-device",
  data() {
    return {
      printObj: {
        id: "QRbox",
        popTitle: "设备二维码",
        extraCss: ""
      },
      add: true, //判断是否是添加
      dialogVisible: false, //弹窗
      dialogTag: false,
      showQRcode: false,
      tableData: [],
      total: 0,
      limit: 20,
      offset: 1,
      service: service,
      imageUrl: "",
      equipList: [],
      formData: {
        position: "",
        schoolId: ""
      },
      deletes: [], // 批量删除
      search: {
        schoolId: "",
        timeRange: "",
        deviceStatus: null,
        equipmentId: null
      },
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date(new Date().toLocaleDateString());
              const start = new Date(new Date().toLocaleDateString());
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date(new Date().toLocaleDateString());
              const start = new Date(new Date().toLocaleDateString());
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date(new Date().toLocaleDateString());
              const start = new Date(new Date().toLocaleDateString());
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      schoolList: [],
      allTypes: [],
      query: [], // 二维码数据
      rules: {
        schoolId: [{ required: true, message: "不能为空", trigger: "change" }]
        //  remarks:[{ regexp:/\w{5,50}/, message: "请输入5-50个字符", trigger: "blur" }]
      }
    };
  },

  created() {
    this.getList({ limit: this.limit, offset: this.offset });
    this.getAllTypeFn();
    this.getSchoolList();
    this.getEquipmentAll();
  },
  computed: {
    ...mapGetters(["tabLoading"])
  },
  methods: {
    // 获取所有设备类型
    getEquipmentAll() {
      getEquipmentAll().then(res => {
        this.equipList = res.data ? res.data : [];
      });
    },
    // 打印方法
    printFun() {
      this.$print(this.$refs["QRbox"]);
    },

    handleClosedQR() {
      this.$refs.multipleTable.clearSelection();
      this.query = [];
      this.showQRcode = false;
    },
    // 批量生成二维码
    createQRcode() {
      // this.$qrCode();
      if (this.query.length < 1) {
        this.$notify.warning({
          title: "警告",
          message: "请选择需要批量生成的设备"
        });
      } else {
        this.showQRcode = true;
        this.$nextTick(() => {
          this.query.forEach(item => {
            new QRCode(document.getElementById("QR" + item.deviceId), {
              text: "" + item.deviceId,
              width: 60,
              height: 60,
              colorDark: "#000000",
              colorLight: "#ffffff",
              correctLevel: QRCode.CorrectLevel.L
            });
          });
        });
      }
    },
    handleSelectChange(val) {
      this.query = val;
      this.deletes = val.map(item => {
        return item.id;
      });
    },
    // 批量删除
    deleteMany() {
      let data = this.deletes;
      if (data.length > 0) {
        this.$msgbox({
          title: "删除操作",
          message: "确定要删除吗?",
          callback: e => {
            if (e == "confirm") {
              deleteDeviceS(data).then(res => {
                this.$message({
                  type: res.code == 1 ? "success" : "error",
                  message: res.message
                });
                this.getList({ limit: this.limit, offset: this.offset });
              });
            }
          }
        });
      } else {
        this.$notify({
          type: "warning",
          title: "提示信息",
          message: "请选择需要删除的数据"
        });
      }
    },
    // 重置函数
    resetFn() {
      this.search.schoolId = "";
      this.search.timeRange = "";
      this.search.deviceStatus = null;
      this.search.equipmentId = null;
      this.getList({ limit: 10, offset: 1 });
    },
    // 查询函数
    searchFn() {
      this.offset = 1;
      this.getList({
        limit: this.limit,
        offset: this.offset,
        schoolId: this.search.schoolId ? this.search.schoolId : "",
        timeRange: this.search.timeRange ? this.search.timeRange.join(",") : "",
        deviceStatus:
          this.search.deviceStatus != null ? this.search.deviceStatus : null,
        equipmentId: this.search.equipmentId ? this.search.equipmentId : null
      });
    },
    // 获取学校信息
    getSchoolList() {
      getSchoolList().then(res => {
        this.schoolList = res.data ? res.data : [];
      });
    },
    // 获取所有设备类型
    getAllTypeFn() {
      getAllType().then(res => {
        let data = res.data ? res.data : [];
        this.allTypes = data.map(item => {
          item.schoolId = "";
          item.anStatus = 1;
          item.number = 0;
          return item;
        });
      });
    },
    // 新加数据
    submitForm(formName) {
      // 新加设备
      this.$refs[formName].validate(field => {
        if (field) {
          this.allTypes = this.allTypes.map(item => {
            item.schoolId = this.formData.schoolId;
            let t = this.schoolList.filter(item => {
              return item.xxJbxxId == this.formData.schoolId;
            });

            item.position = t.length > 0 ? t[0].xxmc : "";
            return item;
          });
          createDevice(this.allTypes).then(res => {
            this.$message({
              type: res.code == 1 ? "success" : "error",
              message: res.message
            });
            this.dialogVisible = false;
            this.getList({ limit: this.limit, offset: this.offset });
            this.resetForm(formName);
          });
        } else {
          console.log("err submit!!");
        }
      });
    },
    // 跟新设备信息
    editForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 新加设备
          editDevice(this.formData.id, this.formData).then(res => {
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
      getDevice(data).then(res => {
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
      this.allTypes = this.allTypes.map(item => {
        item.number = 0;
        item.remarks = "";
        item.anStatus = 1;
        return item;
      });
      this.resetForm("ruleForm");
    },
    // 获取设备列表
    getList(data) {
      getDeviceList(data)
        .then(res => {
          this.tableData = res.data.rows;
          if (this.tableData.length < 1) {
            this.offset = this.offset - 1 > 1 ? this.offset - 1 : 1;
          }
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
            deleteDevice(data.id).then(res => {
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
    // 新加设备类型
    showCreate() {
      this.dialogVisible = true;
      this.add = true;
      let data = this.allTypes;
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
      this.getList({
        limit: res,
        offset: this.offset,
        schoolId: this.search.schoolId ? this.search.schoolId : "",
        timeRange: this.search.timeRange ? this.search.timeRange.join(",") : "",
        deviceStatus:
          this.search.deviceStatus != null ? this.search.deviceStatus : null,
        equipmentId: this.search.equipmentId ? this.search.equipmentId : null
      });
    },
    offset(res) {
      this.getList({
        limit: this.limit,
        offset: res,
        schoolId: this.search.schoolId ? this.search.schoolId : "",
        timeRange: this.search.timeRange ? this.search.timeRange.join(",") : "",
        deviceStatus:
          this.search.deviceStatus != null ? this.search.deviceStatus : null,
        equipmentId: this.search.equipmentId ? this.search.equipmentId : null
      });
    }
  }
};
</script>

<style lang="scss" scoped>

.QRcode {
  position: relative;
  overflow: hidden;
  height: 100px;
  width: 260px;

  .card {
    padding: 0;
  }
  .QRcodeIcon {
    width: 100px;
    height: 100px;
    float: left;
    padding: 10px;
    background-color: #e60012;
    .QRcodeImg {
      width: 80px;
      height: 80px;
      padding: 10px;
      background-color: #ffffff;
    }
  }
  .text {
    float: left;
    width: 160px;
    text-align: left;
    padding: 5px 0 5px 10px;
    font-size: 12px;
    .logo1 {
      display: block;
      margin: 0 auto;
      width: 64px;
      height: 40px;
      position: relative;
      margin-bottom: 6px;
    }
    .logo2 {
      display: block;
      margin: 0 auto;
      width: 120;
      height: 40px;
      position: relative;
      margin-bottom: 6px;
    }
    .sn {
      text-indent: 0;
      margin-top: 6px;
      display: inline-block;
    }
    p {
      display: inline-block;
      text-indent: 2em;
      line-height: 14px;
    }
  }
}
.el-form-item{
  color:#000
 
}
</style>
