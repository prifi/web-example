<template>
  <div class="book">
    <div>
      <!--搜索-->
      <el-col :span="8">
        <el-input v-model="params.search" placeholder="搜索" @keyup.enter.native="searchClick">
          <el-button slot="append" icon="el-icon-search" @click="searchClick"/>
        </el-input>
      </el-col>

      <!--添加按钮-->
      <el-col :span="16" style="text-align: right">
        <el-button v-if="addPerm" type="primary" @click="handleAddBtn">添加图书</el-button>
      </el-col>
    </div>

    <!--表格-->
    <book-list :value="books" @edit="handleEdit" @delete="handleDelete"/>

    <!--模态窗增加表单-->
    <el-dialog
      :visible.sync="dialogVisibleForAdd"
      title="添加"
      width="50%"
      @close="handleCancelAdd">
      <book-form
        ref="bookForm"
        @submit="handleSubmitAdd"
        @cancel="handleCancelAdd"/>
    </el-dialog>

    <!--模态窗更新表单-->
    <el-dialog
      :visible.sync="dialogVisibleForEdit"
      title="更新"
      width="50%">
      <book-form
        ref="bookForm"
        :form="currentValue"
        @submit="handleSubmitEdit"
        @cancel="handleCancelEdit"/>
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
import { getBookList, createBook, updateBook, deleteBook } from '@/api/books/book'
import { checkPerms } from '@/utils/auth'
import BookList from './table'
import BookForm from './form'

export default {
  name: 'Book',
  components: {
    BookList,
    BookForm
  },

  data() {
    return {
      dialogVisibleForAdd: false,
      dialogVisibleForEdit: false,
      currentValue: {},
      books: [],
      totalNum: 0,
      pagesize: 10,
      params: {
        page: 1,
        search: ''
      }
    }
  },

  computed: {
    addPerm: function() {
      return checkPerms('books.add_book')
    }
  },

  created() {
    this.fetchData()
  },

  methods: {
    fetchData() {
      getBookList(this.params).then(
        res => {
          this.books = res.results
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
      createBook(value).then(res => {
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
      this.$refs.bookForm.$refs.form.resetFields() // 清除掉子组件表单的数据
    },

    /* 更新，弹出模态窗、提交数据、取消 */
    handleEdit(value) {
      this.currentValue = { ...value } // 将table子组件传来的值给父组件的变量，然后渲染更新表单
      console.log(this.currentValue['authors'])
      this.currentValue['authors'] = this.currentValue['authors'].map(it => it.id)
      this.currentValue['publisher'] = this.currentValue['publisher'][0].id
      console.log(this.currentValue)
      this.dialogVisibleForEdit = true
    },

    handleSubmitEdit(value) {
      console.log(value)
      const { id, ...params } = value // 很神奇，能把表单的值拆解成自己想要的样子
      console.log(id)
      console.log(params)
      updateBook(id, params).then(res => {
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
      this.$refs.bookForm.$refs.form.resetFields()
    },

    /* 删除 */
    handleDelete(id) {
      deleteBook(id).then(res => {
        this.$message({
          message: '删除组成功',
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
.book {
  padding: 10px;
}
</style>

