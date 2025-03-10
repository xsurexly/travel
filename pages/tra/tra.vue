<!-- 页面模板 -->
<template>
  <view class="container">
    <map 
      id="myMap"
      :latitude="latitude"
      :longitude="longitude"
      :scale="scale"
      :markers="markers"
      :polyline="polyline"
      show-location
      @tap="handleMapTap"
      style="width: 100%; height: 60vh;">
    </map>

    <!-- 地址选择区 -->
    <view class="address-box">
      <view class="address-item" @tap="chooseLocation('start')">
        <text class="label">起点：</text>
        <text class="value">{{ startAddress.name || '点击选择起点' }}</text>
      </view>
      <view class="address-item" @tap="chooseLocation('end')">
        <text class="label">终点：</text>
        <text class="value">{{ endAddress.name || '点击选择终点' }}</text>
      </view>
    </view>

    <!-- 操作按钮 -->
    <view class="control-btns">
      <button @tap="getMyLocation">定位</button>
      <button @tap="drawRoute" :disabled="!isRouteReady">路线规划</button>
    </view>
  </view>
</template>

<script>
const MAP_KEY = 'A6OBZ-YVLWG-6LDQ6-QBFXU-HUXPH-ZEBOT';

export default {
  data() {
    return {
      latitude: 39.908823,
      longitude: 116.397470,
      scale: 16,
      markers: [],
      polyline: [],
      startAddress: {},
      endAddress: {},
      mapContext: null
    };
  },
  computed: {
    isRouteReady() {
      return this.startAddress.latitude && this.endAddress.latitude;
    }
  },
  onReady() {
    this.mapContext = uni.createMapContext('myMap', this);
  },
  methods: {
    // 获取当前位置
    async getMyLocation() {
      try {
        const res = await uni.getLocation({ type: 'gcj02' });
        this.latitude = res.latitude;
        this.longitude = res.longitude;
        this.mapContext.moveToLocation();
      } catch (error) {
        uni.showModal({
          title: '位置授权提示',
          content: '需要您的位置权限才能继续操作',
          success: (res) => {
            if (res.confirm) {
              uni.openSetting();
            }
          }
        });
      }
    },

    // 选择地点
    async chooseLocation(type) {
      try {
        const res = await uni.chooseLocation();
        this[`${type}Address`] = {
          name: res.name,
          latitude: res.latitude,
          longitude: res.longitude
        };
        this.updateMarkers();
      } catch (error) {
        console.log('用户取消选择');
      }
    },

    // 更新地图标记
    updateMarkers() {
      this.markers = [];
      if (this.startAddress.latitude) {
        this.markers.push({
          id: 1,
          ...this.startAddress,
          iconPath: '/static/start.png',
          width: 30,
          height: 40
        });
      }
      if (this.endAddress.latitude) {
        this.markers.push({
          id: 2,
          ...this.endAddress,
          iconPath: '/static/end.png',
          width: 30,
          height: 40
        });
      }
    },

    // 地图点击事件
    handleMapTap(e) {
      uni.showActionSheet({
        itemList: ['设为起点', '设为终点'],
        success: (res) => {
          const type = res.tapIndex === 0 ? 'start' : 'end';
          this[`${type}Address`] = {
            latitude: e.detail.latitude,
            longitude: e.detail.longitude,
            name: '地图选点'
          };
          this.updateMarkers();
        }
      });
    },

    // 路线规划
    async drawRoute() {
      uni.showLoading({ title: '路线计算中' });
      
      try {
        const res = await uni.request({
          url: 'https://apis.map.qq.com/ws/direction/v1/driving/',
          data: {
            key: MAP_KEY,
            from: `${this.startAddress.latitude},${this.startAddress.longitude}`,
            to: `${this.endAddress.latitude},${this.endAddress.longitude}`
          }
        });

        const points = res.data.result.routes[0].polyline.map(p => {
          const [latitude, longitude] = p.split(',');
          return { latitude: parseFloat(latitude), longitude: parseFloat(longitude) };
        });

        this.polyline = [{
          points: points,
          color: '#007AFF',
          width: 6,
          arrowLine: true
        }];

        // 自动调整视野
        this.mapContext.includePoints({
          points: [this.startAddress, this.endAddress],
          padding: [40, 40, 40, 40]
        });
      } finally {
        uni.hideLoading();
      }
    }
  }
};
</script>

<style lang="scss">
.container {
  height: 100vh;
  display: flex;
  flex-direction: column;

  .address-box {
    background: #fff;
    padding: 20rpx;
    margin: 20rpx;
    border-radius: 16rpx;
    box-shadow: 0 4rpx 12rpx rgba(0,0,0,0.1);

    .address-item {
      padding: 24rpx 0;
      display: flex;
      align-items: center;
      border-bottom: 1rpx solid #eee;

      &:last-child {
        border-bottom: none;
      }

      .label {
        color: #666;
        min-width: 80rpx;
      }

      .value {
        color: #333;
        flex: 1;
      }
    }
  }

  .control-btns {
    display: flex;
    padding: 20rpx;
    gap: 20rpx;

    button {
      flex: 1;
      background: #007AFF;
      color: white;
      border-radius: 8rpx;

      &[disabled] {
        background: #cccccc;
      }
    }
  }
}
</style>