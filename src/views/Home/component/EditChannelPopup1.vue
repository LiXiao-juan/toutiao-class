<template>
  <van-popup
    v-model="isShow"
    position="bottom"
    :style="{ height: '97%' }"
    closeable
    close-icon-position="top-left"
  >
  <!-- 内容 -->
  <div class="popupMain">
    <!-- 我的 -->
    <div class="my-channel">
        <van-cell title="我的频道">
            <van-button size="small" round class="edit-btn" @click="isEdit = !isEdit">{{ isEdit ? '完成' : '编辑'}}</van-button>
        </van-cell>

        <!-- 宫格 -->
        <van-grid gutter="10px" :border="false">
            <van-grid-item
            v-for="item,index in myChannels"
            :key="item.id" :text="item.name"
            :class="{ 'active-channel': item.name === '推荐' }"
            @click="delMyChanner(item,index)">
                <template #icon>
                    <van-icon name="cross" v-show="isEdit && item.name !== '推荐'"/>
                </template>
            </van-grid-item>
        </van-grid>
    </div>

    <!-- 推荐 -->
    <div class="recommend-channel">
        <van-cell title="推荐频道"></van-cell>
        <van-grid gutter="10px" :border="false">
            <van-grid-item :text="item.name" icon="plus" v-for="item in recommendChannel" :key="item.id"
            @click="addMyChannel(item)"></van-grid-item>
        </van-grid>

    </div>
  </div>
  </van-popup>
</template>

<script>
import { getAllchannels, setChannelsToLocal } from '@/api/channel'
export default {
  name: 'Edit',
  data () {
    return {
      isShow: false,
      allChannel: [],
      isEdit: false
    }
  },
  props: {
    myChannels: {
      type: Array,
      required: true
    }
  },
  created () {
    // 调用获取所有频道
    this.getAllchannels()
  },
  methods: {
    // 获取所有频道
    async getAllchannels () {
      const { data } = await getAllchannels()
      this.allChannel = data.data.channels
    },
    // 删除我的频道
    delMyChanner (obj, index) {
      if (this.isEdit && obj.name !== '推荐') {
        // 更新父组件的数据
        this.$parent.channelList = this.$parent.channelList.filter(item => item.id !== obj.id)
        // 判断是否登录
        if (!this.Login) {
          setChannelsToLocal(this.$parent.channelList)
        }
      }
      if (!this.isEdit) {
        this.isShow = false
        this.$parent.active = index
      }
    },
    addMyChannel (ele) {
      // 往父组件中的数组中添加数据  -----$parent传值
      this.$parent.channelList.push({ ...ele })
      if (!this.Login) {
        setChannelsToLocal(this.$parent.channelList)
      }
    }
  },
  computed: {
    Login () {
      return !!this.$store.state.user.token
    },
    recommendChannel () {
      return this.allChannel.filter(item =>
        // 获取myChannels里有没有所有频道中的那一项
        !this.myChannels.find(ele => ele.id === item.id)
      )
    }
  }
}
</script>

<style scoped lang="less">
.active-channel{
  :deep(.van-grid-item__text){
    color: #fd69b4;

  }
}
.popupMain{
    padding-top: 100px;
    .edit-btn{
        color: red;
        padding: 0 30px;
        height: 48px;
        border: 1px solid red;
    }
    .my-channel {
    :deep(.van-grid-item__content) {
      position: relative;
      background-color: #eee;

      .van-grid-item__icon-wrapper {
        position: absolute;
        top: 0;
        right: 0;

        .van-icon-cross {
          position: absolute;
          top: 0;
          right: 0;
          transform: translate(20%, -35%);
          border: 0.02667rem solid #000;
          font-size: 16px;
          border-radius: 50%;
          text-align: center;
          line-height: 0.32rem;
        }
      }
    }
  }
    // 推荐频道的样式
  .recommend-channel {
    // 推荐频道加号样式
    :deep(.van-grid-item__content) {
      flex-direction: row;
      background-color: #eee;
      padding: 30px 6px;
    //   text-align: left;

      .van-grid-item__icon {
        font-size: 0.5rem;
      }

      .van-grid-item__text {
        margin-top: 0;
      }
    }
  }
}

</style>
