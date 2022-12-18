<template>
  <div class="workorder">
    <div>
      <!--搜索-->
      <el-col :span="8">
        <el-input v-model="params.search" placeholder="搜索" @keyup.enter.native="searchClick">
          <el-button slot="append" icon="el-icon-search" @click="searchClick"/>
        </el-input>
      </el-col>
    </div>

    <!--表格-->
    <order-list :value="workorders"/>

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
import { getWorkOrderList } from '@/api/workorder/workorder'
import OrderList from './table'

export default {
  name: 'Workorder',
  components: {
    OrderList
  },

  data() {
    return {
      workorders: [],
      totalNum: 0,
      pagesize: 10,
      params: {
        page: 1,
        status: 2
      }
    }
  },

  created() {
    this.fetchData()
  },

  methods: {
    fetchData() {
      getWorkOrderList(this.params).then(
        res => {
          this.workorders = res.results
          console.log(this.workorders)
          this.totalNum = res.count
        })
    },
    handleCurrentChange(val) {
      this.params.page = val
      this.fetchData()
    },
    searchClick() {
      this.fetchData()
    }

  }

}
</script>

<style lang='scss' scoped>
.workorder {
  padding: 10px;
}
</style>

