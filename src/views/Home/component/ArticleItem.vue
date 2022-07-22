<template>
  <div>
    <van-cell
      v-if="ArticleInfo.cover.type === 0"
      :title="ArticleInfo.title"
      :label="ArticleDesc"
      @click="toInfo"
      :to="`detail/${ArticleInfo.art_id}`"
    />

    <van-cell
      :title="ArticleInfo.title"
      v-if="ArticleInfo.cover.type === 1"
      :label="ArticleDesc"
      @click="toInfo1"
      :to="`detail/${ArticleInfo.art_id}`"
    >
      <van-image
        width="3rem"
        height="2rem"
        :src="ArticleInfo.cover.images[0]"
      />
    </van-cell>

    <van-cell
      :title="ArticleInfo.title"
      v-if="ArticleInfo.cover.type === 3"
      @click="toInfo3"
      :to="`detail/${ArticleInfo.art_id}`"
    >
      <template #label>
        <van-image
          v-for="(item, index) in ArticleInfo.cover.images"
          :key="index"
          width="2.7rem"
          height="2rem"
          :src="item"
          style="margin-right: 10px"
        />
        <br />
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
    ArticleDesc() {
      const art = this.ArticleInfo
      return `${art.aut_name} ${art.comm_count}评论 ${dayjs(
        art.pubdate
      ).fromNow()}`
    }
  },
  methods: {
    // 拿到用户点击的新闻的id存到vuex中
    toInfo() {
      this.$store.commit('setArtId', this.ArticleInfo.art_id)
      console.log(this.ArticleInfo.art_id)
    },
    toInfo1() {
      this.$store.commit('setArtId', this.ArticleInfo.art_id)
      console.log(this.ArticleInfo.art_id)
    },
    toInfo3() {
      this.$store.commit('setArtId', this.ArticleInfo.art_id)
      console.log(this.ArticleInfo.art_id)
    }
  }
}
</script>

<style></style>
