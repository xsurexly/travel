<template>
  <view class="container">
    <view class="user-info">
      <!-- 头像增加点击事件 -->
    <image 
      v-if="userInfo?.avatarUrl"
      class="avatar"
      :src="userInfo.avatarUrl"
      mode="aspectFill"
      @click="handleWechatLogin"
    ></image>
    <image 
      v-else
      class="avatar"
      src="/static/1.png"
      mode="aspectFill"
      @click="handleWechatLogin"
    ></image>
      
      <!-- 昵称增加点击事件 -->
     <text 
       :class="['nickname', userInfo?.nickName ? 'has-nickname' : 'no-nickname']"
       @click="navigateToProfile"
     >
       {{ userInfo?.nickName || '访客用户（点击登录）' }}
     </text>
    </view>
    
    <view class="system-functions">
      <view class="func-card" @click="navigateTo('/pages/use-center/setting')">
        <image src="/static/设置.png" class="icon"/>
        <text class="title">设置</text>
        <image src="/static/右箭头.png" class="arrow"/>
      </view>
    </view>
  </view>
</template>

<script>
export default {
	data() {
	  return {
	    userInfo: {
	      avatarUrl: '',
	      nickName: ''
	    }
	  }
	},
  methods: {
	  async handleWechatLogin() {
	    try {
	  	// 1. 获取用户信息（如果未授权，提示授权）
	  	 const userInfo = await this.getUserProfile();
	  	if (!userInfo) {
	  	  uni.showToast({ title: '获取用户信息失败', icon: 'none' }); 
	  	  return;
	  	}
	  	const encryptedData=userInfo.encryptedData;
	  	const iv=userInfo.iv;
	  	/* uni.setStorageSync('userInfo', this.userInfo); */
	  	// 2. 获取微信登录凭证
	  	const loginRes = await uni.login({ provider: 'weixin' });
	  	if (loginRes.errMsg !== 'login:ok') {
	  	  uni.showToast({ title: '微信登录失败', icon: 'none' });
	  	  return;
	  	}
	      // 3. 发送登录请求，传递微信登录凭证
	      const code = loginRes.code;
	      await this.sendLoginRequest(code,encryptedData,iv); 
	    } catch (err) {
	      // 错误处理，确保获取详细的错误信息
	      let message = '登录失败';
	      if (err && err.errMsg && err.errMsg.includes('getUserProfile')) {
	        message = '请授权用户信息'; // 用户未授权
	      } else if (err && err.errMsg) {
	        message = err.errMsg || message; // 使用错误信息
	      }
	      uni.showToast({ title: message, icon: 'none' });
	    }
	  },
	  // 获取用户信息
	  getUserProfile() {
	    return new Promise((resolve, reject) => {
	      uni.getUserProfile({
	        desc: '获取用户信息用于登录',
	        success: (res) => {
	  		  // console.log(res);
	                const { encryptedData, iv, userInfo} = res;
	                resolve({
	  				userInfo,
	  				encryptedData, 
	  				iv });
	              },
	        fail: (err) => {
	          reject(err);
	        },
	      });
	    });
	  },
	  async sendLoginRequest(code,encryptedData,iv) {
	    try {
	  	  // console.log(encryptedData);
	  	  // console.log(iv);
	  	  //  console.log(code)
	      const res = await uni.request({
	        url: 'http://8.137.15.150:8080/api/wechat/login',
	        method: 'POST',
	  	   header: {
	  	      'Content-Type': 'application/json', // 明确指定 Content-Type
	  	    },
	        data: { 
	  		  code:code,
	  		  encryptedData:encryptedData,
	  		  iv:iv,
	  		   }
	      });
	      if (res.statusCode==200) {
	        uni.setStorageSync('openid', res.data.data.openid);
			//console.log(uni.getStorageSync('openid'));
			uni.navigateTo({
			  url: '/pages/use-center/information'  // 需要提前创建对应页面
			});
	      } else {
	        uni.showToast({ title: res.message || '登录异常', icon: 'none' });
	      }
	    } catch (err) {
	      uni.showToast({ title: '请求失败: ' + err.message, icon: 'none' });
	  	}
	  },
	  navigateToProfile() {
      // 跳转到个人信息页面
      uni.navigateTo({
        url: '/pages/use-center/information'  // 需要提前创建对应页面
      });
    },
    // 页面跳转
    navigateTo(path) {
      uni.navigateTo({ url: path });
    }
  },
    onShow() {
      this.userInfo = uni.getStorageSync('userInfo') || null
      this.$forceUpdate() 
    }
}
</script>

<style lang="scss" scoped>
.user-info {
  display: flex;
  align-items: center;
  padding: 20rpx;

  .avatar {
    width: 120rpx;
    height: 120rpx;
    border-radius: 50%;
    border: 1px solid #eee;
    /* 增加点击反馈 */
    &:active {
      opacity: 0.7;
    }
  }

  .nickname {
    margin-left: 20rpx;
    font-size: 35rpx;
    color: #666;
    /* 使文字区域可点击 */
    padding: 10rpx 0;
    /* 点击反馈 */
    &:active {
      color: #333;
    }
  }
}

.system-functions {
  margin-top: 40rpx;
  padding: 0 30rpx;
  
  .func-card {
    display: flex;
    align-items: center;
    background-color: #fff;
    padding: 40rpx 30rpx;
    border-radius: 16rpx;
    box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.08);
    
    .icon {
      width: 48rpx;
      height: 48rpx;
    }
    
    .title {
      flex: 1;
      margin-left: 24rpx;
      font-size: 32rpx;
      color: #333;
    }
    
    .arrow {
      width: 36rpx;
      height: 36rpx;
    }
    
    &:active {
      background-color: #f8f8f8;
    }
  }
}
</style>