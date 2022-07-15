<template>
  <div>
      <!-- 头部导航 -->
        <van-nav-bar title="登录" left-arrow @click-left="onClickLeft" class="navbar">
        <template #left>
        <van-icon name="cross" @click="backBtn"/>
        </template>
        </van-nav-bar>
      <!-- 表单 -->
    <van-form @submit="login" class="form" ref="form">
        <van-field
            v-model="moblie"
            name="moblie"
            placeholder="请输入手机号"
            :rules="moblieRules"
        >
        <template #label>
            <span class="toutiao toutiao-shouji"></span>
        </template>
        </van-field>
        <van-field
            v-model="code"
            name="code"
            placeholder="请输入验证码"
            :rules="codeRiles"
        >
        <template #label>
        <span class="toutiao toutiao-yanzhengma"></span>
        </template>
        <template #button>
          <van-count-down :time=" 60 * 1000 " v-if="isShowCount" @finish=" isShowCount = false" format="ss s"/>
          <van-button class="send-sms-btn" round size="small" type="default" @click.stop.prevent="sendSmsFn" v-else >发送验证码</van-button>
        </template>
        </van-field>
      <!-- 登录按钮 -->
        <div style="margin: 16px;">
            <van-button  block type="info" native-type="submit">登录</van-button>
        </div>
    </van-form>

  </div>
</template>

<script>
import { moblieRules, codeRiles } from '@/views/Login/rules.js'
import { login, sendCode } from '@/api/user'
export default {
  data () {
    return {
      moblie: '',
      code: '',
      moblieRules,
      codeRiles,
      isShowCount: false
    }
  },
  methods: {
    onClickLeft () {
      this.$toast('返回')
    },
    backBtn () {
      this.$router.back()
    },
    async login () {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true
      })
      try {
        const res = await login(this.moblie, this.code)
        this.$store.commit('setUser', res.data.data)
        // 登录成功跳转页面
        this.$router.push('/profile')
        this.$toast.success('登录成功')
      } catch (error) {
        const status = error.response.status
        status === 400 ? this.$toast.fail(error.response.data.message) : this.$toast.fail('登录错误，刷新重试')
      }
    },
    async sendSmsFn () {
      try {
        // 点击发送验证码的时候校验手机号格式---若手机号格式错误 则不发送请求
        await this.$refs.form.validate('moblie')
        await sendCode(this.moblie)
        this.isShowCount = true
      } catch (error) {
        if (!error.response) {
          this.$toast.fail('手机号格式错误')
        } else {
          if (error.response.status === 429 || error.response.status === 429) {
            this.$toast(error.response.data.message)
          }
        }
      }
    }

  }
}
</script>

<style scoped lang="less">
.navbar{
    background-color: #3296fa;
   :deep(.van-nav-bar__title){
    color: #fff;
    }
    .van-icon{
        color: #fff;
    }
}
// 表单域样式
.form{
    :deep(.van-field__label){
        flex: 1;
    }
    :deep(.van-cell__value){
        flex: 30;
    }
    .toutiao{
        font-size: 0.5rem;
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
</style>
