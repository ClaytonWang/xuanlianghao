import App from './App.vue'
import uvUI from '@/uni_modules/uv-ui-tools'

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
import store from './store';
import {
	api
} from '@/api/api.js' // API 链接
import {
	https
} from '@/http/http.js' // 请求方式中间件

export function createApp() {
	const app = createSSRApp(App);
	app.use(uvUI);
	app.use(store);
	app.config.globalProperties.$api = api;
	app.config.globalProperties.$http = https;
	return {
		app
	}
}
// #endif