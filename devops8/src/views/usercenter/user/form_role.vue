<template>
  <div class="user-role">
    <el-form ref="form" :model="form" :rules="rules" label-width="100px" class="demo-form">

      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username" readonly/>
      </el-form-item>

      <el-form-item label="角色" prop="role">
        <el-select v-model="form.role" multiple filterable style="width:100%" placeholder="请选择">
          <el-option
            v-for="item in role_list"
            :key="item.index"
            :label="item.name"
            :value="item.id"/>
        </el-select>
      </el-form-item>

      <el-form-item>
        <div class="btn-wrapper">
          <el-button size="small" @click="cancel">取消</el-button>
          <el-button size="small" type="primary" @click="submitForm">保存</el-button>
        </div>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>

import { getGroupList } from '@/api/users/group'

export default {
  name: 'UserRole',
  props: {
    form: { // 接受父组件传递过来的值渲染表单
      type: Object,
      default() {
        return {
          username: '',
          role: []
        }
      }
    }
  },

  data() {
    return {
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ]
      },
      role_list: [],
      state: 0
    }
  },

  /* 一旦vue组件加载就请求接口渲染数据 */
  watch: {
    state() {
      getGroupList({ page_size: -1 }).then(res => {
        this.role_list = res
        console.log(this.role_list)
      })
    }
  },

  created() {
    this.state = 1
  },

  methods: {
    submitForm() {
      this.$refs.form.validate(valid => {
        if (!valid) {
          return
        }
        this.$emit('submit', this.form)
      })
    },
    cancel() {
      this.$emit('cancel')
    }
  }

}
</script>

<style lang='scss' scoped>
.user-role {
  position: relative;
  display: block;
  .btn-wrapper{
    text-align: right;
  }
}
</style>

