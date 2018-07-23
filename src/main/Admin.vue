<template>
  <div class="window">
    <el-dialog title="收货地址" :visible.sync="dialogTableVisible">
      <el-form :model="form">
        <el-form-item label="用户名" label-width="120px">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="120px">
          <el-input v-model="form.password" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
    <template v-if="isAdmin==true">
      <el-row style="margin-top: 10px;">
        <el-button @click="handleDialogClick" type="primary" style="float: left;margin-left: 5px">新增</el-button>
      </el-row>
    </template>
    <el-row style="margin-top: 10px">
      <LoadingNoDialog :loading="loading">
        <el-table
          border
          :data="tableData"
          style="width: 100%"
          :default-sort="{prop: 'date', order: 'descending'}"
        >
          <el-table-column
            type="index"
            width="50">
          </el-table-column>
          <el-table-column
            prop="username"
            label="用户名称"
          >
          </el-table-column>
          <el-table-column
            prop="createdAt"
            label="创建时间"
          >
          </el-table-column>
          <el-table-column>
            <template slot-scope="scope">
              <template v-if="scope.row.type==0&&isAdmin==true">
                <el-button @click="handleDeleteClick(scope.row)" type="dagger">删除</el-button>
              </template>
            </template>
          </el-table-column>
        </el-table>
        <div style="margin-top: 10px;float: right">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 20, 50]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </div>
      </LoadingNoDialog>
    </el-row>
  </div>
</template>
<script>
  import LoadingNoDialog from '../components/LoadingNoDialog.vue'
  import {Notification} from 'element-ui';
  import axios from 'axios'
  import moment from 'moment'
  export default {
    components: {
      LoadingNoDialog
    },
    data() {
      return {
        currentPage: 1,
        tableData: [],
        loading: false,
        pageSize: 10,
        total: 0,
        form: {
          name: '',
          password: ''
        },
        dialogTableVisible: false,
        isAdmin: false
      }
    },
    methods: {
      async handleDeleteClick(row){
        let r = await await axios.delete('/users', {params: {id: row.id}})
        this.$message('删除成功！')
        this.getListData()
      },
      async submit(){
        if (this.form.name == '') {
          this.$message('用户名不能为空！')
          return
        }
        if (this.form.password == '') {
          this.$message('密码不能为空！')
          return
        }
        let r = await axios.post('/users', {username: this.form.name, password: this.form.password})
        this.dialogTableVisible = false
        this.page = 1
        this.getListData()
      },
      handleDialogClick(){
        this.form.name = ''
        this.form.password = ''
        this.dialogTableVisible = true
      },
      formatter(row, column) {
        return row.address;
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pageSize = val
        this.currentPage = 1
        this.getListData()
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.currentPage = val
        this.getListData()
      },
      async getListData(){
        let _this = this
        _this.loading = true
        let params = {
          page: _this.currentPage,
          size: _this.pageSize
        }
        let r = await axios.get('/users', {params})
        if (r.code == 0) {
          _this.tableData = r.data.rows.map(item => Object.assign(item, {createdAt: moment(item.moment).format('YYYY/MM/DD HH:mm:ss')}))
          _this.total = r.data.count
          _this.loading = false
          this.isAdmin = r.data.userType == 1 ? true : false
        } else {
          Notification.error({
            title: '错误',
            message: '查询失败'
          })
        }
      }
    },
    async mounted() {
      this.getListData()
    }

  }
</script>

<style lang="less" scope>
  @import "../assets/admin.less";

</style>
