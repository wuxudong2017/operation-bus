<template>
  <div id="index">
    <div class="index">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-card
            class="item"
            shadow="always"
            :body-style="{backgroundColor:'#2CAA3F',color:'#2CAA3F',overflow:'hidden'}"
          >
            <div class="icon hidden-xs-only">
              <i class="iconfont icon-jiuye"></i>
            </div>
            <div class="content">
              <em>{{data1.schoolUser}}</em>
              <span>学校用户</span>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card
            class="item"
            shadow="always"
            :body-style="{backgroundColor:'#1AA1E6',color:'#1AA1E6',overflow:'hidden'}"
          >
            <div class="icon hidden-xs-only">
              <i class="iconfont icon-jiuye"></i>
            </div>
            <div class="content">
              <em>{{data1.worker}}</em>
              <span>维修人员</span>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card
            class="item"
            shadow="always"
            :body-style="{backgroundColor:'#FD8D25',color:'#FD8D25',overflow:'hidden'}"
          >
            <div class="icon hidden-xs-only">
              <i class="iconfont icon-jiuye"></i>
            </div>
            <div class="content">
              <em>12360</em>
              <span>设备数量</span>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card
            class="item"
            shadow="always"
            :body-style="{backgroundColor:'#E30A20',color:'#E30A20',overflow:'hidden'}"
          >
            <div class="icon hidden-xs-only">
              <i class="iconfont icon-jiuye"></i>
            </div>
            <div class="content">
              <em>{{data1.list}}</em>
              <span>维修记录</span>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin-top:40px;">
        <el-col :span="12">
          <el-card class="item" shadow="always">
            <ve-histogram :data="chartData" :settings="chartSettings"></ve-histogram>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card class="item" shadow="always">
            <ve-pie :data="chartData1" :settings="chartSettings1"></ve-pie>
          </el-card>
        </el-col>
      </el-row>
       <el-row :gutter="20" style="margin-top:40px;">
        <el-col :span="24">
          <el-card class="item" shadow="always">
          <ve-line :data="chartData"></ve-line>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import {getIndexAll,getFaultCount } from '@/api/order'
export default {
  created(){
    this.getIndex();
    this.getfault()
  },
  data() {
    this.chartSettings = {
      metrics: ["工单数"],
      dimension: ["日期"],
      itemStyle: {
        color: "#26AAF8"
      },
      barWidth: 10,
      barGap: "50%"
    };
     this.chartSettings1 = {
        limitShowNum: 5
      }
    return {
      data1 :{},
      chartData: {
        columns: ["日期", "工单数", "下单用户", "下单率"],
        rows: [
          { 日期: "3/13", 工单数: 1393, 下单用户: 1093, 下单率: 0.32 },
          { 日期: "3/14", 工单数: 1393, 下单用户: 1093, 下单率: 0.32 },
          { 日期: "3/13", 工单数: 1393, 下单用户: 1093, 下单率: 0.32 },
          { 日期: "3/14", 工单数: 1393, 下单用户: 1093, 下单率: 0.32 },
          { 日期: "3/15", 工单数: 1393, 下单用户: 1093, 下单率: 0.32 },
          { 日期: "3/16", 工单数: 1393, 下单用户: 1093, 下单率: 0.32 },
          { 日期: "3/17", 工单数: 1393, 下单用户: 1093, 下单率: 0.32 },
          { 日期: "3/18", 工单数: 1393, 下单用户: 1093, 下单率: 0.32 },
          { 日期: "3/19", 工单数: 1393, 下单用户: 1093, 下单率: 0.32 },
          { 日期: "3/20", 工单数: 1393, 下单用户: 1093, 下单率: 0.32 },
          { 日期: "3/21", 工单数: 1393, 下单用户: 1093, 下单率: 0.32 },
          { 日期: "3/22", 工单数: 3530, 下单用户: 3230, 下单率: 0.26 },
          { 日期: "3/23", 工单数: 2923, 下单用户: 2623, 下单率: 0.76 },
          { 日期: "3/24", 工单数: 1723, 下单用户: 1423, 下单率: 0.49 },
          { 日期: "3/25", 工单数: 3792, 下单用户: 3492, 下单率: 0.323 },
          { 日期: "3/26", 工单数: 4593, 下单用户: 4293, 下单率: 0.78 },
          { 日期: "3/27", 工单数: 4593, 下单用户: 4293, 下单率: 0.78 },
          { 日期: "3/28", 工单数: 4593, 下单用户: 4293, 下单率: 0.78 }
        ]
      },
       chartData1: {
          columns: ['name', 'count'],
          rows: []
        }
    };
  },
  methods:{
    // 学校用户,维修人员 统计
    getIndex(){
      getIndexAll().then(res=>{
        this.data1 = res.data
      })
    },
    // 故障饼状图
    getfault(){
      getFaultCount().then(res=>{
        this.chartData1.rows = res.data?res.data:[]
        
      })
    }
    // 工单时间统计
  

  }
};
</script>

<style scoped>
.index {
  padding: 30px;
  background-color: #ffffff;
  color: #ffffff;
  font-size: 28px;
  font-weight: bold;
}
.index .item em {
  display: block;
  color: #ffffff;
}
.index .item .icon {
  display: inline-block;
  font-size: 46px;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  width: 80px;
  height: 80px;
  text-align: center;
  line-height: 80px;
}
.index .item .icon .iconfont {
  font-size: 46px;
}
.index .item .content {
  float: right;
  margin-top: 10px;
}
.index .item .content span {
  font-size: 14px;
  color: #ffffff;
  font-weight: normal;
}
</style>
