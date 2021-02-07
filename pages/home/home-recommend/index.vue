<template>
	<scroll-view scroll-y @scrolltolower='recomScrollTol' class="recommend_view" v-if="recommed.length>0">
		<!-- 推荐 -->
		<view class="recommend_wrap">
			<navigator class="recommend_item" v-for="(recomItem,index) in recommed" :key="`${recomItem.id}${index}`" :url="`/pages/album/index?id=${recomItem.target}`">
				<u-image mode="widthFix" :src="recomItem.thumb" :lazy-load="true"></u-image>
			</navigator>
		</view>
		<!-- 月份 -->
		<view class="monthes_wrap">
			<view class="monthes_title">
				<view class="monthes_title_info">{{monethData.recomTime}}</view>
				<view>
					<u-section :title="monethData.title" :show-line='false' sub-title="更多"></u-section>
				</view>
			</view>
			<view class="monthes_content">
				<view v-for="(monthItem,index) in monthList" :key="`${monthItem.id}${index}`" class="monthes_item">
					<u-image mode="widthFix" :src="monthItem.thumb+monthItem.rule.replace('$<Height>',360)" :lazy-load="true"></u-image>
				</view>
			</view>

		</view>
		<!-- 热门 -->
		<view class="hots_wrap">
			<u-section title="热门" color='#d52a7e' right='false' class="hots_title"></u-section>
			<view class="hots_content">
				<view class="hot_item" v-for="(hotItem,index) in hotsList" :key="`${hotItem.id}${index}`">
					<go-detail :list='hotsList' :index='index'>
						<u-image mode="widthFix" :src="hotItem.thumb" :lazy-load="true"></u-image>
					</go-detail>
				</view>
			</view>
		</view>
	</scroll-view>
</template>

<script>
	import moment from "moment";
	import goDetail from "../../../components/goDetail.vue"

	export default {
		components: {
			goDetail
		},
		data() {
			return {
				// 推荐
				recommed: [],
				// 月份
				monthList: [],
				monethData: null,
				// 热门
				hotsList: [],
				// 请求的参数
				params: {
					// 要获取几条
					limit: 30,
					// 关键字
					order: "hot",
					// 要跳过几条
					skip: 0
				},
				hasMore: true,
			}
		},
		methods: {
			// 获取接口的数据
			getList() {
				this.request({
					url: `${this.CONFIGURL}/image/v3/homepage/vertical`,
					data: this.params
				}).then(res => {
					res = res.data.res;
					// 拉到头了，没有更多数据了
					if (res.vertical.length === 0) {
						uni.showToast({
							title: '没有更多数据了',
							icon: 'none'
						})
						return
					}
					//	开始赋值操作

					if (!this.recommed.length) {
						this.recommed = res.homepage[1].items;
						this.monethData = res.homepage[2];
						if (this.monethData && this.monethData.stime) {
							const momentTime = moment(this.monethData.stime);
							this.monethData.recomTime = `${momentTime.date()} /${momentTime.month()}月`;
						}
						this.monthList = res.homepage[2].items;
						this.hotsList = res.vertical;
					}
					this.hotsList = [...this.hotsList, ...res.vertical];
				});
			},
			// 滚动条触底事件
			recomScrollTol() {
				if (this.hasMore) {
					this.params.skip += this.params.limit
					this.getList()
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
				title: "推荐"
			})
			this.getList();
		}
	}
</script>

<style lang='scss' scoped>
	.recommend_view {
		height: calc(100vh - 36px);
	}

	.recommend_wrap {
		display: flex;
		flex-wrap: wrap;

		.recommend_item {
			width: 50%;
			border: 5rpx solid #fff;
		}
	}

	.monthes_wrap {
		.monthes_title {
			display: flex;
			justify-content: space-between;
			padding: 20rpx;

			.monthes_title_info {
				color: $color;
				font-size: 30rpx;
				font-weight: 600;
				display: flex;

				.monthes_info {
					text {
						font-size: 36rpx;
					}
				}

				.monthes_text {
					font-size: 34rpx;
					color: #666;
					margin-left: 30rpx;
				}
			}

			.monthes_title_more {
				font-size: 24rpx;
				color: $color;
			}
		}

		.monthes_content {
			display: flex;
			flex-wrap: wrap;

			.monthes_item {
				width: 33.33%;
				border: 5rpx solid #fff;
			}
		}
	}

	.hots_wrap {
		.hots_title {
			padding: 20rpx;

			text {
				border-left: 20rpx solid $color;
				padding-left: 20rpx;
				font-size: 34rpx;
				font-weight: 600;
			}
		}

		.hots_content {
			display: flex;
			flex-wrap: wrap;

			.hot_item {
				width: 33.33%;
				border: 5rpx solid #fff;

				image {}
			}
		}
	}
</style>
