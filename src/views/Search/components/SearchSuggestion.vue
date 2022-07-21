<template>
  <div>
    <van-cell
      v-for="(item, index) in highlight"
      :key="index"
      @click="getSearchResult(index)"
    >
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
    },
    // 点击后获取搜索结果
    getSearchResult(ind) {
      // 改变父元素的keywords的值
      this.$parent.keywords = this.suggestion[ind]

      this.$parent.history.unshift(this.suggestion[ind])

      // 改变父元素里isEnter的值显示搜索结果
      this.$parent.isEnter = true
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
