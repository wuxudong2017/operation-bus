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
    this.getfault();
    this.getDayList()
  },
  data() {
    this.chartSettings = {
      metrics: ["count"],
      dimension: ["d"],
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
        columns: ["d", "count",],
        rows: []
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
    },
    // 工单时间统计
  getDayList(){
    this.$http.get('/api/admin/getDay').then(res=>{
      this.chartData.rows = res.data
    })
  }
    
  

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
