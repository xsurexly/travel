<template>
  <view class="container">
    <!-- 导航栏 -->
    <view class="navbar">
      <text class="title">旅游小程序</text>
    </view>

    <!-- 轮播图 -->
    <swiper class="swiper" indicator-dots="true" autoplay="true" interval="3000" duration="1000">
      <swiper-item v-for="(item, index) in bannerList" :key="index">
        <image :src="item.imageUrl" class="banner-image"/>
      </swiper-item>
    </swiper>

    <!-- 搜索框 -->
    <view class="search-box">
      <input type="text" placeholder="搜索目的地、活动..." class="search-input"/>
      <button class="search-btn">搜索</button>
    </view>

    <!-- 推荐景点 -->
    <view class="section">
      <text class="section-title">推荐景点</text>
      <view class="places">
        <view class="place" v-for="(place, index) in recommendedPlaces" :key="index">
          <image :src="place.imageUrl" class="place-image"/>
          <text class="place-name">{{ place.name }}</text>
        </view>
      </view>
    </view>

    <!-- 热门活动 -->
    <view class="section">
      <text class="section-title">热门活动</text>
      <view class="activities">
        <view class="activity" v-for="(activity, index) in popularActivities" :key="index">
          <image :src="activity.imageUrl" class="activity-image"/>
          <text class="activity-name">{{ activity.name }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      bannerList: [
        { imageUrl: '/static/banner1.jpg' },
        { imageUrl: '/static/banner2.jpg' },
        { imageUrl: '/static/banner3.jpg' }
      ],
      recommendedPlaces: [
        { name: '北京', imageUrl: '/static/beijing.jpg' },
        { name: '上海', imageUrl: '/static/shanghai.jpg' },
        { name: '重庆', imageUrl: '/static/chongqing.jpg' }
      ],
      popularActivities: [
        { name: '滑雪', imageUrl: '/static/skiing.jpg' },
        { name: '潜水', imageUrl: '/static/diving.jpg' },
        { name: '徒步旅行', imageUrl: '/static/hiking.jpg' }
      ]
    };
  }
};
</script>

<style scoped>
.container {
  padding: 0 20px;
}

.navbar {
  height: 50px;
  background-color: #ff8c00;
  justify-content: center;
  align-items: center;
  display: flex;
}

.title {
  font-size: 18px;
  color: white;
}

.swiper {
  margin-top: 10px;
}

.banner-image {
  width: 100%;
  height: 200px;
}

.search-box {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.search-input {
  width: 80%;
  padding: 10px;
  border-radius: 20px;
  border: 1px solid #ccc;
}

.search-btn {
  padding: 10px 20px;
  background-color: #ff8c00;
  color: white;
  border: none;
  border-radius: 20px;
}

.section {
  margin-top: 30px;
}

.section-title {
  font-size: 20px;
  font-weight: bold;
}

.places, .activities {
  display: flex;
  justify-content: space-between;
}

.place, .activity {
  width: 30%;
  text-align: center;
}

.place-image, .activity-image {
  width: 100%;
  height: 120px;
  border-radius: 10px;
}

.place-name, .activity-name {
  margin-top: 10px;
  font-size: 16px;
}
</style>
