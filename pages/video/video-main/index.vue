<template>
	<scroll-view scroll-y @scrolltolower='videoScrollTol' class="video_main">
		<view class="video_item" v-for="item in videowp" :key="item.id" @click="handleGoVideo(item)">
			<image mode="widthFix" :src="item.img" lazy-load="true"></image>
		</view>
	</scroll-view>
</template>

<script>
	export default {
		props: {
			urlobj: Object
		},
		data() {
			return {
				videowp: [],
				hasMore: true
			}
		},
		watch: {
			urlobj() {
				this.videowp = [];
				this.hasMore = true;
				this.getList();
			}
		},
		methods: {
			getList() {
				this.request({
					url: this.urlobj.url,
					data: this.urlobj.params
				}).then(res => {
					res = res.data.res
					if (!res.videowp.length) {
						this.hasMore = false;
						uni.showToast({
							title: "没有更多数据了",
							icon: "none"
						});
						return;
					}
					this.videowp = [...this.videowp, ...res.videowp];
				});
			},
			videoScrollTol() {
				if (this.hasMore) {
					this.urlobj.params.skip += this.urlobj.params.limit;
					this.getList();
				} else {
					uni.showToast({
						title: "没有更多数据了",
						icon: "none"
					});
				}
			},
			// 跳转到图片详情页
			handleGoVideo(data) {
				getApp().globalData.video = data;
				uni.navigateTo({
					url:'/pages/videoPlay/index'
				})
			}
		},
		mounted() {
			this.getList();
		},
	}
</script>


<style lang="scss" scoped>
	.video_main {
		display: flex;
		width: 100%;
		flex-wrap: wrap;
		// flex-direction:row;
		height: calc(100vh - 36px);

		.video_item {
			width: 33.33%;
			border: 5rpx solid #fff;
			float: left;
		}
	}
</style>
