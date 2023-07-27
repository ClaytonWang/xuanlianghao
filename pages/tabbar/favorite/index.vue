<template>
	<view class="content">
		<view v-if="myFavorite.length===0">
			<uv-image src="../../../static/img/shoucang.png"></uv-image>
			<text>您暂时还没有添加收藏呢,快去选择心仪的收藏吧~</text>
			<view style="width: 99%;">
				<uv-button @click="onClick" style="margin-top: 5rem;" text="去收藏~"
					color="linear-gradient(to right, rgb(66, 83, 216), rgb(213, 51, 186))"></uv-button>
			</view>
		</view>
		<view v-for="item in myFavorite" :key="item.id" class="number-list">
			<PrettyNumberItem :item="item" :show-btn="true" />
		</view>

	</view>
</template>

<script>
	import store from '@/store/index.js'
	export default {
		data() {
			return {
				
			}
		},
		computed:{
			myFavorite(){
				return this.$store.state.myFavorite;
			}
		},
		onLoad() {

		},
		methods: {
			onClick() {

			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: .2rem .5rem;
		.number-list{
			width: 100%;
			margin: .2rem;
		}
	}
</style>