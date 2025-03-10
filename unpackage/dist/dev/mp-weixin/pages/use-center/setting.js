"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      userInfo: {}
    };
  },
  onShow() {
    this.userInfo = common_vendor.index.getStorageSync("userInfo") || {};
  },
  methods: {
    // 通用跳转方法
    navigateTo(path) {
      common_vendor.index.navigateTo({ url: path });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.userInfo.nickname
  }, $data.userInfo.nickname ? {
    b: common_vendor.t($data.userInfo.nickname)
  } : {}, {
    c: common_vendor.o(($event) => $options.navigateTo("/pages/use-center/information")),
    d: common_vendor.o(($event) => $options.navigateTo("/pages/use-center/privacy")),
    e: common_vendor.o(($event) => $options.navigateTo("/pages/use-center/about")),
    f: common_vendor.o(($event) => $options.navigateTo("/pages/use-center/changelog"))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-579e7ef0"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/use-center/setting.js.map
