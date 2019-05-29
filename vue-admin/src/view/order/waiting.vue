<template>
  <div class="data-table">
    <div class="nav">
      <el-button
        type="primary"
        v-if="hasPer('dispatch:add')"
        icon="el-icon-plus"
        @click="dialogVisible = true"
        size="mini"
      >新加工单</el-button>
    </div>
    <!-- 搜索 -->
    <el-row>
      <el-col :span="6">
        <el-input size="small" type="number"  clearable v-model="formData.keywords" placeholder="请输工单号">
          <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
        </el-input>
      </el-col>
    </el-row>
    <el-table v-loading="tabLoading" :data="tableData" stripe style="width: 100%;min-height:520px;">
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
      <el-table-column label="故障类型">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top" :content="scope.row.faultDesc">
            <el-tag slot="reference" type="danger" size="medium">{{ scope.row.tagName }}</el-tag>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="equipmentType" label="设备类型"></el-table-column>
      <el-table-column label="接单工人">
        <template slot-scope="scope">
          <el-tag size="medium">{{ scope.row.workername }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" :formatter="formatDate" width="200" label="开始时间"></el-table-column>

      <!-- <el-table-column fixed="right"  v-if="hasPer('dispatch:edit')||hasPer('dispatch:delete')" label="操作" width="180">
        <template slot-scope="scope">
          <el-button
            @click="editOne(scope.row)"
            type="primary"
            icon="el-icon-edit-outline"
            size="mini"
             v-if="hasPer('dispatch:edit')"
          >派单</el-button>
          <el-button type="danger"  v-if="hasPer('dispatch:delete')"  @click="deleteOne(scope.row)" icon="el-icon-delete" size="mini">删除</el-button>
        </template>
      </el-table-column>-->
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
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import {
  getOrderList,
  createOrder, //新加工单
  editOrder,
  getOrder,
  deleteOrder
} from "@/api/order";
export default {
  name: "v-order",
  created() {
    this.getList({
      limit: this.limit,
      offset: this.offset,
      status: this.status
    });
  },
  data() {
    return {
      dialogVisible: false, //弹窗
      tableData: [],
      total: 0,
      limit: 10,
      offset: 1,
      status: "1", //派单状态,0-未派单,1-待接单,2维修中,3派单结束
      formData: {
        xxmc: "",
        workerId: "" // 状态
      },
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
    // 搜索功能
    search() {
      let data = {
        keywords: this.formData.keywords,
        status: this.status,
        limit: this.limit,
        offset: this.offset
      };
      //console.log(data);
      this.getList(data);
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
      this.formData = row;
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
