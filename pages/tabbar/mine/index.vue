<template>
	<view class="content">
		<image class="banner" src="../../../static/img/active_free.png"></image>
		<uv-cell-group class="group">
			<uv-cell icon="setting-fill" title="订购须知" isLink url="/pages/message/order"></uv-cell>
			<uv-cell icon="integral-fill" title="交易条款" isLink url="/pages/message/trade"></uv-cell>
			<uv-cell icon="integral-fill" title="送货方式" isLink url="/pages/message/send"></uv-cell>
			<uv-cell icon="integral-fill" title="付款方式" isLink url="/pages/message/buy"></uv-cell>
		</uv-cell-group>
		<uv-cell-group class="group">
			<uv-cell icon="integral-fill" title="联系我们" isLink url="/pages/message/contact"></uv-cell>
			<uv-cell icon="integral-fill" title="公司介绍" isLink url="/pages/message/introduce"></uv-cell>
		</uv-cell-group>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	body {
		background: #BAE0FB;
	}

	.content {
		.banner {
			display: block;
			height: 101px;
			width: 100%;
		}
		.group{
			margin-top: 1rem;
			background-color: #fff;
		}
	}
</style>