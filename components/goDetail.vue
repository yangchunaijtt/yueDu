<template>
	<view @click='getImgDetail'>
		<slot></slot>
	</view>
</template>

<script>
	export default {
		props:{
			list:Array,
			index:Number
		},
		methods:{
			getImgDetail(){
				getApp().globalData.imgList = this.list;
				getApp().globalData.imgIndex = this.index;
				uni.navigateTo({
					url:'/pages/imgDetail/index'
				});
			}
		}
	}
</script>

<style>
</style>
