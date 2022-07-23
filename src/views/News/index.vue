<template>
  <div class="body">
    <van-nav-bar
      title="黑马头条"
      left-arrow
      @click-left="$router.back()"
      class="header"
      fixed
    />
    <!-- 标题区域 -->
    <h1 class="title">{{ article.title }}</h1>

    <!-- user 区域 -->
    <div class="user">
      <!-- 左盒子 -->
      <div class="user-left">
        <van-image round width="36px" height="36px" :src="article.aut_photo" />
        <div>
          <p>{{ article.aut_name }}</p>
          <span>{{ time }}</span>
        </div>
      </div>
      <!-- 右盒子 -->
      <div class="user-right">
        <!-- 未关注按钮 -->
        <van-button
          type="info"
          round
          size="small"
          @click="addFollow"
          v-if="article.is_followed"
        >
          + 关注
        </van-button>

        <!-- 已关注的按钮 -->
        <van-button type="default" round size="small" @click="addFollow" v-else
          >已关注</van-button
        >
      </div>
    </div>

    <!-- 主体内容区域 -->
    <div class="article-content markdown-body" v-html="article.content" id="article-content"></div>

    <van-divider>正文结束</van-divider>

    <!-- 分享面板 -->
    <van-share-sheet
      v-model="showShare"
      title="立即分享给好友"
      :options="options"
    />

    <!-- 底部评论区域 -->

    <div class="comment-footer">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        loading-text="Loading..."
        offset="10"
      >
        <getCommentItem
          v-for="(item, index) in comment"
          :key="index"
          :commentList="item"
        />
      </van-list>
    </div>
    <van-tabbar>
      <van-tabbar-item class="first-nav" @click="showComment = true"
        >写评论</van-tabbar-item
      >
      <van-badge :content="article.comm_count" class="news">
        <van-tabbar-item icon="comment-o"></van-tabbar-item>
      </van-badge>
      <!-- <van-tabbar-item icon="star-o" ref="star" @click="star"></van-tabbar-item> -->
      <van-tabbar-item @click="star">
        <template #icon>
          <van-icon name="star" color="#3296fa" v-if="isCollect" />
          <van-icon name="star-o" v-else />
        </template>
      </van-tabbar-item>
      <!-- 点赞 -->
      <van-badge :content="article.like_count" class="goods">
        <van-tabbar-item icon="good-job-o" @click="addGoods"></van-tabbar-item>
      </van-badge>
      <van-tabbar-item icon="share" @click="showShare = true"></van-tabbar-item>
    </van-tabbar>
    <van-popup
      v-model="showComment"
      position="bottom"
      :style="{ height: '11%' }"
      class="comment-area"
    >
      <div class="area">
        <van-field
          v-model="commentArea"
          rows="2"
          autosize
          type="textarea"
          maxlength="50"
          placeholder="请输入留言"
          show-word-limit
        />
        <p class="post" @click="publish">发布</p>
      </div>
    </van-popup>
  </div>
</template>

<script>
// import { ImagePreview } from 'vant'
import getCommentItem from './components/commentsItem.vue'
import './news.css'
import dayjs from '@/utils/dayjs'
import {
  getArticlesInfo,
  getcomment,
  getarticlecomments,
  collect,
  delCollect,
  followings,
  delFollow,
  addGoods,
  delGoods
} from '@/api/news'
export default {
  components: {
    getCommentItem
  },
  data() {
    return {
      showShare: false,
      options: [
        [
          { name: '微信', icon: 'wechat' },
          { name: '朋友圈', icon: 'wechat-moments' },
          { name: '微博', icon: 'weibo' },
          { name: 'QQ', icon: 'qq' }
        ],
        [
          { name: '复制链接', icon: 'link' },
          { name: '分享海报', icon: 'poster' },
          { name: '二维码', icon: 'qrcode' },
          { name: '小程序码', icon: 'weapp-qrcode' }
        ]
      ],
      article: {}, // 文章详情
      comment: [],
      loading: false,
      finished: false,
      showComment: false,
      commentArea: '',
      isCollect: false,
      isAddGood: false,
      lastCommentId: '',
      imgList: [] // 图片元素数组
    }
  },
  created() {
    // 调用新闻详情信息
    this.getArticlesInfo()
    // 调用评论信息
    this.getcomment()
  },

  // 图片预览
  // mounted() {
  //   this.$nextTick(() => {
  //     // getElementById动态获取出的所有的img元素
  //     this.imgList = document
  //       .getElementById('acticle-content')
  //       .querySelectorAll('img')
  //     // 声明空数组---vant组件使用
  //     const imgSrc = []
  //     this.imgList.forEach((item, index) => {
  //       // 将每一个img的src 路径存到空数组
  //       imgSrc.push(item.src)
  //       // 给每一个img元素绑定点击事件触发预览
  //       item.addEventListener('click', () => {
  //         console.log(1111)
  //         ImagePreview({
  //           images: imgSrc,
  //           closeable: true,
  //           startPosition: index
  //         })
  //       })
  //     })
  //   })
  // },
  methods: {
    // 收藏
    async star() {
      this.isCollect = !this.isCollect
      // 收藏
      if (this.isCollect) {
        try {
          await collect(this.$store.state.ArtId)
          this.$toast.success('收藏成功')
        } catch (error) {}
        // 取消收藏
      } else {
        try {
          await delCollect(this.$store.state.ArtId)
          this.$toast.success('取消收藏')
        } catch (error) {}
      }
    },
    // 获得文章详情信息
    async getArticlesInfo() {
      try {
        const { data } = await getArticlesInfo(this.$store.state.ArtId)
        this.article = data.data
        // 获取文章最初的收藏状态
        this.isCollect = data.data.is_collected
        console.log(this.article)
      } catch (error) {}
    },
    // 评论触底事件
    async onLoad() {
      // this.finished = true
      try {
        const { data } = await getcomment(
          'a',
          this.$store.state.ArtId,
          this.lastCommentId,
          '10'
        )
        this.loading = false
        this.lastCommentId = data.data.last_id
        this.comment.push(...data.data.results)
        if (data.data.last_id === data.data.end_id) {
          this.loading = true
          this.finished = true
        }
      } catch (error) {}
    },
    // 获得评论列表数据
    async getcomment() {
      try {
        const { data } = await getcomment('a', this.$store.state.ArtId)
        this.comment = data.data.results
        this.lastCommentId = data.data.last_id
        console.log(data.data)
      } catch (error) {
        this.$toast.fail(error.message)
      }
    },
    // 发布评论
    async publish() {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true
      })
      try {
        await getarticlecomments(this.$store.state.ArtId, this.commentArea)
        // 调用评论信息---更新数据
        this.getcomment()
        // 请求成功后提示用户
        this.$toast.success('发布成功')
        // 关闭弹窗并清除内容
        this.showComment = false
        this.commentArea = ''
      } catch (error) {
        this.$toast.fail('发布失败')
      }
    },

    // 关注用户
    async addFollow() {
      // 判断是否关注了--未关注则关注请求
      if (!this.article.is_followed) {
        try {
          await followings(this.article.aut_id)
        } catch (error) {}
        // 取消关注
      } else {
        try {
          await delFollow(this.article.aut_id)
        } catch (error) {}
      }
      // 调用新闻详情信息
      this.getArticlesInfo()
    },
    // 点赞文章---删除点赞
    async addGoods() {
      this.isAddGood = !this.isAddGood
      if (this.isAddGood) {
        try {
          await addGoods(this.article.art_id)
        } catch (error) {}
      } else {
        try {
          // 删除点赞
          const res = await delGoods(this.article.art_id)
          console.log(res)
        } catch (error) {}
      }
      // 调用新闻详情信息
      this.getArticlesInfo()
    }
  },
  computed: {
    time() {
      return dayjs(this.article.pubdate).fromNow()
    }
  }
}
</script>

<style lang="less" scoped>
.body {
  .comment-area {
    :deep(.van-popup) {
      width: 100%;
    }
    padding: 34px 0 34px 34px;
    :deep(.van-cell) {
      background-color: #f5f7f9;
      width: 85%;
    }
    .area {
      .post {
        position: absolute;
        bottom: 85px;
        left: 680px;
        font-size: 28px;
        color: #b5d1ec;
      }
      // background-color: tomato;
    }
  }
  .comment-footer {
    padding: 0 25px;
    margin-top: 40px;
    :deep([class*='van-hairline']::after) {
      border-top: 0;
    }
    :deep(.van-cell) {
      padding: 0 !important;
      padding-bottom: 30px !important;
    }
    :deep(.van-cell__title) {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      margin-left: 30px;
      > span:nth-child(1) {
        color: #406599;
      }
    }
    :deep(.van-cell-group) {
      margin: 0;
      img {
        width: 70px;
        height: 70px;
        border-radius: 50%;
        border: 0;
      }
    }
    :deep(.van-cell__label) {
      margin: 0;
      .commentInfo {
        margin: 30px 0;
        color: #333;
      }
    }
  }
  :deep(.van-divider) {
    position: relative;
    bottom: 0px;
  }
  padding-top: 95px;
  padding-bottom: 70px;
  .comment {
    position: relative;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    box-sizing: border-box;
    width: 100%;
    padding: 0.26667rem 0.42667rem;
    overflow: hidden;
    color: #323233;
    font-size: 0.37333rem;
    line-height: 0.64rem;
    background-color: #fff;
  }
  .title {
    font-size: 0.53333rem;
    padding: 0.66667rem 0.42667rem;
    margin: 0;
    color: #3a3a3a;
  }
  .user {
    position: relative;
    top: -30px;
    display: flex;
    justify-content: space-between;
    // background-color: tomato;
    align-items: center;
    .user-left {
      align-items: center;
      display: flex;
      div {
        margin-left: 10px;
        p {
          position: relative;
          top: 25px;
          font-size: 0.32rem;
          color: #3a3a3a;
        }
        span {
          position: relative;
          top: -18px;
          font-size: 0.30667rem;
          color: #b7b7b7;
        }
      }
    }
    .user-right {
      .van-button--small {
        position: relative;
        top: -14px;
        right: 25px;
        padding: 0px 40px;
        height: 55px;
      }
    }
  }
}
.header {
  background-color: #3296fa;
  :deep(.van-nav-bar__title) {
    color: #fff;
  }
}
.van-nav-bar {
  :deep(.van-icon) {
    color: #fff;
  }
}
.first-nav {
  flex: 3;
  :deep(.van-tabbar-item__text) {
    display: inline-block;
    padding: 20px 100px;
    border-radius: 40px;
    border: 1px solid #b7b7b7;
    color: #b7b7b7;
  }
}
.news {
  position: relative;
  left: -15px;
  top: 30px;
}
.goods {
  position: relative;
  top: 25px;
}
</style>
