<template>
  <div class="bgc">
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
import storage from '@/utils/storage'
export default {
  name: 'Search',
  data() {
    return {
      keywords: '',
      isEnter: false,
      history: storage.get('HISTORY') || []
    }
  },
  components: {
    History,
    Result,
    Suggestion
  },
  methods: {
    onSearch(val) {
      //   this.$toast(val)
      this.history.unshift(this.keywords)
      this.isEnter = true
    },
    onCancel() {
      this.$router.back()
    },
    visibleSearchSuggestion() {
      this.isEnter = false
    }
  },
  computed: {
    comName() {
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
  },
  watch: {
    history: {
      deep: true,
      handler(val) {
        storage.set('HISTORY', val)
      }
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
.bgc {
  background-color: #f5f7f9;
}
</style>
