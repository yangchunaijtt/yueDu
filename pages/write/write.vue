<template>
	<view>
		write页面
	</view>
</template>

<script>
	var loginRes;
	export default {
		data() {
			return {

			}
		},
		onLoad() {
			loginRes = this.checkLogin('../write/write', 2);
		}
	}
</script>

<style>
</style>
