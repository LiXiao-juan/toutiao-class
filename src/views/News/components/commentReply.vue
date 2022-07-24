<template>
  <div>
    <!-- 弹框区域 -->
    <van-button class="commentBtn nav_Btn" round @click="isShowPop">
      评论</van-button
    >
    <van-popup v-model="showPop" position="bottom" :style="{ height: '20%' }">
      <van-field
        v-model="message"
        rows="2"
        autosize
        type="textarea"
        maxlength="50"
        placeholder="请输入留言"
        show-word-limit
      >
        <template #extra>
          <span class="release" @click="releaseFn">发布</span>
        </template>
      </van-field>
    </van-popup>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showCommentArea: false
    }
  },
  props: {
    comment: {
      type: Object
    }
  },
  created() {
    console.log(this.comment)
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
