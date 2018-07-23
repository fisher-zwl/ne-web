<template>
  <div class="window">
    <el-row>
      <el-col :span="8">
        <el-row>
          <el-col :span="6">
            <div style="height: 40px;line-height: 40px;text-align: center">
              日期选择
            </div>
          </el-col>
          <el-col :span="10">
            <div class="date-wrap">
              <el-date-picker
                v-model="dates"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                @change="handleDateChange"
                align="right">
              </el-date-picker>
            </div>
          </el-col>
        </el-row>

      </el-col>
      <el-col :span="12">
        <el-row>
          <el-col :span="4">
            <div style="height: 40px;line-height: 40px;text-align: center">
              选择状态
            </div>
          </el-col>
          <el-col :span="10">
            <el-select @change='selectChange' v-model="selectValue" clearable placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row style="margin-top:20px">
      <el-col :span="14">
        <el-col :span="5">
          <el-button style="display: none" type="success">生成兑换码</el-button>
        </el-col>
        <el-col :span="5">
          <el-button style="display: none" type="success">导入报表</el-button>
        </el-col>
      </el-col>
      <el-col :span="7" style="float: right">
        <el-col :span="18">
          <el-input
            @change="handleSearchChange"
            placeholder="请输入内容"
            v-model="searchValue"
            clearable>
          </el-input>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" @click="handleSearch">搜索</el-button>
        </el-col>

      </el-col>
    </el-row>
    <LoadingNoDialog :loading="loading">

      <el-table
        border
        :data="tableData"
        style="width: 100%;margin-top: 10px"
        :default-sort="{prop: 'date', order: 'descending'}"
      >
        <el-table-column
          prop="code"
          label="兑换码"
        >
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          :formatter="statusFormatter"
        >
        </el-table-column>
        <el-table-column
          prop="createdAt"
          label="创建时间"
        >
        </el-table-column>
      </el-table>
      <div style="margin-top: 10px;float: right">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[20, 50, 100, 500,1000,2000]"
          :page-size="20"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </LoadingNoDialog>
  </div>
</template>
<script>
  import LoadingNoDialog from '../components/LoadingNoDialog.vue'
  import axios from 'axios'
  import moment from 'moment'

  export default {
    components: {
      LoadingNoDialog
    },
    data() {
      return {
        currentPage4: 1,
        tableData: [],
        page: 1,
        size: 20,
        total: 0,
        loading: false,
        dates: '',
        startDate: '',
        endDate: '',
        selectValue: '',
        options: [{
          value: 0,
          label: '未激活'
        }, {
          value: 1,
          label: '已激活'
        }, {
          value: 2,
          label: '未激活(被还原)'
        }],
        value4: '',
        searchValue: ''
      }
    },
    methods: {
      statusFormatter(row, column) {
        if (row.status == 0) {
          return '未激活'
        }
        if (row.status == 1) {
          return '已激活'
        }
        if (row.status == 2) {
          return '未激活(被还原)'
        }
        if (row.status == 3) {
          return '已激活'
        }
      },
      handleSearchChange(value){
        debugger
        console.info(value)
      },
      handleSearch(){
        this.getListData()
      },
      selectChange(value){
        this.getListData()
      },
      handleSizeChange(val) {
        this.size = val
        this.getListData()
      },
      handleCurrentChange(val) {
        this.page = val
        this.getListData()
      },
      handleDateChange(){
        if (this.dates != null) {
          this.startDate = this.dates[0]
          this.endDate = this.dates[1]
        } else {
          this.startDate = ''
          this.endDate = ''
        }
        this.getListData()
      },
      async getListData(){
        this.loading = true
        let r = await axios.post('/code', {
          startDate: this.startDate,
          endDate: this.endDate,
          page: this.page,
          size: this.size,
          status: this.selectValue,
          search:this.searchValue
      }
  )
  this.tableData = r.data.rows.map(item => Object.assign(item, {createdAt: moment(item.createdAt).format('YYYY-MM-DD HH:mm:ss')}))
  this.total = r.data.count
  this.loading = false
  }
  },
  async
  mounted()
  {
    this.getListData()
  }
  }
</script>

<style lang="less" scope>
  @import "../assets/bobocat.less";

</style>
