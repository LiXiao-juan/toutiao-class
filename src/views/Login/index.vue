<template>
  <div>
      <!-- 头部导航 -->
        <van-nav-bar title="登录" left-arrow @click-left="onClickLeft" class="navbar">
        <template #left>
        <van-icon name="cross" @click="backBtn"/>
        </template>
        </van-nav-bar>
      <!-- 表单 -->
    <van-form @submit="login" class="form">
        <van-field
            v-model="moblie"
            name="moblie"
            placeholder="请输入手机号"
            :rules="[{ required: true, message: '请输入手机号' }]"
        >
        <template #label>
            <span class="toutiao toutiao-shouji"></span>
        </template>
        </van-field>
        <van-field
            v-model="code"
            name="code"
            placeholder="请输入验证码"
            :rules="[{ required: true, message: '请输入验证码' }]"
        >
        <template #label>
        <span class="toutiao toutiao-yanzhengma"></span>
        </template>
        <template #button>
          <van-button class="send-sms-btn" round size="small" type="default">发送验证码</van-button>
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
import { login } from '@/api/user'
export default {
  data () {
    return {
      moblie: '',
      code: ''
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
      const res = await login(this.moblie, this.code)
      console.log(res)
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
