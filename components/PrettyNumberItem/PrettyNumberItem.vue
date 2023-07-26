<template>
	<view class="pretty-number-item">
		<view class="title">
			<label v-html="item.id"></label>
			<uv-image :src="img"  width="25px" height="25px" mode="widthFix"></uv-image>
		</view>
		<view class="desc">{{item.desc}}</view>
		<view class="foot">
			<label>上海移动</label>
			<text>靓</text>
			<uv-text type="error" :text="item.price"></uv-text>
			<uv-icon name="heart" color="red" size="20"></uv-icon>
		</view>
	</view>
</template>

<script>
	const img='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAAAXNSR0IArs4c6QAABXpJREFUSMelVktoG1cUfZZkj2xZkiUrkmYsafSL9cFRW0QISbMQNASySHbaZBW6yKKQRaDQjw0vIDeO68Qxjt0wGNdEcSjMomASDFnNIiUr01TRYEv4V9dJ6lr+ETvdvt4741FdSEM+D8RInvE995577rlDyFucC8qy9cyPfx5KXZ8VQ4PVaGpkSTxRXPDm5dVmQlgD+ZBDKTMJ16seZ2E+Rr55muQKpQTpU+OEVqMOqsa5nnIs/L3qpwqzvB+CzMzizVmeFCoJcnWus32w2nFsctORltUmQpklD9estOgUestBvndWDAxiVe9SAWTW3lvtIFcge8j445vLbVCWSb/JTIHBx82C9KIlhxXA7yM/rLgi15dEMlCyvR2AzJpiNxaCCOAslGNfyGqrcS89qrbyQ2qIQ8oKs4edhVKka6jsy0ozjaeLazYXVUOH6L/Pv/bkJhQrD81FAAIBzkK2+h3WEMZqemYPk0I5hRT6BiqR2I3nQSddibYBXWR4nhOuzLSQr9RQ5v8q8n1ZslkLlQgCIFAc/mm/+6bP7jxrJ3SuEwGwCqQHqaKMmrA3sYE1L+leEsMTy1asCJm4NM24/1YAjbTS5TAqCIIHLs6wRoP/zO0Fr978apLrexrNDKzVs5RYtlFhOQtjpCHUt+Ky0q1QfJhx56Zq9kR/RciDeOogDDJyD286bN+WfTmqWHRguH4H6urXASJQ3QXIVBOenDdLLwVPcUeMjK2JkQfspAuATEipiy6GzgALIHF38iowYAA8Ybk2hRGLMVh5qjZ19JcCGBw/7t6FIFVZk/G8vJ72j9c8ibENMTW2waeGalxCqrXwMsubo9e2nPH+ZwFd4lXP5cdMl/ZU7Zxd3gv7ZUbMSFHn4CrIVwdogbLJxZlGowJ576hf2mhPFjcOpyY2hKS044093D3tndyMB+78HehgQB9SFxn6y4d9AVdwazOB3Cks67lbE7Vs3HTTQb5W44lbfwhkn1eZyea7tRR/EODedkqUV483Gwk83M14ZQDCPjnoqvskCETC/l65/6IFhy0vYxAoeS/tR9XgBOfrAHnz3VcHAcLJke02cZqd4QyJp4FixljDw90T3vFXLQJVcpYjUBHGJwpUgoi5ie02DCa9IjxSgt8NBf1USwgHAaTn0RBQu98j1oD+xtGn0cR4zY49m9rr8v28G/MqioIsNZHzD1ZcyN3R0WV/Vtpy5qEvCDS5mQncf5nz3NuOiBJQUwfYAgBVB6CMmU4ckLjr2mIIq0cgjTqWdWqFnoVykiNz7Th8XTfKQTTBPPA7tWfzjby0d4694FNFUJHW5Od8HQB7lZJ+5w0AnPow1SWu+x+1PAJpK4xqI9HQCeWixrEiHnR+DGYG+/Jox+kq7vgi0k4whpQZAOhVzd2/dWgSBxXy11RtNnSDQIeYa0/01+z4HQd1Pylm/uRWRcjJ663osG3ds+IpoA7vzTDSOM3inPGwlggENQAyw6VAztgnIJ6uoSUf6Skl0B3Ssj5b9XMctlxzdzmIqsKPlT4Jw9VtOAAuMHRhJ/obAgBNNrrsNxSIQJ6bQB94n6NvIX5KXnS+dmtiEDQ3NDoC/Fp7ShF/31wYB1KAv3NXdZPEJaZ5GgBrDoEmqa2H6v56WH+z3V+annfgXjgO1aD29e1YjtkhMIKgxaPkQbtaligYHhcWVIAurtn925zPwUVRLccm5x0YDAOdm6rY06PrrVlp36HhZMDWce8gAFaM++jddjzsF40qWhEyxZJNay7yDz26DP3DBmsbEgBio7g/5rn3epfIg/MG4AUC9zwHbyi4zKxAFwerF3cPUuihvwoXpZnGD3otQro8/b/YP7pd7XBg5hAY1dMJvz8dr9jrLxhvOP8ATaH0/FZKIRsAAAAASUVORK5CYII=';
	
	export default {
		props:['item'],
		data() {
			return {
				img
			};
		}
	}
</script>

<style lang="scss" scoped>
.pretty-number-item{
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	padding: .5rem;
	border:1px solid #e5e5e5;
	border-radius: .3rem;
	background-color: #fff;
	.title{
		display: flex;
		justify-content: space-between;
		width: 100%;
		font-size: 1rem;
		font-weight: bold;
	}
	.desc{
		width: 100%;
		font-size: .1rem;
		text-align: left;
	}
	.foot{
		display: flex;
		justify-content: space-between;
		width: 100%;
		margin-top: .5rem;
		
		label{
			display: block;
			padding: 2px;
			height: .8rem;
			line-height: .8rem;
			font-size: 10px;
			background-color: #1da7fd;
		}
		text{
			display: block;
			height: .8rem;
			line-height: .8rem;
			margin-left: 5px;
			padding: 2px;
			background-color: #f0430d;
			box-shadow: 0 0.2rem 0.4rem rgb(0 0 0 / 10%);
			border-radius: 2px;
			font-size: 10px;
			color: white;
		}
	}
}

</style>