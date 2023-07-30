# next-paging

***  
### 功能&特点
* 【配置简单】仅需两步（绑定网络请求方法、绑定分页结果数组）轻松完成完整下拉刷新，上拉加载更多功能。
* 【低耦合，低侵入】分页自动管理。在page中无需处理任何分页相关逻辑，无需在data中定义任何分页相关变量，全由next-paging内部处理。
* 【超灵活，支持各种类型自定义】支持自定义下拉刷新，自定义上拉加载更多，自带自定义下拉刷新效果，及其他数十种自定义属性。
* 【功能丰富】支持国际化，支持自定义且自动管理空数据图，支持主题模式切换，支持本地分页，支持聊天分页模式，支持展示最后更新时间，支持吸顶效果，支持内部scroll-view滚动与页面滚动，支持一键滚动到顶部等诸多功能。
* 【全平台兼容】支持nvue，vue3，支持h5、app及各家小程序。
* 【高性能】在app-vue、h5、微信小程序、QQ小程序上使用wxs+renderjs从视图层实现下拉刷新；支持虚拟列表，轻松渲染万级数据！

*** 
### 反馈qq群：[455948571]()
 
*** 

## 使用

>[从uniapp插件市场导入](https://ext.dcloud.net.cn/plugin?name=next-paging)

#### 基本使用
```vue
<template>
	 <next-paging 
		ref="paging" 
		v-model="dataList" 
		@query="queryList"
		:autoShowBackToTop="true"
		:defaultPageSize="15"
	>
		<!--top插槽-->
		<template #top><view class="slotTop"><text>我是顶部插槽内容</text></view></template>
		<!-- next-paging默认铺满全屏，此时页面所有view都应放在next-paging标签内，否则会被盖住 -->
		<!-- 需要固定在页面顶部的view请通过slot="top"插入，包括自定义的导航栏 -->
		<view class="item" v-for="(item,index) in dataList" :key="index">
			<view><text>{{index+1}}</text></view>	
			<view class="item-title"><text>{{item.title}}</text></view>
		</view>
		<!--bottom插槽-->
		<template #bottom><view class="slotBottom"><text>我是底部插槽内容</text></view></template>
	</next-paging>
</template>
```
|--------vue3用法-----------|
```ts
<script setup lang="ts">
	import { ref, unref } from 'vue';
	const paging = ref<any>(null)
	// v-model绑定的这个变量不要在分页请求结束中自己赋值，直接使用即可
	let dataList = ref([])

	// @query所绑定的方法不要自己调用！！需要刷新列表数据时，只需要调用unref(paging).reload()即可
	const queryList = async (pageNo, pageSize) => {
		// 此处请求仅为演示，请替换为自己项目中的请求
		if (pageNo > 3) {
			// 模拟ajax请求
			await new Promise(res => setTimeout(res, 500))
			// 注意如果传进去的数据的数组长度小于pageSize，next-paging会自动判断没有更多数据了
			unref(paging).complete([{title: '结尾'}]);
		} else {
			let arr = []
			for (let i = 1; i<=pageSize; i++) {
				arr.push({title: '测试item:'+ ((pageNo-1)*pageSize + i)})
			}
			// 模拟ajax请求
			await new Promise(res => setTimeout(res, 500))
			unref(paging).complete(arr);
		}
	}
</script>
```
|--------vue2用法-----------|
```vue
<script>
	export default {
		data() {
			return {
				// v-model绑定的这个变量不要在分页请求结束中自己赋值，直接使用即可
				dataList: []
			}
		},
		methods: {
			// @query所绑定的方法不要自己调用！！需要刷新列表数据时，只需要调用this.$refs.paging.reload()即可
			async queryList(pageNo, pageSize) {
				// 此处请求仅为演示，请替换为自己项目中的请求
				if (pageNo > 1224) {
					// 注意如果传进去的数据的数组长度小于pageSize，next-paging会自动判断没有更多数据了
					// 模拟ajax请求
					await new Promise(res => setTimeout(res, 500))
					this.$refs.paging.complete([{title: '结尾'}]);
				} else {
					let arr = []
					for (let i = 1; i<=pageSize; i++) {
						arr.push({title: '测试item:'+ ((pageNo-1)*pageSize + i)})
					}
					// 模拟ajax请求
					await new Promise(res => setTimeout(res, 500))
					this.$refs.paging.complete(arr);
				}
			}
		}
	};
</script>
```

#### 虚拟列表使用
```vue
<!-- 虚拟列表演示(兼容写法) -->
<!-- 在微信小程序中若使用虚拟列表推荐使用兼容写法，具体写法参见demo中的virtual-list-compatibility-demo -->
<!-- 使用虚拟列表兼容写法时必须手动在next-paging的源代码next-paging.vue中搜索next-public-virtual-cell并打开相关注释 -->
<template>
	<view class="content">
		<!-- 如果页面中的cell高度是固定不变的，则不需要设置cell-height-mode，如果页面中高度是动态改变的，则设置cell-height-mode="dynamic" -->
		<next-paging 
			ref="paging" 
			use-compatibility-mode 
			:autoShowBackToTop="true" 
			use-virtual-list 
			@query="queryList">
			<!--top插槽-->
			<template #top><view class="slotTop"><text>我是顶部插槽内容</text></view></template>
			<!-- 通过slot="cell"插入列表for循环的cell，slot-scope中提供当前for循环的item和index -->
			<!-- 因字节跳动小程序不支持slot-scope，因此不支持字节跳动小程序 -->
			<!--bottom插槽-->
			<template #bottom><view class="slotBottom"><text>我是底部插槽内容</text></view></template>
		</next-paging>
	</view>
</template>
```
```vue
<!--开启use-compatibility-mode后，在组件目录next-paging/components/next-paging/components/next-public-virtual-cell.vue中定义虚拟dom的样式；next-public-virtual-cell.vue内容如下 -->
<template>
	<view class="item">
		<!-- <image class="item-image" mode="aspectFit" src="@/static/boji1.png"></image> -->
		<view class="item-content">
			<text class="item-title">第{{index + 1}}行</text>
			<text style="color: red;margin-left: 10rpx;" @click.stop="titleClick(`第${index + 1}行 虚拟列表展示`)">虚拟列表展示</text>
			<view class="item-detail">{{item.detail}}</view>
		</view>
		<view class="item-line"></view>
	</view>
</template>
```
```ts
<script>
	export default {
		name:"next-public-virtual-cell",
		props: {
			item: null,
			index: 0,
			extraData: null
		},
		data() {
			return {
				
			};
		},
		methods: {
			titleClick(title){
				//如果要把点击事件传给页面，可以通过给extraData中添加对应的函数，然后在当前组件中触发这个函数，在页面中监听即可
				if(this.extraData.titleClickedCallback){
					this.extraData.titleClickedCallback(title);
				}
			}
		}
	}
</script>
```

```ts
<script setup lang="ts">
	import { ref, unref } from 'vue';
	const paging = ref<any>(null)
	// v-model绑定的这个变量不要在分页请求结束中自己赋值，直接使用即可
	let dataList = ref([])

	// @query所绑定的方法不要自己调用！！需要刷新列表数据时，只需要调用unref(paging).reload()即可
	const queryList = async (pageNo, pageSize) => {
		// 此处请求仅为演示，请替换为自己项目中的请求
		if (pageNo > 113) {
			// 模拟ajax请求
			await new Promise(res => setTimeout(res, 500))
			// 注意如果传进去的数据的数组长度小于pageSize，next-paging会自动判断没有更多数据了
			unref(paging).complete([{title: '结尾'}]);
		} else {
			let arr = []
			for (let i = 1; i<=pageSize; i++) {
				arr.push({title: '测试item:'+ ((pageNo-1)*pageSize + i)})
			}
			// 模拟ajax请求
			await new Promise(res => setTimeout(res, 500))
			unref(paging).complete(arr);
		}
	}
</script>
```
## 参数
next-paging可选参数属性列表

#### (next-paging)back-to-top设置
|参数名				|说明																																																																								|类型										|是否必填	|默认值	|可选值	|
|----				|----																																																																									|----										|----			|----		|----		|
|autoShowBackToTop			|自动显示点击返回顶部按钮，默认为否																																																					|Boolean								|否				|false	|true		|
|backToTopThreshold			|点击返回顶部按钮显示/隐藏的阈值(滚动距离)，单位为px，默认为400rpx																																						|String									|否				|400rpx |-			|
|backToTopImg				|点击返回顶部按钮的自定义图片地址，默认使用next-paging内置的图片																																									|String									|否				|-			|-			|
|backToTopWithAnimate			|点击返回顶部按钮返回到顶部时是否展示过渡动画，默认为是																																										|Boolean								|否				|true		|false 	|
|backToTopBottom			|点击返回顶部按钮与底部的距离，注意添加单位px或rpx，默认为160rpx																																								|String									|否				|160rpx	|-			|
|backToTopStyle			|点击返回顶部按钮的自定义样式																																																										|Object									|否				|{}			|-			|
|enableBackToTop			|iOS点击顶部状态栏、安卓双击标题栏时，滚动条返回顶部，只支持竖向，默认为是																																			|Boolean								|否	 			|true		|false	|

#### (next-paging)data-handle设置
|参数名				|说明																																																																								|类型										|是否必填	|默认值	|可选值	|
|----				|----																																																																									|----										|----			|----		|----		|
|defaultPageNo|自定义初始的pageNo，默认为1																																																													|Number									|否				|1			|-			|
|defaultPageSize				|自定义pageSize，默认为10																																																									|Number 								|否				|10			|-			|
|dataKey				|为保证数据一致，设置当前tab切换时的标识key，并在complete中传递相同key，若二者不一致，则complete将不会生效																						|Number, String, Object	|否				|true		|false	|
|useCache				|使用缓存，若开启将自动缓存第一页的数据，默认为否。																																																	|Boolean								|否				|false	|true		|
|cacheMode		|缓存模式，默认仅会缓存组件首次加载时第一次请求到的数据，可设置为always，即代表总是缓存，每次列表刷新都会更新缓存																					|String									|否				|-			|-			|
|autowireListName				|自动注入的list名，可自动修改父view(包含ref="paging")中对应name的list值																																			|String									|否				|-			|-			|
|autowireQueryName				|自动注入的query名，可自动调用父view(包含ref="paging")中的query方法																																				|String									|否				|-			|-			|
|auto				|next-paging mounted后自动调用reload方法(mounted后自动调用接口)，默认为是																																								|Boolean								|否				|true		|false	|
|reloadWhenRefresh				|用户下拉刷新时是否触发reload方法，默认为是																																																|Boolean								|否				|true		|false	|
|autoScrollToTopWhenReload				|reload时自动滚动到顶部，默认为是																																																	|Boolean								|否				|true		|false	|
|autoCleanListWhenReload				|reload时立即自动清空原list，默认为是，若立即自动清空，则在reload之后、请求回调之前页面是空白的																				|Boolean								|否				|true		|false	|
|showRefresherWhenReload				|列表刷新时自动显示下拉刷新view，默认为否																																														|Boolean								|否				|false	|true		|
|showLoadingMoreWhenReload				|列表刷新时自动显示加载更多view，且为加载中状态，默认为否																																					|Boolean								|否				|false	|true		|
|createdReload	|组件created时立即触发reload(可解决一些情况下先看到页面再看到loading的问题)，auto为true时有效。为否时将在mounted+nextTick后触发reload，默认为否				|Boolean								|否				|false	|true		|
|localPagingLoadingTime				|本地分页时上拉加载更多延迟时间，单位为毫秒，默认200毫秒																																								|Number, String					|否				|200		|-			|
|useChatRecordMode				|使用聊天记录模式，默认为否																																																								|Boolean								|否				|false	|true		|
|autoHideKeyboardWhenChat				|使用聊天记录模式时是否自动隐藏键盘：在用户触摸列表时候自动隐藏键盘，默认为是																													|Boolean								|否				|true		|false	|
|concat				|自动拼接complete中传过来的数组(使用聊天记录模式时无效)																																																|Boolean								|否				|true		|false	|
|value				|v-model所绑定的list的值																																																															|Array									|是				|[]			|-			|

#### (next-paging)empty设置
|参数名				|说明																																																																								|类型										|是否必填	|默认值	|可选值	|
|----				|----																																																																									|----										|----			|----		|----		|
|hideEmptyView				|是否强制隐藏空数据图，默认为否																																																								|Boolean								|否				|false	|true		|
|emptyViewText				|空数据图描述文字，默认为“没有数据哦~”																																																				|String, Object					|否				|-			|-			|
|showEmptyViewReload				|是否显示空数据图重新加载按钮(无数据时)，默认为否																																												|Boolean								|否				|false	|true		|
|showEmptyViewReloadWhenError				|加载失败时是否显示空数据图重新加载按钮，默认为是																																								|Boolean								|否				|true		|false	|
|emptyViewReloadText				|空数据图点击重新加载文字，默认为“重新加载”																																															|String, Object					|否				|-			|-			|
|emptyViewImg				|空数据图图片，默认使用next-paging内置的图片																																																		|String									|否				|-			|-			|
|emptyViewErrorText				|空数据图“加载失败”描述文字，默认为“很抱歉，加载失败”																																											|String, Object					|否				|-			|-			|
|emptyViewErrorImg				|空数据图“加载失败”图片，默认使用next-paging内置的图片																																										|String									|否				|-			|-			|
|emptyViewStyle				|空数据图样式																																																																|Object									|否				|{}			|-			|
|emptyViewSuperStyle				|空数据图容器样式																																																											|Object									|否				|{}			|-			|
|emptyViewImgStyle				|空数据图img样式																																																													|Object									|否				|{}			|-			|
|emptyViewTitleStyle				|空数据图描述文字样式																																																									|Object									|否				|{}			|-			|
|emptyViewReloadStyle				|空数据图重新加载按钮样式																																																							|Object									|否				|{}			|-			|
|emptyViewFixed				|空数据图片是否铺满next-paging，默认为否，即填充满next-paging内列表(滚动区域)部分。若设置为否，则为填铺满整个next-paging												|Boolean								|否				|false	|true		|
|emptyViewCenter				|空数据图片是否垂直居中，默认为是，若设置为否即为从空数据容器顶部开始显示。emptyViewFixed为false时有效																				|Boolean								|否				|true		|false	|
|autoHideEmptyViewWhenLoading				|加载中时是否自动隐藏空数据图，默认为是																																													|Boolean								|否				|true		|false	|
|autoHideEmptyViewWhenPull				|用户下拉列表触发下拉刷新加载中时是否自动隐藏空数据图，默认为是																																		|Boolean								|否				|true		|false	|
|emptyViewZIndex				|空数据view的z-index，默认为9																																																							|Number									|否				|9			|-			|

#### (next-paging)loading设置
|参数名				|说明																																																																								|类型										|是否必填	|默认值	|可选值	|
|----					|----																																																																								|----										|----			|----		|----		|
|autoHideLoadingAfterFirstLoaded				|第一次加载后自动隐藏loading slot，默认为是																																									|Boolean								|否				|true		|false	|
|loadingFullFixed				|loading slot是否铺满屏幕并固定，默认为否																																																		|Boolean								|否				|false	|true		|
|autoShowSystemLoading|是否自动显示系统Loading：即uni.showLoading，若开启则将在刷新列表时(调用reload、refresh时)显示，下拉刷新和滚动到底部加载更多不会显示，默认为false|Boolean								|否				|false	|true		|
|systemLoadingMask				|显示系统Loading时是否显示透明蒙层，防止触摸穿透，默认为是(H5、App、微信小程序、百度小程序有效)																							|Boolean								|否				|true		|false	|
|systemLoadingText				|显示系统Loading时显示的文字，默认为"加载中"																																															|String, Object					|否				|-			|-			|

#### (next-paging)load-more设置
|参数名				|说明																																																																								|类型										|是否必填	|默认值	|可选值	|
|----					|----																																																																								|----										|----			|----		|----		|																																																																																																			|
|loadingMoreCustomStyle				|自定义底部加载更多样式																																																							|Object									|否				|{}			|-			|
|loadingMoreTitleCustomStyle				|自定义底部加载更多文字样式																																																			|Object									|否				|{}			|-			|
|loadingMoreLoadingIconCustomStyle				|自定义底部加载更多加载中动画样式																																													|Object									|否				|{}			|-			|
|loadingMoreLoadingIconType				|自定义底部加载更多加载中动画图标类型，可选flower或circle，默认为flower																														|String									|否				|flower	|circle	|
|loadingMoreLoadingIconCustomImage				|自定义底部加载更多加载中动画图标图片																																											|String									|否				|-			|-			|
|loadingMoreLoadingAnimated				|底部加载更多加载中view是否展示旋转动画，默认为是																																									|Boolean								|否				|true		|false	|
|loadingMoreEnabled				|是否启用加载更多数据(含滑动到底部加载更多数据和点击加载更多数据)，默认为是																																	|Boolean								|否				|true		|false	|
|toBottomLoadingMoreEnabled				|是否启用滑动到底部加载更多数据，默认为是																																													|Boolean								|否				|true		|false	|
|loadingMoreDefaultAsLoading|滑动到底部状态为默认状态时，以加载中的状态展示，默认为否。																																							|Boolean								|否				|false	|true		|
|loadingMoreDefaultText				|滑动到底部"默认"文字，默认为【点击加载更多】																																													|String, Object					|否				|null		|-			|
|loadingMoreLoadingText				|滑动到底部"加载中"文字，默认为【正在加载...】																																												|String, Object					|否				|null		|-			|
|loadingMoreNoMoreText				|滑动到底部"没有更多"文字，默认为【没有更多了】																																												|String, Object					|否				|null		|-			|
|loadingMoreFailText				|滑动到底部"加载失败"文字，默认为【加载失败，点击重新加载】																																							|String, Object					|否				|null		|-			|
|hideNoMoreInside				|当没有更多数据且分页内容未超出next-paging时是否隐藏没有更多数据的view，默认为否																															|Boolean								|否				|false	|true		|
|hideNoMoreByLimit				|当没有更多数据且分页数组长度少于这个值时，隐藏没有更多数据的view，默认为0，代表不限制。																										|Number									|否				|0			|-			|
|showDefaultLoadingMoreText				|是否显示默认的加载更多text，默认为是																																															|Boolean								|否				|true		|false	|
|showLoadingMoreNoMoreView				|是否显示没有更多数据的view																																																			|Boolean								|否				|true		|false	|
|showLoadingMoreNoMoreLine				|是否显示没有更多数据的分割线，默认为是																																														|Boolean								|否				|true		|false	|
|loadingMoreNoMoreLineCustomStyle				|自定义底部没有更多数据的分割线样式																																													|Object									|否				|{}			|-			|
|insideMore				|当分页未满一屏时，是否自动加载更多，默认为否(nvue无效)																																														|Boolean								|否				|false	|true		|
|lowerThreshold				|距底部/右边多远时（单位px），触发 scrolltolower 事件，默认为100rpx																																						|Number, String					|否				|100rpx	|-			|

#### (next-paging)nvue设置
|参数名				|说明																																																																								|类型										|是否必填	|默认值	|可选值	|
|----					|----																																																																								|----										|----			|----		|----		|																																																																																																							|
|nvueListIs				|nvue中修改列表类型，可选值有list、waterfall和scroller，默认为list																																								|String									|否				|list		|-			|
|nvueWaterfallConfig				|nvue waterfall配置，仅在nvue中且nvueListIs=waterfall时有效，配置参数详情参见：https://uniapp.dcloud.io/component/waterfall							|Object									|否				|{}			|-			|
|nvueBounce				|nvue 控制是否回弹效果，iOS不支持动态修改																																																					|Boolean								|否				|true		|false	|
|nvueFastScroll|nvue中通过代码滚动到顶部/底部时，是否加快动画效果(无滚动动画时无效)，默认为否																																					|Boolean								|否				|false	|true		|
|nvueListId				|nvue中list的id																																																																	|String									|否				|''			|-			|
|nvueRefresherStyle				|nvue中refresh组件的样式																																																									|Object									|否				|{}			|-			|
|nvuePagingEnabled				|nvue中是否按分页模式(类似竖向swiper)显示List，默认为false																																								|Boolean								|否				|false	|true		|
|hideNvueBottomTag				|是否隐藏nvue列表底部的tagView，默认为否																																																	|Boolean								|否				|false	|true		|
|offsetAccuracy				|nvue中控制onscroll事件触发的频率：表示两次onscroll事件之间列表至少滚动了10px。																																|Number									|否				|10			|-			|
|refresher设置																																																																																																			|
|refresherThemeStyle				|下拉刷新的主题样式，支持black，white，默认black																																												|String									|否				|black	|white	|
|refresherImgStyle				|自定义下拉刷新中左侧图标的样式																																																						|Object									|否				|{}			|-			|
|refresherTitleStyle				|自定义底部没有更多数据的分割线样式																																																			|Object									|否				|{}			|-			|
|refresherUpdateTimeStyle				|自定义下拉刷新中右侧最后更新时间文字的样式(show-refresher-update-time为true时有效)																									|Object									|否				|{}			|-			|
|watchRefresherTouchmove				|在微信小程序和QQ小程序中，是否实时监听下拉刷新中进度，默认为否																																			|Boolean								|否				|false	|true		|
|loadingMoreThemeStyle				|底部加载更多的主题样式，支持black，white，默认black																																									|String									|否				|black	|white	|
|refresherOnly				|是否只使用下拉刷新，设置为true后将关闭mounted自动请求数据、关闭滚动到底部加载更多，强制隐藏空数据图。默认为否																		|Boolean								|否				|false	|true		|
|refresherDefaultDuration				|自定义下拉刷新默认状态下回弹动画时间，单位为毫秒，默认为100毫秒，nvue无效																														|Number									|否				|100		|-			|
|refresherCompleteDelay				|自定义下拉刷新结束以后延迟回弹的时间，单位为毫秒，默认为0																																							|Number									|否				|0			|-			|
|refresherCompleteDuration|自定义下拉刷新结束回弹动画时间，单位毫秒，默认300毫秒(refresherEndBounceEnabled为false时，refresherCompleteDuration设定值的1/3)，nvue无效	|Number									|否				|300		|-			|
|refresherCompleteScrollable				|自定义下拉刷新结束状态下是否允许列表滚动，默认为否																																							|Boolean								|否				|false	|true		|
|useCustomRefresher				|是否使用自定义的下拉刷新，默认为是，即使用next-paging的下拉刷新。																																					|Boolean								|否				|true		|false	|
|refresherFps|自定义下拉刷新下拉帧率，默认为40，过高可能会出现抖动问题																																																|Number									|否				|40			|-			|
|refresherMaxAngle|自定义下拉刷新允许触发的最大下拉角度，默认为40度，当下拉角度小于设定值时，自定义下拉刷新动画不会被触发																							|Number									|否				|40			|-			|
|refresherAngleEnableChangeContinued				|自定义下拉刷新的角度由未达到最大角度变到达到最大角度时，是否继续下拉刷新手势，默认为否																		|Boolean								|否				|false	|true		|
|refresherDefaultText				|自定义下拉刷新默认状态下的文字																																																					|String, Object					|否				|null		|-			|
|refresherPullingText				|自定义下拉刷新松手立即刷新状态下的文字																																																	|String, Object					|否				|null		|-			|
|refresherRefreshingText				|自定义下拉刷新刷新中状态下的文字																																																		|String, Object					|否				|null		|-			|
|refresherCompleteText				|自定义下拉刷新刷新结束状态下的文字																																																		|String, Object					|否				|null		|-			|
|refresherDefaultImg				|自定义下拉刷新松手立即刷新状态下的图片，默认与refresherDefaultImg一致																																		|String									|否				|''			|-			|
|refresherRefreshingImg				|自定义下拉刷新刷新中状态下的图片																																																			|String									|否				|''			|-			|
|refresherCompleteImg				|自定义下拉刷新刷新结束状态下的图片																																																			|String									|否				|''			|-			|
|refresherRefreshingAnimated				|自定义下拉刷新刷新中状态下是否展示旋转动画																																											|Boolean								|否				|true		|false	|
|refresherEndBounceEnabled				|是否开启自定义下拉刷新刷新结束回弹效果，默认为是																																									|Boolean								|否				|true		|false	|
|refresherEnabled				|是否开启自定义下拉刷新，默认为是																																																						|Boolean								|否				|true		|false	|
|refresherThreshold				|设置自定义下拉刷新阈值，默认为80rpx																																																			|Number, String					|否				|80rpx	|-			|
|refresherDefaultStyle				|设置系统下拉刷新默认样式，支持设置 black，white，none，none 表示不使用默认样式，默认为black																						|String									|否				|black	|white,none|
|refresherBackground				|设置自定义下拉刷新区域背景																																																							|String									|否				|transparent|-	|
|refresherFixedBackground				|设置固定的自定义下拉刷新区域背景																																																		|String									|否				|transparent|-	|
|refresherFixedBacHeight|设置固定的自定义下拉刷新区域高度，默认为0																																																	|Number									|否				|0			|-			|
|refresherOutRate|设置自定义下拉刷新下拉超出阈值后继续下拉位移衰减的比例，范围0-1，值越大代表衰减越多。默认为0.65(nvue无效)																						|Number									|否				|0.65		|-			|
|refresherPullRate|设置自定义下拉刷新下拉时实际下拉位移与用户下拉距离的比值，默认为0.75，即代表若用户下拉10px，则实际位移为7.5px(nvue无效)															|Number									|否				|0.75		|-			|
|refresherUpdateTimeKey				|如果需要区别不同页面的最后更新时间，请为不同页面的next-paging的`refresher-update-time-key`设置不同的字符串															|String									|否				|default|-			|
|showRefresherUpdateTime				|是否显示最后更新时间，默认为否																																																			|Boolean								|否				|false	|true		|
|refresherVibrate				|下拉刷新时下拉到“松手立即刷新”状态时是否使手机短振动，默认为否（h5无效）																																			|Boolean								|否				|false	|true		|
|refresherNoTransform				|下拉刷新时是否禁止下拉刷新view跟随用户触摸竖直移动，默认为否。注意此属性只是禁止下拉刷新view移动，其他下拉刷新逻辑依然会正常触发						|Boolean								|否				|false	|true		|

#### (next-paging)scroller设置
|参数名				|说明																																																																								|类型										|是否必填	|默认值	|可选值	|
|----					|----																																																																								|----										|----			|----		|----		|																																																																																																			|
|usePageScroll				|使用页面滚动，默认为否，																																																										|Boolean								|否				|false	|true		|
|scrollX				|是否允许横向滚动，默认为否																																																													|Boolean								|否				|false	|true		|
|scrollToTopBounceEnabled				|iOS设备上滚动到顶部时是否允许回弹效果，默认为否。关闭回弹效果后可使滚动到顶部与下拉刷新更连贯，但是有吸顶view时滚动到顶部时可能出现抖动	|Boolean								|否				|false	|true		|
|scrollWithAnimation				|在设置滚动条位置时使用动画过渡，默认为否																																																|Boolean								|否				|false	|true		|
|scrollable				|是否可以滚动，使用内置scroll-view和nvue时有效，默认为是。																																												|Boolean								|否				|true		|false	|
|showScrollbar				|控制是否出现滚动条，默认为是。																																																								|Boolean								|否				|true		|false	|
|scrollToBottomBounceEnabled				|iOS设备上滚动到底部时是否允许回弹效果，默认为是。																																								|Boolean								|否				|true		|false	|
|scrollIntoView				|值应为某子元素id（id不能以数字开头）。设置哪个方向可滚动，则在哪个方向滚动到该元素																															|String									|否				|''			|-			|
|virtual-list设置																																																																																																		|
|useVirtualList				|是否使用虚拟列表，默认为否																																																										|Boolean								|否				|false	|true		|
|useCompatibilityMode				|在使用虚拟列表时，是否使用兼容模式，默认为否																																														|Boolean								|否				|false	|true		|
|useInnerList				|是否在next-paging内部循环渲染列表(内置列表)，默认为否。若use-virtual-list为true，则此项恒为true																									|Boolean								|否				|false	|true		|
|forceCloseInnerList				|强制关闭inner-list，默认为false，如果为true将强制关闭innerList，适用于开启了虚拟列表后需要强制关闭inner-list的情况												|Boolean								|否				|false	|true		|
|extraData				|使用兼容模式时传递的附加数据																																																											|Object									|否				|{}			|-			|
|innerListStyle				|innerList样式																																																															|Object									|否				|{}			|-			|
|innerCellStyle				|innerCell样式																																																															|Object									|否				|{}			|-			|
|preloadPage				|预加载的列表可视范围(列表高度)页数，默认为7，即预加载当前页及上下各7页的cell。此数值越大，则虚拟列表中加载的dom越多																|Number, String					|否				|7			|-			|
|virtualListCol				|虚拟列表列数，默认为1。常用于每行有多列的情况，例如每行有2列数据，需要将此值设置为2																														|Number, String					|否				|1			|-			|
|virtualScrollFps				|虚拟列表scroll取样帧率，默认为80，过低容易出现白屏问题，过高容易出现卡顿问题																																	|Number, String					|否				|80			|-			|
|cellHeightMode				|虚拟列表cell高度模式，默认为fixed，也就是每个cell高度完全相同，将以第一个cell高度为准进行计算。可选值【dynamic】																|String									|否				|fixed	|dynamic|
|cellKeyName				|内置列表cell的key名称，仅nvue有效，在nvue中开启use-inner-list时必须填此项																																			|String									|否				|''			|-			|

## Slot 插槽

|名称										|说明				|											
|----										|----				|														
|top										|	可以将自定义导航栏、tab-view等需要固定的(不需要跟着滚动的)元素放入slot="top"的view中。注意，当有多个需要固定的view时，请用一个view包住它们，并且在这个view上设置slot="top"。需要固定在顶部的view请勿设置position: fixed;。在使用页面滚动时，若top中的内容动态变化(即高度动态变化)，请在高度更新后调用this.$refs.paging.updatePageScrollTopHeight()|
|bottom									|	可以将需要固定在底部的(不需要跟着滚动的)元素放入slot="bottom"的view中。注意，当有多个需要固定的view时，请用一个view包住它们，并且在这个view上设置slot="bottom"。需要固定在底部的view请勿设置position: fixed;。在使用页面滚动时，若bottom中的内容动态变化(即高度动态变化)，请在高度更新后调用this.$refs.paging.updatePageScrollBottomHeight()|
|left 									|	可以将需要固定在左侧的(不需要跟着滚动的)元素放入slot="left"的view中。注意，当有多个需要固定的view时，请用一个view包住它们，并且在这个view上设置slot="left"。需要固定在左侧的view请勿设置position: fixed;slot="left"插入的view将夹在slot="top"和slot="bottom"之间，不会盖住它们。如果希望它的高度铺满屏幕，请为插入的view设置height:100%(如果是nvue请设置flex:1)，不建议在页面滚动模式下使用slot="left"，因为它也会跟着页面滚动。(当left的宽度动态改变时，请在其宽度改变后调用this.$refs.paging.updateLeftAndRightWidth())|
|right  								|	可以将需要固定在左侧的(不需要跟着滚动的)元素放入slot="left"的view中。注意，当有多个需要固定的view时，请用一个view包住它们，并且在这个view上设置slot="left"。需要固定在左侧的view请勿设置position: fixed;。slot="left"插入的view将夹在slot="top"和slot="bottom"之间，不会盖住它们。如果希望它的高度铺满屏幕，请为插入的view设置height:100%(如果是nvue请设置flex:1)，不建议在页面滚动模式下使用slot="left"，因为它也会跟着页面滚动。(当left的宽度动态改变时，请在其宽度改变后调用this.$refs.paging.updateLeftAndRightWidth())|
|refresher							|	自定义下拉刷新view，设置后则不使用uni自带的下拉刷新view和z-paging自定义的下拉刷新view。此view的style必须设置为height:100%(在非nvue中，自定义下拉刷新view的高度受refresher-threshold控制，因此如果它的高度不为默认的80rpx，则需要设置refresher-threshold="自定义下拉刷新view的高度")slot-scope="{ refresherStatus(0-默认状态 1.松手立即刷新 2.刷新中 3.刷新成功) }"|
|refresherComplete			|	自定义结束状态下的下拉刷新view，若设置，当下拉刷新结束时，会替换当前状态下的下拉刷新view。(注意：默认情况下您无法看到结束状态的下拉刷新view，除非您设置了refresher-complete-delay并且值足够大，例如：500)|
|loadingMoreDefault			|	自定义滑动到底部"默认"状态的view(即"点击加载更多view")(自定义插入时默认点击无法加载更多，若需要实现点击加载更多，请为插入的view添加点击事件，并在点击事件中调用this.$refs.paging.doLoadMore('click'))|
|loadingMoreLoading			|自定义滑动到底部"加载中"状态的view|
|loadingMoreLoading			|自定义滑动到底部"没有更多数据"状态的view|
|loadingMoreFail				|自定义滑动到底部"加载失败"状态的view|
|empty									|自定义空数据占位view slot-scope="{ isLoadFailed(true: 加载失败，false: 加载成功) }"|
|loading								|自定义页面reload时的加载view，注意：这个slot默认仅会在第一次加载时显示，若需要每次reload时都显示，需要将auto-hide-loading-after-first-loaded设置为false|
|backToTop							|自定义点击返回顶部view(此view受“【返回顶部按钮】配置”控制，且其父view默认宽高为76rpx)|
|cell 									|use-virtual-list或use-inner-list为true时有效 内置列表中的cell slot-scope="{ item, index }"|
|header									|use-virtual-list或use-inner-list为true时有效 内置列表中的header(在cell顶部且跟随列表滚动)|
|footer									|use-virtual-list或use-inner-list为true时有效 内置列表中的footer(在cell底部且跟随列表滚动)|
|chatLoading						|使用聊天记录模式时自定义顶部加载更多view，use-chat-record-mode为true时有效|

### 预览

***
|                   			普通模式演示             				 		 						|                          虚拟列表模式演示	         										|
| :--------------------------------------------------------------------: 	| :--------------------------------------------------------------------:|
| ![](https://lixueshiaa.github.io/webtest/www/static/next-paging-a.gif) 	| ![](https://lixueshiaa.github.io/webtest/www/static/next-paging-b.gif)|																															|

## 参考
本插件基于z-paging进行二开，有需要的可以直接访问原版，可能后续功能会存在差异

参考 [z-paging 一个uni-app (opens new window)分页组件](https://z-paging.zxlee.cn/) 