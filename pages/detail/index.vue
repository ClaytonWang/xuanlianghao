<template>
	<view class="content">
		<view class="step"></view>
		<view class="detail">
			<view class="title">
				<view class="yd_icon"></view>
				<text>上海移动</text>
			</view>
			<view class="box">
				<view class="num-box">
					<view class="num" v-html="'13501697070'"></view>
					<text>靓</text>
				</view>
				<view class="level"></view>
				<view class="order">
					<view class="order-lst">服务费 ¥0 元 + 话费 0 元</view>
					<view class="num_total_price">
						合计
						<view class="total_price">¥0 元</view>
					</view>
				</view>
				<view class="desc">
					尊贵的用户：该号码为上海移动正规号码，每月最低消费130元协议期60个月，办理129元全家享套餐，免费赠送300M家庭宽，安装小区必须有移动宽带资源，预存200元话费一次性到账，使用满一年不想使用可到营业厅办理注销号码无违约金，下单后有专业客服和您联系为您办理实名制开卡，【官方销售】安全有保障/售后无顾虑。
				</view>
			</view>
			<uv-cell-group class="cell">
				<uv-cell title="最低消费" value="160" :center="true"></uv-cell>
				<uv-cell title="送货方式" value="快递送货" :center="true"></uv-cell>
				<uv-cell title="套餐" value="全家享169元" :center="true"></uv-cell>
				<uv-cell title="备注" value="每个月最低消费160元，承诺在网120月，号码激活时必须预存160元以上话费，否则无法正常开机使用。使用满一年后可免违注销，仅限上海本地办理，持证件签收"
					:center="true"></uv-cell>
			</uv-cell-group>

		</view>
		<uv-form :model="form" :rules="rules" ref="uvFormRef" labelPosition="left" class="form">
			<uv-form-item required label="客户姓名" prop="username" borderBottom>
				<uv-input v-model="form.username" placeholder="请输入您的中文姓名" border="none" />
			</uv-form-item>
			<uv-form-item required label="手机号" prop="mobile" borderBottom>
				<uv-input v-model="form.mobile" placeholder="请输入您的正确联系方式" border="none" />
			</uv-form-item>
			<uv-form-item required label="收货地址" prop="address" borderBottom>
				<uv-input v-model="form.address" placeholder="请输入您的真实收货地址" border="none" />
			</uv-form-item>
			<uv-form-item label="备注" prop="beizhu" borderBottom>
				<uv-input v-model="form.beizhu" placeholder="最大1000个字符!" border="none" />
			</uv-form-item>
		</uv-form>
		<view class="aggrement">
			<uv-checkbox-group v-model="checkboxValue">
				<uv-checkbox activeColor="red" name="aggrement" label="我已阅读并同意"></uv-checkbox>
			</uv-checkbox-group>
			<uv-text @click="()=>{openAggre(0)}" type="primary" text="《关于客户个人信息收集、使用及保护的公告》"></uv-text>
			<uv-text @click="()=>{openAggre(1)}" type="primary" text="《实名制信息安全责任告知书》"></uv-text>
			<uv-text @click="()=>{openAggre(2)}" type="primary" text="《优选号码规则详情》"></uv-text>
			<uv-text @click="()=>{openAggre(3)}" type="primary" text="《五部委联合通告》"></uv-text>
			<uv-text @click="()=>{openAggre(4)}" type="primary" text="《活动声明》"></uv-text>
			<uv-popup ref="popup" :close-on-click-overlay="true" mode="bottom" :closeable="true">
				<view class="agg-content">
					<text v-html="agrrementContent"></text>
				</view>
			</uv-popup>
		</view>
		<view style="padding: 10px;font-size:12px;">
			预约不需要在线支付；预约成功后，客服首先核实号码，然后确
			定是否交易。用户可以随时取消订单，不承担任何费用。未满14岁
			的未成年人无法通过运营商实名办卡。
		</view>
		<view class="reminder">
			<h5>温馨提示</h5>
			<p><span class="red_spot"></span>联系客服确认号码是否还在。</p>
			<p><span class="red_spot"></span>预约成功后确认交易时间和营业厅地点</p>
			<p>
				<span class="red_spot"></span>
				根据国家工信部《电弧按用户真实身份信息登记规定》
				所有手机号码必须实名制办理。需上传机主本人身份
				证上半身照片、人脸验证激活后才能使用。所办号码
				严禁用于非法用途，否则会承担法律责任，请知晓。
			</p>
		</view>
		<view class="bottom-bar">
			<view class="left">
				<view>
					<text>合计:</text>
					<uv-text type="error" mode="price" text="0"></uv-text>
				</view>
				<view>
					<text>预存200+卡费0</text>
				</view>
			</view>
			<view class="right">
				<view class="sc" @click="clickFavorite">{{item.isFav?'已收藏':'收藏'}}</view>
				<view class="order-now">提交订单</view>
			</view>
		</view>
	</view>
</template>

<script>
	import store from '@/store/index.js';
	
	const agconent = [
		`《关于客户个人信息收集、使用及保护的公告》\n\n关于客户个人信息收集、使用及保护的公告\n\n尊敬的客户：\n\n      根据《全国人民代表大会常务委员会关于加强网络信息保护的决定》、《电信和互联网用户个人信息保护规定》（工业和信息化部令第24号）、《电话用户真实身份信息登记规定》（工业和信息化部令第25号）等法律法规、规定的相关要求，客户在我公司办理移动电话等各类业务的入网、过户以及需要出示客户证件有关业务时，应配合出示本人有效证件原件并进行登记，登记信息包括客户姓名、证件类型号码及地址等。\n\n       在切实做好用户资料保密的前提下，为更好的为客户提供服务，在保障客户权益的前提下，我公司将合理使用客户的客户资料。为向客户提供更为优质、个性化的服务，公司将通过业务受理系统登记、纸质返档，通过网络接收、读取并记录等方式，收集客户个人信息；使用收集的客户个人信息用于服务通知、服务改进、业务提醒、以及其他经客户许可的用途。我公司将对在提供服务过程中收集、使用的客户个人信息履行保护义务。\n\n                                   中国移动通信集团上海有限公司`,
		`《实名制信息安全责任告知书》\n\n实名制信息安全责任告知书\n\n尊敬的客户：\n\n感谢您选择中国移动！当您在办理移动号码入网时，请您确保这是您本人的自愿行为，且为您自己使用而办理，不是在他人要求或指使下办理，不是办理后给他人使用。\n\n同时特别提醒您：您应持本人身份证原件办理号码入网，您对本号码拥有使用权。根据国家公安部等五部委《关于依法严厉打击惩戒治理非法买卖电话卡银行卡违法犯罪活动的通告》，入网号码必须实名登记，且不得将号卡租借、贩卖或以任何方式提供给他人。如您的号码被他人利用发生涉恐、诈骗、骚扰等非法违规行为，您将承担本号码项下产生的所有责任，请您确保规范使用您的号码。\n\n中国移动通信集团销售分公司`,
		`《优选号码规则详情》\n\n重要提醒\n\n1、用户选择号码后，需选择一档初始套餐，并按上海移动用户新入网规则完成选号下单与号卡激活（实名认证、充值与通话/上网使用）。\n\n2、优选号码月承诺消费及合约期以系统下单页面显示为准。用户预存的话费，将在号卡激活当月返还给您。优选号码协议期从号卡激活次月起生效。\n\n3、用户在合约期内须满足每月最低消费。若实际消费不足每月最低消费时，将按照最低消费金额收取；若实际消费金额超过最低消费金额时，将按照实际消费金额收取。\n\n4、若用户同时参加其他承诺消费类活动，本活动月最低消费与其他活动月最低消费中按较高的消费金额执行。\n\n5、若用户在合约期内进行过户，过户当月月最低消费由您承担。在用户结清所有费用后，过户下家须按照本优选号码的新入网政策（活动预存款、月承诺最低消费、承诺消费期限）重新签订协议，本协议自动终止。\n\n6、合约期内，如用户申请停机保号、或因为欠费等原因停机，停机期间仍须按以上承诺的月最低消费支付费用。\n\n7、合约期内，如用户因销户、携号转网等原因需提前解除协议，应按照 “月承诺最低消费金额*剩余协议期”计算违约金。\n\n8、涉及用户姓名、登录ID、身份证信息、收货号码、收货地址等任一信息重复或近似地址、模糊无效地址、他人代收等异常情况的订单均根据五部委通告要求取消，不予发货。\n\n9、下单号码实际配送范围以下单界面展示地区为准，请正确填写配送信息。配送地址填写后无法修改，超出配送范围将无法配送，敬请谅解。\n\n10、切勿将短信随机码告知他人，务必自行输入。切勿将本人办理的手机卡买卖，出借和给于他人。切勿协助他人进行身份信息认证。\n\n11、号卡订单由物流方配送，需机主本人于预留收货地址当场签收，不得转寄他人、不得他人代收。如预留虚假地址、一律不予配送，取消订单。\n\n12、上海移动对用户获得本活动中的号码资源享有最终的审核权。用户应严格按照《电信条例》、《电话用户真实身份信息登记规定》等相关法律法规以及上海移动相关业务规则获取、登记、使用本活动中的号码，不得利用黑客攻击、计算机病毒侵入、删除或篡改网络等非法手段获取号码资源的。上海移动可能会审查相关内容，以确定其是否违法或违反上海移动相关业务规则，且在上海移动有理由认为用户违法或违反上海移动相关业务规则时，上海移动有权拒绝提供服务，并向有关机关汇报，但这并不意味着上海移动有义务或必然会审查该等内容由于用户违反法律法规或本条款或上海移动相关业务规则获取、登记、使用上海移动号码所产生的全部责任和后果，将由用户自行承担。\n\n13、合约期内，如月实际通信费未达到所承诺的月最低通信费的，将按所承诺的月最低通信费收取，账单中将以“套餐补差额”科目列出，如超过则按实收取。特别注意:账单一级科目“代收费业务费用”不计入每月最低通信费额度。预付费客户须保证月初有足够余额可以代充活动档次对应的红包，避免代充后欠费停机。\n\n-警方提示-\n\n亲爱的用户：\n\n请勿将已登记您本人身份证信息的号码卡随意提供他人使用，以免被诈骗等违法犯罪人员利用。\n\n转卖转借风险提示：\n\n严禁个人擅自买卖实名电话卡行为，出售、出租、分租转让实名电话卡等行为容易被他人用于实施电信网络诈骗等违法犯罪活动，从而卷入法律纠纷。请您提高个人用户信息保护意识，妥善保管好实名电话卡。\n\n骚扰电话垃圾短信提示：\n\n根据工信部规定若实名登记的号码后续存在违规外呼、拨打骚扰电话、呼叫频次异常、发送垃圾短信、非法转售，被公安机关通报以及被用户投诉等情况的，由此产生的责任将由您本人承担，中国移动通信集团上海有限公司有权对号码停止通信服务。\n `,
		`<img src="https://api.zhaohaowang.cn/images/upload/Protocol/wbwlhtb.jpg" width="400px" />`,
		`《活动声明》\n\n活动声明\n\n在2023年6月30日前，新入网用户激活即获赠超清视话体验包业务3个月，每月100分钟视频通话资源。（温馨提示：苹果终端暂不支持视频通话，无法使用本视频通话分钟数据）`
	];
	export default {
		onShow() {
			this.item = uni.getStorageSync('numData');
			console.log(this.item)
		},
		data() {
			return {
				item:{},
				checkboxValue: ['aggrement'],
				form: {
					username: '',
					mobile: '',
					address: '',
					beizhu: ''
				},
				rules: {
					username: [{
						// 自定义验证函数，见上说明
						validator: (rule, valcallback) => {
							const flag = uni?.$uv?.username(value) ? uni?.$uv?.username(value) : false;
							return flag;
						},
						message: '请输入姓名',
						trigger: ['blur', 'change']
					}],
					mobile: [{
						// 自定义验证函数，见上说明
						validator: (rule, valcallback) => {
							const flag = uni?.$uv?.mobile(value) ? uni?.$uv?.mobile(value) : false;
							// 上面有说，返回true表校验通过，返回false表示不通过
							return flag;
						},
						message: '请输入电话',
						trigger: ['blur', 'change']
					}],
					address: [{
						// 自定义验证函数，见上说明
						validator: (rule, valcallback) => {
							const flag = uni?.$uv?.address(value) ? uni?.$uv?.address(value) : false;
							return flag;
						},
						message: '请输入真实地址',
						trigger: ['blur', 'change']
					}]
				},
				agrrementContent: ''
			};
		},
		methods: {
			openAggre(index) {
				this.agrrementContent = agconent[index];
				this.$refs.popup.open();
			},
			clickFavorite(){
				this.item.isFav = !this.item.isFav;
				store.dispatch('addFavorite', this.item);
			}
		},
		computed: {
			shadowStyle() {
				return {
					// #ifndef APP-NVUE
					backgroundImage: "linear-gradient(-180deg, rgba(255, 255, 255, 0) 0%, #fff 80%)",
					// #endif
					// #ifdef APP-NVUE
					// nvue上不支持设置复杂的backgroundImage属性
					backgroundImage: "linear-gradient(to top, #fff, rgba(255, 255, 255, 0.5))",
					// #endif
					paddingTop: "120rpx",
					marginTop: "-120rpx",
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		padding: .3rem;

		.step {
			width: 100%;
			height: 120px;
			background: url(../../static/img/detail_liucheng.png) no-repeat;
			background-size: 100% 100%;
		}

		.detail {
			margin-top: .3rem;
			padding-top: .3rem;
			border-radius: 5px;
			background-color: #fff;

			.title {
				margin: .5rem;
				display: flex;
				justify-content: flex-start;

				.yd_icon {
					width: 30px;
					height: 30px;
					background: url(../../static/img/yd_icon.png) no-repeat;
					background-size: 100% 100%;
				}

				text {
					display: block;
					height: 30px;
					line-height: 30px;
					font-size: 16px;
					font-weight: bold;
				}
			}

			.box {
				border-radius: 5px;
				background: #4367FD;
				overflow: hidden;

				.desc {
					margin: .8rem;
					color: #fff;
					font-size: 14rpx;
				}

				.num-box {
					display: flex;
					justify-content: space-around;
					align-items: center;
					transform: translateY(10px);

					.num {
						font-size: 30px;
						font-weight: bold;
						color: #fff;
					}

					text {
						width: 22px;
						height: 22px;
						border-radius: 3px;
						background-color: #f0430d;
						color: #fff;
						text-align: center;
					}
				}

				.level {
					display: block;
					height: 41px;
					width: 100%;
					background: url(../../static/img/level.png) no-repeat;
					background-size: 100% 100%;
				}

				.order {
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: .3rem .8rem;
					color: #fff;

					.num_total_price {
						display: flex;
					}
				}
			}

		}

		.cell {
			:deep(.uv-cell__body__content) {
				min-width: 40px;
			}
		}

		.form {
			margin-top: .3rem;
			padding-top: .3rem;
			border-radius: 5px;
			background-color: #fff;

			:deep(.uv-form-item__body) {
				padding: 0 1rem;

				.uv-form-item__body__left {
					width: 70px !important;
				}
			}
		}

		.aggrement {
			margin-top: .3rem;
			padding-top: .3rem;
			border-radius: 5px;
			background-color: #fff;
			padding: 10px;

			.agg-content {
				max-height: calc(100vh - 50px);
				overflow-y: auto;
			}

			:deep(uni-text) {
				span {
					font-size: 15px;
				}
			}
		}

		.reminder {
			padding: 10px;
			margin-bottom: 50px;
			font-size: 15px;
		}

		.bottom-bar {
			width: 100%;
			height: 50px;
			position: fixed;
			left: 0;
			bottom: 0;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 10px;
			border-top: 0.26666667vw solid #ccc;
			width: 100%;
			background-color: #fff;

			.left {
				display: flex;
				flex-direction: column;
				font-size: 13px;
				view {
					display: flex;
				}
			}

			.right {
				display: flex;
				margin-right: 1rem;
				.sc {
					right: 28vw;
					width: 5rem;
					height: 2rem;
					border-radius: 1rem 0 0 1rem;
					background-color: #fbb836;
					color: #fff;
					font-size: .6rem;
					text-align: center;
					line-height: 2rem;
				}

				.order-now {
					width: 5rem;
					height: 2rem;
					border-radius: 0 1rem 1rem 0;
					background-color: #fc6925;
					color: #fff;
					font-size: .6rem;
					text-align: center;
					line-height: 2rem;
				}
			}
		}
	}
</style>