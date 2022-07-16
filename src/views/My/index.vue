<template>
  <div class="my">
    <!-- 用户信息部分header -->
    <header >
      <!-- 登录 -->
      <div class="user-info banner" v-if="isLogin">
      <!-- 第一行 -->
      <van-row></van-row>

      <!-- 第二行 -->
      <van-row class="row-2">
        <!-- 左边 -->
        <van-col span="12">
          <van-row type="flex" align="center" justify="space-around">
            <van-image
              round
              width="1.76rem"
              height="1.76rem"
              :src="userInfo.photo"
            />
            <span class="mobile">{{ userInfo.name }}</span>
          </van-row>
        </van-col>
        <!-- 右边 -->
        <van-col span="11">
          <van-row type="flex" justify="end" align="center">
            <van-button class="send-sms-btn" round size="small" type="default">编辑资料</van-button>
          </van-row>
        </van-col>
      </van-row>

      <!-- 第三行 -->
      <van-row>
        <van-grid :border="false" class="grid">
          <van-grid-item icon="photo-o" text="头条" >
            <template #icon>
              {{userInfo.art_count}}
            </template>
          </van-grid-item>
          <van-grid-item icon="photo-o" text="粉丝" >
            <template #icon>
              {{userInfo.fans_count}}
            </template>
          </van-grid-item>
          <van-grid-item icon="photo-o" text="关注" >
            <template #icon>
              {{userInfo.follow_count}}
            </template>
          </van-grid-item>
          <van-grid-item icon="photo-o" text="获赞" >
            <template #icon>
              {{userInfo.like_count}}
            </template>
          </van-grid-item>
        </van-grid>
      </van-row>
      </div>
      <!-- 未登录 -->
      <div class="login banner" v-else >
          <div class="warp" @click="toLogin">
            <img src="../../assets/mobile.png" alt="" />
            <span>登录 / 注册</span>
        </div>
      </div>
    </header>

    <!-- 主体部分main -->
    <main>
      <!-- 收藏/历史 -->
      <van-grid :column-num="2" class="grid" :clickable="true">
          <van-grid-item  text="收藏" >
            <template #icon>
              <span class="toutiao toutiao-shoucang"></span>
            </template>
          </van-grid-item>
          <van-grid-item  text="历史" >
            <template #icon>
              <span class="toutiao toutiao-lishi"></span>
            </template>
          </van-grid-item>
    </van-grid>
    <!-- 消息通知/小智同学 -->
    <div class="link">
      <van-cell title="消息通知" is-link />
      <van-cell title="小智同学" is-link />
    </div>
<!-- 退出按钮 -->
    <van-button type="default" block v-if="isLogin" @click="logout">退出</van-button>
    </main>

  </div>
</template>

<script>
import { getUserInfo } from '@/api/user'
export default {
  data () {
    return {
      userInfo: {}
    }
  },
  computed: {
    // 判断是否登录
    isLogin () {
      return !!this.$store.state.user.token
    }
  },
  created () {
    this.getUser()
  },
  methods: {
    logout () {
      this.$dialog.confirm({
        title: '退出账号',
        message: '是否退出登录'
      })
        .then(() => {
          this.$store.commit('setUser', {})
        })
        .catch(() => {
          // on cancel
        })
    },
    toLogin () {
      this.$router.push('/login')
    },
    async getUser () {
      if (this.isLogin) {
        try {
          const res = await getUserInfo()
          this.userInfo = res.data.data
        } catch (error) {
          this.$toast.fail(error)
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.my{
  background-color: #f5f7f9;
  height: calc(100vh - 100px);
}
// 头部区域
header{
  .banner{
  width: 100%;
  height: 400px;
  background: url('../../assets/banner.png') no-repeat 0 0 / cover;
}
.login{
  display: flex;
  // flex-direction: column;
  justify-content: center;
  align-items: center;
  .warp{
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #fff;
    img{
      width: 1.76rem;
    height: 1.76rem;
    }
    span{
    font-size: .37333rem;
    color: #fff;
    margin-top: 0.13333rem;
    }
  }
}
.user-info{
  display: flex;
  flex-direction: column;
  > .van-row{
    flex: 1;
    .van-col{
      height: 100%;
      .van-row{
        height: 100%;
      }
    }
    .mobile{
      font-size: 0.4rem;
      color: #fff;
    }
  }
  .send-sms-btn {
    padding: 0; // 原有button 带有 padding 需要清除
    width: 152px;
    height: 46px;
    line-height: 46px;
    background-color: #ededed;
    font-size: 22px;
    color: #666;
  }
}
.row-2{
  height: 100%;
}
.grid {
    :deep(.van-grid-item__content) {
      background-color: unset;
    }
    :deep(.van-grid-item__icon-wrapper){
          font-size: .34667rem;
          margin-bottom: 0.10667rem;
    }
  }
  .van-grid-item {
    color: #fff;
    :deep(.van-grid-item__text) {
      color: #fff;
    }
  }
}

// 主体区域
main {
  .grid {
    color: #646566;
    // 字体图标
    .toutiao {
      font-size: 0.6rem;

      &.toutiao-lishi {
        color: #ffb31d;
      }
      &.toutiao-shoucang {
        color: #ed5253;
      }
    }
  }

  .link{
    margin: 10px 0;
  }
  :deep(.van-button--default){
    color: red;
  }
}
</style>
