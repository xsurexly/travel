<template>
  <view class="profile-container">
    <!-- 头像区域 -->
    <view class="avatar-section">
      <image 
        class="avatar"
        :src="userInfo.avatarUrl || '/static/1.png'"
        mode="aspectFill"
      ></image>
      <view class="button-group">
        <button 
          class="wechat-btn" 
          open-type="chooseAvatar"
          @chooseavatar="onChooseAvatar"
        >更换头像</button>
        <button 
          class="submit-btn"
          @click="handleSubmit"
          :loading="isSubmitting"
        >{{ isSubmitting ? '提交中...' : '保存资料' }}</button>
      </view>
    </view>

    <!-- 昵称区域 -->
    <view class="nickname-section">
      <input 
        class="nickname-input"
        type="nickname"
        :value="userInfo.nickName"
        placeholder="点击填写昵称"
        @blur="onNicknameBlur"
      />
    </view>
	
	 <view class="logout-btn-container">
	      <button class="logout-btn" @click="logout">退出登录</button>
	    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      isSubmitting: false,
      userInfo: {
        avatarUrl: '',
        nickName: '',
        phone: ''
      }
    }
  },
  methods: {
    // 选择头像回调
    onChooseAvatar(e) {
      const { avatarUrl } = e.detail 
      this.userInfo.avatarUrl = avatarUrl
     // this.saveUserInfo()
    },

    // 昵称输入完成
    onNicknameBlur(e) {
      this.userInfo.nickName = e.detail.value
     // this.saveUserInfo()
    },

    // 保存用户信息到后端
    async handleSubmit() {
      // 表单验证
      if (!this.userInfo.avatarUrl || !this.userInfo.nickName) {
        uni.showToast({
          title: '请完善头像和昵称',
          icon: 'none'
        })
        return
      }

      this.isSubmitting = true
      try {
        // 获取存储的 openid
        const openid = uni.getStorageSync('openid')
        if (!openid) {
          uni.showToast({
            title: '用户信息异常，请重新登录',
            icon: 'none'
          })
          return
        }

        const result = await uni.request({
          url: 'YOUR_API_URL/user/profile',
          method: 'POST',
          data: {
            avatarUrl: this.userInfo.avatarUrl,
            nickName: this.userInfo.nickName,
            openid: openid  // 添加 openid 参数
          },
          header: {
            'content-type': 'application/json',
          }
        })

        if (result.statusCode === 200) {
          // 保存成功，更新本地存储
          uni.setStorageSync('userInfo', this.userInfo)
          uni.showToast({ 
            title: '保存成功', 
            icon: 'success'
          })
        } else {
          throw new Error('保存失败')
        }
      } catch (error) {
        uni.showToast({
          title: '保存失败，请重试',
          icon: 'error'
        })
      } finally {
        this.isSubmitting = false
      }
    },
	
	//退出登录方法
	 logout() {
	      uni.showModal({
	        title: '确认退出',
	        content: '确定要退出登录吗？',
	        confirmText: '退出',
	        cancelText: '取消',
	        success: (res) => {
	          if (res.confirm) {
	            // 用户点击确定后的操作
	            this.userInfo = {
	              avatarUrl: '',
	              nickName: '',
	            }
	            uni.removeStorageSync('userInfo')
	            uni.showToast({
	              title: '已退出登录',
	              icon: 'success'
	            })
				uni.reLaunch({ 
				    url: '/pages/use-center/user-center' 
				  });
	          }
	        }
	      })
	    }
	},
  onLoad() {
    // 加载本地存储的用户信息
    const cachedInfo = uni.getStorageSync('userInfo')
    if (cachedInfo) {
      this.userInfo = cachedInfo
    }
  }
}
</script>

<style lang="scss" scoped>
.profile-container {
  padding: 40rpx;

  .avatar-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 60rpx;
    padding: 40rpx 0;

    .avatar {
      width: 180rpx;
      height: 180rpx;
      border-radius: 50%;
      border: 2rpx solid #eee;
      margin-bottom: 40rpx;
      box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
    }

    .button-group {
      display: flex;
      gap: 30rpx;
      margin-top: 30rpx;
      width: 100%;
      justify-content: center;
      padding: 0 40rpx;
    }

    .wechat-btn,
    .submit-btn {
      flex: 1;
      max-width: 240rpx;
      height: 80rpx;
      line-height: 80rpx;
      font-size: 28rpx;
      border-radius: 40rpx;
      box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
    }

    .wechat-btn {
      background-color: #07c160;
      color: white;
      &:active {
        opacity: 0.9;
      }
    }

    .submit-btn {
      background-color: #007aff;
      color: white;
      &:active {
        opacity: 0.9;
      }
    }
  }

  .nickname-section {
    margin-bottom: 40rpx;

    .nickname-input {
      height: 80rpx;
      border-bottom: 1rpx solid #eee;
      padding: 20rpx 0;
      font-size: 32rpx;
    }

    .tip {
      font-size: 24rpx;
      color: #999;
      margin-top: 20rpx;
      display: block;
    }
  }

  .info-item {
    display: flex;
    justify-content: space-between;
    padding: 30rpx 0;
    border-bottom: 1rpx solid #f5f5f5;

    .label {
      color: #666;
      font-size: 30rpx;
    }

    .value {
      color: #333;
      font-size: 30rpx;
    }
  }
  .logout-btn-container {
    margin-top: 80rpx;
    padding: 0 30rpx;
  
    .logout-btn {
      width: 100%;
      background-color: #ff4444;
      color: white;
      border-radius: 40rpx;
      font-size: 32rpx;
      padding: 20rpx 0;
      &::after {
        border: none;
      }
    }
  }
  /* 样式部分 */
  .avatar-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20rpx;
  }
  
  .button-group {
    display: flex;
    gap: 20rpx;
    width: 100%;
    justify-content: center;
  }
  
  .wechat-btn,
  .submit-btn {
    flex: 1;
    max-width: 200rpx;
    height: 70rpx;
    line-height: 70rpx;
    font-size: 28rpx;
    border-radius: 10rpx;
  }
  
  .wechat-btn {
    background-color: #07c160;
    color: white;
  }
  
  .submit-btn {
    background-color: #007aff;
    color: white;
  }
  }
</style>