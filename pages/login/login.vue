<template>
	<view>
		登录页面
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		onLoad(options) {
			console.log("初始数据")
			uni.login({
				success: (res) => {
					console.log("login",res);
					uni.getUserInfo({
						success: (info) => {
							console.log("登录成功",info);
							// 跳转尝试
							uni.redirectTo({
								url:"../write/write"
							})
						},
						fail: (error) => {
							console.log(error)
							uni.showToast({
								title:"微信授权失败",
								icon:none
							})
						}
					})
				},
				fail: (error) => {
					uni.showToast({
						title:"微信授权失败",
						icon:none
					})
				}
			})
		}
	}
</script>

<style>
</style>
