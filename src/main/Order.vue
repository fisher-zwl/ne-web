<template>
  <div class="window">
    <LoadingNoDialog :loading="loading">
      <el-row>
        <el-col :span="12">
          <el-row>
            <el-col :span="4">
              <div style="height: 40px;line-height: 40px;text-align: center">
                产品
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
        <el-col :span="12">
          <el-row>
            <el-col :span="4">
              <div style="height: 40px;line-height: 40px;text-align: center">
                发货状态
              </div>
            </el-col>
            <el-col :span="10">
              <el-select @change='selectStatusChange' v-model="statusValue" clearable placeholder="请选择">
                <el-option
                  v-for="item in statusOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="3" style="margin-top: 20px">
          <el-button @click="exportsExel" size="small" type="primary">导出订单</el-button>

        </el-col>
        <el-col :span="3" style="margin-top: 20px;margin-left: 5px">
          <el-button @click="handleEditAll" size="small" type="primary">批量发货</el-button>
        </el-col>
      </el-row>
      <el-table
        @selection-change="handleSelectionChange"
        border
        :data="tableData"
        style="width: 100%;margin-top: 5px"
        :default-sort="{prop: 'date', order: 'descending'}"
      >
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          type="index"
          width="50">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
        >
        </el-table-column>
        </el-table-column>
        <el-table-column
          prop="mobile"
          label="手机号"
        >
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址"
        >
        </el-table-column>
        <el-table-column
          prop="code"
          label="兑换码"
          :formatter="formatter"
        >
        </el-table-column>
        <el-table-column
          prop="production"
          label="奖品"
          :formatter="formatterProduction"
        >
        </el-table-column>
        <el-table-column
          prop="status"
          label="发货状态"
          :formatter="formaterStatus"
        >
        </el-table-column>
        <el-table-column
          prop="createdAt"
          label="创建时间"
        >
        </el-table-column>
        <el-table-column
          prop="s"
          label='操作'
        >
          <template slot-scope="scope">
            <template v-if="scope.row.status==0">
              <el-button
                type="success"
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">确认发货
              </el-button>
            </template>
           <!-- <template v-else-if="scope.row.status==1">
              <el-button
                type="primary"
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">确认收货
              </el-button>
            </template>-->
            <template v-else-if="scope.row.status==1">
              已发货
            </template>

          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top: 10px;float: right">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[20, 50, 100, 500,1000]"
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
        selectIds:[],
        currentPage4: 4,
        tableData: [],
        loading: false,
        page: 1,
        size: 20,
        total: 0,
        selectValue: null,
        statusValue: null,
        statusOptions: [
          {
            value: 0,
            label: '未发货'
          },
          {
            value: 1,
            label: '已发货'
          }
        ],
        options: []
      }
    },
    methods: {
      async exportsExel(){
        if(this.selectIds.length==0){
          this.$message('请勾选订单')
          return
        }
        window.location.href=`/admin/v1/info/export?ids=${this.selectIds.join(',')}`
      },
      handleSelectionChange(rows){
        this.selectIds=rows.map(item=>item.id)
      },
      selectChange(){
        this.getListData()
      },
      selectStatusChange(){
        this.getListData()
      },
      formatter(row, column) {
        return row.address;
      },
      handleSizeChange(val) {
        this.size = val
        this.getListData()
      },
      handleCurrentChange(val) {
        this.page = val
        this.getListData()
      },
      formaterStatus(rows, colum){
        if (rows.status == 0 || rows.status == null) {
          return '未发货'
        }
        if (rows.status == 1) {
          return '已发货'
        }
        return 'erro'
      },
      formatterProduction(rows, colum){
        return rows.products.map(item => item.name).join(',')
      },
      formatter(rows, colum){
        const codes = rows.codes
        let code = ''
        if (codes.length > 0) {
          code = codes[0].code
        }
        if (codes.length > 1) {
          code = code + ',' + codes[1].code
        }
        return code
      },
      async handleEdit(index, row){
        await axios.post('/status', {id: [row.id], status: row.status + 1})
        this.getListData()
      },
      async handleEditAll(){
        if(this.selectIds.length==0){
          this.$message('请选择订单！')
          return
        }
        this.$confirm('确定批量发货吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          await axios.post('/status', {id: this.selectIds, status: 1})
          this.getListData()
        }).catch(() => {

        });

      },

      async getProduct(){
        let r = await axios.get('/product', {params: {size: 1000}})
        let options = r.data.rows.map(item => Object.assign({value: item.id, label: item.name}))
        this.options = options

      },
      async getListData(){
        this.loading = true
        let r = await axios.get(`/list`, {
          params: {
            page: this.page,
            size: this.size,
            productionId: this.selectValue,
            status: this.statusValue
          }
        })
        this.tableData = r.data.rows.map(item => Object.assign(item, {createdAt: moment(item.moment).format('YYYY/MM/DD HH:mm:ss')})).map(item => item)
        this.total = r.data.count
        this.loading = false
      }
    },
    async mounted() {
      this.getProduct()
      this.getListData()
    }

  }
</script>

<style lang="less" scope>

</style>
