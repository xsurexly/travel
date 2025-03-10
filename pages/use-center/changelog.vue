<template>
  <view class="update-log">
    <!-- 标题 -->
    <view class="page-header">
      <text class="title">版本更新日志</text>
      <text class="subtitle">持续优化您的旅行体验</text>
    </view>

    <!-- 时间线列表 -->
    <view class="timeline">
      <view 
        v-for="(item, index) in versions" 
        :key="index" 
        class="version-card"
        :class="[index === 0 && 'latest']"
      >
        <!-- 版本徽章 -->
        <view class="version-badge">
          <text class="version-number">{{ item.version }}</text>
          <text class="release-date">{{ item.date }}</text>
        </view>

        <!-- 更新内容 -->
        <view class="update-content">
          <view 
            v-for="(log, lIndex) in item.logs" 
            :key="lIndex" 
            class="log-item"
            :class="log.type"
          >
            <image 
              :src="getIconPath(log.type)" 
              class="type-icon"
            />
            <text class="log-text">{{ log.text }}</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      versions: [
        {
          version: "v1.0.0",
          date: "2025-03-05",
          logs: [
            { type: "feature", text: "新增用户登录功能" },
            { type: "feature", text: "支持AR实景导航景点定位" },
            { type: "optimize", text: "地图加载速度提升40%" },
            { type: "bugfix", text: "修复收藏夹排序异常问题" }
          ]
        },
        {
          version: "v1.0.1",
          date: "2024-03-10",
          logs: [
            { type: "optimize", text: "完善用户登录细节" },
            { type: "feature", text: "新增地图定位" },
            { type: "bugfix", text: "新增行程规划问题" }
          ]
        }
        // 更多历史版本...
      ]
    };
  },
  methods: {
    getIconPath(type) {
      const icons = {
        feature: '/static/update-feature.png',
        optimize: '/static/update-optimize.png',
        bugfix: '/static/update-bugfix.png'
      };
      return icons[type] || '/static/update-default.png';
    }
  }
};
</script>

<style scoped>
.update-log {
  padding: 30rpx;
  background: #f8fafc;
  min-height: 100vh;
}

.page-header {
  padding: 40rpx 0;
  text-align: center;
}

.title {
  display: block;
  font-size: 44rpx;
  color: #2d3748;
  font-weight: 600;
  margin-bottom: 16rpx;
}

.subtitle {
  font-size: 28rpx;
  color: #718096;
}

.timeline {
  position: relative;
  padding-left: 80rpx;
}

.version-card {
  background: #fff;
  border-radius: 24rpx;
  padding: 32rpx;
  margin-bottom: 32rpx;
  box-shadow: 0 4rpx 12rpx rgba(0,0,0,0.06);
  position: relative;
  transition: transform 0.2s;
}

.version-card.latest {
  border: 2rpx solid #4a90e2;
}

.version-card:active {
  transform: translateY(-4rpx);
}

.version-badge {
  position: absolute;
  left: -80rpx;
  top: 40rpx;
  width: 120rpx;
  text-align: center;
}

.version-number {
  display: block;
  font-size: 32rpx;
  color: #4a90e2;
  font-weight: 500;
}

.release-date {
  display: block;
  font-size: 24rpx;
  color: #a0aec0;
  margin-top: 8rpx;
}

.update-content {
  border-left: 4rpx solid #e2e8f0;
  padding-left: 32rpx;
}

.log-item {
  display: flex;
  align-items: center;
  padding: 24rpx 0;
  border-bottom: 1rpx dashed #e2e8f0;
}

.log-item:last-child {
  border-bottom: none;
}

.type-icon {
  width: 36rpx;
  height: 36rpx;
  margin-right: 20rpx;
}

.log-text {
  font-size: 28rpx;
  color: #4a5568;
  line-height: 1.6;
}

/* 类型颜色标识 */
.log-item.feature .log-text {
  color: #48bb78;
}

.log-item.optimize .log-text {
  color: #f6ad55;
}

.log-item.bugfix .log-text {
  color: #f56565;
}
</style>