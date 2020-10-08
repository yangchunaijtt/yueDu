<template>
	<view>
		<!-- #ifdef MP-WEIXIN -->
		<button type="primary" open-type="getUserInfo" @getuserinfo="getUserInfo">使用微信登录</button>
		<!-- #endif -->
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		onLoad(options) {
			//微信
			// #ifdef MP-WEIXIN
			uni.login({
				success: function(res) {
					console.log(res);

				}
			})
			// #endif

			// app
			// #ifdef APP-PLUS
			uni.login({
				provider: 'weixin',
				success: (res) => {
					console.log("login", res);
					uni.getUserInfo({
						success: (info) => {
							console.log("登录成功", options);
							// 跳转尝试
							// 跳转
							if (options.backtype == 1) {
								uni.redirectTo({
									url: options.backpage
								});
							} else {
								uni.switchTab({
									url: options.backpage
								});
							}
						},
						fail: (error) => {
							console.log(error)
							uni.showToast({
								title: "微信授权失败",
								icon: none
							})
						}
					})
				},
				fail: (error) => {
					uni.showToast({
						title: "微信授权失败",
						icon: none
					})
				}
			})
			// #endif

		}
	}
</script>

<style>
</style>
