"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
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
      common_vendor.index.setClipboardData({
        data: text,
        success: () => {
          common_vendor.index.showToast({ title: "已复制", icon: "none" });
        }
      });
    },
    // 打开官方网站（H5/小程序适配）
    openOfficialWebsite() {
      common_vendor.index.navigateToMiniProgram({
        appId: "第三方小程序AppID",
        // 需配置业务域名
        path: "",
        success: () => {
        }
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_assets._imports_0$2,
    b: common_vendor.t($data.appName),
    c: common_vendor.t($data.slogan),
    d: common_vendor.t($data.version),
    e: common_vendor.t($data.developer),
    f: common_vendor.t($data.customerService),
    g: common_assets._imports_1$2,
    h: common_vendor.o(($event) => $options.copyText($data.customerService)),
    i: common_vendor.t($data.officialWebsite),
    j: common_assets._imports_2$2,
    k: common_vendor.o((...args) => $options.openOfficialWebsite && $options.openOfficialWebsite(...args)),
    l: common_vendor.t($data.copyright)
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-e5b509e7"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/use-center/about.js.map
