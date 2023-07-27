import App from './App.vue'

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
import store from './store'
export function createApp() {
	const app = createSSRApp(App);
	app.use(store)
	return {
		app
	}
}
// #endif