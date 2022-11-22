<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>角色管理</span>
      </div>
      <div>
        <div class="filter-container">
          <el-button v-permisaction="['system:role:create']" type="primary" size="mini" icon="el-icon-plus" style=" margin-right: 8px;" @click="handleCreate">新 建</el-button>
          <el-input v-model="listQuery.name" placeholder="请输入搜索内容" size="mini" style="width: 350px;">
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
          <el-table-column label="名称" prop="name" />
          <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
            <template slot-scope="{row,$index}">
              <el-button v-permisaction="['system:role:permission:edit']" type="text" size="mini" icon="el-icon-collection" @click="handlePermission(row)">
                权限
              </el-button>
              <el-button v-permisaction="['system:role:edit']" type="text" size="mini" icon="el-icon-edit" @click="handleUpdate(row)">
                编辑
              </el-button>
              <el-button v-permisaction="['system:role:delete']" size="mini" type="text" icon="el-icon-delete" @click="handleDelete(row,$index)">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>

        <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
      </div>
    </el-card>

    <!-- 编辑角色 -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="dataForm" label-position="right" label-width="65px">
        <el-form-item label="名称" prop="name">
          <el-input v-model="dataForm.name" size="mini" />
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="dataForm.remarks" size="mini" type="textarea" />
        </el-form-item>
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

    <el-dialog
      title="权限管理"
      :visible.sync="dialogPermVisible"
      width="30%"
    >
      <el-tree
        ref="tree"
        :data="treeData"
        show-checkbox
        node-key="id"
        highlight-current
        default-expand-all
        :props="defaultProps"
      />
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogPermVisible = false">取 消</el-button>
        <el-button type="primary" size="small" @click="updatePermission">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  createRole,
  updateRole,
  roleList,
  deleteRole
} from '@/api/system/role'

import {
  getALLPermissions,
  updateRolePermissions
} from '@/api/system/permission'

import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'Role',
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      dialogPermVisible: false,
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
        name: '',
        remarks: ''
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '新建'
      },
      rules: {
        name: [{ required: true, message: '请输入角色名称', trigger: 'blur' }]
      },
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'title'
      },
      currentRole: {}
    }
  },
  created() {
    this.getList()
    this.getPermissionData()
  },
  methods: {
    getList() {
      this.listLoading = true
      roleList(this.listQuery).then(response => {
        this.list = response.data.list
        this.total = response.data.total
        this.listLoading = false
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    getPermissionData() {
      getALLPermissions().then(res => {
        this.treeData = res.data
      })
    },
    resetDataForm() {
      this.dataForm = {
        id: undefined,
        name: '',
        remarks: ''
      }
    },
    handlePermission(row) {
      this.dialogPermVisible = true
      this.currentRole = row
      this.$nextTick(() => {
        this.$refs.tree.setCheckedKeys([])
        row.permissions.map((i, n) => {
          // 根据i获取tree中的节点
          const node = this.$refs.tree.getNode(i)
          if (node && node.isLeaf) {
          // 设置某个节点的勾选状态
            this.$refs.tree.setChecked(node, true)
          }
        })
      })
    },
    updatePermission() {
      var checkedKeys = this.$refs.tree.getHalfCheckedKeys().concat(this.$refs.tree.getCheckedKeys())
      updateRolePermissions(this.currentRole.id, {
        permissions: checkedKeys
      }).then(() => {
        this.getList()
        this.dialogPermVisible = false
        this.$notify({
          title: '成功',
          message: '更新成功',
          type: 'success',
          duration: 2000
        })
      })
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
          createRole(this.dataForm).then(() => {
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
          updateRole(this.dataForm.id, tempData).then(() => {
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
      this.$confirm('删除角色?', '提示', {
        confirmButtonText: '是',
        cancelButtonText: '否',
        type: 'warning'
      }).then(() => {
        deleteRole(row.id).then(() => {
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
