"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      userInfo: {
        avatarUrl: "",
        nickName: ""
      }
    };
  },
  methods: {
    async handleWechatLogin() {
      try {
        const userInfo = await this.getUserProfile();
        if (!userInfo) {
          common_vendor.index.showToast({ title: "获取用户信息失败", icon: "none" });
          return;
        }
        const encryptedData = userInfo.encryptedData;
        const iv = userInfo.iv;
        const loginRes = await common_vendor.index.login({ provider: "weixin" });
        if (loginRes.errMsg !== "login:ok") {
          common_vendor.index.showToast({ title: "微信登录失败", icon: "none" });
          return;
        }
        const code = loginRes.code;
        await this.sendLoginRequest(code, encryptedData, iv);
      } catch (err) {
        let message = "登录失败";
        if (err && err.errMsg && err.errMsg.includes("getUserProfile")) {
          message = "请授权用户信息";
        } else if (err && err.errMsg) {
          message = err.errMsg || message;
        }
        common_vendor.index.showToast({ title: message, icon: "none" });
      }
    },
    // 获取用户信息
    getUserProfile() {
      return new Promise((resolve, reject) => {
        common_vendor.index.getUserProfile({
          desc: "获取用户信息用于登录",
          success: (res) => {
            const { encryptedData, iv, userInfo } = res;
            resolve({
              userInfo,
              encryptedData,
              iv
            });
          },
          fail: (err) => {
            reject(err);
          }
        });
      });
    },
    async sendLoginRequest(code, encryptedData, iv) {
      try {
        const res = await common_vendor.index.request({
          url: "http://8.137.15.150:8080/api/wechat/login",
          method: "POST",
          header: {
            "Content-Type": "application/json"
            // 明确指定 Content-Type
          },
          data: {
            code,
            encryptedData,
            iv
          }
        });
        if (res.statusCode == 200) {
          common_vendor.index.setStorageSync("openid", res.data.data.openid);
          common_vendor.index.navigateTo({
            url: "/pages/use-center/information"
            // 需要提前创建对应页面
          });
        } else {
          common_vendor.index.showToast({ title: res.message || "登录异常", icon: "none" });
        }
      } catch (err) {
        common_vendor.index.showToast({ title: "请求失败: " + err.message, icon: "none" });
      }
    },
    navigateToProfile() {
      common_vendor.index.navigateTo({
        url: "/pages/use-center/information"
        // 需要提前创建对应页面
      });
    },
    // 页面跳转
    navigateTo(path) {
      common_vendor.index.navigateTo({ url: path });
    }
  },
  onShow() {
    this.userInfo = common_vendor.index.getStorageSync("userInfo") || null;
    this.$forceUpdate();
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  var _a, _b, _c, _d;
  return common_vendor.e({
    a: (_a = $data.userInfo) == null ? void 0 : _a.avatarUrl
  }, ((_b = $data.userInfo) == null ? void 0 : _b.avatarUrl) ? {
    b: $data.userInfo.avatarUrl,
    c: common_vendor.o((...args) => $options.handleWechatLogin && $options.handleWechatLogin(...args))
  } : {
    d: common_assets._imports_0,
    e: common_vendor.o((...args) => $options.handleWechatLogin && $options.handleWechatLogin(...args))
  }, {
    f: common_vendor.t(((_c = $data.userInfo) == null ? void 0 : _c.nickName) || "访客用户（点击登录）"),
    g: common_vendor.n(((_d = $data.userInfo) == null ? void 0 : _d.nickName) ? "has-nickname" : "no-nickname"),
    h: common_vendor.o((...args) => $options.navigateToProfile && $options.navigateToProfile(...args)),
    i: common_assets._imports_1,
    j: common_assets._imports_2,
    k: common_vendor.o(($event) => $options.navigateTo("/pages/use-center/setting"))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-14703973"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/use-center/user-center.js.map
