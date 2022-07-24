<template>
  <div class="body">
    <div>
      <van-nav-bar
        title="个人信息"
        left-arrow
        @click-left="onClickLeft"
        class="header"
      />

      <!-- 编辑区域 -->
      <!-- 头像弹窗 -->
      <van-popup
        v-model="isShowImg"
        v-if="isShowImg"
        :transition-appear="true"
        closeable
        close-icon-position="bottom-left"
      >
        <UpPopup :imgSrc="imgSrc" @change="isShowImgFn"></UpPopup>
      </van-popup>
      <!-- 头像弹窗 -->
      <van-cell title="头像" is-link>
        <!-- 自定义上传样式 -->
        <van-uploader
          :after-read="afterRead"
          :preview-image="false"
          :showIndex="false"
        >
          <template #default>
            <van-image round width="31px" height="31px" :src="user.photo" />
          </template>
        </van-uploader>
      </van-cell>

      <van-cell
        title="昵称"
        :value="user.name"
        is-link
        @click="isShowName = true"
      ></van-cell>
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
      </van-popup>

      <!-- 昵称弹窗 -->
      <van-popup
        v-model="isShowName"
        position="bottom"
        :style="{ height: '100%' }"
      >
        <van-nav-bar
          title="更新昵称"
          left-text="取消"
          right-text="保存"
          @click-left="popCancel"
          @click-right="nameClickRight"
        />

        <!-- 输入框 -->
        <van-field
          v-model="nickname"
          rows="2"
          autosize
          type="textarea"
          maxlength="7"
          placeholder="请输入新的昵称"
          show-word-limit
        />
      </van-popup>
    </div>
  </div>
</template>

<script>
import UpPopup from '../Popup.vue'
// import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
import dayjs from 'dayjs'
import { getUserProfile, editUserData } from '@/api/user'
// editUserHeadPortrait
export default {
  name: 'Edit',
  data() {
    return {
      user: {},
      gender: ['男', '女'],
      isShowGender: false,
      isShowDate: false,
      minDate: new Date(1960, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(),
      isShowName: false,
      nickname: '',
      imgSrc: '',
      isShowImg: false
    }
  },
  components: {
    UpPopup
  },
  methods: {
    onClickLeft() {
      this.$router.back()
    },
    // 性别确认
    genderConfirm(value, index) {
      this.isShowGender = false
      this.editUserRequest({
        gender: index
      })
    },
    // 生日确认
    dateConfirm(value) {
      value = dayjs(value).format('YYYY-MM-DD')
      this.editUserRequest({
        birthday: value
      })
      this.isShowDate = false
    },
    // 关闭弹窗
    popCancel() {
      this.isShowGender = false
      this.isShowDate = false
      this.isShowName = false
      this.isShowImg = false
    },
    isShowImgFn() {
      this.isShowImg = false
    },
    // 昵称确认
    nameClickRight() {
      this.isShowName = false
      if (this.nickname.trim() === '') return this.$toast.fail('请输入内容')
      this.editUserRequest({
        name: this.nickname
      })
    },

    // 封装编辑资料的请求
    async editUserRequest(data) {
      try {
        const res = await editUserData(data)
        console.log(res)
        this.getUserInfo()
      } catch (error) {
        this.$toast.fail('更改失败')
      }
    },

    // 获取用户信息请求
    async getUserInfo() {
      try {
        const { data } = await getUserProfile()
        this.user = data.data
      } catch (error) {}
    },

    // 上传头像
    afterRead(file) {
      console.log(file)
      this.imgSrc = file.content
      this.isShowImg = true
    }
  },
  async created() {
    this.getUserInfo()
  }
}
</script>

<style scoped lang="less">
.body {
  width: 100%;
  height: 100%;
  background-color: #f5f7f9;
}
.header {
  background-color: #3296fa;
  :deep(.van-nav-bar__title) {
    color: #fff;
  }
  :deep(.van-icon-arrow-left) {
    color: #fff !important;
  }
}
:deep(.van-popup) {
  overflow: unset;
}
</style>
