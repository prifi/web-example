<template>
  <div class="task">
    <div>
      <!--搜索-->
      <el-col :span="8">
        <el-input v-model="params.search" placeholder="搜索" @keyup.enter.native="searchClick">
          <el-button slot="append" icon="el-icon-search" @click="searchClick"/>
        </el-input>
      </el-col>
    </div>

    <!--表格-->
    <task-list :value="tasks" @edit="handleEdit" @detail="handleDetail"/>

    <!--模态窗-->
    <el-dialog
      :visible.sync="dialogVisibleForTask"
      title="任务详情"
      width="70%">
      <div><pre>{{ exce_result }}</pre></div>
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
import { getTaskList, updateTask, detailTask } from '@/api/task/task'
import TaskList from './table'

export default {
  name: 'Task',
  components: {
    TaskList
  },

  data() {
    return {
      dialogVisibleForTask: false,
      tasks: [],
      exce_result: '',
      totalNum: 0,
      pagesize: 10,
      params: {
        page: 1,
        search: ''
      }
    }
  },

  created() {
    this.fetchData()
  },

  methods: {
    fetchData() {
      getTaskList(this.params).then(
        res => {
          this.tasks = res.results
          console.log(this.tasks)
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

    handleEdit(value) {
      const { id, ...params } = value
      const data = { 'status': 'Y' }
      console.log(params)
      updateTask(id, data).then(res => {
        this.$message({
          message: '执行成功',
          type: 'success'
        })
        this.fetchData()
      })
    },

    /* 详情 */
    handleDetail(id) {
      this.dialogVisibleForTask = true
      detailTask(id).then(
        res => {
          this.exce_result = res.detail_result
          console.log(this.exce_result)
        })
    }
  }

}

</script>

<style lang='scss' scoped>
.task {
  padding: 10px;
}
pre {
  font-weight: bold;
  color: white;
  font-size: 16px;
  background-color: black;
}
</style>

