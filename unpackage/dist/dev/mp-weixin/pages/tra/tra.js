"use strict";
const common_vendor = require("../../common/vendor.js");
const MAP_KEY = "A6OBZ-YVLWG-6LDQ6-QBFXU-HUXPH-ZEBOT";
const _sfc_main = {
  data() {
    return {
      latitude: 39.908823,
      longitude: 116.39747,
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
    this.mapContext = common_vendor.index.createMapContext("myMap", this);
  },
  methods: {
    // 获取当前位置
    async getMyLocation() {
      try {
        const res = await common_vendor.index.getLocation({ type: "gcj02" });
        this.latitude = res.latitude;
        this.longitude = res.longitude;
        this.mapContext.moveToLocation();
      } catch (error) {
        common_vendor.index.showModal({
          title: "位置授权提示",
          content: "需要您的位置权限才能继续操作",
          success: (res) => {
            if (res.confirm) {
              common_vendor.index.openSetting();
            }
          }
        });
      }
    },
    // 选择地点
    async chooseLocation(type) {
      try {
        const res = await common_vendor.index.chooseLocation();
        this[`${type}Address`] = {
          name: res.name,
          latitude: res.latitude,
          longitude: res.longitude
        };
        this.updateMarkers();
      } catch (error) {
        common_vendor.index.__f__("log", "at pages/tra/tra.vue:92", "用户取消选择");
      }
    },
    // 更新地图标记
    updateMarkers() {
      this.markers = [];
      if (this.startAddress.latitude) {
        this.markers.push({
          id: 1,
          ...this.startAddress,
          iconPath: "/static/start.png",
          width: 30,
          height: 40
        });
      }
      if (this.endAddress.latitude) {
        this.markers.push({
          id: 2,
          ...this.endAddress,
          iconPath: "/static/end.png",
          width: 30,
          height: 40
        });
      }
    },
    // 地图点击事件
    handleMapTap(e) {
      common_vendor.index.showActionSheet({
        itemList: ["设为起点", "设为终点"],
        success: (res) => {
          const type = res.tapIndex === 0 ? "start" : "end";
          this[`${type}Address`] = {
            latitude: e.detail.latitude,
            longitude: e.detail.longitude,
            name: "地图选点"
          };
          this.updateMarkers();
        }
      });
    },
    // 路线规划
    async drawRoute() {
      common_vendor.index.showLoading({ title: "路线计算中" });
      try {
        const res = await common_vendor.index.request({
          url: "https://apis.map.qq.com/ws/direction/v1/driving/",
          data: {
            key: MAP_KEY,
            from: `${this.startAddress.latitude},${this.startAddress.longitude}`,
            to: `${this.endAddress.latitude},${this.endAddress.longitude}`
          }
        });
        const points = res.data.result.routes[0].polyline.map((p) => {
          const [latitude, longitude] = p.split(",");
          return { latitude: parseFloat(latitude), longitude: parseFloat(longitude) };
        });
        this.polyline = [{
          points,
          color: "#007AFF",
          width: 6,
          arrowLine: true
        }];
        this.mapContext.includePoints({
          points: [this.startAddress, this.endAddress],
          padding: [40, 40, 40, 40]
        });
      } finally {
        common_vendor.index.hideLoading();
      }
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.latitude,
    b: $data.longitude,
    c: $data.scale,
    d: $data.markers,
    e: $data.polyline,
    f: common_vendor.o((...args) => $options.handleMapTap && $options.handleMapTap(...args)),
    g: common_vendor.t($data.startAddress.name || "点击选择起点"),
    h: common_vendor.o(($event) => $options.chooseLocation("start")),
    i: common_vendor.t($data.endAddress.name || "点击选择终点"),
    j: common_vendor.o(($event) => $options.chooseLocation("end")),
    k: common_vendor.o((...args) => $options.getMyLocation && $options.getMyLocation(...args)),
    l: common_vendor.o((...args) => $options.drawRoute && $options.drawRoute(...args)),
    m: !$options.isRouteReady
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/tra/tra.js.map
