<template>
  <div>
    <van-cell
      v-if="ArticleInfo.cover.type === 0"
      :title="ArticleInfo.aut_name"
      :label="ArticleDesc"
    />

    <van-cell :title="ArticleInfo.aut_name"
     v-if="ArticleInfo.cover.type === 1"
     :label="ArticleDesc"
     >
     <van-image
      width="3rem"
      height="2rem"
      :src="ArticleInfo.cover.images[0]"
    />
     </van-cell>

    <van-cell :title="ArticleInfo.aut_name"  v-if="ArticleInfo.cover.type === 3" >
    <template #label>
      <van-image
      v-for="item,index in ArticleInfo.cover.images"
      :key="index"
      width="2.7rem"
      height="2rem"
      :src="item"
      style="margin-right:10px"
    />
    <br>
      <span>{{ ArticleDesc }}</span>
    </template>
    </van-cell>
  </div>
</template>

<script>
import dayjs from '@/utils/dayjs'
export default {
  props: {
    ArticleInfo: {
      type: Object
      // required: true
    }
  },
  computed: {
    ArticleDesc () {
      const art = this.ArticleInfo
      return `${art.aut_name} ${art.comm_count}评论 ${dayjs(art.pubdate).fromNow()}`
    }
  }
}
</script>

<style></style>
