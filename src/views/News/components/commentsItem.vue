<template>
  <div>
    <!-- 评论列表区域 -->
    <van-cell-group inset>
      <van-cell :title="(commentList && commentList.aut_name) || '暂无'">
        <template #icon>
          <img :src="(commentList && commentList.aut_photo) || '暂无'" alt="" />
        </template>
        <template #label>
          <div class="commentInfo">
            {{ (commentList && commentList.content) || '暂无' }}
          </div>
          <div class="commentTime">
            <span>{{ pubdate || '暂无' }}</span>
            <van-button class="huifuBtn" @click="isShowComment = true"
              >回复{{ commentList.reply_count }}</van-button
            >
          </div>
        </template>
        <template #default>
          <van-icon
            name="good-job-o"
            @click="likingBtn"
            :class="{ loveBtn: commentList.is_liking === true }"
          />
          <span>赞{{ commentList.like_count }}</span>
        </template>
      </van-cell>
    </van-cell-group>

    <van-popup
      v-model="isShowComment"
      position="bottom"
      :style="{ height: '100%' }"
      closeable
      close-icon-position="top-left"
      close-icon="arrow-left"
    >
      <!-- 组件 -->
      <commentReply
        :commentList="commentList"
        :id="commentList.com_id"
      ></commentReply>
    </van-popup>
  </div>
</template>

<script>
import commentReply from './PopUp.vue'
import dayjs from '@/utils/dayjs'
import { getlikings } from '@/api/news'
import { delCommitLikings } from '@/api/comment'
export default {
  name: 'sareItem',
  data() {
    return {
      isShowComment: false
    }
  },
  props: {
    commentList: {
      type: Object
    }
  },
  components: {
    commentReply
  },
  created() {},
  computed: {
    pubdate() {
      const time = dayjs(this.commentList.pubdate).fromNow()
      return time
    }
  },
  methods: {
    async likingBtn() {
      // 判断若一开始未点赞  则发起点赞请求
      if (!this.commentList.is_liking) {
        try {
          await getlikings(this.commentList.com_id)
          this.$toast.success('点赞成功')
        } catch (error) {}
      } else {
        try {
          await delCommitLikings(this.commentList.com_id)
          this.$toast('点赞取消')
        } catch (error) {}
      }
      console.log(this.$parent)
    }
  }
}
</script>

<style scoped lang="less">
.comment {
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
:deep(.huifuBtn) {
  margin-left: 48px;
  height: 48px;
  color: #333;
  border-radius: 24px;
}
:deep(.commentTime) {
  display: flex;
  align-items: center;
  color: #333;
}
.loveBtn {
  color: red;
}
</style>
