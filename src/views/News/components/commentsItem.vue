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
            <van-button class="huifuBtn" @click="showCommentArea = true"
              >回复0</van-button
            >
          </div>
        </template>
        <template #default>
          <van-icon name="good-job-o" @click="likingBtn" />
          <span>赞</span>
        </template>
      </van-cell>
    </van-cell-group>

    <!-- 弹框区域 -->
    <van-popup
      v-model="showCommentArea"
      closeable
      close-icon="arrow-left"
      position="bottom"
      :style="{ height: '100%' }"
      close-icon-position="top-left"
    >
    </van-popup>
  </div>
</template>

<script>
import dayjs from '@/utils/dayjs'
import { getlikings } from '@/api/news'
export default {
  name: 'sareItem',
  props: {
    commentList: {
      type: Object
    }
  },
  data() {
    return {
      showCommentArea: false
    }
  },
  created() {},
  computed: {
    pubdate() {
      const art = this.commentList
      const time = dayjs(art.pubdate).fromNow()
      return time
    }
  },
  methods: {
    async likingBtn() {
      try {
        await getlikings(this.commentList.com_id)
      } catch (error) {}
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
</style>
