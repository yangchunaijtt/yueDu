<template>
	<view>
		<view class="category_tab">
			<view class="category_tab_title">
				<view class="title_inner">
					<u-tabs :list="items" :is-scroll="false" :current="current" @change="onClickItem" active-color="#d4237a"></u-tabs>
				</view>
				<view class="iconfont iconsearch"></view>
			</view>
			<scroll-view @scrolltolower="handleScrolltolower" enable-flex scroll-y class="category_tab_content">
				<view class="cate_item" v-for="item in vertical" :key="item.id">
					<u-image mode="widthFix" :lazy-load="true" :src="item.thumb"></u-image>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				id: 0,
				params: {
					limit: 30,
					skip: 0,
					order: "new"
				},
				vertical: [],
				items: [{
					name: "最新",
					order: "new"
				}, {
					name: "热门",
					order: "hot"
				}],
				current: 0,
				hasMore: true
			}
		},
		onLoad(options) {
			this.id = options.id;
			this.getList()
		},
		methods: {
			getList() {
				this.request({
					url: `${this.CONFIGURL}/image/v1/vertical/category/${this.id}/vertical`,
					data: this.params
				}).then(res => {
					res = res.data.res;
					if (!res.vertical.length) {
						uni.showToast({
							title: '没有更多数据了',
							icon: 'none'
						})
						this.hasMore = false;
						return
					}
					this.vertical = [...this.vertical, ...res.vertical]
				})
			},
			onClickItem(index) {
				if (index === this.current) {
					return
				} else {
					this.params.order = this.items[index].order;
					this.params.skip = 0;
					this.vertical = [];
					this.hasMore = true;
					this.getList();
				}
				this.current = index;
			},
			handleScrolltolower() {
				if (this.hasMore) {
					this.getList();
				} else {
					uni.showToast({
						title: '到底了',
						icon: 'none'
					})
				}
			}
		},
		mounted() {
			uni.setNavigationBarTitle({
				title: '图片分类'
			})
		}
	}
</script>

<style lang="scss" scoped>
	.category_tab {
		.category_tab_title {
			position: relative;

			.title_inner {
				width: 60%;
				margin: 0 auto;
			}

			.iconsearch {
				position: absolute;
				top: 50%;
				transform: translateY(-50%);
				right: 5%;
			}
		}

		.category_tab_content {
			display: flex;
			flex-wrap: wrap;
			height: calc(100vh - 36px);

			.cate_item {
				width: 33.33%;
				border: 5rpx solid #fff;

				image {}
			}
		}
	}
</style>
