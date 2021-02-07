<template>
	<view>
		<view class="home_tab">
			<view class="home_tab_title">
				<view class="title_inner">
					<u-tabs :list="items" :is-scroll="false" :current="current" @change="onClickItem" active-color="#d4237a"></u-tabs>
				</view>
				<view class="home_tab_content">
					<view v-if="current === 0">
						<home-recommend></home-recommend>
					</view>
					<view v-if="current === 1">
						<home-category></home-category>
					</view>
					<view v-if="current === 2">
						<home-album></home-album>
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import homeAlbum from "./home-album/index.vue"
	import homeCategory from "./home-category/index.vue"
	import homeRecommend from "./home-recommend/index.vue"

	export default {

		components: {
			homeAlbum,
			homeCategory,
			homeRecommend
		},
		data() {
			return {
				items: [{
						name: "推荐"
					},
					{
						name: "分类"
					},
					{
						name: "专辑"
					}
				],
				current: 0
			}
		},
		methods: {
			onClickItem(index) {
				this.current = index;
			}
		}
	}
</script>

<style lang='scss' scoped>
	.home_tab {
		.home_tab_title {
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

		.home_tab_content {
		}
	}
</style>
