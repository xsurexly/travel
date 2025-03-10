"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      bannerList: [
        { imageUrl: "/static/banner1.jpg" },
        { imageUrl: "/static/banner2.jpg" },
        { imageUrl: "/static/banner3.jpg" }
      ],
      recommendedPlaces: [
        { name: "北京", imageUrl: "/static/beijing.jpg" },
        { name: "上海", imageUrl: "/static/shanghai.jpg" },
        { name: "重庆", imageUrl: "/static/chongqing.jpg" }
      ],
      popularActivities: [
        { name: "滑雪", imageUrl: "/static/skiing.jpg" },
        { name: "潜水", imageUrl: "/static/diving.jpg" },
        { name: "徒步旅行", imageUrl: "/static/hiking.jpg" }
      ]
    };
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.bannerList, (item, index, i0) => {
      return {
        a: item.imageUrl,
        b: index
      };
    }),
    b: common_vendor.f($data.recommendedPlaces, (place, index, i0) => {
      return {
        a: place.imageUrl,
        b: common_vendor.t(place.name),
        c: index
      };
    }),
    c: common_vendor.f($data.popularActivities, (activity, index, i0) => {
      return {
        a: activity.imageUrl,
        b: common_vendor.t(activity.name),
        c: index
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-1cf27b2a"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
