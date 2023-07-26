<template>
	<view class="suite">
		<uv-image :src="item.img" 
		:lazy-load="true"
		radius="5"
		width="104px" height="104px"></uv-image>
		<view class="content">
			<uv-link href="https://static.xuanxuanhao.com" fontSize="17px" :text="item.title" @click="click"></uv-link>
			<view class="desc">
				<label>{{item.desc}}</label>
				<view class="icons">
					<uv-icon :label="item.time" size="18px" name="phone-fill" color="#007aff"></uv-icon>
					<uv-icon :label="item.flow" size="18px" name="empty-wifi-off" color="#007aff" style="margin-left: 1.5rem;"></uv-icon>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:['item'],
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
	.suite{
		display: flex;
		align-items: flex-start;
		border-radius: .3rem;
		padding: .5rem;
		margin-bottom: .7rem;
		box-shadow: 0 0 3px 3px rgba(92, 152, 216, .5);
		transition: all .3s;
		background-color: #f7f9fa;
		
		.content{
			display: flex;
			flex-direction: column;
			align-items:flex-start;
			margin-left: .5rem;
			text-align: left;
			font-size: 0.8rem;
			.desc{
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				margin-top: .5rem;
			}
			.icons{
				display: flex;
				margin-top: 1rem;
			}
		}
	}
</style>
