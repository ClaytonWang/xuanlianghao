import { createStore } from 'vuex';
const store = createStore({
	state:{
		prettyNums:[{
						id: '138-1117-1<pretty>456</pretty>',
						desc: '预存200元,月消费130元,协议期60个月',
						price: 0
					},
					{
						id: '138-1117-1456',
						desc: '预存200元,月消费130元,协议期60个月',
						price: 0
					}
				],
		myFavorite:[],
	},
	mutations: {
			addFavorite(state,favorite) {
				let isExist = false,index=0;
				for(const item of state.myFavorite){
					if(item.id===favorite.id){
						isExist=true;
						break;
					}
					index+=1;
				}
				if(isExist){
					state.myFavorite.splice(index,1)
				}else{
					state.myFavorite.push(favorite);
				}
				uni.setTabBarBadge({
					index: 1,
					text: state.myFavorite.length.toString()
				});
			}
		}
})

export default store