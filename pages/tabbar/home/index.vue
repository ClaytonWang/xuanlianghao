<template>
	<view class="content">
		<uv-swiper @click="goPage" :list="imgsList" previousMargin="50" nextMargin="50" circular :autoplay="true" radius="5"
			height="250px" bgColor="#ffffff"></uv-swiper>
		<HomeNav />

		<uv-tabs :list="navList" @click="click" class="tab" :activeStyle="active" :inactiveStyle="inactive"
			itemStyle="padding-left: 15px; padding-right: 15px; height: 34px;"></uv-tabs>

		<view class="conent-suite-box" v-if="currTab==='suite'">
			<view v-for="item in suites" :key="item.id">
				<Suite :item="item" />
			</view>
		</view>

		<view class="content-number-box" v-if="currTab === 'phone'">
			<uv-loading-icon v-if="loading" text="加载中" textSize="30rpx"></uv-loading-icon>
			<view v-for="item in prettyNums" :key="item.id" v-if="!loading">
				<PrettyNumberItem :item="item" />
			</view>
		</view>

	</view>
</template>

<script>
	import store from '@/store/index.js';
	export default {
		data() {
			return {
				loading: true,
				currTab: 'phone',
				searchWords: '',
				filter: {
					rule: '',
					price: '3'
				},
				imgsList: [
					'/static/img/swiper/3.jpg',
					// '/static/img/swiper/banner1.webp',
					'/static/img/swiper/banner2.webp',
					'/static/img/swiper/banner3.jpg'
					// 'http://hsz-phone.oss-cn-shanghai.aliyuncs.com/banner/20230213/2af8a801cde75ee45edd03a594d95f5d.png',
					// 'http://hsz-phone.oss-cn-shanghai.aliyuncs.com/banner/20230213/1fa6f9febfc09c4b455ff0b80e0cfd04.png',
				],
				navList: [{
					name: '手机靓号',
					id: 'phone'
				}, {
					name: '超值套餐',
					id: 'suite'
				}],
				active: {
					color: 'red',
					fontWeight: 'bold',
					transform: 'scale(1.05)'
				},
				inactive: {
					color: '#606266',
					transform: 'scale(1)'
				},
				suites: [{
						id: 1,
						title: '大王卡29元',
						desc: '月租29元含30G专属流量，套外语音0.1元/分钟，短信0.1元/条.',
						time: '29分钟',
						flow: '30GB',
						img: 'https://static.xuanxuanhao.com/tcsl/20230412/QOW7NW.jpg'
					},
					{
						id: 2,
						title: '移动19元大流量',
						desc: '月租19元，50G通用流量、30G专属流量、首月免月租.',
						time: '19分钟',
						flow: '80GB',
						img: 'https://static.xuanxuanhao.com/tcsl/20230705/MDTKEK.jpg'
					},
					{
						id: 3,
						title: '天王卡59元',
						desc: '月租59元，含30G专属流量+10G国内流量+300分钟语音，首冲50得100话费.',
						time: '300分钟',
						flow: '40GB',
						img: 'https://static.xuanxuanhao.com/tcsl/20230412/GDH9DF.jpg'
					}
				],
			}
		},
		onNavigationBarSearchInputChanged(e) {
			this.searchWords = e.text;
			console.log(this.searchWords);
		},
		async onNavigationBarSearchInputConfirmed() {
			uni.hideKeyboard(); //隐藏软键盘
			if (this.searchWords.trim().length == 0) {
				//搜索框内容为空
				return;
			}
			//搜索框内容不为空时操作
			this.filter = {
				strResNumDesc: this.searchWords
			};
			console.log(this.filter)
			await this.getList();
		},

		async onLoad() {
			this.filter = {
				rule: '',
				price: '3'
			};
			await this.getList();
			this.loading = false;
		},
		onShow() {
			console.log(store.state.myFavorite.length)
			uni.setTabBarBadge({
				index: 1,
				text: store.state.myFavorite.length.toString()
			});
		},
		computed: {
			prettyNums() {
				return this.$store.state.prettyNums;
			}
		},
		methods: {
			goPage(){
				let url='/pages/search/search?filter=';
				uni.navigateTo({
					url
				});
			},
			click(item) {
				this.currTab = item.id;
			},
			async getList() {
				const res = await this.$http(this.$api.search, {
					filter: this.filter,
					pageSize: 100,
					page: 1
				});
				const {
					data,
					code
				} = res.data;
				if (code == 0) {
					store.dispatch('getPrettyNums', data.splice(0, data.length));
				}
			},
		}
	};
</script>

<style lang="scss" scoped>
	.content {
		text-align: center;

		.tab {
			margin-top: 10px;
			background-color: #fff;
		}

		.banner {
			display: block;
			height: 101px;
			width: 100%;
		}

		.conent-suite-box {
			margin: .5rem .3rem;
		}

		.content-number-box {
			display: grid;
			grid-template-columns: 1fr 1fr;
			grid-template-rows: auto;
			grid-gap: 2px;
			margin: .3rem;
		}
	}
</style>