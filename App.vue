<script>
	import store from '@/store/index.js'
	export default {
		onLaunch: function() {
			console.log('App Launch');

			setTimeout(() => {
				uni.setTabBarBadge({
					index: 1,
					text: store.state.myFavorite.length.toString()
				});
				uni.showTabBarRedDot({
					index: 3
				});
			}, 1000);
		},
		onShow: function() {
			console.log(store.state.myFavorite.length)
			uni.setTabBarBadge({
				index: 1,
				text: store.state.myFavorite.length.toString()
			});
		},
		onHide: function() {
			console.log('App Hide');
		}
	};
</script>

<style>
	/*每个页面公共css */
	html {
		font-size: 100px;
	}

	body {
		max-width: 820px;
		margin: 0 auto;
		background-color: #efefef;
	}

	pretty {
		color: #f0430d;
	}
	#app {
		
	}
</style>
<style lang="scss">
	.cont {
		padding: 1rem;

		p {
			margin-top: .5rem;
		}
	}
</style>