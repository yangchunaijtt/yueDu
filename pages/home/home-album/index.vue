<template>
	<scroll-view scroll-y @scrolltolower='albumScrollTol' class="album_scroll_view">
		<view class="album_swiper">
			<u-swiper :list="banner" mode="round"></u-swiper>
		</view>
		<view class="album_list">
			<navigator class="album_item" v-for="item in album" :key="item.id" :url="`/pages/album/index?id=${item.id}`">
				<view class="album_img">
					<image mode="aspectFill" :src="item.cover"></image>
				</view>
				<view class="album_info">
					<view class="album_name">{{item.name}}</view>
					<view class="album_desc">{{item.desc}}</view>
					<view class="album_btn">
						<view class="album_attention">关注</view>
					</view>
				</view>
			</navigator>
		</view>
	</scroll-view>
</template>

<script>
	export default {
		components: {

		},
		data() {
			return {
				params: {
					limit: 30,
					order: "new",
					skip: 0
				},
				// 轮播图数字
				banner: [],
				// 列表数组
				album: [],
				// 是否还有分页数据
				hasMore: true
			}
		},
		methods: {
			// 获取接口的数据
			getList() {
				this.request({
					url: `${this.CONFIGURL}/image/v1/wallpaper/album`,
					data: this.params
				}).then(res => {
					res = res.data.res;

					if (!res.album.length) {
						uni.showToast({
							title: '没有更多数据了',
							icon: 'none'
						})
						return
					}
					// 第一次加载
					if (!this.banner.length) {
						this.banner = res.banner.map(item => {
							return {
								image: item.thumb,
								id: item.id
							}
						})
					}
					this.album = [...this.album, ...res.album];
				});
			},
			albumScrollTol() {
				if (this.hasMore) {
					this.params.skip += this.params.limit
					this.getList();
				} else {
					uni.showToast({
						title: '已经到底了',
						icon: 'none'
					})
				}
			}
		},
		mounted() {
			uni.setNavigationBarTitle({
				title:'专辑'
			})
			this.getList();
		}
	}
</script>

<style lang='scss' scoped>
	.album_scroll_view {
		height: calc(100vh - 36px);
	}

	.album_swiper {
		swiper {
			/* // 750rpx 326.0869565217392 */
			/* // height: calc(750rpx / 2.3 ); */
			height: 326.1rpx;

			image {
				height: 100%;
			}
		}
	}

	.album_list {
		padding: 10rpx;

		.album_item {
			padding: 10rpx 0;
			display: flex;
			border-bottom: 1rpx solid #ccc;

			.album_img {
				flex: 1;
				padding: 10rpx;

				image {
					width: 200rpx;
					height: 200rpx;
				}
			}

			.album_info {
				flex: 2;
				padding: 0 10rpx;
				overflow: hidden;

				.album_name {
					font-size: 30rpx;
					color: #000;
					padding: 10rpx 0;
				}

				.album_desc {
					padding: 10rpx 0;
					font-size: 24rpx;

					text-overflow: ellipsis;
					overflow: hidden;
					white-space: nowrap;
				}

				.album_btn {
					padding: 10rpx;
					display: flex;
					justify-content: flex-end;

					.album_attention {
						color: $color;
						border: 1rpx solid $color;
						padding: 10rpx;
					}
				}
			}
		}
	}
</style>
