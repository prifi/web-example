<template>
  <div class="user">
    <div>
      <!--搜索-->
      <el-col :span="8">
        <el-input v-model="params.search" placeholder="搜索" @keyup.enter.native="searchClick">
          <el-button slot="append" icon="el-icon-search" @click="searchClick"/>
        </el-input>
      </el-col>

      <!--添加按钮-->
      <el-col :span="16" style="text-align: right">
        <el-button type="primary" @click="handleAddBtn">创建用户</el-button>
      </el-col>
    </div>

    <!--表格-->
    <user-list
      :value="users"
      @edit="handleEdit"
      @role="handleRole"
      @delete="handleDelete"
      @status="handlerStatus"/>

    <!--模态窗增加表单-->
    <el-dialog
      :visible.sync="dialogVisibleForAdd"
      title="添加"
      width="50%">
      <user-form
        ref="userForm"
        @submit="handleSubmitAdd"
        @cancel="handleCancelAdd"/>
    </el-dialog>

    <!--模态窗更新表单-->
    <el-dialog
      :visible.sync="dialogVisibleForEdit"
      title="更新"
      width="50%">
      <user-form
        ref="userForm"
        :form="currentValue"
        @submit="handleSubmitEdit"
        @cancel="handleCancelEdit"/>
    </el-dialog>

    <!--模态窗角色表单-->
    <el-dialog
      :visible.sync="dialogVisibleForRole"
      title="分配角色"
      width="50%">
      <user-role
        ref="userRole"
        :form="currentValue"
        @submit="handleSubmitRole"
        @cancel="handleCancelRole"/>
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
import { getUserList, createUser, updateUser, updateUserStatus, deleteUser, updateUserGroup } from '@/api/users/user'
import UserList from './table'
import UserForm from './form'
import UserRole from './form_role'

export default {
  name: 'User',
  components: {
    UserList,
    UserForm,
    UserRole
  },

  data() {
    return {
      dialogVisibleForAdd: false,
      dialogVisibleForEdit: false,
      dialogVisibleForRole: false,
      currentValue: {},
      users: [],
      totalNum: 0,
      pagesize: 5,
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
      getUserList(this.params).then(
        res => {
          this.users = res.results
          this.totalNum = res.count
        })
    },
    handleCurrentChange(val) {
      this.params.page = val
      this.fetchData()
      // console.log(this.params.page)
    },
    searchClick() {
      this.fetchData()
    },
    /* 添加,弹出模态窗、提交数据、取消 */
    handleAddBtn() {
      this.dialogVisibleForAdd = true
    },
    handleSubmitAdd(value) {
      console.log(value)
      createUser(value).then(res => {
        this.$message({
          message: '创建成功',
          type: 'success'
        })
        this.handleCancelAdd()
        this.fetchData()
      })
    },
    handleCancelAdd() {
      this.dialogVisibleForAdd = false
      this.$refs.userForm.$refs.form.resetFields() // 清除掉子组件表单的数据
    },
    /* 更新用户状态 */
    handlerStatus(value) {
      const { id, ...params } = value
      updateUserStatus(id, params).then(res => {
        this.$message({
          message: '更新成功',
          type: 'success'
        })
        this.fetchData()
      })
    },

    /* 更新，弹出模态窗、提交数据、取消 */
    handleEdit(value) {
      this.currentValue = { ...value } // 将table子组件传来的值给父组件的变量，然后渲染更新表单
      console.log(this.currentValue)
      this.dialogVisibleForEdit = true
    },

    handleSubmitEdit(value) {
      console.log(value)
      const { id, ...params } = value // 很神奇，能把表单的值拆解成自己想要的样子
      // console.log(id)
      // console.log(params)
      updateUser(id, params).then(res => {
        this.$message({
          message: '更新成功',
          type: 'success'
        })
        this.handleCancelEdit()
        this.fetchData()
      })
    },
    handleCancelEdit() {
      this.dialogVisibleForEdit = false
      this.$refs.userForm.$refs.form.resetFields()
    },

    /* 分配角色，弹出模态窗、提交数据、取消 */
    handleRole(value) {
      this.currentValue = { ...value } // 将table子组件传来的值给父组件的变量，然后渲染更新表单
      this.currentValue['role'] = this.currentValue['role'].map(it => it.id)
      console.log(this.currentValue)
      this.dialogVisibleForRole = true
    },

    handleSubmitRole(value) {
      console.log(value)
      const { id, ...params } = value // 很神奇，能把表单的值拆解成自己想要的样子
      updateUserGroup(id, params).then(res => {
        this.$message({
          message: '更新成功',
          type: 'success'
        })
        this.handleCancelRole()
        this.fetchData()
      })
    },
    handleCancelRole() {
      this.dialogVisibleForRole = false
      this.$refs.userRole.$refs.form.resetFields()
    },

    /* 删除 */
    handleDelete(id) {
      deleteUser(id).then(res => {
        this.$message({
          message: '删除成功',
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
.user {
  padding: 10px;
}
</style>

