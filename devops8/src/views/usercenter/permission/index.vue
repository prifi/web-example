<template>
  <div class="publish">
    {{ message }}
    {{ publishs }}
    <publish-list :value="publishs"/>
  </div>
</template>

<script>
import { getPublishList } from '@/api/books/publish'
import PublishList from './list'

export default {
  name: 'Publish',
  components: {
    PublishList
  },
  data() {
    return {
      message: 'hello world',
      publishs: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      getPublishList().then(
        res => {
          this.publishs = res.data.results
        }
      )
      console.log('welcome')
    }
  }
}
</script>

<style lang='scss' scoped>
.publish {
  padding: 10px;
}
</style>

