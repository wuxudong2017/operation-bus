<template>
  <div class="data-table">
    <div class="nav">
      <div style="margin-bottom:20px;">
        <el-row :gutter="20">
          <el-col :span="4">
            <el-select size="mini" filterable v-model="search.schoolId" placeholder="查询学校">
              <el-option
                v-for="(item,index) in schoolList"
                :key="index"
                :label="item.xxmc"
                :value="item.xxJbxxId"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="4">
            <el-select size="mini" filterable v-model="search.equipmentId" placeholder="查询设备类型">
              <el-option
                v-for="(item,index) in equipmentType"
                :key="index"
                :label="item.type"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="16">
            <el-date-picker
              v-model="search.timeRange"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions"
              size="mini"
              value-format="timestamp"
            ></el-date-picker>
            <el-button type="primary" @click="searchFn" size="mini">查询</el-button>
            <el-button type="success" @click="resetFn" size="mini">重置</el-button>
          </el-col>
        </el-row>
      </div>
      <div>
        <el-row :gutter="20">
          <el-col :span="4">
            <el-button
              size="mini"
              icon="el-icon-receiving"
              type="primary"
              @click="exportToExcel"
            >打印故障清单</el-button>
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- table -->
    <el-table
      id="tableDemo"
      ref="multipleTable"
      :data="tableData"
      stripe
      style="width: 100%;min-height:520px;"
    >
      <el-table-column type="index" label="ID"></el-table-column>
      <el-table-column prop="deviceId" label="设备编号"></el-table-column>
      <el-table-column prop="type" label="设备类型"></el-table-column>
      <el-table-column prop="provider" label="设备厂商"></el-table-column>
      <el-table-column prop="tagName" label="故障原因"></el-table-column>
      <el-table-column prop="xxmc" label="学校"></el-table-column>
      <el-table-column prop="createTime" label="故障时间"></el-table-column>
    </el-table>
    <div class="page">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[10, 20, 30,50, total]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :current-page.sync="offset"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
import { getFaultList, getEquipmentAll } from "@/api/order";
import { getSchoolList } from "@/api/userRole";
export default {
  name: "faultList",
  data() {
    return {
      tableData: [],
      total: 0,
      limit: 10,
      offset: 1,
      search: {
        timeRange: [],
        schoolId: "",
        equipmentId: ""
      },
      schoolList: [],
      equipmentType: [],
      pickerOptions: {
        shortcuts: [
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
      }
    };
  },
  created() {
    let data = { limit: this.limit, offset: this.offset };
    this.getData(data);
    this.getSchoolList();
    this.getEquipment();
  },
  methods: {
    //导出Excel
    exportToExcel() {
      this.$nextTick(() => {
        let et = XLSX.utils.table_to_book(document.getElementById("tableDemo")); //此处传入table的DOM节点
        let etout = XLSX.write(et, {
          bookType: "xlsx",
          bookSST: true,
          type: "array"
        });
        try {
          FileSaver.saveAs(
            new Blob([etout], {
              type: "application/octet-stream"
            }),
            `故障清单.xlsx`
          ); //故障清单.xlsx 为导出的文件名
        } catch (e) {
          console.log(e, etout);
        }
        return etout;
      });
    },
    // 获取设备类型
    getEquipment() {
      getEquipmentAll().then(res => {
        this.equipmentType = res.data ? res.data : [];
      });
    },
    // 获取学校信息
    getSchoolList() {
      getSchoolList().then(res => {
        this.schoolList = res.data ? res.data : [];
      });
    },
    getData(data) {
      getFaultList(data).then(res => {
        this.total = res.data ? res.data.count : 0;
        this.tableData = res.data ? res.data.rows : [];
        if (this.tableData.length < 1) {
          this.offset = this.offset - 1 > 1 ? this.offset - 1 : 1;
        }
      });
    },
    //分页
    handleSizeChange(val) {
      this.limit = val;
    },
    handleCurrentChange(val) {
      this.offset = val;
    },
    searchFn() {
      let data = {
        limit: this.limit,
        offset: this.offset,
        timeRange: this.search.timeRange.join(","),
        schoolId: this.search.schoolId,
        equipmentId: this.search.equipmentId
      };
      this.getData(data);
    },
    resetFn() {
      this.search.timeRange = [];
      this.search.equipmentId = "";
      this.search.schoolId = "";
      let data = { limit: this.limit, offset: this.offset };
      this.getData(data);
    }
  },
  watch: {
    limit(res) {
      let data = {
        limit: res,
        offset: this.offset,
        timeRange:
          this.search.timeRange.length > 0
            ? this.search.timeRange.join(",")
            : null,
        schoolId: this.search.schoolId ? this.search.schoolId : null,
        equipmentId: this.search.equipmentId ? this.search.equipmentId : null
      };
      this.getData(data);
    },
    offset(res) {
      let data = {
        limit: this.limit,
        offset: res,
        timeRange:
          this.search.timeRange.length > 0
            ? this.search.timeRange.join(",")
            : null,
        schoolId: this.search.schoolId ? this.search.schoolId : null,
        equipmentId: this.search.equipmentId ? this.search.equipmentId : null
      };
      this.getData(data);
    }
  }
};
</script>

<style>
</style>
