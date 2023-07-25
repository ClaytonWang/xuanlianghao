<template>
	<view class="content">
		<uv-swiper :list="list" 
			previousMargin="50" 
			nextMargin="50" 
			circular 
			:autoplay="true" 
			radius="5" 
			height="200px"
			bgColor="#ffffff"></uv-swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [
					'https://static.xuanxuanhao.com/xwhdp/20221110/71VH25.jpg',
					'http://hsz-phone.oss-cn-shanghai.aliyuncs.com/banner/20230213/2af8a801cde75ee45edd03a594d95f5d.png',
					'http://hsz-phone.oss-cn-shanghai.aliyuncs.com/banner/20230213/1fa6f9febfc09c4b455ff0b80e0cfd04.png',
				]
			}
		},
		onLoad() {},
		methods: {}
	};
</script>

<style>
	.content {
		text-align: center;
		height: 400upx;
	}
</style>