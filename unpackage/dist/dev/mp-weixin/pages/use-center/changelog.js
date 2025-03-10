"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
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
        feature: "/static/update-feature.png",
        optimize: "/static/update-optimize.png",
        bugfix: "/static/update-bugfix.png"
      };
      return icons[type] || "/static/update-default.png";
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.versions, (item, index, i0) => {
      return {
        a: common_vendor.t(item.version),
        b: common_vendor.t(item.date),
        c: common_vendor.f(item.logs, (log, lIndex, i1) => {
          return {
            a: $options.getIconPath(log.type),
            b: common_vendor.t(log.text),
            c: lIndex,
            d: common_vendor.n(log.type)
          };
        }),
        d: index,
        e: common_vendor.n(index === 0 && "latest")
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-2f52d3cf"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/use-center/changelog.js.map
