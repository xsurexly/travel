<template>
  <view class="privacy-policy">
    <!-- 标题区 -->
    <view class="header">
      <text class="title">隐私权保护政策</text>
      <text class="subtitle">更新日期：2024年3月20日</text>
    </view>

    <scroll-view scroll-y class="content-container">
      <!-- 引言 -->
      <view class="section-card intro">
        <image src="/static/icon-privacy.png" class="section-icon"/>
        <text class="section-text">
          欢迎使用【旅行助手】！我们深知个人信息安全的重要性，本政策将说明我们如何收集、使用和保护您的信息。
        </text>
      </view>

      <!-- 信息收集 -->
      <view class="section-card">
        <view class="section-title">
          <image src="/static/icon-collect.png" class="title-icon"/>
          <text class="title-text">一、我们收集的信息</text>
        </view>
        <view class="section-content">
          <text class="content-item">• 账户信息：微信昵称、头像等基础资料</text>
          <text class="content-item">• 位置数据：获取定位权限以推荐附近景点</text>
          <text class="content-item">• 行程记录：收藏的景点、生成的旅行路线</text>
          <text class="content-item">• 设备信息：设备型号、操作系统版本</text>
        </view>
      </view>

      <!-- 信息使用 -->
      <view class="section-card">
        <view class="section-title">
          <image src="/static/icon-usage.png" class="title-icon"/>
          <text class="title-text">二、信息使用方式</text>
        </view>
        <view class="section-content">
          <text class="content-item">✓ 为您个性化推荐旅行路线</text>
          <text class="content-item">✓ 优化景点导航的准确性</text>
          <text class="content-item">✓ 改进产品服务体验</text>
          <text class="content-item">✓ 防范安全风险与非法行为</text>
        </view>
      </view>

      <!-- 数据保护 -->
      <view class="section-card">
        <view class="section-title">
          <image src="/static/icon-protect.png" class="title-icon"/>
          <text class="title-text">三、数据安全措施</text>
        </view>
        <view class="section-content">
          <text class="content-item">• SSL加密传输敏感信息</text>
          <text class="content-item">• 定期安全漏洞扫描</text>
          <text class="content-item">• 严格限制内部数据访问权限</text>
          <text class="content-item">• 数据存储于境内服务器</text>
        </view>
      </view>

      <!-- 用户权利 -->
      <view class="section-card">
        <view class="section-title">
          <image src="/static/icon-rights.png" class="title-icon"/>
          <text class="title-text">四、您的权利</text>
        </view>
        <view class="section-content">
          <view class="right-item" @click="navigateTo('/pages/settings')">
            <text class="right-text">随时撤回位置权限授权</text>
            <image src="/static/icon-arrow.png" class="right-arrow"/>
          </view>
          <view class="right-item" @click="contactService">
            <text class="right-text">申请导出或删除个人数据</text>
            <image src="/static/icon-arrow.png" class="right-arrow"/>
          </view>
        </view>
      </view>

      <!-- 其他声明 -->
      <view class="section-card">
        <text class="notice-text">
          完整版政策请访问官网查询，如有疑问请联系：
          privacy@travelhelper.com
        </text>
      </view>
    </scroll-view>
  </view>
</template>

<script>
export default {
  methods: {
    contactService() {
      uni.navigateTo({
        url: '/pages/service/contact'
      });
    }
  }
};
</script>

<style scoped>
.privacy-policy {
  padding: 30rpx;
  background: #f8fafc;
  min-height: 100vh;
}

.header {
  padding: 40rpx 0;
  text-align: center;
}

.title {
  display: block;
  font-size: 40rpx;
  color: #2d3748;
  font-weight: 600;
  margin-bottom: 16rpx;
}

.subtitle {
  font-size: 26rpx;
  color: #718096;
}

.content-container {
  height: calc(100vh - 200rpx);
}

.section-card {
  background: #fff;
  border-radius: 24rpx;
  padding: 32rpx;
  margin-bottom: 24rpx;
  box-shadow: 0 2rpx 8rpx rgba(0,0,0,0.06);
}

.section-title {
  display: flex;
  align-items: center;
  margin-bottom: 24rpx;
}

.title-icon {
  width: 40rpx;
  height: 40rpx;
  margin-right: 16rpx;
}

.title-text {
  font-size: 32rpx;
  color: #2d3748;
  font-weight: 500;
}

.section-content {
  padding-left: 56rpx;
}

.content-item {
  display: block;
  font-size: 28rpx;
  color: #4a5568;
  line-height: 1.6;
  margin-bottom: 16rpx;
}

.right-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24rpx 0;
  border-bottom: 1rpx solid #e2e8f0;
}

.right-text {
  font-size: 28rpx;
  color: #4a90e2;
}

.right-arrow {
  width: 32rpx;
  height: 32rpx;
}

.notice-text {
  font-size: 26rpx;
  color: #718096;
  line-height: 1.6;
}
</style>