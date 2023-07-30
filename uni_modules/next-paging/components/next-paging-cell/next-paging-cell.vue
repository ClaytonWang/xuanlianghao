<!-- next-paging-cell，用于在nvue中使用cell包裹，vue中使用view包裹 -->
<template>
	<!-- #ifdef APP-NVUE -->
	<cell :style="[cellStyle]">
		<slot />
	</cell>
	<!-- #endif -->
	<!-- #ifndef APP-NVUE -->
	<view :style="[cellStyle]">
		<slot />
	</view>
	<!-- #endif -->
</template>

<script>
	export default {
		name: "next-paging-cell",
		props: {
			//cellStyle
			cellStyle: {
				type: Object,
				default: function() {
						return {}
				}
			}
		}
	}
</script>

