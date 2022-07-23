<template>
  <div>
    <van-nav-bar
      title="个人信息"
      left-arrow
      @click-left="onClickLeft"
      class="header"
    />

    <!-- 编辑区域 -->
    <van-cell title="头像" is-link>
      <template #default>
        <van-image
          round
          width="31px"
          height="31px"
          :src="user.photo"
        /> </template
    ></van-cell>
    <van-cell title="昵称" :value="user.name" is-link></van-cell>
    <!-- 性别区域 -->
    <van-cell
      title="性别"
      :value="gender[user.gender]"
      is-link
      @click="isShowGender = true"
    ></van-cell>

    <!-- 生日区域 -->
    <van-cell
      title="生日"
      :value="user.birthday"
      is-link
      @click="isShowDate = true"
    ></van-cell>

    <!-- 弹框区域 -->

    <!-- 性别弹窗 -->
    <van-popup
      v-model="isShowGender"
      position="bottom"
      :style="{ height: '36%' }"
    >
      <van-picker
        title="更新性别"
        show-toolbar
        :columns="gender"
        @confirm="genderConfirm"
        @cancel="popCancel"
      />
    </van-popup>

    <!-- 生日弹窗 -->
    <van-popup
      v-model="isShowDate"
      position="bottom"
      :style="{ height: '36%' }"
    >
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="dateConfirm"
        @cancel="popCancel"
      />
        <!-- formatter="" -->
    </van-popup>
  </div>
</template>

<script>
import dayjs from '@/utils/dayjs'
import { getUserProfile } from '@/api/user'
export default {
  data() {
    return {
      user: {},
      gender: ['男', '女'],
      isShowGender: false,
      isShowDate: false,
      minDate: new Date(1960, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(2021, 0, 17)
    }
  },
  methods: {
    onClickLeft() {
      this.$router.back()
    },
    // 性别确认
    genderConfirm(value, index) {
      // this.$toast(`当前值：${value}, 当前索引：${index}`)
    },
    dateConfirm(value) {
      console.log(dayjs(value))
    },
    popCancel() {
      this.isShowGender = false
      this.isShowDate = false
    }
  },
  async created() {
    const { data } = await getUserProfile()
    this.user = data.data
  }
}
</script>

<style scoped lang="less">
.header {
  background-color: #3296fa;
  :deep(.van-nav-bar__title) {
    color: #fff;
  }
  :deep(.van-icon-arrow-left) {
    color: #fff !important;
  }
}
</style>
