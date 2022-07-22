<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      offset="50"
    >
      <van-cell
        v-for="(item, index) in resultsList"
        :key="index"
        :title="item.title"
      />
    </van-list>
  </div>
</template>

<script>
import { getSearchResults } from '@/api/search'
export default {
  data() {
    return {
      resultsList: [],
      page: 1, // 当前搜索结果的页码
      perPage: 10,
      loading: false,
      finished: false
    }
  },
  created() {
    // 调用获取搜索结果的列表
    this.getSearchResults()
  },
  props: {
    keywords: {
      type: String,
      required: true
    }
  },
  methods: {
    async getSearchResults() {
      // 获取搜索结果
      try {
        const { data } = await getSearchResults(
          this.keywords,
          this.page,
          this.perPage
        )

        // 获取到后台数据赋值给---结果数组
        this.resultsList = data.data.results
      } catch (error) {}
    },
    // 加载事件
    async onLoad() {
      // 改变加载状态
      const res = await getSearchResults(this.keywords, this.page, this.perPage)
      this.resultsList.push(...res.data.data.results)
      this.loading = false
      if (res.data.data.results.length) {
        this.page++ // 更新获取下一页数据的页码
      } else {
        this.finished = true // 没有数据了，将加载状态设置结束，不再 onLoad
      }
    }
  }
}
</script>

<style></style>
