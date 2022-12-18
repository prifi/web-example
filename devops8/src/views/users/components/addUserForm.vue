<template>
  <div class="add-user-form">
    <el-dialog :visible.sync="visible" title="收货地址" @close="handleClose">
      <el-form ref="addUserForm" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="登陆名：" prop="username">
          <el-input v-model="form.username" placeholder="请输入登陆名"/>
        </el-form-item>
        <el-form-item label="姓名：" prop="name">
          <el-input v-model="form.name" placeholder="请输入姓名"/>
        </el-form-item>
        <el-form-item label="密码：" prop="password">
          <el-input v-model="form.password" type="password" placeholder="请输入密码"/>
        </el-form-item>
        <el-form-item label="手机号：" prop="phone">
          <el-input v-model="form.phone" placeholder="请输入手机号"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">立即创建</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="handleClose">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { addUser } from '@/api/user'
export default {
  name: 'AddUserForm',
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      visible: false,
      form: {
        username: '',
        name: '',
        password: '',
        phone: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入用户姓名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入联系电话', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    value(val) {
      this.visible = val
    }
  },
  methods: {
    handleClose() {
      this.visible = false
      this.$emit('input', false)
      this.resetForm()
    },
    resetForm() {
      this.$refs.addUserForm.resetFields()
    },
    submitForm() {
      this.$refs.addUserForm.validate((valid) => {
        if (valid) {
          addUser(this.form).then(() => {
            this.$message({
              message: `创建用户 ${this.form.name} 成功`,
              type: 'success'
            })
            this.handleClose()
            this.$emit('fetch')
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
