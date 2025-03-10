"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      isSubmitting: false,
      userInfo: {
        avatarUrl: "",
        nickName: "",
        phone: ""
      }
    };
  },
  methods: {
    // 选择头像回调
    onChooseAvatar(e) {
      const { avatarUrl } = e.detail;
      this.userInfo.avatarUrl = avatarUrl;
    },
    // 昵称输入完成
    onNicknameBlur(e) {
      this.userInfo.nickName = e.detail.value;
    },
    // 保存用户信息到后端
    async handleSubmit() {
      if (!this.userInfo.avatarUrl || !this.userInfo.nickName) {
        common_vendor.index.showToast({
          title: "请完善头像和昵称",
          icon: "none"
        });
        return;
      }
      this.isSubmitting = true;
      try {
        const openid = common_vendor.index.getStorageSync("openid");
        if (!openid) {
          common_vendor.index.showToast({
            title: "用户信息异常，请重新登录",
            icon: "none"
          });
          return;
        }
        const result = await common_vendor.index.request({
          url: "YOUR_API_URL/user/profile",
          method: "POST",
          data: {
            avatarUrl: this.userInfo.avatarUrl,
            nickName: this.userInfo.nickName,
            openid
            // 添加 openid 参数
          },
          header: {
            "content-type": "application/json"
          }
        });
        if (result.statusCode === 200) {
          common_vendor.index.setStorageSync("userInfo", this.userInfo);
          common_vendor.index.showToast({
            title: "保存成功",
            icon: "success"
          });
        } else {
          throw new Error("保存失败");
        }
      } catch (error) {
        common_vendor.index.showToast({
          title: "保存失败，请重试",
          icon: "error"
        });
      } finally {
        this.isSubmitting = false;
      }
    },
    //退出登录方法
    logout() {
      common_vendor.index.showModal({
        title: "确认退出",
        content: "确定要退出登录吗？",
        confirmText: "退出",
        cancelText: "取消",
        success: (res) => {
          if (res.confirm) {
            this.userInfo = {
              avatarUrl: "",
              nickName: ""
            };
            common_vendor.index.removeStorageSync("userInfo");
            common_vendor.index.showToast({
              title: "已退出登录",
              icon: "success"
            });
            common_vendor.index.reLaunch({
              url: "/pages/use-center/user-center"
            });
          }
        }
      });
    }
  },
  onLoad() {
    const cachedInfo = common_vendor.index.getStorageSync("userInfo");
    if (cachedInfo) {
      this.userInfo = cachedInfo;
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.userInfo.avatarUrl || "/static/1.png",
    b: common_vendor.o((...args) => $options.onChooseAvatar && $options.onChooseAvatar(...args)),
    c: common_vendor.t($data.isSubmitting ? "提交中..." : "保存资料"),
    d: common_vendor.o((...args) => $options.handleSubmit && $options.handleSubmit(...args)),
    e: $data.isSubmitting,
    f: $data.userInfo.nickName,
    g: common_vendor.o((...args) => $options.onNicknameBlur && $options.onNicknameBlur(...args)),
    h: common_vendor.o((...args) => $options.logout && $options.logout(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-f76a8717"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/use-center/information.js.map
