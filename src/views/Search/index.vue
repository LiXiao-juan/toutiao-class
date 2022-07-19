<template>
  <div>
    <form action="/">
      <van-search
        v-model="keywords"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        @focus="visibleSearchSuggestion"
        background="#3296fa"
      />
    </form>
    <component :is="comName" :keywords="keywords"></component>
  </div>
</template>

<script>
import History from '@/views/Search/components/SearchHistory.vue'
import Result from '@/views/Search/components/SearchResult.vue'
import Suggestion from '@/views/Search/components/SearchSuggestion.vue'
export default {
  data () {
    return {
      keywords: '',
      isEnter: false
    }
  },
  components: {
    History,
    Result,
    Suggestion
  },
  methods: {
    onSearch (val) {
      //   this.$toast(val)
      this.isEnter = true
    },
    onCancel () {
      this.$router.back()
    },
    visibleSearchSuggestion () {
      this.isEnter = false
    }
  },
  computed: {
    comName () {
      // 判断输入框是否为空
      if (this.keywords.trim() === '') {
        return 'History'
      }
      //   若搜索了则显示结果
      if (this.isEnter) {
        return 'Result'
      }

      return 'Suggestion'
    }
  }
}
</script>

<style lang="less" scoped>
.van-search--show-action {
  .van-search__action {
    color: #fff;
  }
}
</style>
