<template>
  <div>
    <!-- 搜索历史头部 -->
    <van-cell title="搜索历史">
      <template #right-icon v-if="isShowTong">
        <van-icon name="delete-o" @click="isShow" />
      </template>

      <template #default v-else>
        <span class="text del" @click="delAllHistory">全部删除</span>
        <span class="text" @click="isShow">完成</span>
      </template>
    </van-cell>

    <!-- 搜索历史内容列表 -->
    <van-cell
      :title="item"
      v-for="(item, index) in historyList"
      :key="index"
      @click="getResult(item)"
    >
      <template #right-icon>
        <van-icon
          name="close"
          v-show="!isShowTong"
          @click.stop="delHistory(item)"
        />
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'History',
  data() {
    return {
      isShowTong: true,
      historyList: []
    }
  },
  created() {
    this.getHistory()
  },
  methods: {
    isShow() {
      this.isShowTong = !this.isShowTong
    },
    // 获取数据
    getHistory() {
      // 获取父组价的搜索历史数据--去重处理
      this.historyList = [...new Set(this.$parent.history)]
    },
    // 单个删除搜索列表
    delHistory(val) {
      // 改变父组件中的history数组
      this.$parent.history = this.historyList.filter((item) => item !== val)
      // 将处理完的数组赋值给当前组件中的搜索历史列表
      this.historyList = this.$parent.history
    },
    // 删除所有搜索历史列表
    delAllHistory() {
      this.historyList = []
    },
    // 点击搜索历史再次搜索
    getResult(val) {
      // 重新搜索
      this.$parent.keywords = val
      // 开启搜索结果页面
      this.$parent.isEnter = true
    }
  }
}
</script>

<style scoped lang="less">
.text {
  font-size: 28px;
}
.del {
  margin-right: 10px;
}
</style>
