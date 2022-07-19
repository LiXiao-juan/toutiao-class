<template>
  <div>
    <van-pull-refresh v-model="isRefreshing" :head-height="80" @refresh="LoadNext"
    success-text="刷新成功">
    <van-list
      v-model="loading"
      @load="LoadNext"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
    >
    <ArticleInfo v-for="item,index in articles"
    :key="index"
    :ArticleInfo="item"
    ></ArticleInfo>
    </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import ArticleInfo from '@/views/Home/component/ArticleItem.vue'
import { getArticlesList } from '@/api/news'
export default {
  name: 'Article',
  data () {
    return {
      articles: [],
      timestamp: '',
      finished: false,
      loading: false,
      error: false,
      isRefreshing: false
    }
  },
  components: {
    ArticleInfo
  },
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },
  created () {
    this.getArticlesList()
  },
  methods: {
    async getArticlesList () {
      try {
        const { data } = await getArticlesList(this.id, +new Date())
        this.articles = data.data.results
        this.timestamp = data.data.pre_timestamp
      } catch (error) {
        const status = error.response.status
        if (status) {
          throw new Error(error.response.data.message)
        } else {
          this.$toast.fail('获取新闻列表失败，请刷新重试')
        }
      }
    },
    async LoadNext () {
      try {
        if (!this.timestamp) {
          this.finished = true
          return
        }
        const { data } = await getArticlesList(this.id, this.timestamp)
        if (this.isRefreshing) {
          this.articles.unshift(...data.data.results)
        } else {
          // 添加新数据
          this.articles.push(...data.data.results)
        }

        // 更新时间
        this.timestamp = data.data.pre_timestamp
      } catch (error) {
        this.error = true
      } finally {
        this.loading = false
        this.isRefreshing = false
      }
    }
  }
}
</script>

<style></style>
