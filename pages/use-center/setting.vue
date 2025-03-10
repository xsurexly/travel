
<template>
  <view class="settings-page">
    <!-- 账号信息 -->
    <view class="list-item" @click="navigateTo('/pages/use-center/information')">
      <view class="item-content">
        <text class="item-title">账号信息</text>
        <text class="item-sub" v-if="userInfo.nickname">{{ userInfo.nickname }}</text>
      </view>
      <text class="arrow">></text>
    </view>

    <!-- 功能列表 -->
    <view class="list-container">
      <view class="list-item" @click="navigateTo('/pages/use-center/privacy')">
        <text class="item-title">隐私条款</text>
        <text class="arrow">></text>
      </view>
      
      <view class="list-item" @click="navigateTo('/pages/use-center/about')">
        <text class="item-title">关于我们</text>
        <text class="arrow">></text>
      </view>

      <view class="list-item" @click="navigateTo('/pages/use-center/changelog')">
        <text class="item-title">更新日志</text>
        <text class="arrow">></text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {}
    }
  },
  onShow() {
    this.userInfo = uni.getStorageSync('userInfo') || {}
  },
  methods: {
    // 通用跳转方法
    navigateTo(path) {
      uni.navigateTo({ url: path })
    },
  }
}
</script>

<style scoped>
.settings-page {
  padding: 30rpx;
  background: #f8f8f8;
  min-height: 100vh;
}

/* 列表容器 */
.list-container {
  background: #fff;
  border-radius: 16rpx;
  margin: 30rpx 0;
}

/* 列表项通用样式 */
.list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 32rpx 30rpx;
  border-bottom: 1rpx solid #eee;
}

.list-item:last-child {
  border-bottom: none;
}

/* 账号信息特殊样式 */
.list-item .item-content {
  flex: 1;
}

.item-title {
  font-size: 32rpx;
  color: #333;
}

.item-sub {
  display: block;
  font-size: 26rpx;
  color: #666;
  margin-top: 10rpx;
}

/* 箭头样式 */
.arrow {
  color: #999;
  font-size: 36rpx;
  margin-left: 20rpx;
}
</style>