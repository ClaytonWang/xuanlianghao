let rootUrl = "";

if(process.env.NODE_ENV === 'development'){
    // 开发环境
    rootUrl = 'http://127.0.0.1:7002'
}else{
    // 生产环境
    rootUrl = 'http://xuanlianghao.cn'
}

export const baseUrl = rootUrl;
export const api = {
	// 获取验证码
	guest: {
		url: rootUrl + '/api/public/guest',
		method: 'GET'
	},
	// 登录
	login: {
		url: rootUrl + '/api/user/login',
		method: 'GET'
	},
	search:{
		url: rootUrl + '/api/order/search',
		method: 'GET'
	},
	order:{
		url: rootUrl + '/api/order/order',
		method: 'POST'
	}
}
