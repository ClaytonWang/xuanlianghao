<template>
	<view class="header">
		<view class="item">
			<image src="../../static/img/menu/phone_icon.png"></image>
			<label>手机号</label>
		</view>
		<view class="item">
			<image src="../../static/img/menu/birth_icon.png"></image>
			<label>生日号</label>
		</view>
		<view class="item">
			<image src="../../static/img/menu/lover_icon.png"></image>
			<label>情侣号</label>
		</view>
		<view class="item">
			<image src="../../static/img/menu/free_icon.png"></image>
			<label>0元号</label>
		</view>
		<view class="item">
			<image src="../../static/img/menu/baozi.png"></image>
			<label>豹子号</label>
		</view>
		<view class="item">
			<image src="../../static/img/menu/shunzi.png"></image>
			<label>顺子号</label>
		</view>
		<view class="item">
			<image src="../../static/img/menu/AABB.png"></image>
			<label>AABB</label>
		</view>
		<view class="item">
			<image src="../../static/img/menu/AAAB.png"></image>
			<label>AAAB</label>
		</view>
	</view>
</template>

<script>
	export default {
		name: "HomeNav",
		data() {
			return {

			};
		},
		methods:{
			goToPage(url) {
				if (!url) return;
				uni.navigateTo({
					url
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.header {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr 1fr;
		grid-template-rows: auto;
		align-items: center;
		justify-content: center;
		margin-top: 5px;
		padding-bottom: 10px;
		background-color: #fff;

		.item {
			display: grid;
			justify-content: center;
			align-items: center;
			margin-top: 10px;
			cursor: pointer;

			image {
				width: 37.44px;
				height: 37.44px;
			}
			label {
				font-size: .8rem;
			}
		}
	}
</style>