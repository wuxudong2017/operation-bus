<template>
  <div class="data-table">
    <!-- 搜索 -->
    <el-row class="nav" :gutter="10">
      <el-col :span="6">
        <el-input
          size="mini"
          type="number"
          clearable
          v-model="formData.keywords"
          placeholder="请输工单号"
          @keyup.enter.native="searchFun"
        >
          <el-button slot="append" icon="el-icon-search" @click="searchFun"></el-button>
        </el-input>
      </el-col>
      <!-- <el-col :span="3">
        <el-select size="mini" v-model="search.schoolId" filterable placeholder="查询学校">
          <el-option
            v-for="(item,index) in schoolList"
            :key="index"
            :label="item.xxmc"
            :value="item.xxJbxxId"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="3">
        <el-select v-model="search.equipmentId" placeholder="设备类型" size="mini">
          <el-option
            v-for="(item,index) in equipList"
            :label="item.type"
            :value="item.id"
            :key="index"
          ></el-option>
        </el-select>
      </el-col> -->
    </el-row>
    <div class="nav">
      <el-button
        type="primary"
        v-if="hasPer('dispatch:add')"
        icon="el-icon-plus"
        @click="dialogVisible = true"
        size="mini"
      >新加工单</el-button>
      <!-- <el-button  type="danger" @click="getS">socket 测试按钮</el-button> -->
    </div>
    <el-table :data="tableData" stripe style="width: 100%;min-height:520px;" v-loading="tabLoading">
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="id" label="工单号" width="180"></el-table-column>
      <el-table-column width="200" label="学校名">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>学校地址: {{ scope.row.xxdz }}</p>
            <div slot="reference" class="name-wrapper">
              <span>{{ scope.row.xxmc }}</span>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="报修人"></el-table-column>
      <el-table-column prop="phone" label="联系方式"></el-table-column>

      <el-table-column prop="equipmentType" label="设备类型"></el-table-column>
      <el-table-column label="故障类型">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top" :content="scope.row.faultDesc">
            <el-tag slot="reference" type="danger" size="medium">{{ scope.row.tagName }}</el-tag>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" :formatter="formatDate" width="200" label="开始时间"></el-table-column>

      <el-table-column
        fixed="right"
        v-if="hasPer('dispatch:edit')||hasPer('dispatch:delete')"
        label="操作"
        width="180"
      >
        <template slot-scope="scope">
          <el-button
            @click="editOne(scope.row)"
            type="primary"
            icon="el-icon-edit-outline"
            size="mini"
            v-if="hasPer('dispatch:edit')"
          >派单</el-button>
          <el-button
            type="danger"
            v-if="hasPer('dispatch:delete')"
            @click="deleteOne(scope.row)"
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
      title="开始派单"
      :close-on-click-modal="false"
      :visible.sync="dialogVisible"
      width="40%"
      @closed="handleClosed"
    >
      <el-form ref="ruleForm" :model="formData" :rules="rules" label-width="80px">
        <el-form-item label="派送学校">{{formData.xxmc}}</el-form-item>
        <el-form-item label="报修人">{{formData.name}}</el-form-item>
        <el-form-item label="设备编号" v-if="formData.deviceId">{{formData.deviceId}}</el-form-item>
        <el-form-item label="设备类型">{{formData.equipmentType}}</el-form-item>
        <el-form-item label="故障描述">{{formData.faultDesc}}</el-form-item>
        <el-form-item label="故障图片">
          <template v-for="(item,index) in  picture">
            <img :src="item" :key="index" alt="No Image" @click="showCarousel" />
          </template>
        </el-form-item>
        <el-form-item label="接单人员 " prop="workerId">
          <el-select v-model="formData.workerId">
            <el-option
              v-for="(item,index) in userList"
              :key="index"
              :value="item.jobNumber"
              :label="item.name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="mini" @click="editForm('ruleForm')">提交</el-button>
          <el-button size="mini" @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
      <el-dialog :visible.sync="showC" append-to-body title="查看详情" :close-on-click-modal="false">
        <el-carousel :autoplay="false" :interval="4000" type="card" height="600px">
          <el-carousel-item v-for="(item,index) in pictureS" :key="item">
            <img width="400" :src="item" :key="index" alt="No Image" @click="showCarousel" />
          </el-carousel-item>
        </el-carousel>
      </el-dialog>
    </el-dialog>
  </div>
</template>
<script>
import {
  getOrderList,
  createOrder, //新加工单
  editOrder,
  getOrder,
  deleteOrder,
  getEquipmentAll
} from "@/api/order";
import { mapGetters } from "vuex";
import { getUserListTrue, getSchoolList } from "@/api/userRole";
export default {
  name: "v-order",
  created() {
    this.getList({
      limit: this.limit,
      offset: this.offset,
      status: this.status
    });
    this.getUserList();
    // socket
    this.$socket.on("connect", function() {
      console.log("connected  websocket");
    });
    // this.getSchoolList();
    // this.getEquipmentAll();
  },
  data() {
    return {
      dialogVisible: false, //弹窗
      showC: false,
      tableData: [],
      total: 0,
      limit: 10,
      offset: 1,
      status: "0", //派单状态,0-未派单,1-待接单,2维修中,3派单结束
      userList: [],
      formData: {
        xxmc: "",
        workerId: "", // 状态
        keywords: ""
      },
      schoolList: [],
      equipList: [],
      search: {
        equipmentId: "",
        schoolId: ""
      },
      picture: [],
      pictureS: [],
      rules: {
        menuName: [
          { required: true, message: "不能为空", trigger: "blur" },
          {
            xxmc: /[\u4e00-\u9fa5]/g,
            message: "必须为中文",
            trigger: "blur"
          }
        ],
        workerId: [{ required: true, message: "不能为空", trigger: "blur" }]
      }
    };
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
    // 获取学校信息
    getSchoolList() {
      getSchoolList().then(res => {
        this.schoolList = res.data ? res.data : [];
      });
    },
    getS() {
      this.$socket.emit("vue", { workerId: "101002", orderId: "11111111" });
    },
    showCarousel() {
      this.showC = true;
    },
    // 搜索功能
    searchFun() {
      let data = {
        keywords: this.formData.keywords,
        status: this.status,
        limit: this.limit,
        offset: this.offset
      };
      //console.log(data);
      this.getList(data);
    },
    //获取列表数据
    getUserList() {
      getUserListTrue().then(res => {
        this.userList = res.data;
      });
    },
    // 跟新工单信息
    editForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 新加工单
          editOrder(this.formData.id, this.formData).then(res => {
            this.$message({
              type: res.code == 1 ? "success" : "error",
              message: res.message
            });
            if (res.code == 1) {
              this.$socket.emit("vue", {
                workerId: this.formData.workerId,
                orderId: this.formData.id
              });
            }
            this.dialogVisible = false;
            this.getList({
              limit: this.limit,
              offset: this.offset,
              status: this.status
            });
            this.resetForm(formName);
          });
        } else {
          console.log("error submit!!");
          return false;
        }
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
    // 获取工单列表
    getList(data) {
      getOrderList(data)
        .then(res => {
          this.tableData = res.data.rows;
          if (this.tableData.length < 1) {
            this.offset = this.offset - 1 > 1 ? this.offset - 1 : 1;
          }
          this.total = res.data.count;
        })
        .catch(err => {});
    },
    // 根据id删除 工单

    deleteOne(data) {
      this.$msgbox({
        title: "删除操作",
        message: "确定要删除吗?",
        callback: e => {
          if (e == "confirm") {
            deleteOrder(data.id).then(res => {
              this.$message({
                type: res.code == 1 ? "success" : "error",
                message: res.message
              });
              this.getList({
                limit: this.limit,
                offset: this.offset,
                status: this.status
              });
            });
          }
        }
      });
    },
    editOne(row) {
      this.dialogVisible = true;
      this.add = false;
      let data = { id: row.id };
      getOrder(data).then(res => {
        let data = res.data ? res.data : "";
        this.picture = res;
        console.log(res);
        this.formData = data;
        this.picture =
          data.picture != "" || data.picture ? JSON.parse(data.picture) : [];
        this.pictureS = JSON.parse(data.picture).map(item => {
          return item.replace(/200x200.*/, "");
        });
      });
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
      this.getList({ limit: res, offset: this.offset, status: this.status });
    },
    offset(res) {
      this.getList({ limit: this.limit, offset: res, status: this.status });
    }
  }
};
</script>

<style lang="scss">
</style>
