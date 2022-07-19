<template>
  <div>
    <van-cell v-for="(item, index) in highlight" :key="index">
      <template #icon>
        <van-icon name="search" class="search-icon" />
      </template>

      <template #title>
        <span v-html="item"></span>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestion } from '@/api/search'
export default {
  data() {
    return {
      suggestion: []
    }
  },
  props: {
    keywords: {
      type: String,
      required: true
    }
  },
  methods: {
    async getSearchSuggestion() {
      try {
        const res = await getSearchSuggestion(this.keywords)
        if (res.data.data.options.length === 0) {
          this.$toast.fail('暂无此搜索')
        }
        this.suggestion = res.data.data.options.filter(Boolean)
      } catch (error) {
        console.log(error)
      }
    }
  },
  watch: {
    keywords: {
      immediate: true,
      handler() {
        this.getSearchSuggestion()
      }
    }
  },
  computed: {
    highlight() {
      // 动态正则
      const reg = new RegExp(this.keywords, 'ig')
      return this.suggestion.map((str) =>
        str.replace(reg, (match) => `<span style="color: red">${match}</span>`)
      )
    }
  }
}
</script>

<style scoped lang="less">
.search-icon {
  padding-top: 10px;
}
</style>
