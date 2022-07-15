<template>
  <div>
    我是Layout
    <!-- 二级路由挂载点 -->
    <router-view></router-view>

    <!-- 底部标签导航 -->
    <van-tabbar  route>
        <van-tabbar-item replace to="/ " icon="home-o">首页</van-tabbar-item>
        <van-tabbar-item replace to="/qa" icon="chat-o">问答</van-tabbar-item>
        <van-tabbar-item replace to="/video" icon="video-o">视频</van-tabbar-item>
        <van-tabbar-item replace to="/profile" icon="manager-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>

<style>

</style>
