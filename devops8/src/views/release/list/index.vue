<template>
  <div class="release">
    <div>
      <!--搜索-->
      <el-col :span="8">
        <el-input v-model="params.search" placeholder="搜索" @keyup.enter.native="searchClick">
          <el-button slot="append" icon="el-icon-search" @click="searchClick"/>
        </el-input>
      </el-col>
    </div>

    <!--表格-->
    <deploy-list :value="release" @edit="handleEdit" @delete="handleDelete"/>

    <!--模态窗-->
    <el-dialog
      :visible.sync="dialogVisibleForEdit"
      title="上线进度"
      width="50%">
      <el-steps :active="active" finish-status="success" simple style="margin-top: 20px">
        <el-step title="申请" />
        <el-step title="审核" />
        <el-step title="灰度" />
        <el-step title="上线" />
      </el-steps>
      <br>
      <deploy-form
        ref="releaseForm"
        :form="currentValue"
        @submit="handleSubmitEdit"/>
    </el-dialog>

    <!--分页-->
    <center>
      <el-pagination
        :page-size="pagesize"
        :total="totalNum"
        background
        layout="total, prev, pager, next, jumper"
        @current-change="handleCurrentChange"/>
    </center>
  </div>
</template>

<script>
import { getDeployList, updateDeploy } from '@/api/release/release'
import DeployList from './table'
import DeployForm from './form'

export default {
  name: 'Release',
  components: {
    DeployList,
    DeployForm
  },

  data() {
    return {
      dialogVisibleForEdit: false,
      currentValue: {},
      release: [],
      totalNum: 0,
      pagesize: 10,
      active: 1,
      params: {
        page: 1,
        search: '',
        ordering: '-deploy_time',
        status: 0
      }
    }
  },

  created() {
    this.fetchData()
  },

  methods: {
    fetchData() {
      getDeployList(this.params).then(
        res => {
          this.release = res.results
          console.log(this.release)
          this.totalNum = res.count
        })
    },
    handleCurrentChange(val) {
      this.params.page = val
      this.fetchData()
    },
    searchClick() {
      this.fetchData()
    },

    /* 处理上线申请，弹出模态窗、提交数据、取消 */
    handleEdit(value) {
      this.currentValue = { ...value }
      this.dialogVisibleForEdit = true
      this.params.status = this.currentValue.status.id
      this.active = this.params.status + 1
    },

    handleSubmitEdit(value) {
      const { id, ...params } = value
      console.log(params)
      const formdata = { 'status': this.params.status + 1, 'name': params.name, 'version': params.version }
      updateDeploy(id, formdata).then(res => {
        this.$message({
          message: '更新成功',
          type: 'success'
        })
      })
      this.fetchData()
      this.dialogVisibleForEdit = false
    },

    /* 取消 */
    handleDelete(id) {
      console.log(id)
      const data = { 'status': 4 }
      updateDeploy(id, data).then(res => {
        this.$message({
          message: '取消成功',
          type: 'success'
        })
        this.fetchData()
      },
      err => {
        console.log(err.message)
      })
    }

  }

}
</script>

<style lang='scss' scoped>
.release {
  padding: 10px;
}
</style>

