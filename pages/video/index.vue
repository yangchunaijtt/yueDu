<template>
	<view>
		<view class="video_tab">
			<view class="video_tab_title">
				<view class="title_inner">
					<u-tabs :list="items" :is-scroll="false" :current="current" @change="onClickItem" active-color="#d4237a"></u-tabs>
				</view>
				<view class="iconfont iconsearch"></view>
			</view>
			<view class="video_tab_content">
				<video-main :urlobj="{url:items[current].url,params:items[current].params}"></video-main>
			</view>
		</view>
	</view>
</template>

<script>
	import videoMain from "./video-main";
	export default {
		components: {
			videoMain
		},
		data() {
			return {
				items: [{
						name: "推荐",
						url: "http://157.122.54.189:9088/videoimg/v1/videowp/featured",
						params: {
							limit: 30,
							skip: 0,
							order: "hot"
						}
					},
					{
						name: "娱乐",
						url: "http://157.122.54.189:9088/videoimg/v1/videowp/category/59b25abbe7bce76bc834198a",
						params: {
							limit: 30,
							skip: 0,
							order: "new"
						}
					},
					{
						name: "最新",
						url: "http://157.122.54.189:9088/videoimg/v1/videowp/videowp",
						params: {
							limit: 30,
							skip: 0,
							order: "new"
						}
					},
					{
						name: "热门",
						url: "http://157.122.54.189:9088/videoimg/v1/videowp/videowp",
						params: {
							limit: 30,
							skip: 0,
							order: "hot"
						}
					},
				],
				current: 0
			};
		},
		methods: {
			onClickItem(index) {
				if (this.current !== index) {
					this.current = index;
				}
			}
		}
	};
</script>


<style lang="scss" scoped>
	.video_tab {
		.video_tab_title {
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
	}
</style>
