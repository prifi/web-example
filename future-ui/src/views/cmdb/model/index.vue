<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>模型管理</span>
      </div>
      <div>
        <el-row>
          <el-button type="primary" size="mini">新建模型</el-button>
          <el-button type="primary" size="mini">新建分类</el-button>
        </el-row>
        <div class="data-info">
          <!-- 分组名称 -->
          <div class="data-info-group">服务器</div>
          <div class="data-info-content">
            <el-row>
              <el-col v-for="item in 10" :key="item" :span="4">
                <el-button class="data-info-content-button">新建模型</el-button>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
  .data-info {
    margin-top: 12px;
  }

  .data-info-group {
    border-left: 3px solid #999;
    padding-left: 5px;
  }

  .data-info-content {
    margin-top: 10px;
  }

  .data-info-content-button {
    width: calc(100% - 10px);
    margin-left: 9px;
    margin-bottom: 10px;
    height: 50px
  }

  ::v-deep .el-card__body {
    padding-bottom: 10px
  }
</style>
