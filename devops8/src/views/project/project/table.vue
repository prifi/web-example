<template>
  <div class="project-list">
    <el-table
      :data="value"
      border
      stripe
      style="width: 100%">

      <el-table-column
        label="项目名称"
        prop="path_with_namespace"/>

      <el-table-column
        label="项目描述"
        prop="description"/>

      <el-table-column
        label="项目地址"
        prop="web_url"/>

    </el-table>
  </div>
</template>

<script>
export default {
  name: 'ProjectList',
  props: {
    value: {
      type: Array,
      default: function() {
        return []
      }
    }
  }
}
</script>

<style lang='scss'>
.project-list {}
</style>

