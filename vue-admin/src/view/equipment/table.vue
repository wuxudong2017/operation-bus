<template>
  <div class="data-table">
    <div class="nav">
      <span>查询月份</span>
      <el-select v-model="month" size="mini">
        <el-option
          v-for="(item,index) in monthList"
          :key="index"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
    </div>
    <el-row :gutter="20" style="margin-top:30px;">
      <el-col :span="20" :offset="2">
        <el-card>
          <div class="title">
            <h2>{{year}}年{{month}}月份设备故障清单</h2>
          </div>
          <el-table
            id="tableDemo"
            ref="multipleTable"
            :data="deviceData"
            stripe
            style="width:100%;"
            show-summary
          >
            <el-table-column type="index" label="ID"></el-table-column>
            <el-table-column prop="type" label="设备类型"></el-table-column>
            <el-table-column prop="count" label="设备总数"></el-table-column>
            <el-table-column prop="breakdownNum" label="累计故障次数"></el-table-column>
            <el-table-column prop="breakdownNumM" label="本月故障次数"></el-table-column>
            <el-table-column prop="repairM" label="本月修复数"></el-table-column>
            <el-table-column prop="unRepair" label="累计未修复数"></el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20" style="margin-top:30px;">
      <el-col :span="20" :offset="2">
        <el-card>
          <div class="title">
            <h2>{{year}}年{{month}}月份维修人员考核表</h2>
          </div>
          <el-table
            id="tableDemo"
            ref="multipleTable"
            :data="workerData"
            stripe
            style="width:100%;"
          >
            <el-table-column type="index" label="ID"></el-table-column>
            <el-table-column prop="id" label="工号"></el-table-column>
            <el-table-column prop="name" label="姓名"></el-table-column>
            <el-table-column prop="count" label="本月工单数"></el-table-column>
            <el-table-column prop="serviceAttr" label="服务态度"></el-table-column>
            <el-table-column prop="requireSpeed" label="维修时效"></el-table-column>
            <el-table-column prop="totalScore" label="总得分"></el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { deviceTable, assessment } from "@/api/order";
export default {
  name: "tableList",
  data() {
    return {
      deviceData: [],
      workerData: [],
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      monthList: [
        { id: 1, name: "一月" },
        { id: 2, name: "二月" },
        { id: 3, name: "三月" },
        { id: 4, name: "四月" },
        { id: 5, name: "五月" },
        { id: 6, name: "六月" },
        { id: 7, name: "七月" },
        { id: 8, name: "八月" },
        { id: 9, name: "九月" },
        { id: 10, name: "十月" },
        { id: 11, name: "十一月" },
        { id: 12, name: "十二月" }
      ]
    };
  },
  created() {
    this.getData1();
  },
  methods: {
    getData1() {
      let month = this.month;
      deviceTable({ month }).then(res => {
        this.deviceData = res.data ? res.data : [];
      });
      assessment({ month }).then(res => {
        this.workerData = res.data ? res.data : [];
      });
    }
  },
  watch: {
    month: function(val) {
      this.getData1();
    }
  }
};
</script>
<style lang="scss" scoped>
.title {
  padding: 16px 0;
  text-align: center;
  border-bottom: 1px #dddddd dashed;
}
</style>
