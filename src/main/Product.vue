<template>
  <div class="window">
    <el-dialog title="新增奖品" :visible.sync="dialogTableVisible">
      <el-form :model="form">
        <el-form-item label="奖品名称" label-width="120px">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
      <el-row style="margin-top: 10px;">
        <el-button @click="handleDialogClick" type="primary" style="float: left;margin-left: 5px">新增</el-button>
      </el-row>
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
            prop="name"
            label="商品名称"
          >
          </el-table-column>
          <el-table-column
            prop="createdAt"
            label="创建时间"
          >
          </el-table-column>
          <el-table-column
            label="操作"
          >

            <template slot-scope="scope">
                <el-button @click="handleDeleteClick(scope.row)" type="dagger">删除</el-button>
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
          name: ''
        },
        dialogTableVisible: false,
        isAdmin: false
      }
    },
    methods: {
      async handleDeleteClick(row){
        this.$confirm('确定删除该奖品吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          let r = await await axios.delete('/product', {params: {id: row.id}})
          this.$message('删除成功！')
          this.getListData()
        }).catch(() => {

        });

      },
      async submit(){
        if (this.form.name == '') {
          this.$message('奖品名称不能为空！')
          return
        }
        let r = await axios.post('/product', {name: this.form.name})
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
        this.loading=true
        let r = await axios.get('/product', {params:{
          page:this.page,size:this.size,
          isDel:0
        }})
        this.tableData=r.data.rows
        this.loading=false
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
