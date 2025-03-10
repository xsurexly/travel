"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  methods: {
    contactService() {
      common_vendor.index.navigateTo({
        url: "/pages/service/contact"
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_assets._imports_0$1,
    b: common_assets._imports_1$1,
    c: common_assets._imports_2$1,
    d: common_assets._imports_3,
    e: common_assets._imports_4,
    f: common_assets._imports_5,
    g: common_vendor.o(($event) => _ctx.navigateTo("/pages/settings")),
    h: common_assets._imports_5,
    i: common_vendor.o((...args) => $options.contactService && $options.contactService(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-89659a17"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/use-center/privacy.js.map
