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
        <el-input size="small" clearable v-model="formData.keywords">
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
      <!-- <el-table-column prop="createTime" :formatter="formatDate" width="200" label="开始时间"></el-table-column>
      <el-table-column prop="updateTime" :formatter="formatDate" width="200" label="结束时间"></el-table-column>-->

      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button @click="editOne(scope.row)" type="success" icon="el-icon-view" size="mini">查看</el-button>
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

    <el-dialog title="查看维修详情" :visible="dialogVisible" :before-close="handleClosed" width="60%">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form label-width="80px">
            <el-form-item label="工单号">{{listData.id}}</el-form-item>
            <el-form-item label="报修学校">{{listData.xxmc}}</el-form-item>
            <el-form-item label="学校地址">{{listData.xxdz}}</el-form-item>
            <el-form-item label="报修人">{{listData.name}}</el-form-item>
            <el-form-item label="联系电话">{{listData.phone}}</el-form-item>
            <el-form-item label="报修图片">
              <template v-for="(item,index) in bxPicture">
               
                <img :src="item.url" :key="index" alt="No Image" width="200" height="200">
              </template>
            </el-form-item>
          </el-form>
        </el-col>
       
        <el-col :span="12">
          <el-form label-width="80px">
            <el-form-item label="维修人">{{listData.workername}}</el-form-item>
            <el-form-item label="工号">{{listData.workerId}}</el-form-item>
          
            <el-form-item label="报修图片">
              <template v-for="(item,index) in filelist">
                <img :src="item.url" :key="index" alt="No Image" width="200" height="200">
              </template>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="24">
           <el-steps finish-status="success"  :active="activeOrder">
          <template v-for="(item) in listData.remark">
            <el-step v-if="item.orderStatus == 0" title="待派单">
               <template slot="icon"><i class="el-icon-edit"></i></template>
            </el-step>
            <el-step v-else-if="item.orderStatus == 1" title="待维修">
              <template slot="icon"><i class="el-icon-edit"></i></template>
              <template slot="description">
                {{item.workerName}}
                  <i class="el-icon-time"></i>
                  {{item.updateTime | formateA}}
              </template>
            </el-step>
            <el-step v-else-if="item.orderStatus == 2" title="维修中">
               <template slot="icon"><i class="el-icon-edit"></i></template>
              <template slot="description">
                <span>
                  {{item.workerName}}
                  <i class="el-icon-time"></i>
                  {{item.updateTime | formateA}}
                </span>
              </template>
            </el-step>
            <el-step v-else="item.orderStatus == 3" title="维修完" >
               <template slot="icon"><i class="el-icon-edit"></i></template>
              <template slot="description">
                   {{item.workerName}}
                  <i class="el-icon-time"></i>
                  {{item.updateTime | formateA}}
                  <br/>
                  描述: {{item.remark}}
                  </template>
            </el-step>
          </template>
        </el-steps>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>
<script>
import {
  getOrderList,
  createOrder, //新加工单
  editOrder,
  getOrder,
  deleteOrder
} from "@/api/order";
import { mapGetters } from "vuex";
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
      status: "3", //派单状态,0-未派单,1-待接单,2维修中,3派单结束
      listData: [],
      filelist:[],
      formData: {
        xxmc: "",
        workerId: "", // 状态
        keywords: ""
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
  filters: {
    formateA(data) {
      let date = new Date(parseInt(data));
      let Y = date.getFullYear() + "-";
      let M =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1) + "-"
          : date.getMonth() + 1 + "-";
      let D =
        date.getDate() < 10 ? "0" + date.getDate() + " " : date.getDate() + " ";

      return Y + M + D;
    }
  },
  computed: {
    ...mapGetters(["tabLoading"]),
    bxPicture() {
      return this.listData.picture ? JSON.parse(this.listData.picture) : "";
    },
    activeOrder() {
      return this.listData.remark ? this.listData.remark.length : 0;
    },
   
  },
  methods: {
    // 维修图片
     filelistFun(){
       console.log(this.listData)
      let arr =this.listData.remark || [];
      let t = arr.filter(item=>{
          return item.orderStatus == 3
        }); 
        return JSON.parse(t[0].filelist)
    },
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
    // 弹窗关闭
    handleClosed() {
      this.dialogVisible = false;
      this.add = true;
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
    editOne(e) {
      this.dialogVisible = true;
     
      let data = { id: e.id };
      getOrder(data).then(res => {
        this.listData = res.data ? res.data : {};
         this.filelist = this.filelistFun()
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
