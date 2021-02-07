<template>
	<view>
		<view class="album_bg">
			<image mode="widthFix" :src="album.cover"></image>
			<view class="album_info">
				<view class="album_name">{{album.name}}</view>
				<view class="album_btn">关注专辑</view>
			</view>
		</view>
		<view class="album_author">
			<view class="album_author_info">
				<image mode="widthFix" :src="album.user.avatar"></image>
				<view class="author_name">{{album.user.name}}</view>
			</view>
			<view class="album_author_desc">
				<text>{{album.desc}}</text>
			</view>
		</view>
		<view class="album_list">
			<view class="album_item" v-for="(item,index) in wallpaper" :key="item.id">
				<go-detail :list="wallpaper" :index="index">
					<image mode="aspectFill" :src="item.thumb+item.rule.replace('$<Height>',360)" :lazy-load="true"></image>
				</go-detail>
			</view>
		</view>
	</view>
</template>

<script>
	import goDetail from "../../components/goDetail.vue";

	export default {
		components: {
			goDetail
		},
		data() {
			return {
				id: null,
				hasMore: true,
				params: {
					limit: 30,
					order: "new",
					skip: 0,
					// 1 返回值中 有 album对象 表示第一次请求数据
					// 0 返回值中 只有 wallpaper 数组  不是第一次请求数据
					first: 1
				},
				wallpaper: [],
				album: {}
			}
		},
		onLoad(options) {
			this.id = options.id;
			this.getList();
		},
		onReachBottom() {
			if (this.hasMore) {
				this.params.first = 0;
				this.params.skip += this.params.limit
				this.getList();
			}
		},
		methods: {
			getList() {
				this.request({
					url: `${this.CONFIGURL}/image/v1/wallpaper/album/${this.id}/wallpaper`,
					data: this.params
				}).then(res => {
					res = res.data.res;
					if (!res.wallpaper.length) {
						uni.showToast({
							title: '没有更多数据了',
							icon: "none"
						})
						this.hasMore = false;
						return
					}
					if (!Object.keys(this.album).length) {
						this.album = res.album
					}
					this.wallpaper = [...this.wallpaper, ...res.wallpaper];
				});
			}
		},
		mounted() {
			uni.setNavigationBarTitle({
				title: '专辑详情'
			})
		}
	}
</script>

<style lang="scss" scoped>
	.album_bg {
		position: relative;

		image {}

		.album_info {
			position: absolute;
			width: 100%;
			left: 0;
			bottom: 0;
			display: flex;
			justify-content: space-between;
			height: 80rpx;
			align-items: center;
			color: #fff;
			padding: 0 15rpx;

			.album_name {
				font-size: 40rpx;
			}

			.album_btn {
				background-color: $color;
				width: 152rpx;
				height: 60rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				border-radius: 10rpx;
			}
		}
	}

	.album_author {
		padding: 10rpx;

		.album_author_info {
			padding: 10rpx 0;
			display: flex;

			image {
				width: 50rpx;
			}

			.author_name {
				color: #000;
				margin-left: 15rpx;
			}
		}

		.album_author_desc {}
	}

	.album_list {
		display: flex;
		flex-wrap: wrap;

		.album_item {
			width: 33.33%;
			border: 3rpx solid #fff;

			image {
				height: 160rpx;
			}
		}
	}
</style>
