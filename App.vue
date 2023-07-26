<script>
	export default {
		onLaunch: function() {
			console.log('App Launch');

			setTimeout(() => {
				uni.setTabBarBadge({
					index: 1,
					text: '31'
				});
				uni.showTabBarRedDot({
					index: 3
				});
			}, 1000);
		},
		onShow: function() {
			console.log('App Show');
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
		background-color: #efefef;
	}

	pretty {
		color: #f0430d;
	}
</style>