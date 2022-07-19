<template>
  <div>
    <van-nav-bar class="navbar">
      <template #title>
        <van-button round @click="searchBtn">
          <van-icon name="search" />
          搜索
        </van-button>
      </template>
    </van-nav-bar>

    <!-- tabs选项卡 -->
    <van-tabs v-model="active" swipeable>
      <van-tab v-for="item in MyChannel" :key="item.id" :title="item.name">
        <ArticleList :id="item.id"></ArticleList>
      </van-tab>
      <!-- 更多的按钮 -->
      <span class="toutiao toutiao-gengduo" @click="showPopup"></span>
    </van-tabs>
    <!-- 弹窗 -->
    <EditChannelPopup
      ref="popup"
      :myChannels="MyChannel"
      @del-mychannel="delFn"
      @changeMychannel="changeFn"
      @add-Mychannel="addFn"
    ></EditChannelPopup>
  </div>
</template>

<script>
import EditChannelPopup from './component/EditChannelPopup.vue'
import {
  getMychannels,
  getMyChannelsByLocal,
  setMyChannelToLocal,
  removeMychannels,
  addMychannels
} from '@/api/channel'
import ArticleList from './component/ArticleList.vue'
export default {
  data () {
    return {
      active: 0,
      MyChannel: []
    }
  },
  components: {
    ArticleList,
    EditChannelPopup
  },
  created () {
    this.getMyChannel()
  },
  computed: {
    isLogin () {
      return !!this.$store.state.user.token
    }
  },
  methods: {
    async getMyChannel () {
      try {
        if (!this.isLogin) {
          // 离线状态
          // 1.本地存储有数据，直接用本地存储的数据
          // 2.本地存储没数据，发送请求获取默认频道数据
          const myChannels = getMyChannelsByLocal()
          console.log(myChannels)
          if (myChannels) {
            this.MyChannel = myChannels
          } else {
            console.log(11)
            const { data } = await getMychannels()
            this.MyChannel = data.data.channels
            console.log(this.MyChannel)
          }
        } else {
          const { data } = await getMychannels()
          this.MyChannel = data.data.channels
        }
      } catch (error) {
        this.$toast.fail('请重新获取频道')
      }
    },
    searchBtn () {
      this.$router.push('/search')
    },
    showPopup () {
      this.$refs.popup.isShow = true
    },
    async delFn (id) {
      // 删除我的频道
      this.MyChannel = this.MyChannel.filter((ele) => ele.id !== id)
      if (!this.isLogin) {
        setMyChannelToLocal(this.MyChannel)
      } else {
        try {
          await removeMychannels(id)
        } catch (error) {
          this.$toast.fail('删除频道失败')
        }
        this.$toast.success('删除频道成功')
      }
    },
    changeFn (active) {
      // 更改频道的active
      this.active = active
    },
    async addFn (item) {
      this.MyChannel.push(item)
      // 如果是离线状态，数据存储在本地存储中
      if (!this.isLogin) {
        setMyChannelToLocal(this.MyChannel)
      } else {
        try {
          await addMychannels(item.id, this.MyChannel.length)
        } catch (error) {
          return this.$toast.fail('添加失败')
        }
        this.$toast.success('添加成功')
      }
    }
  }
}
</script>

<style scoped lang="less">
// 头部固定的样式
.navbar {
  position: sticky;
  top: 0;
  left: 0;
}
:deep(.van-tabs__wrap) {
  position: sticky;
  top: 92px;
  left: 0;
  z-index: 99;
}
.toutiao-gengduo {
  position: fixed;
  top: 92px;
}

:deep(.van-tabs__content) {
  max-height: calc(100vh - 92px - 82px - 100px);
  overflow: auto;
}
.navbar {
  background-color: #3296fa;
  color: #fff;
  .van-button {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
  }
  :deep(.van-nav-bar__title) {
    max-width: unset;
  }
  .van-button__text {
    color: #fff;
  }
  .van-icon-search {
    color: #fff;
  }
  .van-button--default {
    border: 0.02667rem solid #5babfb;
  }
}
//tabs选项卡
:deep(.van-tabs__wrap) {
  padding-right: 66px;

  .van-tabs__nav {
    padding-left: 0;
    padding-right: 0;

    /* tab标签 */
    .van-tab {
      border: 1px solid #eee;
      width: 200px;
      height: 82px;
    }

    /* tab标签下划线 */
    .van-tabs__line {
      width: 31px;
      height: 6px;
      background-color: #3296fa;
      bottom: 40px;
    }
  }
}

/* 字体图标 */
.toutiao-gengduo {
  position: absolute;
  top: 0;
  right: 0;
  width: 66px;
  height: 82px;
  z-index: 99;
  font-size: 40px;
  line-height: 82px;
  text-align: center;
  opacity: 0.6;
  border-bottom: 1px solid #eee;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 70%;
    width: 1px;
    background-image: url('~@/assets/images/gradient-gray-line.png');
  }
}
</style>
