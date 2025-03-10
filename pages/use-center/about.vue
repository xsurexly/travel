<template>
  <view class="container">
    <!-- 头部信息 -->
    <view class="header">
      <image src="/static/logo.png" class="logo" mode="aspectFit" />
      <text class="app-name">{{ appName }}</text>
      <text class="slogan">{{ slogan }}</text>
    </view>

    <!-- 基本信息卡片 -->
    <view class="card">
      <view class="card-item">
        <text class="label">版本号</text>
        <text class="value">{{ version }}</text>
      </view>
      <view class="card-item">
        <text class="label">开发者</text>
        <text class="value">{{ developer }}</text>
      </view>
    </view>

    <!-- 联系方式 -->
    <view class="card">
      <view class="card-item" @click="copyText(customerService)">
        <text class="label">客服电话</text>
        <text class="value">{{ customerService }}</text>
        <image src="/static/icon_copy.png" class="icon" />
      </view>
      <view class="card-item" @click="openOfficialWebsite">
        <text class="label">官方网站</text>
        <text class="value">{{ officialWebsite }}</text>
        <image src="/static/icon_link.png" class="icon" />
      </view>
    </view>

    <!-- 法律声明 -->
    <view class="legal">
      <text class="copyright">{{ copyright }}</text>
      <navigator url="/pages/agreement/agreement" class="link">用户协议</navigator>
      <navigator url="/pages/privacy/privacy" class="link">隐私政策</navigator>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      appName: "游之荐",
      slogan: "让旅游更简单",
      version: "v1.0.0",
      developer: "XX科技有限公司",
      customerService: "400-123-4567",
      officialWebsite: "https://www.youzhijian.com",
      copyright: "©2024 XX科技有限公司"
    };
  },
  methods: {
    // 复制文本到剪贴板
    copyText(text) {
      uni.setClipboardData({
        data: text,
        success: () => {
          uni.showToast({ title: "已复制", icon: "none" });
        }
      });
    },

    // 打开官方网站（H5/小程序适配）
    openOfficialWebsite() {
      // #ifdef H5
      window.open(this.officialWebsite);
      // #endif

      // #ifdef MP-WEIXIN
      uni.navigateToMiniProgram({
        appId: "第三方小程序AppID", // 需配置业务域名
        path: "",
        success: () => {}
      });
      // #endif
    }
  }
};
</script>

<style scoped>
/* 通用样式 */
.container {
  padding: 20rpx;
  background-color: #f5f5f5;
  min-height: 100vh;
}

.header {
  text-align: center;
  padding: 40rpx 0;
}

.logo {
  width: 120rpx;
  height: 120rpx;
  margin-bottom: 20rpx;
}

.app-name {
  font-size: 36rpx;
  font-weight: bold;
  display: block;
  margin: 10rpx 0;
}

.slogan {
  font-size: 24rpx;
  color: #666;
}

/* 卡片样式 */
.card {
  background-color: #fff;
  border-radius: 16rpx;
  margin: 20rpx 0;
  padding: 0 20rpx;
}

.card-item {
  display: flex;
  align-items: center;
  padding: 30rpx 0;
  border-bottom: 1rpx solid #eee;
}

.card-item:last-child {
  border-bottom: none;
}

.label {
  width: 160rpx;
  color: #999;
}

.value {
  flex: 1;
  color: #333;
}

.icon {
  width: 32rpx;
  height: 32rpx;
  margin-left: 20rpx;
}

/* 法律声明 */
.legal {
  text-align: center;
  color: #999;
  font-size: 24rpx;
  margin-top: 40rpx;
}

.link {
  color: #007AFF;
  margin: 0 20rpx;
}
</style>