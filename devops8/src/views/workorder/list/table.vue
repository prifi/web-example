<template>
  <div class="workorder-list">
    <el-table
      :data="value"
      border
      stripe
      style="width: 100%">

      <el-table-column type="expand">
        <template slot-scope="props">
          <span><pre>工单详情：{{ props.row.order_contents }}</pre></span>
        </template>
      </el-table-column>

      <el-table-column
        label="工单类型"
        prop="type.name"/>

      <el-table-column
        label="工单标题"
        prop="title"/>

      <el-table-column
        label="申请人"
        prop="applicant[0].name"/>

      <el-table-column
        label="工单状态"
        prop="status.name"/>

      <el-table-column
        label="任务进度"
        align="center">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleRate(scope.row)">
            {{ '任务进度' }}
          </el-button>
        </template>
      </el-table-column>

      <el-table-column
        :formatter="dateFormat"
        label="申请时间"
        prop="apply_time"
      />

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleEdit(scope.row)">处理</el-button>

          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row)">取消</el-button>
        </template>
      </el-table-column>

    </el-table>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'OrderList',
  props: {
    value: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  methods: {
    /* 点击编辑按钮，将子组件的事件传递给父组件 */
    handleEdit(value) {
      this.$emit('edit', value)
    },

    /* 流程进度 */
    handleRate(value) {
      this.$emit('rate', value)
    },

    /* 删除 */
    handleDelete(workorder) {
      const id = workorder.id
      const name = workorder.title
      this.$confirm(`此操作将删除: ${name}, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$emit('delete', id)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    dateFormat: function(row, column) {
      const date = row[column.property]
      if (date === undefined) {
        return ''
      }
      return moment(date).format('YYYY-MM-DD HH:mm:ss')
    }

  }
}
</script>

<style lang='scss'>
</style>

