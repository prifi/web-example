<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>用户管理</span>
      </div>
      <div>
        <div class="filter-container">
          <el-button
            v-permisaction="['system:user:create']"
            type="primary"
            size="mini"
            icon="el-icon-plus"
            style=" margin-right: 8px;"
            @click="handleCreate"
          >新 建</el-button>
          <el-input v-model="listQuery.username" placeholder="请输入搜索内容" size="mini" style="width: 350px;">
            <el-button slot="append" icon="el-icon-search" @click="handleFilter" />
          </el-input>
        </div>

        <el-table
          :key="tableKey"
          v-loading="false"
          :data="list"
          border
          fit
          highlight-current-row
          size="mini"
          style="width: 100%; margin-top: 10px;"
        >
          <el-table-column label="用户名" prop="username" />
          <el-table-column label="姓名" prop="name" />
          <el-table-column label="邮箱" prop="email" />
          <el-table-column label="是否管理员" prop="is_admin">
            <template slot-scope="{row}">
              <el-tag v-if="row.is_admin" size="mini" type="success">是</el-tag>
              <el-tag v-else size="mini" type="danger">否</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="创建时间">
            <template slot-scope="{row}">
              {{ row.create_date | parseTime() }}
            </template>
          </el-table-column>
          <el-table-column label="更新时间">
            <template slot-scope="{row}">
              {{ row.update_date | parseTime() }}
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
            <template slot-scope="{row,$index}">
              <el-button v-permisaction="['system:user:edit']" type="text" size="mini" icon="el-icon-edit" @click="handleUpdate(row)">
                编辑
              </el-button>
              <el-button v-permisaction="['system:user:delete']" size="mini" type="text" icon="el-icon-delete" @click="handleDelete(row,$index)">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>

        <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
      </div>
    </el-card>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="dataForm" label-position="right" label-width="100px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="用户名" prop="username">
              <el-input v-model="dataForm.username" placeholder="请输入用户名" size="mini" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="dataForm.name" placeholder="请输入姓名" size="mini" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item v-if="dialogStatus==='create'" label="密码" prop="password">
              <el-input v-model="dataForm.password" placeholder="请输入密码" size="mini" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item v-if="dialogStatus==='create'" label="确认密码" prop="checkPassword">
              <el-input v-model="dataForm.checkPassword" placeholder="请输入确认密码" size="mini" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="dataForm.email" placeholder="请输入邮箱" size="mini" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="角色" prop="roles">
              <el-select
                v-model="dataForm.roles"
                multiple
                filterable
                size="mini"
                style="width: 100%"
                placeholder="请选择角色"
              >
                <el-option
                  v-for="role in roles"
                  :key="role.id"
                  :label="role.name"
                  :value="role.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否管理员" prop="is_admin">
              <el-radio-group v-model="dataForm.is_admin" size="mini">
                <el-radio :label="true">是</el-radio>
                <el-radio :label="false">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogFormVisible = false">
          关闭
        </el-button>
        <el-button type="primary" size="small" @click="dialogStatus==='create'?createData():updateData()">
          确认
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  createUser,
  updateUser,
  userList,
  deleteUser
} from '@/api/system/user'

import { roleList } from '@/api/system/role'

import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'Role',
  components: { Pagination },
  directives: { waves },
  data() {
    var validateCheckPass = (rule, value, callback) => {
      if (value !== this.dataForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      roles: [],
      tableKey: 0,
      list: [],
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10
      },
      dataForm: {
        id: undefined,
        username: '',
        password: '',
        name: '',
        email: '',
        is_admin: false
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '新建'
      },
      rules: {
        username: [{ required: true, message: '请输入用户', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        checkPassword: [
          { required: true, message: '请输入确认密码', trigger: 'blur' },
          { trigger: 'blur', validator: validateCheckPass }
        ],
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { type: 'email', message: '邮件地址格式不正确', trigger: 'blur' }
        ],
        is_admin: [
          { required: true, message: '请选择是否管理员', trigger: 'change' }
        ],
        roles: [
          { required: true, message: '请选择角色', trigger: 'change' }
        ]
      }
    }
  },
  created() {
    this.getList()
    this.getRoleList()
  },
  methods: {
    getList() {
      this.listLoading = true
      userList(this.listQuery).then(response => {
        this.list = response.data.list
        this.total = response.data.total
        this.listLoading = false
      })
    },
    getRoleList() {
      roleList({
        limit: 99999
      }).then(res => {
        this.roles = res.data.list
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    resetDataForm() {
      this.dataForm = {
        id: undefined,
        username: '',
        password: '',
        name: '',
        email: '',
        is_admin: false
      }
    },
    handleCreate() {
      this.resetDataForm()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          delete this.dataForm.checkPassword
          createUser(this.dataForm).then(() => {
            this.getList()
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleUpdate(row) {
      this.dataForm = Object.assign({}, row) // copy obj
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.dataForm)
          updateUser(this.dataForm.id, tempData).then(() => {
            this.getList()
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleDelete(row, index) {
      this.$confirm('删除用户?', '提示', {
        confirmButtonText: '是',
        cancelButtonText: '否',
        type: 'warning'
      }).then(() => {
        deleteUser(row.id).then(() => {
          this.getList()
          this.$notify({
            title: '成功',
            message: '删除成功',
            type: 'success',
            duration: 2000
          })
        })
      }).catch(() => {
        this.$notify({
          title: '失败',
          message: '删除失败',
          type: 'success',
          duration: 2000
        })
      })
    }
  }
}
</script>
