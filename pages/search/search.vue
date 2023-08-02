<template>
	<next-paging ref="paging" v-model="numList" @query="getList" :autoShowBackToTop="true" :defaultPageSize="15">
		<!-- next-paging默认铺满全屏，此时页面所有view都应放在next-paging标签内，否则会被盖住 -->
		<view class="content">
			<image src="../../static/img/million_banner.png"></image>
			<view class="wraper">
				<uv-input v-model="keyword" placeholder="搜索你想要的号码" prefixIcon="search"
					prefixIconStyle="font-size: 22px;color: #909399">
					<template v-slot:suffix>
						<uv-button :disabled="!isValide" @click="search" text="搜索" type="error" size="mini"></uv-button>
					</template>
				</uv-input>
				<DaDropdown ref="DaDropdownRef" :dropdownMenu="dropdownMenuList" :duration="300" :menuActiveText="false"
					@confirm="handleConfirm">
				</DaDropdown>
				<uv-loading-icon v-if="loading" mode="spinner" text="加载中"></uv-loading-icon>
				<view class="content-number-box">
					<view v-for="item in numList" :key="item.id">
						<PrettyNumberItem :item="item" />
					</view>
				</view>
			</view>
		</view>
	</next-paging>

</template>

<script>
	import DaDropdown from '@/components/da-dropdown/index.vue'
	export default {
		components: {
			DaDropdown
		},
		async onLoad({
			filter
		}) {
			switch (filter) {
				case 'birth':
					break;
				case 'lover':
					this.filter = {
						rule: 'AABB',
						price: '-9999'
					};
					break;
				case 'free':
					break;
				case 'bazi':
					this.filter = {
						rule: 'XAAA',
						price: '-9999'
					};
					break;
				case 'shunzi':
					this.filter = {
						rule: 'ABC',
						price: '-9999'
					};
					break;
				case 'AABB':
					this.filter = {
						rule: 'AABB',
						price: '-9999'
					};
					break;
				case 'AAAB':
					this.filter = {
						rule: 'AAAB',
						price: '-9999'
					};
					break;
				default:
					break;
			}

			//await this.getList(1, 15);
			this.$refs.paging.reload()
		},
		data() {
			return {
				loading:true,
				filter: {
					rule: '-9999',
					price: '-9999'
				},
				keyword: '',
				numList: [],
				dropdownMenuList: [{
						title: '靓号规则',
						type: 'cell',
						prop: 'rule',
						showAll: true,
						showIcon: true,
						value: '-9999',
						options: [{
								label: 'AAA',
								value: 'XAAA'
							},
							// {
							// 	label: 'AAAA',
							// 	value: 'AAAA'
							// },
							// {
							// 	label: 'AAAAA',
							// 	value: 'AAAAA'
							// },
							{
								label: 'ABCD',
								value: 'ABCD'
							},
							{
								label: 'ABAB',
								value: 'ABAB'
							},
							{
								label: 'AAAB',
								value: 'AAAB'
							}
						],
					},
					{
						title: '价格',
						type: 'cell',
						prop: 'price',
						showAll: true,
						showIcon: true,
						value: '-9999',
						options: [{
								label: '100元以下',
								value: '1',
								suffix: '含0'
							},
							{
								label: '100元-200元',
								value: '2',
								suffix: '含100'
							},
							{
								label: '200元-300元',
								value: '3',
								suffix: '含300'
							},
							{
								label: '300元-600元',
								value: '4',
								suffix: '含600'
							},
							{
								label: '600元-1000元',
								value: '5',
								suffix: '含1000'
							},
							{
								label: '1000元及以上',
								value: '6'
							},
						],
					}
				],
			};
		},
		methods: {
			async handleConfirm(v) {
				// await this.getList(1,15);
				this.filter = {
					...this.filter,
					...v
				};
				this.$refs.paging.reload();
			},
			async search() {
				console.log(this.keyword)
				this.filter = {
					strResNumDesc: this.keyword
				};
				// await this.getList(1,10);
				this.$refs.paging.reload();
			},
			isNumber(val) {
				return /^\d+$/.test(val);
			},
			async getList(pageNo, pageSize) {
				// return this.$refs.paging.complete(this.$store.state.myFavorite);
				this.loading=true;
				const res = await this.$http(this.$api.search, {
					filter: this.filter,
					pageSize: 10,
					page: 1
				});
				this.loading =false;
				console.log(res, '返回参数');
				const {
					data,
					code
				} = res.data;
				if (code == 0) {
					this.$refs.paging?.complete(data);
				}
			}
		},
		computed: {
			isValide() {
				return this.keyword && this.isNumber(this.keyword);
			}
		}
	}
</script>

<style lang="scss" scoped>
	body {
		background-color: #007aff;
	}

	.content {
		margin: 0 .2rem;

		image {
			width: 100%;
		}

		.wraper {
			translate: (0 -100px);
			padding: .5rem .3rem;
			border-top-left-radius: .5rem;
			border-top-right-radius: .5rem;
			background-color: #fff;
		}

		:deep(.uv-border) {
			border-color: red !important;
		}

		.content-number-box {
			display: grid;
			grid-template-columns: 1fr 1fr;
			grid-template-rows: auto;
			grid-gap: 2px;
			margin: .2rem 0;
		}
	}
</style>