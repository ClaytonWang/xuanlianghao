// [next-paging]处理main.js中的配置信息工具

let config = null;
let getedStorage = false;
const storageKey = 'NEXT-PAGING-CONFIG-STORAGE-KEY'

function setConfig(value) {
	uni.setStorageSync(storageKey, value);
}

function getConfig() {
	if (getedStorage) return config;
	config = uni.getStorageSync(storageKey);
	getedStorage = true;
	return config;
}

export default {
	setConfig,
	getConfig
};
